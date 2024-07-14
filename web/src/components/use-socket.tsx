import { useState, useEffect } from "react";
import { socket } from "../utils/socket";

type Events = "first-payment:read";

export function useSocket() {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [events, setEvents] = useState<Events[]>([]);

  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onConnectionError() {
      setIsConnected(false);
    }

    function onFirstPaymentRead() {
      setEvents((e) => {
        if (e.includes("first-payment:read")) return e;
        else return e.concat(["first-payment:read"]);
      });
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectionError);
    socket.on("first-payment:read", onFirstPaymentRead);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const confirmFirstPayment = () => {
    socket.emit("first-payment:create");
  };

  return { isConnected, confirmFirstPayment, events };
}
