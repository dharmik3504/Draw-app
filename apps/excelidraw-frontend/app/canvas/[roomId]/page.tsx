"use client";
import { useEffect, useRef } from "react";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
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

        console.log(e.clientX);
        console.log(e.clientY);
        // ctx?.strokeRect(e.clientX, e.clientY, 100, 100);
      });
      canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
          const width = e.clientX - startX;
          const height = e.clientY - startY;

          ctx?.clearRect(0, 0, canvas.width, canvas.height);
          ctx?.strokeRect(startX, startY, width, height);
        }
        // ctx?.strokeRect(e.clientX, e.clientY, 100, 100);
      });
    }
  }, [canvasRef]);
  return (
    <canvas ref={canvasRef} width={500} height={500}>
      {" "}
    </canvas>
  );
}
