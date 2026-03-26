"use client";
import { useEffect, useRef, useState } from "react";

export default function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll(".s-word");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          words.forEach((word, i) => {
            const w = word as HTMLElement;
            setTimeout(() => {
              w.style.opacity = "1";
              w.style.transform = "translateY(0)";
            }, i * 60);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const text = "We build the revenue system most agencies only talk about.";
  const words = text.split(" ");

  return (
    <section style={{ padding: isMobile ? "56px 24px 48px" : "140px 48px", background: "var(--bg)" }}>
      <div style={{ maxWidth: isMobile ? "100%" : "1200px", margin: "0 auto" }}>
        <div ref={ref}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? "clamp(30px, 8vw, 44px)" : "clamp(40px, 6vw, 96px)",
              fontWeight: 500,
              lineHeight: isMobile ? 1.2 : 1.05,
              letterSpacing: "-0.025em",
              color: "var(--text)",
            }}
          >
            {words.map((word, i) => (
              <span
                key={i}
                className="s-word"
                style={{
                  display: "inline-block",
                  marginRight: "0.22em",
                  opacity: 0,
                  transform: "translateY(30px)",
                  transition:
                    "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
                  color: i > 5 ? "var(--purple)" : "var(--text)",
                }}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        <div
          style={{
            marginTop: isMobile ? "24px" : "48px",
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "14px" : "24px",
          }}
        >
          <div
            style={{
              width: isMobile ? "28px" : "48px",
              height: "1px",
              background: "var(--purple)",
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: isMobile ? "13px" : "15px",
              color: "var(--text-secondary)",
              letterSpacing: "0.01em",
              lineHeight: 1.7,
            }}
          >
            Acquisition. Conversion. Retention. Scaling. One system. Built in sequence.
          </p>
        </div>
      </div>
    </section>
  );
}
