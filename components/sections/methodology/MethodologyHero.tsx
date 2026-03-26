'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MethodologyHero() {
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
      <section style={{ padding: '96px 24px 48px', background: 'var(--bg)' }}>
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600,
          letterSpacing: '0.12em', textTransform: 'uppercase' as const,
          color: 'var(--purple)', display: 'block', marginBottom: '16px',
        }}>
          Our Method
        </span>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(48px, 13vw, 64px)',
          fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.02,
          color: 'var(--text)', marginBottom: '16px',
        }}>
          Four pillars.<br />
          <span style={{ color: 'var(--purple)', fontStyle: 'italic' }}>One sequence.</span>
        </h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
          color: 'var(--text-secondary)', lineHeight: 1.75,
          marginBottom: '32px',
        }}>
          Acquire. Convert. Retain. Scale. In that order — always. Skipping steps is how brands stall.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link href='/contact' style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 500,
            color: '#FAFAFA', background: 'var(--purple)',
            padding: '15px 28px', borderRadius: '100px',
            textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1.5px solid var(--purple)',
          }}>
            Book Free Audit
          </Link>
          <Link href='/work' style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 500,
            color: 'var(--text)', background: 'transparent',
            padding: '15px 28px', borderRadius: '100px',
            textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1.5px solid var(--border-strong)',
          }}>
            See the results
          </Link>
        </div>

        {/* Four pillars quick-list */}
        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '0', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden' }}>
          {['Acquire', 'Convert', 'Retain', 'Scale'].map((p, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              padding: '16px 20px',
              borderTop: i > 0 ? '1px solid var(--border)' : 'none',
              background: 'var(--surface)',
            }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--purple)', minWidth: '18px' }}>0{i + 1}</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 500, color: 'var(--text)' }}>{p}</span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ── Desktop (matches original inline section) ─────────────────────────────
  return (
    <section style={{ padding: 'clamp(90px, 12vw, 160px) clamp(20px, 5vw, 80px) clamp(40px, 6vw, 100px)', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple)', display: 'block', marginBottom: '20px' }}>
          Our Method
        </span>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(56px, 8vw, 112px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--text)', marginBottom: '28px' }}>
          Four pillars.<br />
          <span style={{ color: 'var(--purple)', fontStyle: 'italic' }}>One sequence.</span>
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '520px', marginBottom: '48px' }}>
          Every Thryve engagement follows the same order. Acquire first. Then Convert. Then Retain. Then Scale. Skipping steps is how brands stall. The sequence exists for a reason.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '1px', background: 'var(--text-tertiary)' }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Scroll to go deeper
          </span>
        </div>
      </div>
    </section>
  );
}
