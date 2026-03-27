"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        background: "#0A0A0A",
        color: "#FAFAFA",
        padding: "80px 0 40px",
      }}
    >
      <div
        className="m-footer-container"
        style={{ maxWidth: "1440px", margin: "0 auto", padding: isMobile ? "0 20px" : "0 48px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            paddingBottom: "60px",
            borderBottom: "1px solid rgba(250,250,250,0.1)",
            flexWrap: "wrap",
            gap: "40px",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(36px, 5vw, 72px)",
                fontWeight: 500,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "#FAFAFA",
                maxWidth: "600px",
              }}
            >
              Ready to fix the system?
            </p>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                marginTop: "32px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                color: "#FAFAFA",
                background: "var(--purple)",
                padding: "13px 28px",
                borderRadius: "100px",
                textDecoration: "none",
              }}
            >
              Book Free Audit
            </Link>
          </div>
          <div style={{ display: "flex", gap: "60px", flexWrap: "wrap" }}>
            <div>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(250,250,250,0.4)",
                  marginBottom: "16px",
                }}
              >
                Pages
              </p>
              {[
                { href: "/methodology", label: "Methodology" },
                { href: "/work", label: "Work" },
                { href: "/playbook", label: "Playbook" },
                { href: "/journal", label: "Journal" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    display: "block",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    color: "rgba(250,250,250,0.7)",
                    textDecoration: "none",
                    marginBottom: "10px",
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(250,250,250,0.4)",
                  marginBottom: "16px",
                }}
              >
                Contact
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  color: "rgba(250,250,250,0.7)",
                  marginBottom: "10px",
                }}
              >
                info@thhryve.com
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  color: "rgba(250,250,250,0.7)",
                }}
              >
                India
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "32px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              color: "rgba(250,250,250,0.3)",
            }}
          >
            &copy; {year} Thryve. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "13px",
              color: "rgba(250,250,250,0.3)",
              letterSpacing: "0.04em",
            }}
          >
            Acquire. Convert. Retain. Scale.
          </p>
        </div>
      </div>
    </footer>
  );
}
