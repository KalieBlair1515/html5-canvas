function main() {
  const canvas = document.querySelector<HTMLCanvasElement>("#draw");
  if (canvas === null) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if (ctx === null) return;
  ctx.strokeStyle = "#BADASS";
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = 70;

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let hue = 0;
  let direction = true;

  function draw(e: MouseEvent) {
    if (!isDrawing) return;

    console.log(e);

    if (ctx === null) return;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    ctx?.beginPath();

    ctx?.moveTo(lastX, lastY);

    ctx?.lineTo(e.offsetX, e.offsetY);

    ctx?.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY];

    hue++;
    if (hue >= 360) {
      hue = 0;
    }
    if (ctx.lineWidth >= 70 || ctx.lineWidth <= 1) {
      direction = !direction;
    }
    if (direction) {
      ctx.lineWidth++;
    } else {
      ctx.lineWidth--;
    }
  }

  canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });

  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", () => (isDrawing = false));
  canvas.addEventListener("mouseout", () => (isDrawing = false));
}
main();
