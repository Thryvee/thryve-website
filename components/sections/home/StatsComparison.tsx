"use client";
import { useEffect, useRef, useState } from "react";

const results = [
  {
    brand: "D2C Skincare, Delhi",
    metric: "ROAS",
    before: "0.9x",
    after: "3.1x",
    improvement: "+244%",
    label: "Return on Ad Spend",
  },
  {
    brand: "D2C Skincare, Delhi",
    metric: "CAC",
    before: "Rs 847",
    after: "Rs 312",
    improvement: "-63%",
    label: "Cost to Acquire",
  },
  {
    brand: "B2B SaaS, Bangalore",
    metric: "Pipeline",
    before: "Rs 0",
    after: "Rs 18L",
    improvement: "+∞",
    label: "Monthly Pipeline",
  },
  {
    brand: "B2B SaaS, Bangalore",
    metric: "Sales Cycle",
    before: "67 days",
    after: "21 days",
    improvement: "-69%",
    label: "Days to Close",
  },
  {
    brand: "B2C Fitness, Mumbai",
    metric: "CVR",
    before: "0.8%",
    after: "2.4%",
    improvement: "+200%",
    label: "Conversion Rate",
  },
  {
    brand: "B2C Fitness, Mumbai",
    metric: "Email Rev",
    before: "Rs 0",
    after: "Rs 3.8L",
    improvement: "+∞",
    label: "Monthly Email Revenue",
  },
  {
    brand: "C2C Marketplace, Hyd",
    metric: "LTV",
    before: "Rs 1,200",
    after: "Rs 4,800",
    improvement: "+300%",
    label: "Lifetime Value",
  },
  {
    brand: "C2C Marketplace, Hyd",
    metric: "Churn",
    before: "34%",
    after: "9%",
    improvement: "-74%",
    label: "Monthly Churn Rate",
  },
  {
    brand: "D2C Wellness, Pune",
    metric: "ROAS",
    before: "1.1x",
    after: "2.8x",
    improvement: "+155%",
    label: "Return on Ad Spend",
  },
  {
    brand: "B2B Logistics, Delhi",
    metric: "Pipeline",
    before: "Rs 2L",
    after: "Rs 24L",
    improvement: "+1100%",
    label: "Monthly Pipeline",
  },
];

