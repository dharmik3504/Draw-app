import { HTTP_BACKEND } from "@/config";
import axios, { AxiosError } from "axios";

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    };
export async function Drawinit(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket
) {
  const ctx = canvas.getContext("2d");

  let existingShapes: Shape[] = await getExistingShape(roomId);
  if (!ctx) {
    return;
  }
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === "CHAT") {
      const parsedShape = JSON.parse(message.message);

      existingShapes.push(parsedShape);
      clearCanvas(existingShapes, canvas, ctx);
    }
  };
  clearCanvas(existingShapes, canvas, ctx);
  let clicked = false;
  let startX = 0;
  let startY = 0;

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;
    // ctx?.strokeRect(e.clientX, e.clientY, 100, 100);
  });
  canvas.addEventListener("mouseup", (e) => {
    clicked = false;
    const width = e.clientX - startX;
    const height = e.clientY - startY;
    const shape: Shape = {
      type: "rect",
      x: startX,
      y: startY,
      width,
      height,
    };
    existingShapes.push(shape);

    socket.send(
      JSON.stringify({ type: "CHAT", message: JSON.stringify(shape), roomId })
    );
  });
  canvas.addEventListener("mousemove", (e) => {
    if (clicked && ctx) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      clearCanvas(existingShapes, canvas, ctx);

      ctx.strokeStyle = "rgba(255,255,255)";

      ctx?.strokeRect(startX, startY, width, height);
    }
    // ctx?.strokeRect(e.clientX, e.clientY, 100, 100);
  });
}

function clearCanvas(
  existingShapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx?.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  existingShapes.map((shape: Shape) => {
    if (shape.type == "rect") {
      ctx.strokeStyle = "rgba(255,255,255)";

      ctx?.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  });
}

async function getExistingShape(roomId: string) {
  console.log(HTTP_BACKEND);
  try {
    const res = await axios.get(`${HTTP_BACKEND}/chat/${roomId}`);
    const messages = res.data.message;
    console.log(messages);
    const shapes = messages.map((x: { message: string }) => {
      const messageData = JSON.parse(x.message);
      return messageData;
    });
    return shapes;
  } catch (e: any) {
    console.log(e);
  }
}
