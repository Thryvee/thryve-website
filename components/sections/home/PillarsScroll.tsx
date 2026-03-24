'use client';
import { useEffect, useRef, useState } from 'react';

const pillars = [
  {
    number: '01', name: 'Acquire',
    headline: 'Lower your CAC.\nRaise your ROAS.',
    body: 'Most brands run campaigns. We build acquisition systems. Every channel, every creative, every rupee engineered to compound. Full Meta architecture, cold email infrastructure, attribution setup built once, optimised forever.',
    metric: '2x ROAS minimum', stat: '40%', statLabel: 'Average CAC reduction by Month 1',
    bg: '#1a0533', accent: '#9B5DE5',
  },
  {
    number: '02', name: 'Convert',
    headline: 'Fix the funnel before\nyou add more traffic.',
    body: 'A 1% CVR improvement at Rs 10L/month is worth Rs 1.2L per year. We find those percentage points and systematically close them. Landing page rebuilds, A/B frameworks, cart abandonment flows.',
    metric: '0.5-1% CVR lift', stat: '0.8%', statLabel: 'Average CVR improvement within 6 weeks',
    bg: '#0a0a2e', accent: '#4361EE',
  },
  {
    number: '03', name: 'Retain',
    headline: 'The cheapest customer\nis one you already have.',
    body: '55% of D2C brands under-invest in retention. Every customer who leaves is a CAC you spend again. We stop that leak with email flows, loyalty programmes, win-back campaigns, and NPS systems.',
    metric: 'LTV:CAC above 3:1', stat: '31%', statLabel: 'Average repeat purchase rate after Month 3',
    bg: '#001a10', accent: '#2DC653',
  },
  {
    number: '04', name: 'Scale',
    headline: 'Build the system that\nruns without you.',
    body: 'Scaling is not adding more budget. It is building the infrastructure that makes more budget safe to add. SOPs, KPI dashboards, hiring plans, constraint frameworks — systems first, spend second.',
    metric: 'Full independence by Month 4', stat: '60%', statLabel: 'Reduction in founder time on marketing',
    bg: '#1a0f00', accent: '#F4A261',
  },
];

export default function PillarsScroll() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(scrolled / scrollable, 1));
      setProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const active = Math.min(Math.floor(progress * pillars.length), pillars.length - 1);

  return (
    <div ref={sectionRef} style={{ height: isMobile ? 'auto' : `${pillars.length * 120}vh`, position: 'relative' }}>
      <div style={{
        position: isMobile ? 'relative' : 'sticky', top: 0, height: isMobile ? 'auto' : '100vh',
        overflow: 'hidden',
        background: pillars[active].bg,
        transition: 'background 1.2s cubic-bezier(0.16,1,0.3,1)',
      }}>

        {/* Watermark */}
        <div style={{
          position: 'absolute', right: '-20px', bottom: '-60px',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(240px, 35vw, 480px)',
          fontWeight: 700, color: 'rgba(255,255,255,0.04)',
          lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          letterSpacing: '-0.05em',
        }}>
          {pillars[active].number}
        </div>

        <div style={{
          position: 'relative', zIndex: 1,
          maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 80px)',
          height: '100%', display: 'flex', alignItems: 'center',
        }}>
          <div style={{ width: '100%', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '28px' : '80px', alignItems: 'center' }}>

            {/* Left */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
                {pillars.map((p, i) => (
                  <div key={i} style={{
                    height: '6px', width: i === active ? '28px' : '6px', borderRadius: '3px',
                    background: i === active ? pillars[active].accent : 'rgba(255,255,255,0.2)',
                    transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                  }} />
                ))}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: pillars[active].accent, transition: 'color 0.8s ease' }}>
                  {pillars[active].number} — {pillars[active].name}
                </span>
              </div>

              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 4.5vw, 64px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.1, color: '#FAFAFA', marginBottom: '24px', whiteSpace: 'pre-line' }}>
                {pillars[active].headline}
              </h2>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: '36px', maxWidth: '440px' }}>
                {pillars[active].body}
              </p>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '11px 20px', background: 'rgba(255,255,255,0.06)', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: pillars[active].accent, display: 'inline-block', transition: 'background 0.8s ease' }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.04em' }}>
                  {pillars[active].metric}
                </span>
              </div>
            </div>

            {/* Right — stacking cards */}
            <div style={{ position: 'relative', height: '420px' }}>

              {/* Stack ghost cards behind */}
              {[3, 2, 1].map((offset) => {
                const show = active + offset < pillars.length + 1;
                if (!show) return null;
                return (
                  <div key={offset} style={{
                    position: 'absolute',
                    top: `${offset * 14}px`,
                    left: `${offset * 8}px`,
                    right: `${-(offset * 8)}px`,
                    height: '300px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '24px',
                    transform: `scale(${1 - offset * 0.03})`,
                    transformOrigin: 'top center',
                    opacity: Math.max(0, 0.5 - offset * 0.15),
                    transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
                  }} />
                );
              })}

              {/* Main card */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '300px',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '24px', padding: '48px',
                backdropFilter: 'blur(20px)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
                transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
              }}>
                <div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(72px, 12vw, 120px)', fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 1, color: pillars[active].accent, transition: 'color 0.8s ease', marginBottom: '16px' }}>
                    {pillars[active].stat}
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                    {pillars[active].statLabel}
                  </p>
                </div>
              </div>

              {/* Pillar tabs */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {pillars.map((p, i) => (
                  <div key={i} style={{
                    padding: '14px 10px',
                    background: i === active ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)',
                    border: '1px solid', borderColor: i === active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)',
                    borderRadius: '12px', transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)', textAlign: 'center',
                  }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '8px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: i === active ? pillars[i].accent : 'rgba(255,255,255,0.25)', marginBottom: '4px', transition: 'color 0.5s ease' }}>
                      {p.number}
                    </p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', fontWeight: 500, color: i === active ? '#FAFAFA' : 'rgba(255,255,255,0.25)', transition: 'color 0.5s ease' }}>
                      {p.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}