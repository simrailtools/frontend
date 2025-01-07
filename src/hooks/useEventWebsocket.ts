import { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import type {
  DispatchPostSnapshotFrame,
  DispatchPostUpdateFrame,
  EventStreamFrame,
  JourneySnapshotFrame,
  JourneyUpdateFrame,
  ServerSnapshotFrame,
  ServerUpdateFrame,
} from "../api/types/event.types.ts";

/**
 * The backend socket base url for events.
 */
const EVENT_API_BACKEND_URL = "wss://apis.simrail.tools/sit-events/v1";

/**
 * Selector type to provide events to subscribe to. Each value is a server id
 * (which means that the subscription is applied to all e.g. journeys on a server).
 * Subscriptions to journeys and dispatch posts can only be applied to one server at
 * a time, however a subscription to updates of multiple servers is possible.
 */
type EventSelector = {
  servers?: Array<string>;
  journeys?: string;
  dispatchPosts?: string;
};

/**
 * The hook data returned from useEventWebsocket. Holds the connection state alongside
 * the snapshots that are currently valid and are updated by the backend. If not subscribed
 * to update events of a specific type (e.g. journeys), the corresponding array is empty.
 */
type EventWebsocketHook = {
  connected: boolean;
  servers: Array<ServerSnapshotFrame>;
  journeys: Array<JourneySnapshotFrame>;
  dispatchPosts: Array<DispatchPostSnapshotFrame>;
};

/**
 * Builds the websocket connect url based on the given event selector.
 * @param selector the provided event selector to build the requested events selector based off.
 */
const buildWebsocketUrl = (selector: EventSelector) => {
  const params: Array<string> = [];
  if (selector.servers) {
    params.push(`event=server,${selector.servers.join(",")}`);
  }
  if (selector.journeys) {
    params.push(`event=journey,${selector.journeys}`);
  }
  if (selector.dispatchPosts) {
    params.push(`event=dispatch_post,${selector.dispatchPosts}`);
  }

  return `${EVENT_API_BACKEND_URL}?${params.join("&")}`;
};

/**
 * Applies the given update frame to the given current state, returning
 * a copy given current state with the update frame applied to it.
 * @param frame the incoming update frame to apply.
 * @param currentState the current state to apply the frame to.
 * @param isUpdateForSnapshot a function to check if an update frame is associated with a snapshot.
 * @typeParam S the snapshot type.
 * @typeParam U the type holding the changing fields of the snapshot type.
 */
const applyEventStreamFrame = <S, U>(
  frame: EventStreamFrame<S | U>,
  currentState: Array<S>,
  isUpdateForSnapshot: (snapshot: S, update: U) => boolean,
): Array<S> => {
  switch (frame.updateType) {
    case "ADD": {
      const snapshot = frame.frameData as S;
      return [...currentState, snapshot];
    }
    case "UPDATE": {
      const updateFrame = frame.frameData as U;
      return currentState.map(val => (isUpdateForSnapshot(val, updateFrame) ? { ...val, ...updateFrame } : val));
    }
    case "REMOVE": {
      const updateFrame = frame.frameData as U;
      return currentState.filter(val => !isUpdateForSnapshot(val, updateFrame));
    }
  }
};

/**
 * Hook to connect to the SIT-Event websocket backend, subscribing to specific events.
 * @param selector the selector that determines which events are to be subscribed to.
 */
const useEventWebsocket = (selector: EventSelector): EventWebsocketHook => {
  const [servers, setServers] = useState<Array<ServerSnapshotFrame>>([]);
  const [journeys, setJourneys] = useState<Array<JourneySnapshotFrame>>([]);
  const [dispatchPosts, setDispatchPosts] = useState<Array<DispatchPostSnapshotFrame>>([]);

  /**
   * Handles the establishment of a connection to the backend, resets the known state.
   */
  const handleConnectionEstablished = () => {
    setServers([]);
    setJourneys([]);
    setDispatchPosts([]);
    console.debug("Established connection to SIT-Event backend");
  };

  /**
   * Handles an incoming messages from the backend and interprets it as an event update frame.
   * @param event the message receive event.
   */
  const handleIncomingMessage = (event: MessageEvent) => {
    // skip decoding of ping responses or non-text messages
    const data = event.data;
    if (typeof data !== "string" || data === "pong") {
      return;
    }

    const frame = JSON.parse(data) as EventStreamFrame<unknown>;
    switch (frame.frameType) {
      case "SERVER": {
        const serverUpdateFrame = frame as EventStreamFrame<ServerSnapshotFrame | ServerUpdateFrame>;
        setServers(prevState =>
          applyEventStreamFrame<ServerSnapshotFrame, ServerUpdateFrame>(
            serverUpdateFrame,
            prevState,
            (snapshot, update) => snapshot.serverId === update.serverId,
          ),
        );
        break;
      }
      case "JOURNEY": {
        const journeyUpdateFrame = frame as EventStreamFrame<JourneySnapshotFrame | JourneyUpdateFrame>;
        setJourneys(prevState =>
          applyEventStreamFrame<JourneySnapshotFrame, JourneyUpdateFrame>(
            journeyUpdateFrame,
            prevState,
            (snapshot, update) => snapshot.journeyId === update.journeyId,
          ),
        );
        break;
      }
      case "DISPATCH_POST": {
        const dispatchPostUpdateFrame = frame as EventStreamFrame<DispatchPostSnapshotFrame | DispatchPostUpdateFrame>;
        setDispatchPosts(prevState =>
          applyEventStreamFrame<DispatchPostSnapshotFrame, DispatchPostUpdateFrame>(
            dispatchPostUpdateFrame,
            prevState,
            (snapshot, update) => snapshot.postId === update.postId,
          ),
        );
        break;
      }
    }
  };

  const { readyState } = useWebSocket(buildWebsocketUrl(selector), {
    // send a heartbeat ping text message every 15 seconds to the server,
    // close the connection if no message is received within 90 seconds
    // this high value is used as some browsers (such as chrome) might go
    // into resource saving mode which causes any effect handlers to only be
    // checked every minute which will cause timeouts if the value is less
    // than or equal to 60 seconds. note that heartbeats are only sent to the
    // server if the server is not sending messages within the provided interval
    heartbeat: {
      message: "ping",
      returnMessage: "pong",
      timeout: 90_000,
      interval: 15_000,
    },
    // never update the lastMessage, re-render should only happen
    // if the state of this hook is updated
    filter: () => false,
    // try to reconnect to the backend every 2.5s for a maximum of 10 minutes
    retryOnError: true,
    shouldReconnect: () => true,
    reconnectAttempts: 240,
    reconnectInterval: 2500,
    // websocket event handlers
    onOpen: handleConnectionEstablished,
    onClose: () => console.debug("Connection to SIT-Event backend closed"),
    onMessage: handleIncomingMessage,
  });

  const connected = readyState === ReadyState.OPEN;
  return {
    connected,
    servers,
    journeys,
    dispatchPosts,
  };
};

export default useEventWebsocket;
