'use client';
import { useEffect, useRef, useState } from 'react';

const pillars = [
  {
    number: '01',
    name: 'Acquire',
    headline: 'Lower your CAC.\nRaise your ROAS.',
    subhead: 'Most brands run campaigns. We build acquisition systems.',
    body: 'There is a difference between running ads and building an acquisition engine. Campaigns stop when you stop paying. Systems compound. Every channel we build is designed to get cheaper and more effective over time — not more expensive.',
    how: 'We start with a full audit of your current acquisition — what is running, what is tracking, what is working. Then we rebuild from the architecture up. Meta campaigns restructured into Prospecting, Lookalike, and Retargeting layers. Cold email infrastructure built from ICP definition to 5-touch sequence. Attribution set up so every rupee is tracked to the source.',
    deliverables: [
      'Full Meta campaign architecture — Prospecting / Lookalike / Retargeting',
      'Creative brief system — 3 angles tested per batch, rotated every 7 days',
      'Cold email infrastructure — ICP definition, lead sourcing, 5-touch sequence',
      'Attribution setup — GA4, UTMs, pixel, full funnel tracking',
      'Weekly ROAS report delivered every Friday',
    ],
    metric: '2x ROAS minimum by end of Month 1',
    result: 'CAC reduced by an average of 40% within the first 30 days.',
    bg: '#FAFAFA',
    textColor: '#0A0A0A',
    accent: '#7B2FBE',
    cardBg: '#F0EEE8',
    dark: false,
  },
  {
    number: '02',
    name: 'Convert',
    headline: 'Fix the funnel before\nyou add more traffic.',
    subhead: 'Traffic is not the problem. Conversion is.',
    body: 'Most brands try to solve a conversion problem with more acquisition spend. It does not work. A landing page converting at 0.8% that you drive Rs 10L of traffic to is a Rs 10L problem. Fix the funnel first, then scale the traffic.',
    how: 'We run a 7-point conversion audit on every touchpoint — headline, CTA, social proof, objection handling, form length, mobile experience, and load speed. Then we rebuild. A/B testing framework set up with proper sample sizes and clean data. Cart abandonment flows built. Checkout friction removed. Copy rewritten from the ground up.',
    deliverables: [
      '7-point landing page audit and full rebuild',
      'A/B testing framework — minimum sample sizes, clean data, no false positives',
      'Cart abandonment flow — 3 emails at 30 min, 24hr, 48hr',
      'Checkout friction audit — maximum 4 fields, mobile-first',
      'Full copy rewrite — headline, CTA, social proof, objection handling',
    ],
    metric: '0.5–1% CVR improvement from your baseline',
    result: 'Average 0.8% CVR lift achieved within 6 weeks of engagement.',
    bg: '#F0EEE8',
    textColor: '#0A0A0A',
    accent: '#4361EE',
    cardBg: '#E8E6E0',
    dark: false,
  },
  {
    number: '03',
    name: 'Retain',
    headline: 'The cheapest customer\nis one you already have.',
    subhead: '55% of D2C brands under-invest in retention.',
    body: 'Every customer who leaves is a CAC you spend again. The brands that win long-term are not the ones with the best ads. They are the ones with the highest repeat purchase rates, the lowest churn, and the deepest customer relationships. We build that infrastructure.',
    how: 'We start by measuring what you are losing — churn rate, repeat purchase rate, LTV by cohort. Then we build the retention stack. Five email flows. A loyalty programme. A win-back campaign. An NPS system that surfaces detractors before they leave. A referral programme that turns your best customers into your best acquisition channel.',
    deliverables: [
      '5 email flows — Welcome, Post-Purchase, Win-Back, VIP, Abandonment',
      'Loyalty programme — 3 tiers, email-based, no app required',
      'Win-back campaign — 4 emails, subject lines tested',
      'NPS survey system — detractors contacted within 48 hours',
      'Referral programme — two-sided incentive, tracked',
    ],
    metric: 'LTV:CAC ratio above 3:1',
    result: 'Repeat purchase rate improved by 5–10% within Month 3 across all engagements.',
    bg: '#1a1a2e',
    textColor: '#FAFAFA',
    accent: '#2DC653',
    cardBg: 'rgba(255,255,255,0.05)',
    dark: true,
  },
  {
    number: '04',
    name: 'Scale',
    headline: 'Build the system\nthat runs without you.',
    subhead: 'Scaling is not adding more budget.',
    body: 'It is building the infrastructure that makes adding more budget safe. Most founders scale too early — they pour more money into a system that is not ready for it, and burn. We build the operational backbone first. Then scaling is a decision, not a gamble.',
    how: 'We run a constraint diagnostic across 6 dimensions — acquisition, conversion, retention, operations, team, and capital. We document the 3 most critical SOPs. We build a KPI dashboard that gives you full visibility without needing to be in every decision. We deliver a hiring plan so you know exactly who to bring on and when.',
    deliverables: [
      'Constraint identification — 6-type diagnostic framework',
      '3 core SOPs documented, tested, and handed over',
      'KPI dashboard — 5 tabs, live data, weekly review structure',
      'Hiring plan — roles, triggers, rate card',
      'Full Engagement Summary Report — all 4 months, every metric',
    ],
    metric: 'Full operational independence by Month 4',
    result: 'Founder operating time on marketing reduced by 60% on average.',
    bg: '#0A0A0A',
    textColor: '#FAFAFA',
    accent: '#F4A261',
    cardBg: 'rgba(255,255,255,0.04)',
    dark: true,
  },
];

