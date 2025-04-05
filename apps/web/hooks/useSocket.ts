import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const ws = new WebSocket(
      `${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMTEzZWZjZi1jZTczLTQ3NGUtYTM2NC1kMDBjMjU1M2JlNzEiLCJpYXQiOjE3NDM4NTQ5NDB9.4iFPM2EHdnvf-gCU6Ud1nz6hKmd5yegOX8VZe9rZy8E`
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
