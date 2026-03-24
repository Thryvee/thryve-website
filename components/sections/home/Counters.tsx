"use client";
import { useState, useEffect } from 'react';
import CountUp from "@/components/ui/CountUp";

const stats = [
  {
    value: 2,
    suffix: "x",
    label: "Minimum ROAS",
    description: "Average across all client campaigns",
  },
  {
    value: 40,
    suffix: "%",
    label: "CAC Reduction",
    description: "By end of first month",
  },
  {
    value: 4,
    suffix: "",
    label: "Pillars",
    description: "One system, built in sequence",
  },
];

export default function Counters() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section
      style={{ padding: "120px 48px", background: "var(--bg-secondary)" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "var(--border)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg)",
                padding: "60px 48px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(56px, 7vw, 96px)",
                  fontWeight: 300,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  color: "var(--text)",
                }}
              >
                <CountUp
                  end={stat.value}
                  suffix={stat.suffix}
                  duration={2000}
                />
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--text)",
                  letterSpacing: "0.02em",
                }}
              >
                {stat.label}
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  color: "var(--text-tertiary)",
                }}
              >
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