export default function MethodologyScroll() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

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

  const activeIndex = Math.min(Math.floor(progress * pillars.length), pillars.length - 1);
  const active = pillars[activeIndex];

  return (
    <div ref={sectionRef} className="m-meth-outer" style={{ height: `${pillars.length * 130}vh`, position: 'relative' }}>
      <div className="m-meth-sticky" style={{ position: isMobile ? 'relative' : 'sticky', top: 0, height: isMobile ? 'auto' : '100vh',
        background: active.bg,
        transition: 'background 1s cubic-bezier(0.16,1,0.3,1)',
        overflow: 'hidden',
        display: 'flex', alignItems: 'center',
      }}>

        {/* Watermark number */}
        <div style={{
          position: 'absolute', right: '-20px', bottom: '-60px',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(260px, 38vw, 500px)',
          fontWeight: 700,
          color: active.dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
          lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          letterSpacing: '-0.05em',
          transition: 'color 1s ease',
        }}>
          {active.number}
        </div>

        {/* Progress dots */}
        <div style={{ position: 'absolute', top: '40px', right: '80px', display: 'flex', gap: '8px', zIndex: 10 }}>
          {pillars.map((p, i) => (
            <div key={i} style={{
              width: i === activeIndex ? '24px' : '6px', height: '6px', borderRadius: '3px',
              background: i === activeIndex ? active.accent : (active.dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'),
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
            }} />
          ))}
        </div>

        <div style={{
          position: 'relative', zIndex: 1,
          maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 80px)',
          width: '100%', display: 'grid',
          gridTemplateColumns: 'var(--meth-cols, 1fr 1fr)', gap: 'var(--meth-gap, 80px)', alignItems: 'center',
        }}>

          {/* Left */}
          <div>
            <div style={{ marginBottom: '28px' }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase', color: active.accent,
                transition: 'color 0.8s ease',
              }}>
                {active.number} — {active.name}
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(40px, 5vw, 68px)',
              fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.08,
              color: active.textColor, marginBottom: '16px',
              whiteSpace: 'pre-line',
              transition: 'color 1s ease',
            }}>
              {active.headline}
            </h2>

            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(18px, 2vw, 26px)',
              fontStyle: 'italic', fontWeight: 400,
              color: active.accent, marginBottom: '24px',
              lineHeight: 1.3, transition: 'color 0.8s ease',
            }}>
              {active.subhead}
            </p>

            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
              color: active.dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,10,0.55)',
              lineHeight: 1.8, marginBottom: '32px', maxWidth: '440px',
              transition: 'color 1s ease',
            }}>
              {active.body}
            </p>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '11px 20px',
              background: active.dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
              borderRadius: '100px',
              border: `1px solid ${active.accent}44`,
              transition: 'background 1s ease',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: active.accent, display: 'inline-block', transition: 'background 0.8s ease' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 500, color: active.dark ? 'rgba(255,255,255,0.7)' : 'rgba(10,10,10,0.6)', letterSpacing: '0.04em' }}>
                {active.metric}
              </span>
            </div>
          </div>

          {/* Right — deep dive card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

            {/* How we do it */}
            <div style={{
              background: active.cardBg,
              border: `1px solid ${active.dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
              borderRadius: '20px', padding: '32px',
              transition: 'background 1s ease',
            }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: active.accent, marginBottom: '16px',
              }}>
                How we do it
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '13px',
                color: active.dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,10,0.55)',
                lineHeight: 1.75,
              }}>
                {active.how}
              </p>
            </div>

            {/* Deliverables */}
            <div style={{
              background: active.cardBg,
              border: `1px solid ${active.dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
              borderRadius: '20px', padding: '32px',
              transition: 'background 1s ease',
            }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: active.accent, marginBottom: '16px',
              }}>
                What you get
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {active.deliverables.map((d, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: active.accent, marginTop: '6px', flexShrink: 0 }} />
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: '13px',
                      color: active.dark ? 'rgba(255,255,255,0.6)' : 'rgba(10,10,10,0.6)',
                      lineHeight: 1.5,
                    }}>{d}</span>
                  </div>
                ))}
              </div>
              <div style={{
                paddingTop: '20px',
                borderTop: `1px solid ${active.dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
              }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: '16px',
                  fontStyle: 'italic', color: active.accent, lineHeight: 1.5,
                }}>
                  "{active.result}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
