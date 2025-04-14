import { Drawinit } from "@/app/draw";
import { Circle, Icon, Pencil, RectangleHorizontalIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";

type Shape = "circle" | "rect" | "pencil";
export function Canvas({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState<Shape>("circle");
  useEffect(() => {
    //@ts-ignore
    window.selectedTool = selectedTool;
  }, [selectedTool]);
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      Drawinit(canvas, roomId, socket);
    }
  }, [canvasRef]);
  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
      <TopBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
    </div>
  );
}
function TopBar({
  selectedTool,
  setSelectedTool,
}: {
  selectedTool: Shape;
  setSelectedTool: (s: Shape) => void;
}) {
  return (
    <div className="fixed top-3.5 left-3.5">
      <div className="flex gap-2">
        <IconButton
          activated={selectedTool === "pencil"}
          icon={<Pencil />}
          onClick={() => {
            setSelectedTool("pencil");
          }}
        ></IconButton>
        <IconButton
          activated={selectedTool === "rect"}
          icon={<RectangleHorizontalIcon />}
          onClick={() => {
            setSelectedTool("rect");
          }}
        ></IconButton>
        <IconButton
          activated={selectedTool === "circle"}
          icon={<Circle />}
          onClick={() => {
            setSelectedTool("circle");
          }}
        ></IconButton>
      </div>
    </div>
  );
}
