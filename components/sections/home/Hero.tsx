'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const rotating = ['Marketing', 'Sales', 'Lead Gen', 'Operations', 'Finance', 'Management'];
const cards = [
  { model: 'D2C', location: 'Delhi', label: 'A D2C skincare brand, Delhi', duration: '4 months', metrics: [{ k: 'ROAS', v: '3.1x' }, { k: 'CAC', v: 'Rs 312' }] },
  { model: 'B2B', location: 'Bangalore', label: 'A B2B SaaS, Bangalore', duration: '4 months', metrics: [{ k: 'Pipeline', v: 'Rs 18L' }, { k: 'Leads/mo', v: '34' }] },
  { model: 'B2C', location: 'Mumbai', label: 'A B2C fitness brand, Mumbai', duration: '4 months', metrics: [{ k: 'CVR', v: '2.4%' }, { k: 'Email Rev', v: 'Rs 3.8L' }] },
  { model: 'C2C', location: 'Hyderabad', label: 'A C2C marketplace, Hyderabad', duration: '4 months', metrics: [{ k: 'LTV', v: 'Rs 4,800' }, { k: 'Churn', v: '9%' }] },
  { model: 'D2C', location: 'Pune', label: 'A D2C wellness brand, Pune', duration: '4 months', metrics: [{ k: 'ROAS', v: '2.8x' }, { k: 'Revenue', v: 'Rs 14L' }] },
  { model: 'B2B', location: 'Delhi', label: 'A B2B logistics firm, Delhi', duration: '4 months', metrics: [{ k: 'Pipeline', v: 'Rs 24L' }, { k: 'Cycle', v: '18 days' }] },
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [cardY, setCardY] = useState(190);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => { setWordIndex(i => (i + 1) % rotating.length); setFading(false); }, 300);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => { setActiveCard(i => (i + 1) % cards.length); }, 2400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const scrolled = -section.getBoundingClientRect().top;
      const progress = Math.max(0, Math.min(scrolled / 280, 1));
      const eased = 1 - Math.pow(1 - progress, 3);
      setCardY(190 - eased * 190);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (isMobile) {
    return (
      <section style={{ background: 'var(--bg)', padding: '96px 20px 48px', minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, color: 'var(--purple)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Revenue Systems Agency</span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 9vw, 44px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.12, color: 'var(--text)', marginBottom: '10px' }}>
          Most Businesses Don't Have A{' '}
          <span style={{ color: 'var(--purple)', fontStyle: 'italic', opacity: fading ? 0 : 1, transition: 'opacity 0.3s ease', display: 'inline-block' }}>
            {rotating[wordIndex]}
          </span>{' '}Problem.
        </h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 500, color: 'var(--purple)', marginBottom: '16px', lineHeight: 1.2 }}>
          They Have A Revenue System Problem.
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'var(--text-tertiary)', marginBottom: '28px', lineHeight: 1.7 }}>
          Trusted by startups across B2B, B2C, C2C and D2C to build the systems that scale.
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link href='/contact' style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 500, color: '#FAFAFA', background: 'var(--purple)', padding: '14px 28px', borderRadius: '100px', textDecoration: 'none', display: 'inline-flex', flex: 1, justifyContent: 'center' }}>
            Book Free Audit
          </Link>
          <Link href='/work' style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 500, color: 'var(--text)', background: 'transparent', padding: '14px 28px', borderRadius: '100px', textDecoration: 'none', display: 'inline-flex', flex: 1, justifyContent: 'center', border: '1.5px solid var(--border)' }}>
            See Our Work
          </Link>
        </div>
        {/* Mobile result pills */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '32px', flexWrap: 'wrap' }}>
          {[['3.1x', 'ROAS'], ['Rs 312', 'CAC'], ['Rs 18L', 'Pipeline'], ['9%', 'Churn']].map(([v, k], i) => (
            <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '100px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontWeight: 600, color: 'var(--purple)' }}>{v}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>{k}</span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div ref={sectionRef} style={{ position: 'relative' }}>
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '180px 80px 260px', background: 'var(--bg)', overflow: 'hidden', position: 'relative' }}>
        <div style={{ maxWidth: '800px' }}>
          <div style={{ marginBottom: '20px', opacity: 0, animation: 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s forwards' }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, color: 'var(--purple)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Revenue Systems Agency</span>
          </div>
          <div style={{ marginBottom: '18px', opacity: 0, animation: 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s forwards' }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 4.8vw, 68px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.12, color: 'var(--text)', textAlign: 'left', marginBottom: '6px' }}>
              Most Businesses Don't Have A{' '}
              <span style={{ color: 'var(--purple)', fontStyle: 'italic', opacity: fading ? 0 : 1, transform: fading ? 'translateY(-6px)' : 'translateY(0)', transition: 'opacity 0.3s ease, transform 0.3s ease', display: 'inline-block' }}>
                {rotating[wordIndex]}
              </span>{' '}Problem.
            </h1>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(18px, 2.2vw, 30px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--purple)', margin: 0 }}>
              They Have A Revenue System Problem.
            </p>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'var(--text-tertiary)', marginBottom: '32px', maxWidth: '440px', lineHeight: 1.7, opacity: 0, animation: 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.6s forwards' }}>
            The world's leading Revenue Systems Agency — trusted by startups across B2B, B2C, C2C and D2C to build the systems that scale.
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', opacity: 0, animation: 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.8s forwards' }}>
            <Link href='/contact' style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500, color: '#FAFAFA', background: 'var(--purple)', padding: '13px 28px', borderRadius: '100px', textDecoration: 'none', display: 'inline-flex', border: '1.5px solid var(--purple)' }}>Book Free Audit</Link>
            <Link href='/work' style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500, color: 'var(--text)', background: 'transparent', padding: '13px 28px', borderRadius: '100px', textDecoration: 'none', display: 'inline-flex', border: '1.5px solid rgba(10,10,10,0.15)' }}>See Our Work</Link>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, transform: `translateY(${cardY}px)`, transition: 'transform 0.06s linear', opacity: 0, animation: 'fadeIn 0.5s ease 0.3s forwards' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', height: '242px', gap: '6px', padding: '0 6px' }}>
            {cards.map((card, i) => {
              const isActive = i === activeCard;
              const bc = isActive ? 'rgba(255,255,255,0.1)' : 'var(--border)';
              return (
                <div key={i} onClick={() => setActiveCard(i)} style={{ background: isActive ? '#0A0A0A' : i % 2 === 0 ? 'var(--surface)' : 'var(--bg-secondary)', borderTop: `1px solid ${bc}`, borderRight: `1px solid ${bc}`, borderLeft: 'none', borderBottom: 'none', borderTopLeftRadius: '14px', borderTopRightRadius: '14px', padding: '18px', transition: 'background 0.5s cubic-bezier(0.16,1,0.3,1)', boxShadow: isActive ? '0 -10px 40px rgba(0,0,0,0.18)' : 'none', cursor: 'pointer', height: '242px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden', position: 'relative' }}>
                  {isActive && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--purple), transparent)' }} />}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '8px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: isActive ? 'rgba(250,250,250,0.4)' : 'var(--text-tertiary)', transition: 'color 0.5s ease' }}>{card.model} — {card.location}</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '8px', color: isActive ? 'rgba(250,250,250,0.25)' : 'var(--text-tertiary)', transition: 'color 0.5s ease' }}>{card.duration}</span>
                    </div>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isActive ? '15px' : '13px', fontWeight: 500, color: isActive ? '#FAFAFA' : 'var(--text)', lineHeight: 1.3, transition: 'all 0.5s ease' }}>{card.label}</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                    {card.metrics.map((m, j) => {
                      const mbc = isActive ? 'rgba(255,255,255,0.07)' : 'var(--border)';
                      return (
                        <div key={j} style={{ background: isActive ? 'rgba(250,250,250,0.07)' : 'rgba(10,10,10,0.03)', borderRadius: '8px', padding: '10px', borderTop: `1px solid ${mbc}`, borderBottom: `1px solid ${mbc}`, borderLeft: `1px solid ${mbc}`, borderRight: `1px solid ${mbc}`, transition: 'all 0.5s ease' }}>
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '7px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: isActive ? 'rgba(250,250,250,0.35)' : 'var(--text-tertiary)', marginBottom: '4px', transition: 'color 0.5s ease' }}>{m.k}</p>
                          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 600, color: 'var(--purple)', lineHeight: 1 }}>{m.v}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <style>{`
          @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        `}</style>
      </section>
    </div>
  );
}
