import { type Msg, type MsgCallback, type NatsConnection, type Subscription, wsconnect } from "@nats-io/nats-core";
import {
  createContext,
  type FC,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDocumentVisibility } from "@/hooks/useDocumentVisibility.tsx";

type NatsContextType = {
  connected: boolean;
  subscribe: (topic: string, callback: MsgCallback<Msg>) => Subscription | undefined;
};

type NatsContextOptions = {
  websocketUrl: string;
};

// biome-ignore lint/style/noNonNullAssertion: never called, hook is always initialized
const NatsContext = createContext<NatsContextType>(null!);

// eslint-disable-next-line react-refresh/only-export-components
export const useNatsContext = () => useContext(NatsContext);

export const NatsContextProvider: FC<PropsWithChildren<NatsContextOptions>> = ({ websocketUrl, children }) => {
  // Disconnect the websocket connection if the page is in the background
  // for 60 seconds. This is due to the fact that modern browsers often have
  // a "sleep" mode built-in for tabs, which prevents them from doing updates
  // when in the background. This leads to a huge amount of event frames getting
  // queued up (sometimes a few gigabytes), which makes the page greatly
  // unresponsive when the tab is being opened again.
  const isDocumentVisible = useDocumentVisibility();
  const [shouldConnect, setShouldConnect] = useState(isDocumentVisible);
  useEffect(() => {
    if (isDocumentVisible) {
      setShouldConnect(true);
      console.debug("Re-enabled connection to backend after window became visible");
      return;
    }

    const timeout = setTimeout(() => {
      setShouldConnect(false);
      console.debug("Disabled connection to backend after window was invisible for 60 seconds");
    }, 60_000);
    return () => clearTimeout(timeout);
  }, [isDocumentVisible]);

  const [connected, setConnected] = useState(false);
  const [natsConnection, setNatsConnection] = useState<NatsConnection | undefined>(undefined);
  const connectionRef = useRef<NatsConnection | null | undefined>(undefined);

  // callback function to close the NATS connection, if one is established
  const closeConnection = useCallback(() => {
    const connection = connectionRef.current;
    connectionRef.current = undefined;
    if (connection) {
      setConnected(false);
      setNatsConnection(undefined);
      connection.close().catch();
    }
  }, []);

  // callback to subscribe to messages published on a topic, returns undefined if no connection is currently open
  const subscribe = useCallback(
    (topic: string, callback: MsgCallback<Msg>) => {
      if (!connected) {
        return undefined;
      }

      try {
        return natsConnection?.subscribe(topic, { callback });
      } catch (error) {
        console.error("Caught exception while trying to subscribe to topic", topic, error);
        return undefined;
      }
    },
    [connected, natsConnection],
  );

  // hook that closes the NATS connection in case the backend connection shouldn't be established
  useEffect(() => {
    if (!shouldConnect) {
      closeConnection();
    }
  }, [closeConnection, shouldConnect]);

  // hook that handles the NATS connection logic
  useEffect(() => {
    if (!shouldConnect) {
      // do nothing if we should not connect to the backend
      return;
    }

    if (connectionRef.current || connectionRef.current === null) {
      // a connection is already established or in-flight, do nothing
      return;
    }

    // mark that the connection is in-flight and start connecting to the backend
    connectionRef.current = null;
    wsconnect({
      noEcho: true,
      maxPingOut: 3,
      pingInterval: 15_000,
      reconnect: true,
      reconnectTimeWait: 5000,
      maxReconnectAttempts: -1,
      ignoreAuthErrorAbort: true,
      servers: websocketUrl,
    })
      .then(connection => {
        if (connectionRef.current === null) {
          connectionRef.current = connection;
          setConnected(true);
          setNatsConnection(connection);
        } else {
          connection.close().catch();
        }
      })
      .catch(() => closeConnection());
  }, [websocketUrl, shouldConnect, closeConnection]);

  // hook to handle NATS connection events
  useEffect(() => {
    if (natsConnection) {
      let cancelled = false;
      (async () => {
        for await (const status of natsConnection.status()) {
          if (cancelled) {
            // this hook was canceled while awaiting, break
            break;
          }

          switch (status.type) {
            case "disconnect":
              setConnected(false);
              console.debug("Disconnected from NATS backend", status.server);
              break;
            case "reconnect":
              setConnected(true);
              console.debug("Successfully reconnected to NATS backend", status.server);
              break;
            case "close":
              closeConnection();
              console.debug("Connection to NATS backend closed");
              return; // closeConnection() resets the connection to null, we can just break the loop immediately
          }
        }
      })();

      return () => {
        cancelled = true;
      };
    }
  }, [natsConnection, closeConnection]);

  const context: NatsContextType = { connected, subscribe };
  return <NatsContext.Provider value={context}>{children}</NatsContext.Provider>;
};
