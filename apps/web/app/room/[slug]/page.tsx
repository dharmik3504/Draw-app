import axios from "axios";
import { BACKEND_URL } from "../../config";
import { ChatRoom } from "../../../componenets/ChatRoom";

interface ChatroomProps {
  slug: string;
}
async function getRoomId(slug: string) {
  const response = await axios.get(`${BACKEND_URL}/room/${slug}`);

  return response.data.room.id;
}
export default async function ChatRoom1(parmas: ChatroomProps) {
  const slug = "dk_2018";

  const roomId = await getRoomId(slug);
  return <ChatRoom id={roomId}></ChatRoom>;
}
