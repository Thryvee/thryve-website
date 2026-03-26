"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isMobile) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        zIndex: 9000,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "10px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: visible ? "all" : "none",
      }}
    >
      <Link
        href="/contact"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "12px",
          fontWeight: 600,
          color: "#FAFAFA",
          background: "var(--purple)",
          padding: "12px 20px",
          borderRadius: "100px",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          boxShadow: "0 8px 32px rgba(123,47,190,0.4)",
          letterSpacing: "0.03em",
          border: "1px solid rgba(255,255,255,0.15)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform =
            "translateY(-2px) scale(1.03)";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 12px 40px rgba(123,47,190,0.5)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform =
            "translateY(0) scale(1)";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 8px 32px rgba(123,47,190,0.4)";
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#FAFAFA",
            opacity: 0.7,
            display: "inline-block",
          }}
        />
        Book Free Audit
      </Link>
    </div>
  );
}
