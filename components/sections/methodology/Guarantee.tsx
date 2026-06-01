'use client';
import { useEffect, useRef, useState } from 'react';

const cards = [
  {
    number: '01',
    title: 'The pilot engagement',
    body: 'One focused month. We pick the single highest-leverage thing to fix — usually acquisition or conversion — and fix it. You see real results before committing to anything more.',
  },
  {
    number: '02',
    title: 'If results are there',
    body: 'We move into the full engagement — a monthly retainer for 3 months. Four pillars. Full system. Everything documented and handed over at the end.',
  },
  {
    number: '03',
    title: 'If results are not',
    body: 'We stop. No awkward conversation needed. The pilot is designed to surface whether we are a fit — for both of us. We would rather stop early than string you along.',
  },
];

export default function Guarantee() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(-1);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(scrolled / scrollable, 1));
      // 3 cards — each takes 1/3 of scroll
      const index = Math.floor(progress * 3.5);
      setActiveCard(Math.min(index, 2));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={sectionRef} className="m-guar-outer" style={{ height: isMobile ? 'auto' : '400vh', position: 'relative' }}>
      <div className="m-guar-sticky" style={{ position: isMobile ? 'relative' : 'sticky', top: 0, height: isMobile ? 'auto' : '100vh',
        background: '#0A0A0A', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>

        {/* Background watermark */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(100px, 16vw, 220px)',
          fontWeight: 700, color: 'rgba(255,255,255,0.025)',
          whiteSpace: 'nowrap', userSelect: 'none', pointerEvents: 'none',
          letterSpacing: '-0.04em',
        }}>
          GUARANTEE
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '40px 24px 48px' : '0 clamp(20px, 5vw, 80px)', width: '100%', position: 'relative', zIndex: 1, paddingTop: isMobile ? undefined : '20px' }}>

          {/* Header */}
          <div style={{ marginBottom: '36px' }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple)', display: 'block', marginBottom: '16px' }}>
              The Guarantee
            </span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 4vw, 60px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#FAFAFA', maxWidth: '700px' }}>
              Results in 30 days.{' '}
              <span style={{ color: 'var(--purple)', fontStyle: 'italic' }}>Or we stop.</span>
            </h2>
          </div>

          {/* Cards row */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px', perspective: '1200px' }}>
            {cards.map((card, i) => {
              const isActive = isMobile ? true : i <= activeCard;
              const isCurrent = isMobile ? false : i === activeCard;
              return (
                <div key={i}
                  onMouseMove={e => {
                    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
                    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
                    (e.currentTarget as HTMLElement).style.transform = isActive ? `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)` : '';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = isActive ? (isCurrent ? 'translateY(0) scale(1) rotateX(0deg) rotateY(0deg)' : 'translateY(0) scale(0.97) rotateX(2deg)') : 'translateY(60px) scale(0.92) rotateX(12deg)';
                  }}
                  style={{
                  background: isActive ? (isCurrent ? 'rgba(123,47,190,0.12)' : 'rgba(255,255,255,0.04)') : 'rgba(255,255,255,0.02)',
                  border: '1px solid',
                  borderColor: isActive ? (isCurrent ? 'rgba(123,47,190,0.4)' : 'rgba(255,255,255,0.1)') : 'rgba(255,255,255,0.04)',
                  borderRadius: '20px',
                  padding: '28px 28px',
                  transform: isActive ? (isCurrent ? 'translateY(0) scale(1) rotateX(0deg) rotateY(0deg)' : 'translateY(0) scale(0.97) rotateX(2deg)') : 'translateY(60px) scale(0.92) rotateX(12deg)',
                  transformOrigin: 'center bottom',
                  opacity: isActive ? 1 : 0,
                  transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
                  boxShadow: isCurrent ? '0 0 60px rgba(123,47,190,0.15)' : 'none',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {isCurrent && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--purple), transparent)' }} />
                  )}
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: isCurrent ? 'var(--purple)' : 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '20px', transition: 'color 0.5s ease' }}>
                    {card.number}
                  </span>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(18px, 2vw, 26px)', fontWeight: 500, color: '#FAFAFA', marginBottom: '16px', lineHeight: 1.2 }}>
                    {card.title}
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>
                    {card.body}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Progress dots */}
          {!isMobile && (
            <div style={{ display: 'flex', gap: '8px', marginTop: '28px' }}>
              {cards.map((_, i) => (
                <div key={i} style={{
                  width: i === activeCard ? '24px' : '6px',
                  height: '6px', borderRadius: '3px',
                  background: i <= activeCard ? 'var(--purple)' : 'rgba(255,255,255,0.15)',
                  transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                }} />
              ))}
            </div>
          )}

          {/* Bottom quote */}
          <div style={{
            marginTop: '28px', paddingTop: '28px',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', flexWrap: 'wrap', gap: '24px',
            opacity: isMobile || activeCard >= 2 ? 1 : 0.15,
            transform: isMobile || activeCard >= 2 ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s',
          }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(14px, 1.6vw, 19px)', fontStyle: 'italic', color: 'rgba(255,255,255,0.4)', maxWidth: '600px', lineHeight: 1.5 }}>
              "The pilot is not a trial. It is a proof of concept. If it works, you will know. If it does not, you will know that too."
            </p>
            <a href='/contact' style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500, color: '#FAFAFA', background: 'var(--purple)', padding: '14px 28px', borderRadius: '100px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', border: '1.5px solid var(--purple)' }}>
              Start with the pilot →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
