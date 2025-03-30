"use client";
import { Drawinit } from "@/app/draw";
import { useEffect, useRef } from "react";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      Drawinit(canvas);
    }
  }, [canvasRef]);
  return (
    <canvas ref={canvasRef} width={"1080"} height={"1000"}>
      {" "}
    </canvas>
  );
}
