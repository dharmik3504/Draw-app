import axios from "axios";
import { ChatRoomClient } from "./ChatRoomClient";
import { BACKEND_URL } from "../app/config";

async function getChats(roomId: string) {
  const resposnse = await axios.get(`${BACKEND_URL}/chat/${roomId}`);

  return resposnse.data.message;
}
export async function ChatRoom({ id }: { id: string }) {
  const messages = await getChats(id);

  return <ChatRoomClient id={id} message={messages} />;
}
