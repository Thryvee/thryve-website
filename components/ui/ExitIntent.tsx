"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ExitIntent() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10) setShow(true);
    };
    document.addEventListener("mouseleave", onMouseLeave);
    return () => document.removeEventListener("mouseleave", onMouseLeave);
  }, [dismissed]);

  if (!show || dismissed) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99995,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
      onClick={() => {
        setShow(false);
        setDismissed(true);
      }}
    >
      <div
        style={{
          background: "var(--bg)",
          borderRadius: "24px",
          padding: "56px 48px",
          maxWidth: "520px",
          width: "100%",
          textAlign: "center",
          position: "relative",
          boxShadow: "0 40px 100px rgba(0,0,0,0.3)",
          border: "1px solid var(--border)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            setShow(false);
            setDismissed(true);
          }}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
            color: "var(--text-tertiary)",
            lineHeight: 1,
          }}
        >
          ×
        </button>

        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--purple)",
            display: "block",
            marginBottom: "16px",
          }}
        >
          Before you go
        </span>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 500,
            letterSpacing: "-0.025em",
            color: "var(--text)",
            marginBottom: "16px",
            lineHeight: 1.1,
          }}
        >
          Get the free playbook.
          <br />
          <span style={{ color: "var(--purple)", fontStyle: "italic" }}>
            Use it this week.
          </span>
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: "32px",
          }}
        >
          40+ pages. 12 frameworks. The exact system Thryve uses with every
          client — free, no pitch attached.
        </p>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/playbook"
            onClick={() => {
              setShow(false);
              setDismissed(true);
            }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              color: "#FAFAFA",
              background: "var(--purple)",
              padding: "13px 28px",
              borderRadius: "100px",
              textDecoration: "none",
              display: "inline-flex",
            }}
          >
            Get the free playbook →
          </Link>
          <button
            onClick={() => {
              setShow(false);
              setDismissed(true);
            }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              color: "var(--text-tertiary)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "13px 20px",
            }}
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
}
