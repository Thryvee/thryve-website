'use client';
import { useState, useEffect } from 'react';

const faqs = [
  {
    q: 'Is the audit actually free?',
    a: 'Yes. No catch. It is a 15-minute call where we tell you exactly where your revenue system is leaking and what to fix first. If we are a fit, we will propose a pilot. If not, you still leave with a clear diagnosis.',
  },
  {
    q: 'What if we are not a fit?',
    a: 'We will tell you on the call. We only take on engagements where we are confident we can deliver 2x ROAS minimum by Month 1. If your business is pre-revenue or the timing is not right, we will point you to the right resources instead.',
  },
  {
    q: 'How fast do we start after the call?',
    a: 'If we proceed, you get a scoped proposal within 24 hours of the audit call. Pilot month starts within 7 days of sign-off. Month 1 results visible within 30 days.',
  },
  {
    q: 'What do I actually own at the end of the engagement?',
    a: 'Everything. Every SOP, email flow, campaign framework, KPI dashboard, and strategy document is fully documented and handed over to you permanently. When the engagement ends, the system runs without us. Most agencies take their work with them when they leave. We build things so you never need us again.',
  },
];

export default function ContactFAQ() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="m-contact-faq-section" style={{ background: 'var(--bg-secondary)', padding: 'clamp(60px, 10vw, 100px) 0', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 80px)', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: isMobile ? '28px' : 'clamp(32px, 6vw, 80px)', alignItems: 'start' }}>

        {/* Left */}
        <div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple)', display: 'block', marginBottom: '16px' }}>
            Before you submit
          </span>
          <h2 className="m-contact-faq-h2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--text)', marginBottom: '20px' }}>
            Quick answers to the questions everyone asks.
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'var(--text-tertiary)', lineHeight: 1.7 }}>
            If you have a question that is not here, email us directly at info@thhryve.com and we will respond within 24 hours.
          </p>
        </div>

        {/* Right — accordion */}
        <div>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--border)' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', padding: '22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '20px' }}
              >
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 500, color: 'var(--text)', lineHeight: 1.4 }}>
                  {faq.q}
                </span>
                <span style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  border: '1px solid var(--border-strong)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px', color: open === i ? 'var(--purple)' : 'var(--text-secondary)',
                  transform: open === i ? 'rotate(45deg)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                  flexShrink: 0,
                }}>+</span>
              </button>
              <div style={{ maxHeight: open === i ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1)', opacity: open === i ? 1 : 0 }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.75, paddingBottom: '22px' }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
