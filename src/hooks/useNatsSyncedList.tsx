import { useThrottledCallback } from "@tanstack/react-pacer";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNats } from "@/hooks/useNats.tsx";

/**
 * Represents a type which is decodable using an input Uint8Array.
 */
type ProtoDecoder<T> = (reader: Uint8Array) => T;

/**
 * Entry for a locally stored element which is updatable by messages received from the NATS broker.
 */
export type NatsSyncedEntry<TBase, TLive> = {
  base: TBase;
  live: TLive;
  ts: bigint;
};

export type UseNatsSyncedListOptions<TBase, TUpdateFrame, TRemoveFrame> = {
  /**
   * Key of the synced list, used for debugging / caching.
   */
  key: string;
  /**
   * Update topic for the data to subscribe to.
   */
  updateTopic: string;
  /**
   * Remove topic for the data to subscribe to.
   */
  removeTopic: string;
  /**
   * Decoder for an update frame received from the NATS broker.
   */
  updateFrameDecoder: ProtoDecoder<TUpdateFrame>;
  /**
   * Decoder for a remove frame received from the NATS broker.
   */
  removeFrameDecoder: ProtoDecoder<TRemoveFrame>;
  /**
   * Invoked to extract the data id when a remove frame is received.
   */
  removeIdExtractor: (frame: TRemoveFrame) => string;
  /**
   * Extractor for required base data of an update frame, [data id; frame timestamp].
   */
  updateDataExtractor: (frame: TUpdateFrame) => [id: string, timestamp: bigint];
  /**
   * Loader for the full snapshot data, used when (re-) connecting to the NATS message broker.
   */
  snapshotLoader: () => Promise<[TBase, TUpdateFrame][]>;
  /**
   * Loader for base data of a given id. Invoked when an update frame is received for data
   * which has no base data stored locally yet.
   */
  baseDataLoader: (id: string) => Promise<TBase>;
};

export const useNatsSyncedList = <TBase, TUpdateFrame, TRemoveFrame>({
  key,
  updateTopic,
  removeTopic,
  updateFrameDecoder,
  removeFrameDecoder,
  removeIdExtractor,
  updateDataExtractor,
  snapshotLoader,
  baseDataLoader,
}: UseNatsSyncedListOptions<TBase, TUpdateFrame, TRemoveFrame>) => {
  const queryClient = useQueryClient();
  const { connected, subscribe } = useNats();

  const pendingRef = useRef<Map<string, { frame: TUpdateFrame; ts: bigint }>>(new Map());
  const dataRef = useRef<Map<string, NatsSyncedEntry<TBase, TUpdateFrame>>>(new Map());
  const [map, setMap] = useState<Map<string, NatsSyncedEntry<TBase, TUpdateFrame>>>(() => new Map());

  // callback to queue an update of the map state after modifying it
  // the update runs 'wait' ms or less after this function was called
  const queueMapUpdate = useThrottledCallback(
    () => {
      const data = dataRef.current;
      setMap(new Map(data));
    },
    { key: `${key}_update_throttler`, wait: 100, leading: false, trailing: true },
  );

  // callback to mark data as pending, either if it's not pending already or if a new frame version was received
  const markAsPending = useCallback((id: string, frame: TUpdateFrame, ts: bigint) => {
    const pending = pendingRef.current.get(id);
    if (!pending || ts > pending.ts) {
      pendingRef.current.set(id, { frame, ts });
    }
  }, []);

  // hook to clear the data map in case the NATS connection is lost
  useEffect(() => {
    if (!connected) {
      dataRef.current.clear();
      pendingRef.current.clear();
      setMap(new Map());
    }
  }, [connected]);

  // hook that manages the data update subscriptions from the backend
  useEffect(() => {
    if (!connected) {
      return;
    }

    const updateSubscription = subscribe(updateTopic, (_, msg) => {
      const frame = updateFrameDecoder(msg.data);
      const [id, ts] = updateDataExtractor(frame);

      const data = dataRef.current;
      const existing = data.get(id);
      if (existing && existing.ts > ts) {
        // a newer data version is cached locally already
        return;
      }

      if (existing) {
        // an entry already exists, just apply the new live data
        dataRef.current.set(id, { base: existing.base, live: frame, ts });
        queueMapUpdate();
        return;
      }

      const pending = pendingRef.current.get(id);
      if (pending) {
        // the data is already being loaded from the backend, no need to schedule it again
        // optionally update the pending data frame in case we received a newer data version
        markAsPending(id, frame, ts);
        return;
      }

      // fetch the base data from the backend and add it to the map if the data is still pending when received
      markAsPending(id, frame, ts);
      queryClient
        .fetchQuery({
          queryKey: ["nats-synced-base", key, id],
          queryFn: () => baseDataLoader(id),
        })
        .then(base => {
          const pending = pendingRef.current.get(id);
          if (!pending || !base) {
            return;
          }

          dataRef.current.set(id, { base, live: pending.frame, ts: pending.ts });
          queueMapUpdate();
        })
        .finally(() => pendingRef.current.delete(id));
    });

    const removeSubscription = subscribe(removeTopic, (_, msg) => {
      const frame = removeFrameDecoder(msg.data);
      const id = removeIdExtractor(frame);
      pendingRef.current.delete(id);

      const data = dataRef.current;
      if (data.has(id)) {
        data.delete(id);
        queueMapUpdate();
      }
    });

    return () => {
      updateSubscription?.unsubscribe();
      removeSubscription?.unsubscribe();
    };
  }, [
    key,
    baseDataLoader,
    connected,
    queryClient,
    removeIdExtractor,
    removeTopic,
    subscribe,
    updateDataExtractor,
    updateFrameDecoder,
    updateTopic,
    removeFrameDecoder,
    queueMapUpdate,
    markAsPending,
  ]);

  // queries the snapshot data from the backend rest api and applies unknown values into the backend map
  const { data: snapshotData, isFetching } = useQuery({
    enabled: connected,
    queryFn: snapshotLoader,
    queryKey: ["nats-synced-snapshot", key],
  });
  useEffect(() => {
    if (connected && snapshotData && !isFetching) {
      const data = dataRef.current;
      const next = new Map();
      for (const [base, frame] of snapshotData) {
        const [id] = updateDataExtractor(frame);
        const knownData = data.get(id);
        const newData = knownData ?? { base, live: frame, ts: -1 };
        next.set(id, newData);
      }

      dataRef.current = next;
      queueMapUpdate();
      console.debug("Retrieved fresh data snapshot from backend");
    }
  }, [connected, snapshotData, isFetching, updateDataExtractor, queueMapUpdate]);

  return { map, connected };
};
