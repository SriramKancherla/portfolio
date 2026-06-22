import { useEffect, useRef } from "react";

type Blob = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
};

export const FluidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;

    const blobs: Blob[] = Array.from({ length: 6 }, (_, i) => ({
      x: 0.15 + Math.random() * 0.7,
      y: 0.15 + Math.random() * 0.7,
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0006,
      radius: 120 + Math.random() * 180,
      hue: 185 + i * 15,
    }));

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight, active: true };
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      blobs.forEach((b) => {
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x * w - b.x * w;
          const dy = mouseRef.current.y * h - b.y * h;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 300) {
            b.vx += (dx / dist) * 0.00015;
            b.vy += (dy / dist) * 0.00015;
          }
        }

        b.x += b.vx;
        b.y += b.vy;

        if (b.x < 0.05 || b.x > 0.95) b.vx *= -1;
        if (b.y < 0.05 || b.y > 0.95) b.vy *= -1;

        b.vx *= 0.992;
        b.vy *= 0.992;

        const cx = b.x * w;
        const cy = b.y * h + window.scrollY * 0.05;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, b.radius);
        grad.addColorStop(0, `hsla(${b.hue}, 90%, 55%, 0.12)`);
        grad.addColorStop(0.5, `hsla(${b.hue + 20}, 80%, 50%, 0.06)`);
        grad.addColorStop(1, `hsla(${b.hue + 40}, 70%, 45%, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy % (h + 200) - 100, b.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-80"
      style={{ filter: "blur(40px)" }}
      aria-hidden="true"
    />
  );
};
