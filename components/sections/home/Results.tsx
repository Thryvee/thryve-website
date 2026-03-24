'use client';
import { useState, useEffect, useRef } from 'react';
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

function MobileCardDeck({ cards }: { cards: typeof caseStudies }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = -rect.top;
      const sectionHeight = rect.height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, sectionTop / sectionHeight));
      const index = Math.min(cards.length - 1, Math.floor(progress * cards.length));
      setActiveIndex(index);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [cards.length]);

  return (
    <div ref={sectionRef} style={{ height: `${cards.length * 100}vh`, position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 20px 80px' }}>
        <div style={{ display: 'flex', gap: '6px', marginBottom: '24px', zIndex: 10 }}>
          {cards.map((_, i) => (
            <div key={i} style={{ width: i === activeIndex ? '20px' : '6px', height: '6px', borderRadius: '3px', background: i === activeIndex ? CARD_COLORS[i % CARD_COLORS.length].accent : 'rgba(255,255,255,0.25)', transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }} />
          ))}
        </div>
        <div style={{ position: 'relative', width: '100%', height: '460px' }}>
          {cards.map((cs, i) => {
            const offset = i - activeIndex;
            const color = CARD_COLORS[i % CARD_COLORS.length];
            const isActive = offset === 0;
            const isBehind = offset > 0;
            const isGone = offset < 0;
            const stackOffset = Math.min(offset, 3);
            const translateY = isGone ? -120 : isBehind ? stackOffset * 14 : 0;
            const scale = isGone ? 0.7 : isBehind ? 1 - stackOffset * 0.06 : 1;
            const rotateX = isBehind ? stackOffset * 2 : 0;
            const zIndex = isGone ? 0 : cards.length - Math.abs(offset);
            const opacity = isGone ? 0 : isBehind && offset > 3 ? 0 : 1;
            return (
              <div key={cs.id} style={{ position: 'absolute', top: 0, left: 0, right: 0, borderRadius: '24px', background: color.bg, border: `1px solid ${color.accent}22`, padding: '28px 24px', zIndex, opacity, transform: `translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg)`, transformOrigin: 'top center', transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)', willChange: 'transform', backfaceVisibility: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div>
                    <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '100px', background: `${color.accent}22`, color: color.accent, marginBottom: '10px' }}>{cs.model}</span>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 500, color: '#f5f5f5', letterSpacing: '-0.01em', lineHeight: 1.2, margin: 0 }}>{cs.label}</p>
                  </div>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap', marginLeft: '8px' }}>{cs.duration}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '20px' }}>
                  {cs.results.map((r, idx) => (
                    <div key={idx} style={{ padding: '14px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', margin: '0 0 8px' }}>{r.metric}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: 'rgba(255,255,255,0.25)', textDecoration: 'line-through' }}>{r.before}</span>
                        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>→</span>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 600, color: color.accent }}>{r.after}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', fontStyle: 'italic', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, margin: 0 }}>'{cs.quote}'</p>
                </div>
                {isActive && <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: `linear-gradient(90deg, transparent, ${color.accent}, transparent)`, borderRadius: '1px' }} />}
              </div>
            );
          })}
        </div>
        {activeIndex < cards.length - 1 && (
          <p style={{ position: 'absolute', bottom: '24px', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: 0 }}>scroll for more</p>
        )}
      </div>
    </div>
  );
}

export default function Results() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? caseStudies : caseStudies.filter(c => c.model === active);

  return (
    <section className="m-results-section" style={{ padding: isMobile ? 'clamp(60px, 8vw, 120px) 0' : 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 48px)', background: isMobile ? '#0a0a0a' : 'var(--bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px', flexWrap: 'wrap', gap: '24px', padding: isMobile ? '0 20px' : 0 }}>
          <div>
            <span className='tag tag-purple' style={{ marginBottom: '16px', display: 'inline-flex' }}>Results</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.05, color: isMobile ? '#f5f5f5' : 'var(--text)' }}>
              Numbers that speak.
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {filters.map(f => (
              <button key={f} onClick={() => setActive(f)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '8px 16px', borderRadius: '100px', border: '1px solid', borderColor: active === f ? 'var(--purple)' : 'var(--border)', background: active === f ? 'var(--purple)' : 'transparent', color: active === f ? '#FAFAFA' : isMobile ? 'rgba(255,255,255,0.5)' : 'var(--text-secondary)', transition: 'all 0.2s ease', cursor: 'pointer' }}>
                {f}
              </button>
            ))}
          </div>
        </div>
        {isMobile ? (
          <MobileCardDeck cards={filtered} />
        ) : (
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
        )}
      </div>
    </section>
  );
}
