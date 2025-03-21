import WebSocket, { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prisma } from "@repo/db/client";

interface User {
  userId: string;
  rooms: string[];
  ws: WebSocket;
}
// const users: User = [
//   {
//     userId: 1,
//     rooms: ["room1", "room2"],
//     ws: ew
//   },
// ];
enum userType {
  JOIN_ROOM = "JOIN_ROOM",
  LEAVE_ROOM = "LEAVE_ROOM",
  CHAT = "CHAT",
}
const users: User[] = [];

const wss = new WebSocketServer({ port: 8080 });
function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded == "string") {
      return null;
    }
    if (!decoded || !decoded.userId) {
      return null;
    }
    return decoded.userId;
  } catch (e) {
    return null;
  }
  return null;
}
wss.on("connection", function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return;
  }
  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") ?? "";
  const userId = checkUser(token);
  console.log(userId);
  if (userId == null) {
    ws.close();
    return null;
  }
  users.push({ userId, rooms: [], ws });
  ws.on("message", async function message(data) {
    const parseData = JSON.parse(data as unknown as string);
    if (parseData.type === "JOIN_ROOM") {
      console.log("inside join room");
      const user = users.find((x) => x.ws === ws);
      user?.rooms.push(parseData.roomId);
    }
    if (parseData.type === userType.LEAVE_ROOM) {
      console.log("inside leave room");
      const user = users.find((x) => x.ws === ws);
      if (!user) {
        return;
      }
      user.rooms = user?.rooms.filter((x) => x == parseData.room);
    }
    if (parseData.type === userType.CHAT) {
      const roomId = parseData.roomId;
      const message = parseData.message;
      await prisma.chat.create({
        data: {
          roomId,
          message,
          userId,
        },
      });
      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          console.log("inside if");
          user.ws.send(
            JSON.stringify({
              type: userType.CHAT,
              message: message,
              roomId,
            })
          );
        }
      });
    }
  });
});
