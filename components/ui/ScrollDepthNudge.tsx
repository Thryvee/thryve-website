"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function ScrollDepthNudge() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (dismissed) return;

    const onScroll = () => {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled >= 0.7 && !visible) {
        setVisible(true);
        // Auto-dismiss after 8 seconds
        timerRef.current = setTimeout(() => setVisible(false), 8000);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [dismissed, visible]);

  const dismiss = () => {
    setVisible(false);
    setDismissed(true);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  if (dismissed) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 8500,
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
        background: "var(--purple)",
        borderTop: "1px solid rgba(255,255,255,0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        padding: "14px 24px",
        flexWrap: "wrap",
      }}
    >
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "13px",
        fontWeight: 500,
        color: "rgba(255,255,255,0.9)",
        letterSpacing: "0.02em",
        margin: 0,
      }}>
        You&apos;ve read enough to know if this is for you.
      </p>
      <Link
        href="/contact"
        onClick={dismiss}
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "12px",
          fontWeight: 600,
          color: "var(--purple)",
          background: "#FAFAFA",
          padding: "8px 20px",
          borderRadius: "100px",
          textDecoration: "none",
          letterSpacing: "0.03em",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        Book the audit →
      </Link>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        style={{
          position: "absolute",
          right: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "rgba(255,255,255,0.5)",
          fontSize: "18px",
          lineHeight: 1,
          padding: "4px",
        }}
      >
        ×
      </button>
    </div>
  );
}
