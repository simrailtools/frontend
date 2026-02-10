import { useQuery, useQueryClient } from "@tanstack/react-query";
import Long from "long";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNats } from "@/hooks/useNats.tsx";

/**
 * Represents a type which is decodable using an input Uint8Array.
 */
type ProtoDecoder<T> = { decode: (reader: Uint8Array) => T };

/**
 * Entry for a locally stored element which is updatable by messages received from the NATS broker.
 */
export type NatsSyncedEntry<TBase, TLive> = {
  base: TBase;
  live: TLive;
  ts: Long;
};

export type UseNatsSyncedListOptions<TBase, TUpdateFrame, TRemoveFrame> = {
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
  updateDataExtractor: (frame: TUpdateFrame) => [id: string, timestamp: Long];
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

  const pendingRef = useRef<Map<string, { frame: TUpdateFrame; ts: Long }>>(new Map());
  const dataRef = useRef<Map<string, NatsSyncedEntry<TBase, TUpdateFrame>>>(new Map());
  const [map, setMap] = useState<Map<string, NatsSyncedEntry<TBase, TUpdateFrame>>>(() => dataRef.current);

  // callback to update the current state of the backing map to the new one
  const updateMap = useCallback((next: Map<string, NatsSyncedEntry<TBase, TUpdateFrame>>) => {
    dataRef.current = next;
    setMap(next);
  }, []);

  // callback to mark data as pending, either if it's not pending already or if a new frame version was received
  const markAsPending = useCallback((id: string, frame: TUpdateFrame, ts: Long) => {
    const pending = pendingRef.current.get(id);
    if (!pending || ts.gt(pending.ts)) {
      pendingRef.current.set(id, { frame, ts });
    }
  }, []);

  // hook to clear the data map in case the NATS connection is lost
  useEffect(() => {
    if (!connected) {
      pendingRef.current.clear();
      updateMap(new Map());
    }
  }, [connected, updateMap]);

  // hook that manages the data update subscriptions from the backend
  useEffect(() => {
    if (!connected) {
      return;
    }

    const updateSubscription = subscribe(updateTopic, (_, msg) => {
      const frame = updateFrameDecoder.decode(msg.data);
      const [id, ts] = updateDataExtractor(frame);

      const data = dataRef.current;
      const existing = data.get(id);
      if (existing?.ts.gte(ts)) {
        // a newer data version is cached locally already
        return;
      }

      if (existing) {
        // an entry already exists, just apply the new live data
        const next = new Map(data);
        next.set(id, { base: existing.base, live: frame, ts });
        updateMap(next);
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
          queryKey: ["nats-synced-base", updateTopic, id],
          queryFn: () => baseDataLoader(id),
        })
        .then(base => {
          const pending = pendingRef.current.get(id);
          if (!pending || !base) {
            return;
          }

          const curr = dataRef.current;
          const next = new Map(curr);
          next.set(id, { base, live: pending.frame, ts: pending.ts });
          updateMap(next);
        })
        .finally(() => pendingRef.current.delete(id));
    });

    const removeSubscription = subscribe(removeTopic, (_, msg) => {
      const frame = removeFrameDecoder.decode(msg.data);
      const id = removeIdExtractor(frame);
      pendingRef.current.delete(id);

      const data = dataRef.current;
      if (data.has(id)) {
        const next = new Map(data);
        next.delete(id);
        updateMap(next);
      }
    });

    return () => {
      updateSubscription?.unsubscribe();
      removeSubscription?.unsubscribe();
    };
  }, [
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
    updateMap,
    markAsPending,
  ]);

  // queries the snapshot data from the backend rest api and applies unknown values into the backend map
  const { data: snapshotData } = useQuery({
    enabled: connected,
    queryFn: snapshotLoader,
    queryKey: ["nats-synced-snapshot", updateTopic, removeTopic],
  });
  useEffect(() => {
    if (connected && snapshotData) {
      const data = dataRef.current;
      const next = new Map();
      for (const [base, frame] of snapshotData) {
        const [id] = updateDataExtractor(frame);
        const knownData = data.get(id);
        const newData = knownData ?? { base, live: frame, ts: Long.MIN_VALUE };
        next.set(id, newData);
      }

      updateMap(next);
      console.debug("Retrieved fresh data snapshot from backend");
    }
  }, [connected, snapshotData, updateDataExtractor, updateMap]);

  return { map, connected };
};
