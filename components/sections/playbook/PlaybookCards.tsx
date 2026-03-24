'use client';
import { useState, useEffect, useRef } from 'react';

const playbooks = [
  {
    id: 'pb-01',
    tag: 'D2C Brands',
    number: '01',
    title: '30-Day D2C Growth Playbook',
    subtitle: 'For brands already running — ready to systematise.',
    description: 'The exact framework Thryve uses across every D2C engagement. Not theory. A system you can implement this week — with templates, checklists, and decision trees built in.',
    pages: '40+',
    frameworks: '12',
    downloads: '340+',
    accent: '#9B5DE5',
    bg: 'linear-gradient(135deg, #1a0533 0%, #2d1b4e 100%)',
    chapters: [
      { number: '01', title: 'Acquisition Architecture', body: 'How to structure your Meta campaigns — Prospecting, Lookalike, Retargeting — and why most brands get this wrong from day one.' },
      { number: '02', title: 'Creative Testing System', body: '3-angle testing framework. How to brief creatives, rotate them every 7 days, and know which to kill vs which to scale.' },
      { number: '03', title: 'Conversion Audit', body: '7-point landing page audit. Run it in 2 hours, find the leak, fix it before spending another rupee on traffic.' },
      { number: '04', title: 'Retention Stack', body: '5 email flows, loyalty programme blueprint, and win-back campaign — the full retention system in one chapter.' },
    ],
    testimonial: { quote: 'Used the CVR audit chapter in week 1. CVR went from 1.1% to 2.3% in two weeks.', brand: 'D2C Apparel founder, Pune' },
  },
  {
    id: 'pb-02',
    tag: 'Early Stage',
    number: '02',
    title: '90-Day Brand Launch Playbook',
    subtitle: 'For founders launching or in their first 3 months.',
    description: 'Built on research across 200+ early-stage brand audits. From offer validation to first 100 customers — every step sequenced so you do not waste money in the wrong order.',
    pages: '50+',
    frameworks: '16',
    downloads: '520+',
    accent: '#4361EE',
    bg: 'linear-gradient(135deg, #0a0a2e 0%, #1a1a4e 100%)',
    chapters: [
      { number: '01', title: 'Offer Construction', body: 'How to build an offer that sells before you spend on ads. Positioning, pricing, and the validation test most founders skip entirely.' },
      { number: '02', title: 'First 10 Customers', body: 'The exact outreach sequence to get your first 10 customers with zero ad spend. DM templates and email scripts included.' },
      { number: '03', title: 'First Paid Campaign', body: 'When to start ads, how much to spend, what to test first, and the metrics that tell you if it is working or not.' },
      { number: '04', title: 'Infrastructure', body: 'Email setup, social proof collection, referral programme, and the 3 SOPs every early-stage brand needs before scaling.' },
    ],
    testimonial: { quote: 'Got my first 10 customers in 18 days using the outreach chapter. Did not spend a single rupee on ads.', brand: 'B2C Wellness founder, Mumbai' },
  },
];

