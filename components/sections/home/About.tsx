'use client';
import { useEffect, useRef, useState } from 'react';

export default function About() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 80px)', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '48px', alignItems: 'start' }}>
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)', transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple)', display: 'block', marginBottom: '16px' }}>Why Thryve Exists</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--text)', marginBottom: '24px' }}>
            Most founders are sold campaigns.<br/>
            <span style={{ color: 'var(--purple)', fontStyle: 'italic' }}>We sell systems.</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>
            Thryve was built after watching too many good brands fail for the wrong reason. Not bad products. Not bad founders. Bad systems. Inconsistent acquisition. Leaking funnels. Zero retention. Founders buried in execution with no visibility into what was actually working.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '40px' }}>
            The four-pillar framework is what we wish every founder had from day one. Acquire. Convert. Retain. Scale. In that order. No skipping. No guessing. Just a system that compounds.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[['Sakcham', 'Founder & Strategy']].map(([name, role], i) => (
              <div key={i} style={{ padding: '20px 0', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 500, color: 'var(--text)' }}>{name}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: 'var(--text-tertiary)', letterSpacing: '0.04em' }}>{role}</p>
                </div>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--purple-light)', border: '1px solid var(--purple-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', fontWeight: 600, color: 'var(--purple)' }}>{name[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)', transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s' }}>
          <div style={{ background: '#0A0A0A', borderRadius: '24px', padding: 'clamp(24px, 5vw, 48px)', color: '#FAFAFA' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(20px, 2.5vw, 32px)', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.5, color: 'rgba(250,250,250,0.8)', marginBottom: '32px' }}>
              "The brands that win in the next five years will not be the ones with the biggest ad budgets. They will be the ones with the best systems."
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[['a full engagement', 'Total engagement value'],['4 months', 'To full system independence'],['4 pillars', 'One sequence, no skipping'],['0', 'Lock-in contracts']].map(([val, label], i) => (
                <div key={i} style={{ padding: '20px', background: 'rgba(250,250,250,0.05)', borderRadius: '12px', border: '1px solid rgba(250,250,250,0.08)' }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 500, color: '#FAFAFA', lineHeight: 1, marginBottom: '6px' }}>{val}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'rgba(250,250,250,0.4)', letterSpacing: '0.04em' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
