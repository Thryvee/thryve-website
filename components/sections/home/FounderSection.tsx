'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const philosophy = [
  {
    icon: '⚙',
    label: 'Systems over campaigns',
    body: 'A campaign is a tap you turn on and off. A system is plumbing. One runs your business. The other runs your retainer.',
  },
  {
    icon: '◎',
    label: 'Sequence is everything',
    body: 'Scaling traffic before fixing conversion is burning money. Every step in our framework exists because skipping it costs more than following it.',
  },
  {
    icon: '↗',
    label: 'Ownership, not retainers',
    body: 'At the end of every engagement, we hand over everything. If you never speak to us again, the system still runs. That is the only outcome we build toward.',
  },
  {
    icon: '⬡',
    label: 'Honest about what works',
    body: 'We do not measure impressions. We measure pipeline, CAC, LTV, and churn. If a number does not affect revenue, we do not report it.',
  },
];

const timeline = [
  { year: '2021', event: 'Watched a well-funded D2C brand collapse in real time. Great product. No system. Entirely preventable.' },
  { year: '2022', event: 'Ran the first revenue audit. The ads were fine. The leak was in everything that happened after the click.' },
  { year: '2023', event: 'After 40+ audits across D2C, B2B, B2C, and C2C — the same four breaks appeared every time. The framework was inevitable.' },
  { year: '2024', event: 'First client tripled ROAS in 4 months. The pipeline playbook shipped. 860 founders downloaded it in the first week.' },
  { year: '2025', event: 'Thryve is now the agency we needed in 2021. The one that builds the system, then walks away.' },
];