export default function StatsComparison() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Mobile carousel state (hooks must be unconditional)
  const [activeCard, setActiveCard] = useState(0);
  const [cardVisible, setCardVisible] = useState(true);

  useEffect(() => {
    if (!isMobile) return;
    const id = setInterval(() => {
      setCardVisible(false);
      const t = setTimeout(() => {
        setActiveCard(i => (i + 1) % results.length);
        setCardVisible(true);
      }, 350);
      return () => clearTimeout(t);
    }, 2200);
    return () => clearInterval(id);
  }, [isMobile]);

  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(scrolled / scrollable, 1));
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cardW = 260;
  const cardGap = 16;
  const total = results.length;

  if (isMobile) {
    const r = results[activeCard];
    return (
      <div style={{ background: "#0A0A0A", padding: "56px 24px 48px" }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--purple)", display: "block", marginBottom: "12px" }}>
          The Difference
        </span>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 9vw, 48px)", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.05, color: "#FAFAFA", marginBottom: "8px" }}>
          Before Thryve.{" "}
          <span style={{ color: "var(--purple)", fontStyle: "italic" }}>After Thryve.</span>
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: "36px" }}>
          Real numbers from real engagements. No estimates, no projections.
        </p>

        {/* Single card carousel */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          borderRadius: "20px",
          padding: "32px 28px",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
          opacity: cardVisible ? 1 : 0,
          transform: cardVisible ? "translateX(0) scale(1)" : "translateX(20px) scale(0.98)",
          transition: "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(250,250,250,0.35)", marginBottom: "20px" }}>
            {r.brand} · {r.metric}
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(250,250,250,0.25)", marginBottom: "20px", letterSpacing: "0.02em" }}>{r.label}</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "16px" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "rgba(250,250,250,0.2)", textDecoration: "line-through" }}>{r.before}</span>
            <span style={{ fontSize: "11px", color: "rgba(250,250,250,0.15)" }}>→</span>
          </div>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(52px, 14vw, 72px)", fontWeight: 500, color: "#FAFAFA", lineHeight: 1, letterSpacing: "-0.03em", display: "block", marginBottom: "20px" }}>
            {r.after}
          </span>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(123,47,190,0.2)", border: "1px solid rgba(123,47,190,0.35)", borderRadius: "100px", padding: "6px 14px" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--purple)", display: "inline-block" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 700, color: "var(--purple)" }}>{r.improvement}</span>
          </div>
        </div>

        {/* Progress dots */}
        <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginTop: "20px" }}>
          {results.map((_, i) => (
            <div key={i} style={{
              width: i === activeCard ? "20px" : "5px",
              height: "5px", borderRadius: "3px",
              background: i === activeCard ? "var(--purple)" : "rgba(255,255,255,0.15)",
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
            }} />
          ))}
        </div>

        {/* Counter */}
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.2)", textAlign: "center" as const, marginTop: "10px" }}>
          {activeCard + 1} / {results.length}
        </p>
      </div>
    );
  }

  return (
    <div ref={sectionRef} style={{ height: "500vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          background: "var(--bg)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header — tight to top */}
        <div style={{ padding: "80px 80px 40px", flexShrink: 0 }}>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--purple)",
              display: "block",
              marginBottom: "10px",
            }}
          >
            The Difference
          </span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                color: "var(--text)",
              }}
            >
              Before Thryve.{" "}
              <span style={{ color: "var(--purple)", fontStyle: "italic" }}>
                After Thryve.
              </span>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "15px",
                color: "var(--text-secondary)",
                marginTop: "16px",
                lineHeight: 1.7,
                maxWidth: "520px",
              }}
            >
              Real numbers from real engagements. Every metric below is from an
              actual client — no estimates, no projections, no agency math.
            </p>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                color: "var(--text-tertiary)",
              }}
            >
              {Math.round(progress * total)} / {total}
            </span>
          </div>
        </div>

        {/* Cards stage — perspective container */}
        <div
          style={{
            flex: 1,
            position: "relative",
            perspective: "1400px",
            perspectiveOrigin: "50% 100%",
            overflow: "hidden",
          }}
        >
          {/* All cards in a row, following the same arc together */}
          <div
            style={{
              position: "absolute",
              bottom: "60px",
              left: "50%",
              display: "flex",
              gap: `${cardGap}px`,
              // The whole row translates: starts at right, ends at left
              transform: `translateX(calc(-50% + ${(0.5 - progress) * 160}vw)) translateZ(0) rotateY(${(0.5 - progress) * 18}deg) rotateX(${Math.sin(progress * Math.PI) * 8}deg)`,
              transition: "transform 0.08s linear",
              transformOrigin: "center bottom",
              willChange: "transform",
            }}
          >
            {results.map((r, i) => {
              // Each card has a slight individual arc offset for the fan effect
              const offset = i - total / 2;
              const cardRotY = offset * 2.5;
              const cardRotX = -Math.abs(offset) * 0.8;
              const cardZ = -Math.abs(offset) * 20;

              return (
                <div
                  key={i}
                  style={{
                    width: `${cardW}px`,
                    flexShrink: 0,
                    transform: `rotateY(${cardRotY}deg) rotateX(${cardRotX}deg) translateZ(${cardZ}px)`,
                    transformOrigin: "center bottom",
                  }}
                >
                  <div
                    style={{
                      background: "#0A0A0A",
                      borderRadius: "18px",
                      padding: "28px",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow:
                        "0 24px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
                      height: "300px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "8px",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "rgba(250,250,250,0.3)",
                          marginBottom: "16px",
                        }}
                      >
                        {r.brand}
                      </p>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "9px",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "rgba(250,250,250,0.4)",
                          marginBottom: "4px",
                        }}
                      >
                        {r.metric}
                      </p>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "9px",
                          color: "rgba(250,250,250,0.2)",
                          marginBottom: "16px",
                        }}
                      >
                        {r.label}
                      </p>
                    </div>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: "8px",
                          marginBottom: "6px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "16px",
                            color: "rgba(250,250,250,0.2)",
                            textDecoration: "line-through",
                          }}
                        >
                          {r.before}
                        </span>
                        <span
                          style={{
                            fontSize: "9px",
                            color: "rgba(250,250,250,0.15)",
                          }}
                        >
                          →
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "44px",
                          fontWeight: 500,
                          color: "#FAFAFA",
                          lineHeight: 1,
                          letterSpacing: "-0.02em",
                          display: "block",
                          marginBottom: "16px",
                        }}
                      >
                        {r.after}
                      </span>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          background: "rgba(123,47,190,0.2)",
                          border: "1px solid rgba(123,47,190,0.35)",
                          borderRadius: "100px",
                          padding: "4px 10px",
                        }}
                      >
                        <span
                          style={{
                            width: "4px",
                            height: "4px",
                            borderRadius: "50%",
                            background: "var(--purple)",
                            display: "inline-block",
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "var(--purple)",
                          }}
                        >
                          {r.improvement}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            height: "2px",
            background: "var(--border)",
            margin: "0 80px 32px",
            borderRadius: "1px",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              height: "100%",
              background: "var(--purple)",
              width: `${progress * 100}%`,
              transition: "width 0.08s linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}
