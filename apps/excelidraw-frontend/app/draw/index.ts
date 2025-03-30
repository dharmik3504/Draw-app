export function Drawinit(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }
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
    if (clicked && ctx) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;

      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0,0,0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(255,255,255)";

      ctx?.strokeRect(startX, startY, width, height);
    }
    // ctx?.strokeRect(e.clientX, e.clientY, 100, 100);
  });
}
