'use client';
import { useEffect, useRef, useState } from 'react';

const pillars = [
  {
    number: '01', name: 'Acquire', color: '#9B5DE5',
    tagline: 'Lower your CAC.\nRaise your ROAS.',
    body: 'Every channel mapped. Every rupee tracked. Every creative tested against a system that compounds.',
    metric: '2x ROAS minimum',
    bg: 'linear-gradient(135deg, #2d1b4e 0%, #1a0533 100%)',
    border: 'rgba(155,93,229,0.25)',
  },
  {
    number: '02', name: 'Convert', color: '#4361EE',
    tagline: 'Fix the funnel\nbefore adding traffic.',
    body: 'A 1% CVR improvement at Rs 10L/month is worth Rs 1.2L per year. We find those points and close them.',
    metric: '0.5-1% CVR lift',
    bg: 'linear-gradient(135deg, #1a1a4e 0%, #0a0a2e 100%)',
    border: 'rgba(67,97,238,0.25)',
  },
  {
    number: '03', name: 'Retain', color: '#2DC653',
    tagline: 'The cheapest customer\nis one you already have.',
    body: 'Email flows, loyalty programmes, win-back campaigns, NPS systems. Stop the leak permanently.',
    metric: 'LTV:CAC above 3:1',
    bg: 'linear-gradient(135deg, #0d3320 0%, #001a10 100%)',
    border: 'rgba(45,198,83,0.25)',
  },
  {
    number: '04', name: 'Scale', color: '#F4A261',
    tagline: 'Build the system\nthat runs without you.',
    body: 'SOPs, KPI dashboards, hiring plans, constraint frameworks. Systems first. Spend second.',
    metric: 'Full independence',
    bg: 'linear-gradient(135deg, #3d2000 0%, #1a0f00 100%)',
    border: 'rgba(244,162,97,0.25)',
  },
];

