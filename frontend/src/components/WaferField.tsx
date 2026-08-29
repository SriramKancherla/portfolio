"use client";

import { useEffect, useRef } from "react";

/**
 * A silicon wafer die-map rendered behind the hero.
 *
 * It sits almost invisible until the pointer moves over it, then reveals under
 * the cursor like a scan. Every few seconds the failing dies morph into one of
 * the real defect signatures the wafer-map project classifies.
 *
 * The label is descriptive of the pattern being drawn — it is not a model
 * prediction, and nothing here claims to be inference.
 */

type PatternId = "center" | "donut" | "edge-ring" | "scratch" | "local" | "random";

const PATTERNS: { id: PatternId; label: string; fails: (x: number, y: number, r: number) => number }[] = [
  { id: "center", label: "Center", fails: (_x, _y, r) => (r < 0.3 ? 1 : 0) },
  { id: "donut", label: "Donut", fails: (_x, _y, r) => (r > 0.36 && r < 0.58 ? 1 : 0) },
  { id: "edge-ring", label: "Edge-Ring", fails: (_x, _y, r) => (r > 0.84 ? 1 : 0) },
  {
    id: "scratch",
    label: "Scratch",
    fails: (x, y) => (Math.abs(y - (0.62 * x - 0.08)) < 0.055 ? 1 : 0),
  },
  {
    id: "local",
    label: "Loc",
    fails: (x, y) => (Math.hypot(x + 0.42, y - 0.34) < 0.24 ? 1 : 0),
  },
  { id: "random", label: "Random", fails: () => 0 },
];

const GRID = 34;          // dies across the wafer
const HOLD_MS = 4200;     // how long each pattern sits before the next
const REVEAL_RADIUS = 250; // px around the cursor that lights up

type Die = { gx: number; gy: number; nx: number; ny: number; value: number; target: number; seed: number };

export const WaferField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Build the die grid once, clipped to the wafer circle.
    const dies: Die[] = [];
    for (let gy = 0; gy < GRID; gy++) {
      for (let gx = 0; gx < GRID; gx++) {
        const nx = (gx / (GRID - 1)) * 2 - 1;
        const ny = (gy / (GRID - 1)) * 2 - 1;
        if (Math.hypot(nx, ny) > 0.97) continue; // outside the wafer
        dies.push({ gx, gy, nx, ny, value: 0, target: 0, seed: Math.abs(Math.sin(gx * 12.9898 + gy * 78.233) * 43758.5453) % 1 });
      }
    }

    let patternIndex = 0;
    const applyPattern = (index: number) => {
      const pattern = PATTERNS[index % PATTERNS.length];
      for (const d of dies) {
        const r = Math.hypot(d.nx, d.ny);
        const base = pattern.fails(d.nx, d.ny, r);
        // A little scatter so the signature reads as measured, not drawn.
        const noise = d.seed < 0.022 ? 1 : 0;
        d.target = pattern.id === "random" ? (d.seed < 0.06 ? 1 : 0) : Math.max(base * (d.seed < 0.86 ? 1 : 0), noise);
      }
      const labelEl = wrap.querySelector<HTMLSpanElement>("[data-wafer-label]");
      if (labelEl) labelEl.textContent = `Pattern · ${pattern.label}`;
    };
    applyPattern(0);

    let width = 0, height = 0, cx = 0, cy = 0, cell = 0, radius = 0;
    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width; height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      radius = Math.min(width, height) * 0.46;
      cx = width * 0.5; cy = height * 0.5;
      cell = (radius * 2) / GRID;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // Pointer reveal, in canvas-local coordinates.
    const pointer = { x: -9999, y: -9999, strength: 0 };
    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.strength = 1;
    };
    const onLeave = () => { pointer.strength = 0; };
    const host = wrap.parentElement ?? wrap;
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave, { passive: true });

    let raf = 0;
    let lastSwap = performance.now();
    let revealed = 0;

    const draw = (now: number) => {
      if (!reduced && now - lastSwap > HOLD_MS) {
        lastSwap = now;
        patternIndex += 1;
        applyPattern(patternIndex);
      }

      revealed += (pointer.strength - revealed) * 0.08;
      ctx.clearRect(0, 0, width, height);

      const size = Math.max(cell * 0.62, 1.5);
      for (const d of dies) {
        d.value += (d.target - d.value) * (reduced ? 1 : 0.075);

        const px = cx + d.nx * radius;
        const py = cy + d.ny * radius;

        // Base visibility is near-nothing; the cursor is what reveals the map.
        const dist = Math.hypot(px - pointer.x, py - pointer.y);
        const nearness = revealed * Math.max(0, 1 - dist / REVEAL_RADIUS) ** 1.35;

        // Failing dies stay legible at rest so the pattern actually reads;
        // the cursor then lifts everything under it, passes included, so
        // moving over a clean region still does something.
        const passAlpha = 0.055 + nearness * 0.34;
        const failAlpha = 0.20 + nearness * 0.65;

        ctx.fillStyle = d.value > 0.02
          ? `rgba(77, 163, 255, ${(passAlpha + (failAlpha - passAlpha) * d.value) * (0.4 + d.value * 0.6)})`
          : `rgba(232, 238, 245, ${passAlpha * 0.6})`;

        ctx.fillRect(px - size / 2, py - size / 2, size, size);
      }

      if (revealed > 0.01 && pointer.x > -9000) {
        const halo = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, REVEAL_RADIUS);
        halo.addColorStop(0, `rgba(77, 163, 255, ${0.05 * revealed})`);
        halo.addColorStop(1, "rgba(77, 163, 255, 0)");
        ctx.fillStyle = halo;
        ctx.fillRect(0, 0, width, height);
      }

      // Wafer edge — only visible while the cursor is inside.
      if (revealed > 0.01) {
        ctx.strokeStyle = `rgba(232, 238, 245, ${0.10 * revealed})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 1.02, 0, Math.PI * 2);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}
    >
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
      <span
        data-wafer-label
        style={{
          position: "absolute",
          right: "clamp(20px, 5vw, 64px)",
          bottom: "18px",
          fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
          fontSize: "10.5px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(134,151,173,0.75)",
        }}
      />
    </div>
  );
};
