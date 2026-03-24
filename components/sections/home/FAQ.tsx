'use client';
import { useState, useEffect } from 'react';
const faqs = [
  {
    q: "How is Thryve different from a regular marketing agency?",
    a: "Most agencies run your campaigns. We build your revenue system. The difference is that when you stop paying an agency, the results stop too. When you work with Thryve, the system we build keeps working — SOPs, flows, dashboards, frameworks. It runs without us.",
  },
  {
    q: "What does the engagement actually look like?",
    a: "It starts with a free audit call where we diagnose your biggest leak. If we're a fit, we run a a pilot month to validate the approach, then move into a 3-month retainer. Total engagement is a full engagement. Every deliverable is documented in your Notion client dashboard.",
  },
  {
    q: "What business models do you work with?",
    a: "We work across D2C, B2B, B2C, and C2C. The four-pillar system adapts to each model — the principles of acquisition, conversion, retention, and scaling apply universally, but the tactics differ. We've built systems for skincare brands, SaaS companies, fitness platforms, and marketplaces.",
  },
  {
    q: "Do I need a minimum revenue to work with you?",
    a: "We recommend having at least Rs 3-5L in monthly revenue before engaging, so there's enough data to optimise against. Pre-revenue founders are better served by our free 90-Day Brand Launch Playbook first.",
  },
  {
    q: "What results can I realistically expect?",
    a: "By end of Month 1: CAC reduced by 20-40%, ROAS improving. By Month 2: CVR up 0.5-1%. By Month 3: repeat rate climbing, email revenue active. By Month 4: the system runs without you. These are averages — your results depend on your baseline.",
  },
  {
    q: "What happens after the 4 months?",
    a: "You own everything. All SOPs, flows, frameworks, dashboards — fully documented and handed over. Most clients continue on a lighter monthly retainer for ongoing optimisation. Some just take the system and run it themselves. Both outcomes are a win.",
  },
];

export default function FAQ() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      style={{
        padding: "clamp(60px, 8vw, 120px) clamp(20px, 5vw, 80px)",
        background: "var(--bg-secondary)",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ marginBottom: "64px" }}>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--purple)",
              display: "block",
              marginBottom: "12px",
            }}
          >
            Questions
          </span>
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
            Everything you want to know.
          </h2>
        </div>

        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: "1px solid var(--border)" }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: "100%",
                padding: "28px 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                gap: "24px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(18px, 2vw, 26px)",
                  fontWeight: 500,
                  color: "var(--text)",
                  lineHeight: 1.3,
                }}
              >
                {faq.q}
              </span>
              <span
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "1px solid var(--border-strong)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  color: open === i ? "var(--purple)" : "var(--text-secondary)",
                  transform: open === i ? "rotate(45deg)" : "none",
                  transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                  flexShrink: 0,
                }}
              >
                +
              </span>
            </button>
            <div
              style={{
                maxHeight: open === i ? "400px" : "0",
                overflow: "hidden",
                transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1)",
                opacity: open === i ? 1 : 0,
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "15px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                  paddingBottom: "28px",
                  maxWidth: "700px",
                }}
              >
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
