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

const revenueOptions = [
  'Pre-revenue',
  'Rs 0 - 1L / month',
  'Rs 1L - 5L / month',
  'Rs 5L - 20L / month',
  'Rs 20L - 50L / month',
  'Rs 50L+ / month',
];

// ── Modal ──────────────────────────────────────────────────────────────────────
function PlaybookModal({
  pb,
  email,
  onClose,
  onSuccess,
}: {
  pb: typeof playbooks[0];
  email: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [fields, setFields] = useState({ name: '', mobile: '', brand: '', revenue: '' });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/playbook-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: fields.name,
          mobile: fields.mobile,
          brand: fields.brand || '',
          revenue: fields.revenue || '',
          playbook: pb.title,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {
      // fail silently — still show success to user
    }
    setLoading(false);
    onSuccess();
  };

  const textColor = '#FAFAFA';
  const mutedColor = 'rgba(255,255,255,0.45)';

  const inputStyle = (key: string) => ({
    background: 'rgba(255,255,255,0.06)',
    border: `1px solid ${focused === key ? pb.accent : pb.accent + '33'}`,
    borderRadius: '10px',
    padding: '13px 16px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '14px',
    color: textColor,
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.2s ease',
  });

  const labelStyle = (key: string) => ({
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '10px',
    fontWeight: 600 as const,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: focused === key ? pb.accent : 'rgba(255,255,255,0.35)',
    transition: 'color 0.2s ease',
    marginBottom: '7px',
    display: 'block',
  });

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: pb.bg,
          border: `1px solid ${pb.accent}33`,
          borderRadius: '24px',
          padding: 'clamp(28px, 5vw, 48px)',
          maxWidth: '480px',
          width: '100%',
          boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${pb.accent}18`,
          position: 'relative',
          animation: 'slideUp 0.3s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Top accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${pb.accent}, transparent)`, borderRadius: '24px 24px 0 0' }} />

        {/* Close button */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', color: mutedColor, fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}
        >
          ×
        </button>

        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: pb.accent, display: 'block', marginBottom: '10px' }}>
            {pb.tag}
          </span>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 500, letterSpacing: '-0.02em', color: textColor, lineHeight: 1.1, marginBottom: '8px' }}>
            Almost there.
          </h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: mutedColor, lineHeight: 1.65 }}>
            We&apos;ll send it to <span style={{ color: pb.accent }}>{email}</span> — just a couple of quick details first.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Name — required */}
          <div>
            <label style={labelStyle('name')}>Your Name <span style={{ color: pb.accent }}>*</span></label>
            <input
              type="text"
              placeholder="Riya Sharma"
              value={fields.name}
              onChange={e => setFields({ ...fields, name: e.target.value })}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused('')}
              required
              style={inputStyle('name')}
            />
          </div>

          {/* Mobile — required */}
          <div>
            <label style={labelStyle('mobile')}>Mobile Number <span style={{ color: pb.accent }}>*</span></label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={fields.mobile}
              onChange={e => setFields({ ...fields, mobile: e.target.value })}
              onFocus={() => setFocused('mobile')}
              onBlur={() => setFocused('')}
              required
              style={inputStyle('mobile')}
            />
          </div>

          {/* Brand / Website — optional */}
          <div>
            <label style={labelStyle('brand')}>
              Brand Name / Website <span style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
            </label>
            <input
              type="text"
              placeholder="yourbrand.com"
              value={fields.brand}
              onChange={e => setFields({ ...fields, brand: e.target.value })}
              onFocus={() => setFocused('brand')}
              onBlur={() => setFocused('')}
              style={inputStyle('brand')}
            />
          </div>

          {/* Monthly Revenue — optional */}
          <div>
            <label style={labelStyle('revenue')}>
              Monthly Revenue <span style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
            </label>
            <select
              value={fields.revenue}
              onChange={e => setFields({ ...fields, revenue: e.target.value })}
              onFocus={() => setFocused('revenue')}
              onBlur={() => setFocused('')}
              style={{
                ...inputStyle('revenue'),
                appearance: 'none',
                cursor: 'pointer',
                color: fields.revenue ? textColor : 'rgba(255,255,255,0.3)',
              }}
            >
              <option value="" style={{ background: '#1a0533' }}>Select range</option>
              {revenueOptions.map(opt => (
                <option key={opt} value={opt} style={{ background: '#1a0533' }}>{opt}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '4px',
              width: '100%',
              padding: '15px 24px',
              borderRadius: '100px',
              background: loading ? 'rgba(255,255,255,0.1)' : pb.accent,
              color: '#FAFAFA',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 500,
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: '0.03em',
              transition: 'opacity 0.2s ease, background 0.2s ease',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Sending…' : 'Send Me the Playbook →'}
          </button>

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.18)', textAlign: 'center' }}>
            Free. No spam. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </div>
  );
}

