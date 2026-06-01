'use client';
import { useState, useEffect } from 'react';

export default function MethodologyFooterCTA() {
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
      <section style={{ padding: '56px 24px 64px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600,
          letterSpacing: '0.12em', textTransform: 'uppercase' as const,
          color: 'var(--purple)', display: 'block', marginBottom: '14px',
        }}>
          Start now
        </span>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(36px, 10vw, 52px)',
          fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.08,
          color: 'var(--text)', marginBottom: '14px',
        }}>
          Ready to build<br />
          <span style={{ color: 'var(--purple)', fontStyle: 'italic' }}>your system?</span>
        </h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '13px',
          color: 'var(--text-tertiary)', lineHeight: 1.75, marginBottom: '32px',
        }}>
          Start with a free 15-minute audit. We will tell you exactly which pillar to fix first.
        </p>
        <a href='/contact' style={{
          display: 'block', textAlign: 'center',
          fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 500,
          color: '#FAFAFA', background: 'var(--purple)',
          padding: '16px 28px', borderRadius: '100px',
          textDecoration: 'none', border: '1.5px solid var(--purple)',
        }}>
          Book Free Audit →
        </a>
      </section>
    );
  }

  // ── Desktop (matches original inline section) ─────────────────────────────
  return (
    <section style={{ padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 80px)', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px' }}>
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--text)', marginBottom: '12px' }}>
            Ready to build<br />
            <span style={{ color: 'var(--purple)', fontStyle: 'italic' }}>your system?</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'var(--text-tertiary)', lineHeight: 1.7, maxWidth: '400px' }}>
            Start with a free 15-minute audit. We will tell you exactly which pillar to fix first.
          </p>
        </div>
        <a href='/contact' style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 500, color: '#FAFAFA', background: 'var(--purple)', padding: '16px 36px', borderRadius: '100px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1.5px solid var(--purple)', transition: 'all 0.3s ease', whiteSpace: 'nowrap' }}>
          Book Free Audit →
        </a>
      </div>
    </section>
  );
}
