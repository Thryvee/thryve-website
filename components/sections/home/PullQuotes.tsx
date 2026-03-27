"use client";
import { useEffect, useRef, useState } from "react";

const quotes = [
  {
    text: "Scaling is not adding more budget. It is building the infrastructure that makes more budget safe to add.",
    attr: "The Scale Pillar",
  },
  {
    text: "A 1% CVR improvement at ₹10L/month is worth ₹1.2L per year. We find those percentage points and close them.",
    attr: "The Convert Pillar",
  },
  {
    text: "The cheapest customer is one you already have.",
    attr: "The Retain Pillar",
  },
];

function QuoteBlock({ text, attr, index }: { text: string; attr: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        padding: "48px 0",
        borderTop: "1px solid var(--border)",
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(24px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s`,
      }}
    >
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(22px, 3.5vw, 42px)",
        fontWeight: 500,
        letterSpacing: "-0.02em",
        lineHeight: 1.2,
        color: "var(--text)",
        marginBottom: "20px",
        maxWidth: "860px",
      }}>
        <span style={{ color: "var(--purple)", fontStyle: "italic", marginRight: "2px" }}>&ldquo;</span>
        {text}
        <span style={{ color: "var(--purple)", fontStyle: "italic", marginLeft: "2px" }}>&rdquo;</span>
      </p>
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--purple)",
      }}>
        — {attr}
      </span>
    </div>
  );
}

export default function PullQuotes() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section style={{ background: "var(--bg)", padding: isMobile ? "0 24px 48px" : "0 clamp(24px, 5vw, 80px) 80px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {quotes.map((q, i) => (
          <QuoteBlock key={i} text={q.text} attr={q.attr} index={i} />
        ))}
        <div style={{ height: "1px", background: "var(--border)" }} />
      </div>
    </section>
  );
}
