'use client';
import { useState, useEffect } from 'react';
import Link from "next/link";

export default function FooterCTA() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section
      style={{
        padding: "140px 48px",
        background: "#0A0A0A",
        color: "#FAFAFA",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(250,250,250,0.4)",
            marginBottom: "32px",
          }}
        >
          Ready?
        </p>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(48px, 7vw, 100px)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: "#FAFAFA",
            marginBottom: "24px",
          }}
        >
          You already know where the leak is.
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "16px",
            color: "rgba(250,250,250,0.5)",
            marginBottom: "48px",
            lineHeight: 1.7,
          }}
        >
          15 minutes. We will tell you exactly where you are losing money and
          what to do about it.
        </p>
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/contact"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              color: "#FAFAFA",
              background: "var(--purple)",
              padding: "14px 32px",
              borderRadius: "100px",
              textDecoration: "none",
              border: "1.5px solid var(--purple)",
              transition: "all 0.3s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            Book Free Audit
          </Link>
          <Link
            href="/playbook"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              color: "rgba(250,250,250,0.7)",
              background: "transparent",
              padding: "14px 32px",
              borderRadius: "100px",
              textDecoration: "none",
              border: "1.5px solid rgba(250,250,250,0.2)",
              transition: "all 0.3s ease",
              display: "inline-flex",
            }}
          >
            Get Free Playbook
          </Link>
        </div>
      </div>
    </section>
  );
}