export default function FounderSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeYear, setActiveYear] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const id = setInterval(() => setActiveYear(i => (i + 1) % timeline.length), 2800);
    return () => clearInterval(id);
  }, [isMobile]);

  const fade = (delay = 0): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <section ref={ref} style={{ background: 'var(--bg)', padding: isMobile ? '72px 20px 64px' : 'clamp(80px,10vw,140px) clamp(20px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>

      <div aria-hidden style={{ position: 'absolute', right: isMobile ? '-40px' : '-60px', top: '50%', transform: 'translateY(-50%)', fontFamily: "'Cormorant Garamond',serif", fontSize: isMobile ? '160px' : 'clamp(200px,28vw,380px)', fontWeight: 700, color: 'var(--border)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.05em' }}>S</div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        <div style={{ ...fade(0), marginBottom: isMobile ? '40px' : '72px' }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--purple)' }}>The Founder</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '24px' : '32px', marginBottom: isMobile ? '48px' : '64px', alignItems: 'end' }}>

          <div style={fade(0.1)}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: isMobile ? 'clamp(42px,12vw,60px)' : 'clamp(48px,5.5vw,76px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.04, color: 'var(--text)', marginBottom: '24px' }}>
              Most agencies leave<br />
              <span style={{ color: 'var(--purple)', fontStyle: 'italic' }}>when the retainer ends.</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: isMobile ? '14px' : '15px', color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '20px', maxWidth: '480px' }}>
              In 2021, I watched a brand with real product-market fit slowly bleed out. Not because of bad creatives. Not because of a bad market. Because the moment they paused their agency retainer — everything stopped. There was nothing underneath.
            </p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: isMobile ? '14px' : '15px', color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '32px', maxWidth: '480px' }}>
              That is the agency model in its purest form: dependency dressed up as a service. Thryve was built to be the opposite. Infrastructure you own. Systems that run without us. Results that compound long after we leave.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px 24px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '16px', maxWidth: '400px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--purple), #4361EE)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', fontWeight: 600, color: '#FAFAFA' }}>S</span>
                <span style={{ position: 'absolute', bottom: '2px', right: '2px', width: '10px', height: '10px', borderRadius: '50%', background: '#2DC653', border: '2px solid var(--bg-secondary)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', fontWeight: 500, color: 'var(--text)', marginBottom: '2px' }}>Sakcham</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: 'var(--text-tertiary)', letterSpacing: '0.04em', marginBottom: '8px' }}>Founder & Revenue Strategy — Thryve</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['D2C', 'B2B SaaS', 'Systems'].map(tag => (
                    <span key={tag} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', fontWeight: 500, color: 'var(--purple)', background: 'var(--purple-light)', border: '1px solid var(--purple-mid)', padding: '2px 9px', borderRadius: '100px' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={fade(0.2)}>
            <div style={{ background: '#0A0A0A', borderRadius: '24px', padding: isMobile ? '32px 24px' : 'clamp(32px,4vw,52px)', position: 'relative', overflow: 'hidden', minHeight: isMobile ? 'auto' : '340px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--purple), transparent)' }} />
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '80px', lineHeight: 0.8, color: 'rgba(123,47,190,0.25)', marginBottom: '20px', userSelect: 'none' }}>"</div>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: isMobile ? 'clamp(22px,6vw,28px)' : 'clamp(22px,2.2vw,32px)', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.5, color: 'rgba(250,250,250,0.88)', marginBottom: '32px', flex: 1 }}>
                Every brand we have worked with had the same problem. It was never the product. It was never the market. It was always the system — or the absence of one.
              </p>
              <div style={{ borderTop: '1px solid rgba(250,250,250,0.08)', paddingTop: '24px' }}>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple)', marginBottom: '4px' }}>Sakcham</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: 'rgba(250,250,250,0.35)' }}>Founder, Thryve</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ ...fade(0.25), marginBottom: isMobile ? '48px' : '72px' }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '24px' }}>How we think</p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: '12px' }}>
            {philosophy.map((p, i) => (
              <div key={i} style={{ padding: isMobile ? '20px 16px' : '28px 24px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '16px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.07}s` }}>
                <div style={{ fontSize: isMobile ? '20px' : '24px', marginBottom: '12px', color: 'var(--purple)' }}>{p.icon}</div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: isMobile ? '16px' : '18px', fontWeight: 500, color: 'var(--text)', marginBottom: '8px', lineHeight: 1.2 }}>{p.label}</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: isMobile ? '11px' : '12px', color: 'var(--text-tertiary)', lineHeight: 1.7 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={fade(0.35)}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '28px' }}>How we got here</p>

          {isMobile ? (
            <div>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
                {timeline.map((_, i) => (
                  <div key={i} onClick={() => setActiveYear(i)} style={{ height: '4px', borderRadius: '2px', flex: i === activeYear ? 3 : 1, background: i === activeYear ? 'var(--purple)' : 'var(--border-strong)', cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)' }} />
                ))}
              </div>
              <div style={{ padding: '24px 20px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '16px', minHeight: '100px' }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '36px', fontWeight: 300, color: 'var(--purple)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '12px' }}>{timeline[activeYear].year}</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{timeline[activeYear].event}</p>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${timeline.length},1fr)`, position: 'relative' }}>
              <div style={{ position: 'absolute', top: '14px', left: 0, right: 0, height: '1px', background: 'var(--border)', zIndex: 0 }} />
              {timeline.map((item, i) => (
                <div key={i} onMouseEnter={() => setActiveYear(i)} style={{ paddingTop: '32px', paddingRight: '24px', cursor: 'default', position: 'relative', zIndex: 1, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${0.4 + i * 0.08}s` }}>
                  <div style={{ position: 'absolute', top: '8px', left: 0, width: '14px', height: '14px', borderRadius: '50%', background: i === activeYear ? 'var(--purple)' : 'var(--bg-secondary)', border: `2px solid ${i === activeYear ? 'var(--purple)' : 'var(--border-strong)'}`, transition: 'all 0.3s ease', transform: i === activeYear ? 'scale(1.3)' : 'scale(1)' }} />
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', fontWeight: 300, color: i === activeYear ? 'var(--purple)' : 'var(--text-tertiary)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '10px', transition: 'color 0.3s ease' }}>{item.year}</p>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: i === activeYear ? 'var(--text-secondary)' : 'var(--text-tertiary)', lineHeight: 1.7, transition: 'color 0.3s ease' }}>{item.event}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ ...fade(0.5), marginTop: isMobile ? '48px' : '72px', padding: isMobile ? '28px 20px' : '36px 40px', background: 'linear-gradient(135deg,var(--purple-light) 0%,rgba(67,97,238,0.06) 100%)', border: '1px solid var(--purple-mid)', borderRadius: '20px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: '20px' }}>
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: isMobile ? '26px' : 'clamp(22px,2.5vw,32px)', fontWeight: 500, color: 'var(--text)', lineHeight: 1.2, marginBottom: '6px' }}>Find the leak. In 15 minutes.</p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'var(--text-tertiary)' }}>No deck. No pitch. Sakcham will tell you exactly where your revenue system is broken — before you spend another rupee finding out the hard way.</p>
          </div>
          <Link href="/contact" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', fontWeight: 500, color: '#FAFAFA', background: 'var(--purple)', padding: '14px 28px', borderRadius: '100px', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
            Book Free Audit →
          </Link>
        </div>

      </div>
    </section>
  );
}
