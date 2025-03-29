import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const ws = new WebSocket(
      `${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlMDRiMDUwMC04ZDMwLTRiNjItYjMzMS0wMDFhMDM4YjhmNWMiLCJpYXQiOjE3NDE5Njc2NTh9.RimJmMy4Fi3q6eKESl3C8nE3tHY079-Yn8XNmpgopjE`
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
