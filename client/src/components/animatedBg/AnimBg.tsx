import { useEffect, useRef } from "react";

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as any;
    if (!ctx) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const arc = 100;
    const size = 7;
    const rate = 90;
    const speed = 15;
    const colors = ["#c5c6c7","#66fcf1","#45a29e","#1f2833", "#0b0c10"];
    const mouse = { x: 0, y: 0 };
    let time = 0;
    let parts: {
      x: number;
      y: number;
      toX: number;
      toY: number;
      c: string;
      size: number;
    }[] = [];

    canvas.setAttribute("width", w.toString());
    canvas.setAttribute("height", h.toString());

    function create() {
      for (let i = 0; i < arc; i++) {
        parts[i] = {
          x: Math.ceil(Math.random() * w),
          y: Math.ceil(Math.random() * h),
          toX: Math.random() * 5 - 1,
          toY: Math.random() * 2 - 1,
          c: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * size,
        };
      }
    }

    function particles() {
      ctx.clearRect(0, 0, w, h);
      if (!canvas) return;
      canvas.addEventListener("mousemove", handleMouseMove, false);

      for (let i = 0; i < arc; i++) {
        const li = parts[i];
        const distanceFactor = DistanceBetween(mouse, parts[i]) as any;
        const adjustedSize = Math.max(
          Math.min(15 - distanceFactor / 10, 10),
          1
        );

        ctx.beginPath();
        ctx.arc(li.x, li.y, li.size * adjustedSize, 0, Math.PI * 2, false);
        ctx.fillStyle = li.c;
        ctx.strokeStyle = li.c;

        if (i % 2 === 0) {
          ctx.stroke();
        } else {
          ctx.fill();
        }

        li.x = li.x + li.toX * (time * 0.05);
        li.y = li.y + li.toY * (time * 0.05);

        if (li.x > w) {
          li.x = 0;
        }
        if (li.y > h) {
          li.y = 0;
        }
        if (li.x < 0) {
          li.x = w;
        }
        if (li.y < 0) {
          li.y = h;
        }
      }

      if (time < speed) {
        time++;
      }

      setTimeout(particles, 1000 / rate);
    }

    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function DistanceBetween(
      p1: { x: number; y: number },
      p2: { x: number; y: number }
    ) {
      // Distance calculation logic
      var dx = p2.x - p1.x;
      var dy = p2.y - p1.y;
      return Math.sqrt(dx * dx + dy * dy);
    }

    create();
    particles();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{
        position:"fixed",
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
      }}
    ></canvas>
  );
};

export default ParticleCanvas;
