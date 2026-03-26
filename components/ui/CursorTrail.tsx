"use client";
import { useEffect, useRef, useState } from "react";

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isTouch] = useState(() => typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window));

  useEffect(() => {
    if (isTouch) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const dots: { x: number; y: number; alpha: number; size: number }[] = [];
    let mouse = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
      dots.push({ x: mouse.x, y: mouse.y, alpha: 0.6, size: 4 });
      if (dots.length > 20) dots.shift();
    };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((dot) => {
        dot.alpha *= 0.85;
        dot.size *= 0.92;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(123, 47, 190, ${dot.alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99990,
        pointerEvents: "none",
      }}
    />
  );
}
