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

type Pillar = (typeof pillars)[number];

function MobilePillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80 + index * 100);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      ref={ref}
      style={{
        background: pillar.bg,
        borderRadius: '20px',
        padding: '28px 24px 24px',
        border: `1px solid ${pillar.accent}28`,
        boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)',
        position: 'relative',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.97)',
        transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms`,
      }}
    >
      {/* Top accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${pillar.accent}88, transparent)` }} />
      {/* Watermark number */}
      <div style={{ position: 'absolute', right: '-4px', bottom: '-16px', fontFamily: "'Cormorant Garamond', serif", fontSize: '96px', fontWeight: 700, color: 'rgba(255,255,255,0.05)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
        {pillar.number}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', position: 'relative', zIndex: 1 }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: pillar.accent }}>
          {pillar.number} — {pillar.name}
        </span>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 300, color: pillar.accent, letterSpacing: '-0.03em', lineHeight: 1 }}>{pillar.stat}</span>
      </div>
      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px, 6vw, 30px)', fontWeight: 500, color: '#FAFAFA', lineHeight: 1.15, marginBottom: '10px', whiteSpace: 'pre-line', letterSpacing: '-0.02em', position: 'relative', zIndex: 1 }}>
        {pillar.headline}
      </h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, marginBottom: '18px', position: 'relative', zIndex: 1 }}>
        {pillar.body}
      </p>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '7px 14px', background: 'rgba(255,255,255,0.06)', borderRadius: '100px', border: `1px solid ${pillar.accent}33`, position: 'relative', zIndex: 1 }}>
        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: pillar.accent, display: 'inline-block' }} />
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>{pillar.metric}</span>
      </div>
    </div>
  );
}

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

  // ── Mobile branch ──────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div style={{ background: '#0A0A0A', padding: '56px 0 48px' }}>
        <div style={{ padding: '0 24px', marginBottom: '36px' }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.35)', display: 'block', marginBottom: '10px' }}>The System</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(40px, 11vw, 54px)', fontWeight: 500, letterSpacing: '-0.03em', color: '#FAFAFA', lineHeight: 1.05 }}>Four pillars.</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(18px, 5vw, 22px)', fontWeight: 400, fontStyle: 'italic', color: 'rgba(255,255,255,0.28)', marginTop: '8px', letterSpacing: '-0.01em' }}>One sequence. No skipping.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '0 24px' }}>
          {pillars.map((p, i) => (
            <MobilePillarCard key={i} pillar={p} index={i} />
          ))}
        </div>
      </div>
    );
  }

  // ── Desktop (unchanged) ───────────────────────────────────────────────────
  return (
    <div ref={sectionRef} style={{ height: `${pillars.length * 120}vh`, position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
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
          <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

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
