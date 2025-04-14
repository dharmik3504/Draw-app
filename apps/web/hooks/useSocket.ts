import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const ws = new WebSocket(
      `${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlZDk1MTllNi0wMGU5LTQyNzktOGY0YS04YmI3MzVmNmI1OTgiLCJpYXQiOjE3NDQ2MTU5NzZ9.9RauOMljZg7vRhISEgMH2wp8LuTQG3acVOKoZezla7k`
    );
    ws.onopen = () => {
      setLoading(false);
      setSocket(ws);
    };
  }, []);
  return {
    socket,
    loading,
  };
}
