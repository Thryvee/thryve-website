"use client";
import { useEffect, useRef } from "react";

interface Props {
  trigger: boolean;
}

const PARTICLE_COUNT = 12;

/**
 * Renders a burst of purple particles on `trigger` becoming true.
 * Place this inside a position:relative container on the CTA button.
 */
export default function CelebrationBurst({ trigger }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trigger) return;
    const container = containerRef.current;
    if (!container) return;

    // Clear previous particles
    container.innerHTML = "";

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const dot = document.createElement("span");
      const angle = (i / PARTICLE_COUNT) * 360;
      const distance = 28 + Math.random() * 28;
      const size = 4 + Math.random() * 4;
      const duration = 420 + Math.random() * 200;
      const colors = ["#7b2fbe", "#a855f7", "#c084fc", "#fafafa"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      const rad = (angle * Math.PI) / 180;
      const tx = Math.cos(rad) * distance;
      const ty = Math.sin(rad) * distance;

      dot.style.cssText = `
        position: absolute;
        left: 50%; top: 50%;
        width: ${size}px; height: ${size}px;
        border-radius: 50%;
        background: ${color};
        pointer-events: none;
        transform: translate(-50%, -50%);
        animation: burst-dot ${duration}ms cubic-bezier(0.25,0.46,0.45,0.94) forwards;
        --tx: ${tx}px; --ty: ${ty}px;
      `;
      container.appendChild(dot);
    }

    const cleanup = setTimeout(() => {
      if (container) container.innerHTML = "";
    }, 700);
    return () => clearTimeout(cleanup);
  }, [trigger]);

  return (
    <>
      <style>{`
        @keyframes burst-dot {
          0%   { transform: translate(-50%, -50%) translate(0,0) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
      `}</style>
      <div
        ref={containerRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "visible",
          zIndex: 10,
        }}
      />
    </>
  );
}
