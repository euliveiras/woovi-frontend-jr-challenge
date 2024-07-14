import { useState, useEffect } from "react";
import { socket } from "../utils/socket";

type Events = "first-payment:read"

export function useSocket() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [events, setEvents] = useState<Events[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
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
