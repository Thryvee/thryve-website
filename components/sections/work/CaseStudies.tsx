'use client';
import { useEffect, useRef, useState } from 'react';

const cases = [
  {
    id: 'cs-01',
    model: 'D2C',
    category: 'Skincare',
    location: 'Delhi',
    label: 'A D2C skincare brand',
    challenge: 'ROAS had collapsed from 2.1x to 0.9x over 6 months. CAC was climbing with no clear cause. Repeat purchase rate stuck at 11% despite a growing customer base.',
    pillars: ['Acquire', 'Retain'],
    duration: '4 months',
    bg: 'linear-gradient(135deg, #1a0533 0%, #2d1b4e 100%)',
    accent: '#9B5DE5',
    results: [
      { metric: 'ROAS', before: '0.9x', after: '3.1x', change: '+244%' },
      { metric: 'CAC', before: 'Rs 847', after: 'Rs 312', change: '-63%' },
      { metric: 'Repeat Rate', before: '11%', after: '29%', change: '+163%' },
      { metric: 'Monthly Revenue', before: 'Rs 8.2L', after: 'Rs 21.4L', change: '+161%' },
    ],
    what: 'Rebuilt the entire Meta campaign architecture from scratch. Introduced a 3-angle creative testing system rotated every 7 days. Set up full attribution — GA4, UTMs, pixel — so every rupee was tracked. Launched a 5-flow email retention system targeting the existing 8,000-person list that had never been emailed.',
    quote: 'We finally understand why every number moves. Before Thryve, we were guessing.',
  },
  {
    id: 'cs-02',
    model: 'B2B',
    category: 'SaaS',
    location: 'Bangalore',
    label: 'A B2B SaaS company',
    challenge: 'No outbound system. Pipeline was entirely referral-dependent. No CRM, no sequences, no attribution. Founder was personally closing every deal with no time left to build the product.',
    pillars: ['Acquire', 'Convert', 'Scale'],
    duration: '4 months',
    bg: 'linear-gradient(135deg, #0a0a2e 0%, #1a1a4e 100%)',
    accent: '#4361EE',
    results: [
      { metric: 'Pipeline Value', before: 'Rs 0', after: 'Rs 18L', change: '+∞' },
      { metric: 'Monthly Leads', before: '3-4', after: '34', change: '+750%' },
      { metric: 'Sales Cycle', before: '67 days', after: '21 days', change: '-69%' },
      { metric: 'Founder Time on Sales', before: '35 hrs/wk', after: '8 hrs/wk', change: '-77%' },
    ],
    what: 'Built a cold outbound system from zero — ICP definition, lead sourcing, 5-touch email sequences, LinkedIn outreach. Implemented HubSpot CRM with full pipeline visibility. Rewrote the sales call framework and reduced the average close from 67 to 21 days. Documented 3 SOPs so the founder could hand off the process.',
    quote: 'The outbound system runs while I am building the product. That is what I needed.',
  },
  {
    id: 'cs-03',
    model: 'B2C',
    category: 'Fitness',
    location: 'Mumbai',
    label: 'A B2C fitness brand',
    challenge: 'High traffic from Meta ads but conversion rate of 0.8% — well below industry average. Email list of 12,000 with zero active flows. Churn was invisible because it had never been measured.',
    pillars: ['Convert', 'Retain'],
    duration: '4 months',
    bg: 'linear-gradient(135deg, #001a10 0%, #0d3320 100%)',
    accent: '#2DC653',
    results: [
      { metric: 'CVR', before: '0.8%', after: '2.4%', change: '+200%' },
      { metric: 'Email Revenue', before: 'Rs 0', after: 'Rs 3.8L/mo', change: '+∞' },
      { metric: 'Repeat Rate', before: '12%', after: '31%', change: '+158%' },
      { metric: 'Churn Rate', before: '28%', after: '9%', change: '-68%' },
    ],
    what: 'Rebuilt the landing page using a 7-point conversion audit — headline, CTA, social proof, objection handling, form length, mobile experience, load speed. Activated the 12,000-person email list with a Welcome, Post-Purchase, Win-Back, VIP, and Abandonment flow. Launched a loyalty programme that increased repeat purchase rate from 12% to 31% in 10 weeks.',
    quote: 'I had 12,000 people on my list doing nothing. Now that list makes more than my ads.',
  },
  {
    id: 'cs-04',
    model: 'C2C',
    category: 'Marketplace',
    location: 'Hyderabad',
    label: 'A C2C marketplace',
    challenge: 'User acquisition cost was high and growing every month. No retention mechanism existed. LTV was barely above the value of the first transaction. Founder was involved in every operational decision.',
    pillars: ['Acquire', 'Retain', 'Scale'],
    duration: '4 months',
    bg: 'linear-gradient(135deg, #1a0f00 0%, #3d2000 100%)',
    accent: '#F4A261',
    results: [
      { metric: 'LTV', before: 'Rs 1,200', after: 'Rs 4,800', change: '+300%' },
      { metric: 'Churn', before: '34%', after: '9%', change: '-74%' },
      { metric: 'CAC', before: 'Rs 680', after: 'Rs 290', change: '-57%' },
      { metric: 'LTV:CAC Ratio', before: '1.8x', after: '16.5x', change: '+817%' },
    ],
    what: 'Rebuilt acquisition targeting to reduce CAC by 57%. Introduced a two-sided referral programme that turned existing users into an acquisition channel. Built a re-engagement sequence for churned users that recovered 22% of them within 60 days. Documented 4 SOPs and built a KPI dashboard that gave the founder full visibility without needing to be in every decision.',
    quote: 'Fixing the LTV number changed the entire business model. We finally have a sustainable unit economics.',
  },
];

