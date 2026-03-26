"use client";
import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [isTouch] = useState(() => typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window));

  useEffect(() => {
    if (isTouch) return;
    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;

    let mouseX = 0,
      mouseY = 0;
    let ringX = 0,
      ringY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      d.style.left = mouseX + "px";
      d.style.top = mouseY + "px";
      d.classList.remove("hidden");
      r.classList.remove("hidden");
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;
      r.style.left = ringX + "px";
      r.style.top = ringY + "px";
      raf = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      d.classList.add("hovering");
      r.classList.add("hovering");
    };

    const onLeave = () => {
      d.classList.remove("hovering");
      r.classList.remove("hovering");
    };

    const onDown = () =>
      (d.style.transform = "translate(-50%,-50%) scale(0.7)");
    const onUp = () => (d.style.transform = "translate(-50%,-50%) scale(1)");

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div ref={dot} className="cursor-dot hidden" />
      <div ref={ring} className="cursor-ring hidden" />
    </>
  );
}
