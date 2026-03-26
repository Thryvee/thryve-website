"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function StickyAuditBar() {
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
      setVisible(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isMobile) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "72px",
        left: 0,
        right: 0,
        zIndex: 990,
        background: "#0A0A0A",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 24px",
        gap: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {[
          "15 minutes",
          "Free",
          "No pitch",
          "Results in 30 days or we stop",
        ].map((item, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            {i > 0 && (
              <span
                style={{
                  width: "3px",
                  height: "3px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  display: "inline-block",
                }}
              />
            )}
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.04em",
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
      <Link
        href="/contact"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px",
          fontWeight: 600,
          color: "#FAFAFA",
          background: "var(--purple)",
          padding: "7px 16px",
          borderRadius: "100px",
          textDecoration: "none",
          letterSpacing: "0.04em",
          border: "1px solid rgba(255,255,255,0.15)",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        Book Free Audit →
      </Link>
    </div>
  );
}