// ── Card ───────────────────────────────────────────────────────────────────────
function PlaybookCard({ pb, isMobile }: { pb: typeof playbooks[0]; isMobile: boolean }) {
  const [hoveredChapter, setHoveredChapter] = useState<number | null>(null);
  const [openChapter, setOpenChapter] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
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

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const textColor = '#FAFAFA';
  const mutedColor = 'rgba(255,255,255,0.45)';

  const emailCaptureSection = (
    <>
      {showModal && (
        <PlaybookModal
          pb={pb}
          email={email}
          onClose={() => setShowModal(false)}
          onSuccess={() => { setShowModal(false); setSubmitted(true); }}
        />
      )}
      {submitted ? (
        <div style={{ textAlign: 'center' as const, padding: isMobile ? '16px' : '20px', background: `${pb.accent}12`, borderRadius: '12px', border: `1px solid ${pb.accent}25` }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? '20px' : '22px', fontWeight: 500, color: textColor, marginBottom: '4px' }}>On its way.</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: mutedColor }}>Check your inbox — arriving within 5 minutes.</p>
        </div>
      ) : (
        <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column' as const, gap: '10px' }}>
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
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.2)', textAlign: 'center' as const }}>Free. No spam. Unsubscribe anytime.</p>
        </form>
      )}
    </>
  );

  // ── Mobile card ──────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div style={{
        background: pb.bg,
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 16px 48px rgba(0,0,0,0.25)',
      }}>
        <div style={{ height: '2px', background: `linear-gradient(90deg, transparent, ${pb.accent}, transparent)` }} />

        <div style={{ padding: '24px 20px 16px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: '-8px', bottom: '-14px', fontFamily: "'Cormorant Garamond', serif", fontSize: '100px', fontWeight: 700, color: 'rgba(255,255,255,0.04)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
            {pb.number === '01' ? '30' : '90'}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' as const, gap: '8px' }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: pb.accent, background: `${pb.accent}18`, border: `1px solid ${pb.accent}33`, padding: '4px 12px', borderRadius: '100px' }}>
              {pb.tag}
            </span>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[[pb.pages + ' pages'], [pb.frameworks + ' fw'], [pb.downloads]].map(([val], i) => (
                <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.45)', lineHeight: 1 }}>{val}</p>
              ))}
            </div>
          </div>

          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px, 6vw, 30px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1, color: textColor, marginBottom: '6px', position: 'relative', zIndex: 1 }}>
            {pb.title}
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', fontStyle: 'italic', color: pb.accent, position: 'relative', zIndex: 1 }}>
            {pb.subtitle}
          </p>
        </div>

        <div style={{ padding: '0 20px 16px' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: mutedColor, lineHeight: 1.75 }}>
            {pb.description}
          </p>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.25)', padding: '12px 20px 4px' }}>
            What&apos;s inside
          </p>
          {pb.chapters.map((ch, i) => (
            <div
              key={i}
              onClick={() => setOpenChapter(openChapter === i ? null : i)}
              style={{ padding: '14px 20px', borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none', background: openChapter === i ? 'rgba(255,255,255,0.05)' : 'transparent', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '0.1em', color: pb.accent, paddingTop: '2px', flexShrink: 0, minWidth: '18px' }}>{ch.number}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', fontWeight: 500, color: textColor, marginBottom: openChapter === i ? '6px' : '0' }}>
                    {ch.title}
                  </p>
                  <div style={{ maxHeight: openChapter === i ? '120px' : '0', overflow: 'hidden', transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1)', opacity: openChapter === i ? 1 : 0 }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: mutedColor, lineHeight: 1.65, paddingBottom: '4px' }}>
                      {ch.body}
                    </p>
                  </div>
                </div>
                <span style={{ color: pb.accent, fontSize: '14px', paddingTop: '2px', flexShrink: 0 }}>
                  {openChapter === i ? '−' : '+'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: '16px 20px' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', fontStyle: 'italic', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: '6px' }}>
            &ldquo;{pb.testimonial.quote}&rdquo;
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: pb.accent }}>
            — {pb.testimonial.brand}
          </p>
        </div>

        <div style={{ padding: '0 20px 24px' }}>
          {emailCaptureSection}
        </div>
      </div>
    );
  }

  // ── Desktop card ─────────────────────────────────────────────────────────────
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
      <div style={{ padding: '36px 36px 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-10px', bottom: '-20px', fontFamily: "'Cormorant Garamond', serif", fontSize: '140px', fontWeight: 700, color: 'rgba(255,255,255,0.04)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.04em' }}>
          {pb.number === '01' ? '30' : '90'}
        </div>

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

      <div style={{ padding: '0 36px 24px' }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: mutedColor, lineHeight: 1.75 }}>
          {pb.description}
        </p>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ padding: '8px 0' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', padding: '12px 36px 4px' }}>
            What&apos;s inside
          </p>
          {pb.chapters.map((ch, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredChapter(i)}
              onMouseLeave={() => setHoveredChapter(null)}
              style={{ padding: '14px 36px', borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none', background: hoveredChapter === i ? 'rgba(255,255,255,0.05)' : 'transparent', transition: 'background 0.2s ease', cursor: 'default' }}
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

      <div style={{ padding: '20px 36px' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', fontStyle: 'italic', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: '8px' }}>
          &ldquo;{pb.testimonial.quote}&rdquo;
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: pb.accent }}>
          — {pb.testimonial.brand}
        </p>
      </div>

      <div style={{ padding: '0 36px 36px' }}>
        {emailCaptureSection}
      </div>
    </div>
  );
}

export default function PlaybookCards() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isMobile === null) return null;

  if (isMobile) {
    return (
      <section style={{ padding: '40px 20px 56px', background: 'var(--bg)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {playbooks.map(pb => <PlaybookCard key={pb.id} pb={pb} isMobile={true} />)}
        </div>
      </section>
    );
  }

  return (
    <section className="m-pb-cards-section" style={{ padding: 'clamp(40px, 6vw, 80px) clamp(20px, 5vw, 80px) clamp(60px, 8vw, 120px)', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="m-pb-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', alignItems: 'start' }}>
          {playbooks.map(pb => <PlaybookCard key={pb.id} pb={pb} isMobile={false} />)}
        </div>
      </div>
    </section>
  );
}
