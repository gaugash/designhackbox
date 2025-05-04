const bgCanvas = document.getElementById("animated-bg");
const bgCtx = bgCanvas.getContext("2d");

let bgW = bgCanvas.width = window.innerWidth;
let bgH = bgCanvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  bgW = bgCanvas.width = window.innerWidth;
  bgH = bgCanvas.height = window.innerHeight;
});

let t = 0;

function drawBackground() {
  t += 0.02; // ускорим анимацию

  bgCtx.clearRect(0, 0, bgW, bgH);

  const x = bgW / 2 + Math.sin(t * 1.2) * 300;
  const y = bgH / 2 + Math.cos(t * 0.9) * 300;

  const gradient = bgCtx.createRadialGradient(
    x, y, 100,
    bgW / 2, bgH / 2, Math.max(bgW, bgH) / 1.2
  );

  gradient.addColorStop(0, "#5E1232");
  gradient.addColorStop(0.4, "#0B0B0B");
  gradient.addColorStop(1, "#0B0B0B");

  bgCtx.fillStyle = gradient;
  bgCtx.fillRect(0, 0, bgW, bgH);

  requestAnimationFrame(drawBackground);
}

drawBackground();