export default function CaseStudies() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);

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

  const activeIndex = Math.min(Math.floor(progress * cases.length), cases.length - 1);
  const active = cases[activeIndex];

  return (
    <div ref={sectionRef} className="m-case-outer" style={{ height: `${cases.length * 120}vh`, position: 'relative' }}>
      <div className="m-case-sticky" style={{ position: isMobile ? 'relative' : 'sticky', top: 0, height: isMobile ? 'auto' : '100vh', overflow: 'hidden', background: active.bg,
        transition: 'background 1s cubic-bezier(0.16,1,0.3,1)',
      }}>

        {/* Background number */}
        <div style={{
          position: 'absolute', right: '-20px', bottom: '-60px',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(240px, 35vw, 480px)',
          fontWeight: 700, color: 'rgba(255,255,255,0.04)',
          lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          letterSpacing: '-0.05em',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}>
          0{activeIndex + 1}
        </div>

        {/* Case counter dots */}
        <div style={{ position: 'absolute', top: '40px', right: '80px', display: 'flex', gap: '8px', zIndex: 10 }}>
          {cases.map((_, i) => (
            <div key={i} style={{
              width: i === activeIndex ? '24px' : '6px', height: '6px', borderRadius: '3px',
              background: i === activeIndex ? active.accent : 'rgba(255,255,255,0.2)',
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
            }} />
          ))}
        </div>

        <div style={{
          position: 'relative', zIndex: 1,
          maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 80px)',
          height: '100%', display: 'flex', alignItems: 'center',
        }}>
          <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'var(--cs-cols, 1fr 1fr)', gap: 'var(--cs-gap, 80px)', alignItems: 'center' }}>

            {/* Left */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: active.accent, transition: 'color 0.8s ease' }}>
                  {active.model} — {active.category}
                </span>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'inline-block' }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>{active.location}</span>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'inline-block' }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>{active.duration}</span>
              </div>

              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(40px, 5vw, 72px)',
                fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.05,
                color: '#FAFAFA', marginBottom: '24px',
                transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
              }}>
                {active.label}.
              </h2>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: '36px', maxWidth: '440px' }}>
                {active.challenge}
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '36px' }}>
                {active.pillars.map(p => (
                  <span key={p} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: active.accent, background: `${active.accent}18`, border: `1px solid ${active.accent}33`, padding: '5px 12px', borderRadius: '100px' }}>
                    {p}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setExpanded(expanded === active.id ? null : active.id)}
                style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500,
                  color: '#FAFAFA', background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  padding: '12px 24px', borderRadius: '100px', cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.14)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'}
              >
                {expanded === active.id ? 'Close' : 'See full breakdown'}
                <span style={{ transform: expanded === active.id ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s ease', display: 'inline-block' }}>+</span>
              </button>
            </div>

            {/* Right — results grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="m-case-result-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {active.results.map((r, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px', padding: '24px',
                    transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
                  }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '12px' }}>{r.metric}</p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', color: 'rgba(255,255,255,0.25)', textDecoration: 'line-through' }}>{r.before}</span>
                      <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>→</span>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 500, color: '#FAFAFA', lineHeight: 1, letterSpacing: '-0.02em' }}>{r.after}</span>
                    </div>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 700, color: active.accent }}>{r.change}</span>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                  "{active.quote}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded detail panel */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          maxHeight: expanded === active.id ? '340px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.6s cubic-bezier(0.16,1,0.3,1)',
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          zIndex: 20,
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 80px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'var(--cs-cols, 1fr 1fr)', gap: 'clamp(20px, 4vw, 60px)' }}>
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: active.accent, marginBottom: '16px' }}>
                  What we built
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>
                  {active.what}
                </p>
              </div>
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: active.accent, marginBottom: '16px' }}>
                  Pillars activated
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
                  {active.pillars.map(p => (
                    <div key={p} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: active.accent, flexShrink: 0 }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>{p}</span>
                    </div>
                  ))}
                </div>
                <a href='/contact' style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500, color: '#FAFAFA', background: active.accent, padding: '12px 24px', borderRadius: '100px', textDecoration: 'none', display: 'inline-flex' }}>
                  Get similar results →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
