"use client";
import { useEffect, useRef } from "react";

const PILLARS = [
  {
    name: "Acquire",
    metric: "2x ROAS",
    color: "#9B5DE5",
    radius: 110,
    speed: 0.008,
    size: 10,
    startAngle: 0,
  },
  {
    name: "Convert",
    metric: "+200% CVR",
    color: "#4361EE",
    radius: 160,
    speed: 0.005,
    size: 9,
    startAngle: Math.PI / 2,
  },
  {
    name: "Retain",
    metric: "3:1 LTV:CAC",
    color: "#2DC653",
    radius: 215,
    speed: 0.0035,
    size: 11,
    startAngle: Math.PI,
  },
  {
    name: "Scale",
    metric: "60% less time",
    color: "#F4A261",
    radius: 270,
    speed: 0.002,
    size: 9,
    startAngle: (3 * Math.PI) / 2,
  },
];

export default function OrbitalSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoveredRef = useRef<number | null>(null);
  const anglesRef = useRef(PILLARS.map((p) => p.startAngle));
  const trailsRef = useRef(
    PILLARS.map(() => [] as { x: number; y: number; alpha: number }[]),
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = Math.min(600, window.innerWidth * 0.9);
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;

    // Scale radii to canvas size
    const scale = size / 600;
    const pillars = PILLARS.map((p) => ({
      ...p,
      radius: p.radius * scale,
      size: p.size * scale,
    }));

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let found: number | null = null;
      pillars.forEach((p, i) => {
        const angle = anglesRef.current[i];
        const px = cx + Math.cos(angle) * p.radius;
        const py = cy + Math.sin(angle) * p.radius;
        const dist = Math.sqrt((mx - px) ** 2 + (my - py) ** 2);
        if (dist < p.size * 2.5) found = i;
      });
      hoveredRef.current = found;
      canvas.style.cursor = found !== null ? "pointer" : "default";
    };
    canvas.addEventListener("mousemove", onMouseMove);

    let raf: number;
    let tick = 0;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      tick++;

      // Update angles
      pillars.forEach((p, i) => {
        anglesRef.current[i] += p.speed;
      });

      // Draw orbital rings
      pillars.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(cx, cy, p.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${p.color}18`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw connection lines between planets (pulsing)
      const positions = pillars.map((p, i) => ({
        x: cx + Math.cos(anglesRef.current[i]) * p.radius,
        y: cy + Math.sin(anglesRef.current[i]) * p.radius,
        color: p.color,
      }));

      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const pulse = (Math.sin(tick * 0.02 + i + j) + 1) / 2;
          const grad = ctx.createLinearGradient(
            positions[i].x,
            positions[i].y,
            positions[j].x,
            positions[j].y,
          );
          grad.addColorStop(0, positions[i].color + "22");
          grad.addColorStop(0.5, `rgba(123,47,190,${0.05 + pulse * 0.08})`);
          grad.addColorStop(1, positions[j].color + "22");
          ctx.beginPath();
          ctx.moveTo(positions[i].x, positions[i].y);
          ctx.lineTo(positions[j].x, positions[j].y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw sun (center)
      const sunPulse = (Math.sin(tick * 0.04) + 1) / 2;
      // Outer glow
      const sunGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40 * scale);
      sunGrad.addColorStop(0, `rgba(123,47,190,${0.15 + sunPulse * 0.1})`);
      sunGrad.addColorStop(1, "rgba(123,47,190,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 40 * scale, 0, Math.PI * 2);
      ctx.fillStyle = sunGrad;
      ctx.fill();
      // Core
      ctx.beginPath();
      ctx.arc(cx, cy, 14 * scale, 0, Math.PI * 2);
      ctx.fillStyle = "#7B2FBE";
      ctx.fill();
      // Inner bright
      ctx.beginPath();
      ctx.arc(cx, cy, 7 * scale, 0, Math.PI * 2);
      ctx.fillStyle = "#9B5DE5";
      ctx.fill();
      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 3 * scale, 0, Math.PI * 2);
      ctx.fillStyle = "#FAFAFA";
      ctx.fill();

      // Draw planets + trails + labels
      pillars.forEach((p, i) => {
        const angle = anglesRef.current[i];
        const px = cx + Math.cos(angle) * p.radius;
        const py = cy + Math.sin(angle) * p.radius;
        const isHovered = hoveredRef.current === i;

        // Trail
        trailsRef.current[i].unshift({ x: px, y: py, alpha: 0.5 });
        if (trailsRef.current[i].length > 18) trailsRef.current[i].pop();
        trailsRef.current[i].forEach((t, ti) => {
          t.alpha *= 0.88;
          ctx.beginPath();
          ctx.arc(t.x, t.y, p.size * 0.5 * (1 - ti / 18), 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${Math.floor(t.alpha * 255)
            .toString(16)
            .padStart(2, "0")}`;
          ctx.fill();
        });

        // Planet glow
        const glowSize = isHovered ? p.size * 3.5 : p.size * 2.5;
        const glow = ctx.createRadialGradient(px, py, 0, px, py, glowSize);
        glow.addColorStop(0, p.color + "55");
        glow.addColorStop(1, p.color + "00");
        ctx.beginPath();
        ctx.arc(px, py, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Planet body
        const planetSize = isHovered ? p.size * 1.5 : p.size;
        ctx.beginPath();
        ctx.arc(px, py, planetSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        // Planet shine
        ctx.beginPath();
        ctx.arc(
          px - planetSize * 0.3,
          py - planetSize * 0.3,
          planetSize * 0.35,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.fill();

        // Label
        if (isHovered) {
          ctx.font = `bold ${12 * scale}px DM Sans, sans-serif`;
          ctx.fillStyle = "#FAFAFA";
          ctx.textAlign = "center";
          ctx.fillText(p.name, px, py - planetSize - 10 * scale);
          ctx.font = `${10 * scale}px DM Sans, sans-serif`;
          ctx.fillStyle = p.color;
          ctx.fillText(p.metric, px, py - planetSize - 24 * scale);
        } else {
          // Small always-visible label
          ctx.font = `${9 * scale}px DM Sans, sans-serif`;
          ctx.fillStyle = p.color + "CC";
          ctx.textAlign = "center";
          ctx.fillText(p.name, px, py + planetSize + 14 * scale);
        }
      });

      // Floating particles around the sun
      for (let k = 0; k < 6; k++) {
        const particleAngle = tick * 0.01 + k * (Math.PI / 3);
        const pr = (55 + Math.sin(tick * 0.03 + k) * 8) * scale;
        const ppx = cx + Math.cos(particleAngle) * pr;
        const ppy = cy + Math.sin(particleAngle) * pr;
        ctx.beginPath();
        ctx.arc(ppx, ppy, 1.5 * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(123,47,190,${0.3 + Math.sin(tick * 0.05 + k) * 0.2})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        right: "-40px",
        top: "50%",
        transform: "translateY(-50%)",
        opacity: 0.9,
        pointerEvents: "auto",
      }}
    />
  );
}
