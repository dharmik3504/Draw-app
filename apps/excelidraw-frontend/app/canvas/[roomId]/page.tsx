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
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlZDk1MTllNi0wMGU5LTQyNzktOGY0YS04YmI3MzVmNmI1OTgiLCJpYXQiOjE3NDQ2MTU5NzZ9.9RauOMljZg7vRhISEgMH2wp8LuTQG3acVOKoZezla7k";
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
