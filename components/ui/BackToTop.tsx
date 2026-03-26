"use client";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={scrollTop}
      style={{
        position: "fixed",
        bottom: isMobile ? "16px" : "32px",
        left: isMobile ? "auto" : "32px",
        right: isMobile ? "16px" : "auto",
        zIndex: 9000,
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: visible ? "all" : "none",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        color: "var(--text-secondary)",
        fontSize: "16px",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--purple)";
        (e.currentTarget as HTMLElement).style.color = "#FAFAFA";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--purple)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--surface)";
        (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
      }}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}