export default function ProcessTimeline() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [headlineVisible, setHeadlineVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) setHeadlineVisible(true);
      const scrollable = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(scrolled / scrollable, 1));
      setProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const cardsIn = progress * (pillars.length + 0.5);

  // Card entrance positions — each from a different direction
  const origins = [
    { x: -120, y: 80, rx: 15, ry: -20 },   // 01: from bottom-left
    { x: 120, y: 80, rx: 15, ry: 20 },    // 02: from bottom-right
    { x: -120, y: -80, rx: -15, ry: -20 }, // 03: from top-left
    { x: 120, y: -80, rx: -15, ry: 20 },   // 04: from top-right
  ];

  // ── Mobile: hidden entirely ────────────────────────────────────────────────
  if (isMobile) return null;

  // ── Desktop (unchanged) ───────────────────────────────────────────────────
  return (
    <div ref={sectionRef} className="m-process-outer" style={{ height: '700vh', position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        background: '#0A0A0A',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        padding: '0 clamp(20px, 5vw, 80px)',
      }}>

        {/* Headline — left aligned, editorial layout */}
        <div style={{ width: '100%', maxWidth: '900px', marginBottom: '40px', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ overflow: 'hidden', marginBottom: '8px' }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(250,250,250,0.3)',
                display: 'inline-block',
                transform: headlineVisible ? 'translateY(0)' : 'translateY(100%)',
                opacity: headlineVisible ? 1 : 0,
                transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1) 0s',
              }}>
                The System
              </span>
            </div>
            <div style={{ overflow: 'hidden' }}>
              {'Four pillars.'.split(' ').map((word, i) => (
                <span key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(48px, 6vw, 88px)',
                  fontWeight: 500, letterSpacing: '-0.03em', color: '#FAFAFA',
                  lineHeight: 1,
                  display: 'inline-block', marginRight: '0.2em',
                  transform: headlineVisible ? 'translateY(0)' : 'translateY(110%)',
                  opacity: headlineVisible ? 1 : 0,
                  transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.08}s`,
                }}>
                  {word}
                </span>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'right', paddingBottom: '8px' }}>
            {'One sequence.\nNo skipping.'.split('\n').map((line, li) => (
              <div key={li} style={{ overflow: 'hidden' }}>
                {line.split(' ').map((word, i) => (
                  <span key={i} style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(20px, 2.2vw, 30px)',
                    fontWeight: 400, letterSpacing: '-0.01em',
                    color: 'rgba(255,255,255,0.25)', fontStyle: 'italic',
                    display: 'inline-block', marginRight: '0.22em',
                    transform: headlineVisible ? 'translateY(0)' : 'translateY(110%)',
                    opacity: headlineVisible ? 1 : 0,
                    transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.4 + li * 0.1 + i * 0.05}s`,
                  }}>
                    {word}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 2x2 Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: '14px',
          width: '900px',
          maxWidth: '900px',
          height: '460px',
          perspective: '1400px',
          perspectiveOrigin: '50% 50%',
        }}>
          {pillars.map((p, i) => {
            const cardP = Math.max(0, Math.min(cardsIn - i, 1));
            const eased = 1 - Math.pow(1 - cardP, 4);
            const o = origins[i];

            const tx = o.x * (1 - eased);
            const ty = o.y * (1 - eased);
            const rx = o.rx * (1 - eased);
            const ry = o.ry * (1 - eased);
            const scale = 0.5 + eased * 0.5;
            const blur = (1 - eased) * 8;

            return (
              <div key={i} style={{
                transform: `translate(${tx}px, ${ty}px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`,
                opacity: eased,
                filter: `blur(${blur}px)`,
                transition: 'none',
                willChange: 'transform, opacity, filter',
                transformStyle: 'preserve-3d',
              }}>
                <div style={{
                  width: '100%', height: '220px',
                  background: p.bg,
                  border: `1px solid ${p.border}`,
                  borderRadius: '20px', padding: '28px 32px',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  boxShadow: `0 30px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset`,
                  position: 'relative', overflow: 'hidden',
                  transform: 'translateZ(0)',
                }}>
                  {/* Shine overlay */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                    background: `linear-gradient(90deg, transparent, ${p.color}66, transparent)`,
                  }} />

                  {/* Background number */}
                  <div style={{
                    position: 'absolute', right: '-8px', bottom: '-28px',
                    fontFamily: "'Cormorant Garamond', serif", fontSize: '140px', fontWeight: 700,
                    color: 'rgba(255,255,255,0.035)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
                  }}>
                    {p.number}
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: p.color }}>
                        {p.number} — {p.name}
                      </span>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {[0,1,2].map(j => (
                          <div key={j} style={{ width: j === 0 ? '16px' : '6px', height: '4px', borderRadius: '2px', background: j === 0 ? p.color : `${p.color}33` }} />
                        ))}
                      </div>
                    </div>
                    <h3 style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 500,
                      color: '#FAFAFA', lineHeight: 1.2, marginBottom: '10px',
                      letterSpacing: '-0.01em', whiteSpace: 'pre-line',
                    }}>
                      {p.tagline}
                    </h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: 'rgba(250,250,250,0.4)', lineHeight: 1.6 }}>
                      {p.body}
                    </p>
                  </div>

                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: `1px solid ${p.border}`,
                    borderRadius: '100px', padding: '6px 14px', width: 'fit-content',
                  }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: p.color, display: 'inline-block' }} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500, color: 'rgba(250,250,250,0.6)' }}>
                      {p.metric}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '28px' }}>
          {pillars.map((p, i) => {
            const cardP = Math.max(0, Math.min(cardsIn - i, 1));
            return (
              <div key={i} style={{
                width: cardP > 0.5 ? '20px' : '6px', height: '6px', borderRadius: '3px',
                background: cardP > 0.5 ? p.color : 'rgba(255,255,255,0.15)',
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              }} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
