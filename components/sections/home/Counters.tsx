"use client";
import { useState, useEffect, useRef } from 'react';
import CountUp from "@/components/ui/CountUp";

const stats = [
  { value: 2, suffix: "x", label: "Minimum ROAS", description: "Average across all client campaigns" },
  { value: 40, suffix: "%", label: "CAC Reduction", description: "By end of first month" },
  { value: 4, suffix: "", label: "Pillars", description: "One system, built in sequence" },
];

export default function Counters() {
  // null = not yet determined (prevents desktop CountUp flash on mobile)
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const [activeStat, setActiveStat] = useState(0);
  const [statVisible, setStatVisible] = useState(true);

  // Auto-cycle every 3s on mobile only
  useEffect(() => {
    if (isMobile !== true) return; // only when definitely mobile
    let pending: ReturnType<typeof setTimeout> | null = null;
    const id = setInterval(() => {
      setStatVisible(false);
      pending = setTimeout(() => {
        setActiveStat(i => (i + 1) % stats.length);
        setStatVisible(true);
        pending = null;
      }, 320);
    }, 3000);
    return () => {
      clearInterval(id);
      if (pending) clearTimeout(pending);
    };
  }, [isMobile]);

  // ── Not yet determined: invisible placeholder matching section height ──────
  if (isMobile === null) {
    return <section style={{ padding: "48px 24px 40px", background: "var(--bg)", minHeight: "180px" }} />;
  }

  // ── Mobile: auto-cycling carousel ─────────────────────────────────────────
  if (isMobile === true) {
    const s = stats[activeStat];
    return (
      <section style={{ padding: "48px 24px 40px", background: "var(--bg)" }}>
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 600,
          letterSpacing: "0.12em", textTransform: "uppercase" as const,
          color: "var(--purple)", display: "block", marginBottom: "24px",
        }}>
          Numbers That Speak
        </span>

        <div style={{
          padding: "36px 28px", background: "var(--surface)", borderRadius: "20px",
          border: "1px solid var(--border)", boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          opacity: statVisible ? 1 : 0,
          transform: statVisible ? "translateX(0)" : "translateX(14px)",
          transition: "opacity 0.32s cubic-bezier(0.16,1,0.3,1), transform 0.32s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(72px, 20vw, 96px)", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1, color: "var(--text)" }}>
            {s.value}{s.suffix}
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontWeight: 600, color: "var(--text)", letterSpacing: "0.02em", marginTop: "12px" }}>
            {s.label}
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "var(--text-tertiary)", marginTop: "6px", lineHeight: 1.6 }}>
            {s.description}
          </p>
        </div>

        <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginTop: "20px" }}>
          {stats.map((_, i) => (
            <div key={i} style={{
              width: i === activeStat ? "20px" : "6px", height: "6px", borderRadius: "3px",
              background: i === activeStat ? "var(--purple)" : "var(--border-strong)",
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
            }} />
          ))}
        </div>
      </section>
    );
  }

  // ── Desktop (unchanged) ───────────────────────────────────────────────────
  return (
    <section style={{ padding: "120px 48px", background: "var(--bg-secondary)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px", background: "var(--border)",
          border: "1px solid var(--border)", borderRadius: "16px", overflow: "hidden",
        }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ background: "var(--bg)", padding: "60px 48px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(56px, 7vw, 96px)", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1, color: "var(--text)" }}>
                <CountUp end={stat.value} suffix={stat.suffix} duration={2000} />
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "var(--text)", letterSpacing: "0.02em" }}>
                {stat.label}
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "var(--text-tertiary)" }}>
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
