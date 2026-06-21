'use client';
import { useState, useEffect } from 'react';
import { caseStudies } from '@/data/caseStudies';

const filters = ['All', 'D2C', 'B2B', 'B2C', 'C2C'];

const CARD_COLORS = [
  { bg: '#1a0533', accent: '#a855f7' },
  { bg: '#0a2a1a', accent: '#22c55e' },
  { bg: '#0f172a', accent: '#6366f1' },
  { bg: '#1c0a00', accent: '#f97316' },
  { bg: '#0a1a2a', accent: '#38bdf8' },
  { bg: '#1a1a0a', accent: '#eab308' },
];

export default function Results() {
  // null prevents desktop content flash on mobile during hydration
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? caseStudies : caseStudies.filter(c => c.model === active);

  // Mobile carousel state — must be declared unconditionally (hooks rules)
  const [activeCard, setActiveCard] = useState(0);
  const [cardVisible, setCardVisible] = useState(true);

  // Reset carousel when filter changes
  useEffect(() => {
    setActiveCard(0);
    setCardVisible(true);
  }, [active]);

  // Auto-cycle every 3s on mobile
  useEffect(() => {
    if (!isMobile) return;
    let pending: ReturnType<typeof setTimeout> | null = null;
    const id = setInterval(() => {
      setCardVisible(false);
      pending = setTimeout(() => {
        setActiveCard(i => (i + 1) % filtered.length);
        setCardVisible(true);
        pending = null;
      }, 320);
    }, 3000);
    return () => {
      clearInterval(id);
      if (pending) clearTimeout(pending);
    };
  }, [isMobile, filtered.length]);

  // Placeholder while device type not yet known
  if (isMobile === null) {
    return <section style={{ padding: '60px 20px', background: '#0a0a0a', minHeight: '160px' }} />;
  }

  // ── Mobile: auto-cycling single-card carousel ─────────────────────────────
  if (isMobile) {
    const cs = filtered[Math.min(activeCard, filtered.length - 1)];
    const color = CARD_COLORS[Math.min(activeCard, filtered.length - 1) % CARD_COLORS.length];

    return (
      <section style={{ padding: '56px 0 48px', background: '#0a0a0a' }}>
        {/* Header */}
        <div style={{ padding: '0 24px', marginBottom: '32px' }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.35)', display: 'block', marginBottom: '10px' }}>Results</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(34px, 9vw, 48px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.05, color: '#f5f5f5' }}>
            Numbers that speak.
          </h2>
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', padding: '0 24px', marginBottom: '28px' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActive(f)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' as const, padding: '7px 14px', borderRadius: '100px', border: '1px solid', borderColor: active === f ? 'var(--purple)' : 'rgba(255,255,255,0.15)', background: active === f ? 'var(--purple)' : 'transparent', color: active === f ? '#FAFAFA' : 'rgba(255,255,255,0.45)', cursor: 'pointer' }}>
              {f}
            </button>
          ))}
        </div>

        {/* Progress dots */}
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '20px' }}>
          {filtered.map((_, i) => (
            <div key={i} style={{ width: i === activeCard ? '20px' : '6px', height: '6px', borderRadius: '3px', background: i === activeCard ? color.accent : 'rgba(255,255,255,0.2)', transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)' }} />
          ))}
        </div>

        {/* Card */}
        <div style={{ padding: '0 24px' }}>
          <div style={{
            background: color.bg,
            borderRadius: '20px',
            padding: '28px 24px',
            border: `1px solid ${color.accent}22`,
            boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
            position: 'relative',
            overflow: 'hidden',
            opacity: cardVisible ? 1 : 0,
            transform: cardVisible ? 'translateX(0)' : 'translateX(16px)',
            transition: 'opacity 0.32s cubic-bezier(0.16,1,0.3,1), transform 0.32s cubic-bezier(0.16,1,0.3,1)',
          }}>
            <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: `linear-gradient(90deg, transparent, ${color.accent}, transparent)` }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
              <div>
                <span style={{ display: 'inline-block', fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, padding: '4px 10px', borderRadius: '100px', background: `${color.accent}22`, color: color.accent, marginBottom: '8px' }}>{cs.model}</span>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 500, color: '#f5f5f5', letterSpacing: '-0.01em', lineHeight: 1.2, margin: 0 }}>{cs.label}</p>
              </div>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em', textTransform: 'uppercase' as const, whiteSpace: 'nowrap', marginLeft: '8px' }}>{cs.duration}</span>
            </div>

            {/* Results 2x2 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '18px' }}>
              {cs.results.map((r, i) => (
                <div key={i} style={{ padding: '12px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '8px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.3)', margin: '0 0 6px' }}>{r.metric}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', color: 'rgba(255,255,255,0.22)', textDecoration: 'line-through' }}>{r.before}</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 600, color: color.accent }}>{r.after}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div style={{ paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', fontStyle: 'italic', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, margin: 0 }}>'{cs.quote}'</p>
            </div>
          </div>
        </div>

        {/* Counter */}
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: '20px' }}>
          {activeCard + 1} / {filtered.length}
        </p>
      </section>
    );
  }

  // ── Desktop (unchanged) ───────────────────────────────────────────────────
  return (
    <section className="m-results-section" style={{ padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 48px)', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <span className='tag tag-purple' style={{ marginBottom: '16px', display: 'inline-flex' }}>Results</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.05, color: 'var(--text)' }}>
              Numbers that speak.
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {filters.map(f => (
              <button key={f} onClick={() => setActive(f)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '8px 16px', borderRadius: '100px', border: '1px solid', borderColor: active === f ? 'var(--purple)' : 'var(--border)', background: active === f ? 'var(--purple)' : 'transparent', color: active === f ? '#FAFAFA' : 'var(--text-secondary)', transition: 'all 0.2s ease', cursor: 'pointer' }}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="m-results-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(12px, 3vw, 24px)' }}>
          {filtered.map((cs) => (
            <div key={cs.id} className='card-hover' style={{ border: '1px solid var(--border)', borderRadius: '16px', padding: '40px', background: 'var(--surface)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                  <span className='tag tag-purple' style={{ marginBottom: '12px', display: 'inline-flex' }}>{cs.model}</span>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 500, color: 'var(--text)', letterSpacing: '-0.01em' }}>{cs.label}</p>
                </div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'var(--text-tertiary)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{cs.duration}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }}>
                {cs.results.map((r, i) => (
                  <div key={i} style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '8px' }}>{r.metric}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', color: 'var(--text-tertiary)', textDecoration: 'line-through' }}>{r.before}</span>
                      <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>to</span>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 600, color: 'var(--purple)' }}>{r.after}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.5 }}>'{cs.quote}'</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
