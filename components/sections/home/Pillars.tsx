'use client';
import { useState, useEffect } from 'react';
import { pillars } from "@/data/pillars";

export default function Pillars() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const [active, setActive] = useState(0);

  return (
    <section
      style={{
        padding: "120px 0",
        background: "#0A0A0A",
        color: "#FAFAFA",
      }}
    >
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 48px" }}>
        <div style={{ marginBottom: "80px" }}>
          <span
            className="tag"
            style={{
              background: "rgba(250,250,250,0.08)",
              color: "rgba(250,250,250,0.5)",
              border: "1px solid rgba(250,250,250,0.12)",
              marginBottom: "24px",
              display: "inline-flex",
            }}
          >
            The System
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(40px, 6vw, 80px)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              color: "#FAFAFA",
              maxWidth: "600px",
            }}
          >
            Four pillars. One sequence. No skipping.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "start",
          }}
        >
          {/* Left — pillar list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {pillars.map((pillar, i) => (
              <div
                key={pillar.id}
                onClick={() => setActive(i)}
                data-cursor
                style={{
                  padding: "32px 0",
                  borderBottom: "1px solid rgba(250,250,250,0.1)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "24px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        color:
                          active === i
                            ? "var(--purple)"
                            : "rgba(250,250,250,0.3)",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {pillar.number}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(28px, 3vw, 48px)",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        color:
                          active === i ? "#FAFAFA" : "rgba(250,250,250,0.4)",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {pillar.name}
                    </span>
                  </div>
                  <span
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      border: "1px solid rgba(250,250,250,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      color:
                        active === i
                          ? "var(--purple)"
                          : "rgba(250,250,250,0.3)",
                      transform:
                        active === i ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    +
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right — active pillar detail */}
          <div
            style={{
              position: "sticky",
              top: "120px",
              padding: "48px",
              border: "1px solid rgba(250,250,250,0.1)",
              borderRadius: "16px",
              background: "rgba(250,250,250,0.03)",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--purple)",
                marginBottom: "16px",
                display: "block",
              }}
            >
              {pillars[active].number} — {pillars[active].name}
            </span>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(24px, 2.5vw, 36px)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "#FAFAFA",
                marginBottom: "16px",
                lineHeight: 1.2,
              }}
            >
              {pillars[active].tagline}
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                color: "rgba(250,250,250,0.6)",
                lineHeight: 1.7,
                marginBottom: "32px",
              }}
            >
              {pillars[active].description}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "32px",
              }}
            >
              {pillars[active].deliverables.map((d, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--purple)",
                      marginTop: "6px",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      color: "rgba(250,250,250,0.6)",
                    }}
                  >
                    {d}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                padding: "16px 20px",
                background: "rgba(123,47,190,0.15)",
                borderRadius: "8px",
                border: "1px solid rgba(123,47,190,0.3)",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--purple)",
                  letterSpacing: "0.05em",
                }}
              >
                RESULT — {pillars[active].result}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
