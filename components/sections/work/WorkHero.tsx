'use client';
import { useState, useEffect } from 'react';

export default function WorkHero() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── Mobile ────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section style={{ padding: '96px 24px 40px', background: 'var(--bg)' }}>
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600,
          letterSpacing: '0.12em', textTransform: 'uppercase' as const,
          color: 'var(--purple)', display: 'block', marginBottom: '16px',
        }}>
          Results
        </span>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(44px, 12vw, 60px)',
          fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.05,
          color: 'var(--text)', marginBottom: '16px',
        }}>
          The numbers{' '}
          <span style={{ color: 'var(--purple)', fontStyle: 'italic' }}>don&apos;t lie.</span>
        </h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
          color: 'var(--text-secondary)', lineHeight: 1.7,
        }}>
          Four engagements. Four business models. Every number is real — no estimates, no agency math.
        </p>
      </section>
    );
  }

  // ── Desktop (matches original inline section) ─────────────────────────────
  return (
    <>
      <section style={{ padding: 'clamp(90px, 12vw, 160px) clamp(20px, 5vw, 80px) clamp(40px, 6vw, 100px)', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple)', display: 'block', marginBottom: '20px' }}>
            Results
          </span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(56px, 8vw, 112px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--text)', marginBottom: '28px', whiteSpace: 'nowrap' }}>
            The numbers <span style={{ color: 'var(--purple)', fontStyle: 'italic' }}>don&apos;t lie.</span>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '520px' }}>
            Four engagements. Four business models. Every number below is real — no estimates, no projections, no agency math.
          </p>
        </div>
      </section>
      <div style={{ background: 'var(--bg)', padding: '0 80px 60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '1px', background: 'var(--text-tertiary)' }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Scroll to explore results
          </span>
        </div>
      </div>
    </>
  );
}
