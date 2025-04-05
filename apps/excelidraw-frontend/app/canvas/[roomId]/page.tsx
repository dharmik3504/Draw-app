"use client";
import { Drawinit } from "@/app/draw";
import { Canvas } from "@/components/Canvas";
import { WS_URL } from "@/config";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function MainCanvas() {
  const params = useParams();
  const roomId = params.roomId as string;

  console.log("roomId : " + roomId);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMTEzZWZjZi1jZTczLTQ3NGUtYTM2NC1kMDBjMjU1M2JlNzEiLCJpYXQiOjE3NDM4NTQ5NDB9.4iFPM2EHdnvf-gCU6Ud1nz6hKmd5yegOX8VZe9rZy8E";
    const ws = new WebSocket(`${WS_URL}?token=${token}`);
    ws.onopen = () => {
      setSocket(ws);
      ws.send(JSON.stringify({ type: "JOIN_ROOM", roomId }));
    };
  }, []);

  if (!socket) {
    return <div>connecting to server .....</div>;
  }
  return (
    <div>
      <Canvas roomId={"1"} socket={socket} />
    </div>
  );
}
