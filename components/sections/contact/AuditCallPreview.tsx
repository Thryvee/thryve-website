'use client';
import { useState, useEffect } from 'react';
export default function AuditCallPreview() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const steps = [
    { time: '0–3 min', title: 'Context', body: 'You tell us your business model, current revenue, and what you have tried so far.' },
    { time: '3–10 min', title: 'Diagnosis', body: 'We audit your acquisition, conversion, retention, and scaling live on the call. No prep needed from you.' },
    { time: '10–15 min', title: 'Recommendation', body: 'We tell you exactly which pillar to fix first and what the fix looks like. You leave with a clear action — whether we work together or not.' },
  ];

  return (
    <div style={{ padding: isMobile ? '40px 20px' : '48px 80px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple)', display: 'block', marginBottom: '8px' }}>What happens on the call</span>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--text)', lineHeight: 1.1 }}>
              15 minutes. Minute by minute.
            </h3>
          </div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--text-tertiary)' }}>No prep needed from you</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '12px' : '16px' }}>
          {steps.map((step, i) => (
            <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: i === 1 ? 'var(--purple)' : 'var(--border)' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple)', display: 'block', marginBottom: '12px' }}>
                {step.time}
              </span>
              <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 500, color: 'var(--text)', marginBottom: '10px' }}>
                {step.title}
              </h4>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
