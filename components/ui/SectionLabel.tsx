"use client";
import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "social-proof", label: "Trusted By" },
  { id: "pillars-scroll", label: "System" },
  { id: "statement", label: "Mission" },
  { id: "stats", label: "Results" },
  { id: "process", label: "Process" },
  { id: "work-results", label: "Work" },
  { id: "testimonials", label: "Clients" },
  { id: "about", label: "About" },
  { id: "faq", label: "FAQ" },
];

export default function SectionLabel() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);

    return () => {
      window.removeEventListener("resize", check);
    };
  }, []);

  const [current, setCurrent] = useState("Home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const found = sections.find((s) => s.id === e.target.id);
            if (found) setCurrent(found.label);
          }
        });
      },
      { threshold: 0.4 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    if (isMobile) return () => observer.disconnect();
    return () => observer.disconnect();
  }, []);

  if (isMobile) return null;
  return (
    <div
      className="m-section-label"
      style={{
        position: "fixed",
        left: "24px",
        top: "50%",
        transform: "translateY(-50%) rotate(-90deg)",
        zIndex: 100,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <div
        style={{ width: "20px", height: "1px", background: "var(--purple)" }}
      />
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "9px",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--text-tertiary)",
          transition: "all 0.4s ease",
          whiteSpace: "nowrap",
        }}
      >
        {current}
      </span>
    </div>
  );
}