function PlaybookCard({ pb }: { pb: typeof playbooks[0] }) {
  const [hoveredChapter, setHoveredChapter] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const isDark = true;
  const textColor = '#FAFAFA';
  const mutedColor = 'rgba(255,255,255,0.45)';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        background: pb.bg,
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
        willChange: 'transform',
        boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
      }}
    >
      {/* Card header */}
      <div style={{ padding: '36px 36px 28px', position: 'relative', overflow: 'hidden' }}>
        {/* Watermark */}
        <div style={{ position: 'absolute', right: '-10px', bottom: '-20px', fontFamily: "'Cormorant Garamond', serif", fontSize: '140px', fontWeight: 700, color: 'rgba(255,255,255,0.04)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.04em' }}>
          {pb.number === '01' ? '30' : '90'}
        </div>

        {/* Top line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${pb.accent}, transparent)` }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: pb.accent, background: `${pb.accent}18`, border: `1px solid ${pb.accent}33`, padding: '5px 14px', borderRadius: '100px' }}>
            {pb.tag}
          </span>
          <div style={{ display: 'flex', gap: '16px' }}>
            {[['📄', pb.pages + ' pages'], ['🔧', pb.frameworks + ' frameworks'], ['⬇️', pb.downloads]].map(([icon, val], i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontWeight: 500, color: textColor, lineHeight: 1 }}>{val}</p>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(24px, 2.8vw, 38px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1, color: textColor, marginBottom: '8px', position: 'relative', zIndex: 1 }}>
          {pb.title}
        </h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', fontStyle: 'italic', color: pb.accent, position: 'relative', zIndex: 1 }}>
          {pb.subtitle}
        </p>
      </div>

      {/* Description */}
      <div style={{ padding: '0 36px 24px' }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: mutedColor, lineHeight: 1.75 }}>
          {pb.description}
        </p>
      </div>

      {/* Chapter list — hover to reveal detail */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ padding: '8px 0' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', padding: '12px 36px 4px' }}>
            What's inside
          </p>
          {pb.chapters.map((ch, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredChapter(i)}
              onMouseLeave={() => setHoveredChapter(null)}
              style={{
                padding: '14px 36px',
                borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                background: hoveredChapter === i ? 'rgba(255,255,255,0.05)' : 'transparent',
                transition: 'background 0.2s ease',
                cursor: 'default',
              }}
            >
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '0.1em', color: pb.accent, paddingTop: '2px', flexShrink: 0, minWidth: '20px' }}>{ch.number}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', fontWeight: 500, color: textColor, marginBottom: hoveredChapter === i ? '6px' : '0', transition: 'margin 0.2s ease' }}>
                    {ch.title}
                  </p>
                  <div style={{ maxHeight: hoveredChapter === i ? '80px' : '0', overflow: 'hidden', transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1)', opacity: hoveredChapter === i ? 1 : 0 }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: mutedColor, lineHeight: 1.65, paddingBottom: '4px' }}>
                      {ch.body}
                    </p>
                  </div>
                </div>
                <span style={{ color: pb.accent, fontSize: '14px', opacity: hoveredChapter === i ? 1 : 0.3, transition: 'opacity 0.2s ease', paddingTop: '2px' }}>
                  {hoveredChapter === i ? '−' : '+'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div style={{ padding: '20px 36px' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', fontStyle: 'italic', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: '8px' }}>
          "{pb.testimonial.quote}"
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: pb.accent }}>
          — {pb.testimonial.brand}
        </p>
      </div>

      {/* Email capture */}
      <div style={{ padding: '0 36px 36px' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px', background: `${pb.accent}12`, borderRadius: '12px', border: `1px solid ${pb.accent}25` }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 500, color: textColor, marginBottom: '4px' }}>On its way.</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: mutedColor }}>Check your inbox — arriving within 5 minutes.</p>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type='email'
              placeholder='your@email.com'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${pb.accent}33`, borderRadius: '10px', padding: '13px 16px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: textColor, outline: 'none', width: '100%', transition: 'border-color 0.2s ease' }}
              onFocus={e => (e.target as HTMLElement).style.borderColor = pb.accent}
              onBlur={e => (e.target as HTMLElement).style.borderColor = pb.accent + '33'}
            />
            <button
              type='submit'
              style={{ width: '100%', padding: '14px 24px', borderRadius: '100px', background: pb.accent, color: '#FAFAFA', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500, border: 'none', cursor: 'pointer', letterSpacing: '0.03em', transition: 'opacity 0.2s ease' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.82'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
            >
              Send me the playbook →
            </button>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>Free. No spam. Unsubscribe anytime.</p>
          </form>
        )}
      </div>
    </div>
  );
}

export default function PlaybookCards() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section className="m-pb-cards-section" style={{ padding: 'clamp(40px, 6vw, 80px) clamp(20px, 5vw, 80px) clamp(60px, 8vw, 120px)', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="m-pb-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', alignItems: 'start' }}>
          {playbooks.map(pb => <PlaybookCard key={pb.id} pb={pb} />)}
        </div>
      </div>
    </section>
  );
}
