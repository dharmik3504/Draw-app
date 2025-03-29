"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export function ChatRoomClient({
  message,
  id,
}: {
  message: { message: string }[];
  id: string;
}) {
  console.log(message);
  const [chats, setChats] = useState(message);
  const { socket, loading } = useSocket();
  const [currentmessage, setCurrentMessage] = useState("");
  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "JOIN_ROOM",
          roomId: id,
        })
      );
      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        console.log("--------------------------");
        console.log(parsedData);
        if (parsedData.type == "CHAT") {
          setChats((c) => [...c, { message: parsedData.messages }]);
        }
      };
    }
  }, [socket, loading, id]);
  return (
    <div>
      {chats.map((m) => (
        <div>{m.message}</div>
      ))}
      <input
        type="text"
        value={currentmessage}
        onChange={(e) => {
          setCurrentMessage(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          socket?.send(
            JSON.stringify({
              type: "CHAT",
              roomId: id,
              message: currentmessage,
            })
          );
          setCurrentMessage("");
        }}
      >
        Send message
      </button>
    </div>
  );
}
