'use client';
import { useEffect, useRef, useState } from 'react';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import Cursor from '@/components/ui/Cursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import PlaybookCards from '@/components/sections/playbook/PlaybookCards';

const chapters = [
  { pb: '30-Day D2C', number: '01', title: 'Acquisition Architecture', body: 'Meta campaign structure — Prospecting Broad, Lookalike 1%, Retargeting Hot and Warm. The 3-angle creative framework: Problem-led, Proof-led, Offer-led. Run a minimum of 3 creatives per ad set. Never optimise for Add to Cart unless you have zero purchase data.', accent: '#9B5DE5' },
  { pb: '30-Day D2C', number: '02', title: '7-Point Landing Page Audit', body: '5-second test, social proof above the fold, CTA contrast and placement, page speed under 3 seconds, mobile tap targets at 44px+, risk reversal near the buy button, checkout form under 4 fields. Run this before touching any ads.', accent: '#9B5DE5' },
  { pb: '30-Day D2C', number: '03', title: 'Retention Stack', body: '5 email flows: Welcome, Post-Purchase, Win-Back, VIP, Abandonment. 3-tier loyalty programme. NPS system — detractors contacted within 48 hours. Two-sided referral programme. LTV:CAC target above 3:1.', accent: '#9B5DE5' },
  { pb: '30-Day D2C', number: '04', title: 'Scaling Framework', body: '6-type constraint diagnostic. SOPs for the 3 highest-leverage processes. KPI dashboard tracking ROAS, CAC, CVR, Repeat Rate, and LTV:CAC weekly. Hiring triggers so you know exactly when and who to bring in.', accent: '#9B5DE5' },
  { pb: '90-Day Launch', number: '01', title: 'The Foundation', body: 'Customer Clarity Framework — Early Adopter Profile, Problem Definition (Surface Problem → Real Problem → Core Fear), and the Thryve Positioning Framework across 4 lenses. The work nobody wants to do that determines everything that follows.', accent: '#4361EE' },
  { pb: '90-Day Launch', number: '02', title: 'Offer Construction', body: 'Pricing framework — cost-plus vs value-based vs anchoring. The Offer Validation Test: 10 real conversations before a single rupee of ad spend. Positioning statement formula. Most founders skip this and pay for it in wasted ad budget.', accent: '#4361EE' },
  { pb: '90-Day Launch', number: '03', title: 'First 10 Customers', body: 'Exact DM and email outreach sequence with scripts. How to identify and reach early adopters before you have a brand. Social proof collection from your first buyers. Most founders using this chapter hit 10 customers within 3 weeks.', accent: '#4361EE' },
  { pb: '90-Day Launch', number: '04', title: 'Infrastructure', body: 'Email setup, website non-negotiables, social proof system, referral programme blueprint, and the 3 SOPs every early-stage brand needs before running paid ads. Build this once. It runs permanently.', accent: '#4361EE' },
];

function ChapterScroll() {
  const [isMobileChapter, setIsMobileChapter] = useState(false);
  useEffect(() => {
    const check = () => setIsMobileChapter(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(-rect.top / scrollable, 1));
      setProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const activeIndex = Math.min(Math.floor(progress * chapters.length), chapters.length - 1);
  const active = chapters[activeIndex];

  return (
    <div ref={sectionRef} style={{ height: `${chapters.length * 100}vh`, position: 'relative' }}>
      <div style={{ position: isMobileChapter ? 'relative' : 'sticky', top: 0, height: isMobileChapter ? 'auto' : '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>

        {/* Progress line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--border)' }}>
          <div style={{ height: '100%', background: active.accent, width: `${progress * 100}%`, transition: 'width 0.1s linear' }} />
        </div>

        {/* Chapter dots */}
        <div style={{ position: 'absolute', top: '32px', left: '80px', display: 'flex', gap: '8px', zIndex: 10 }}>
          {chapters.map((_, i) => (
            <div key={i} style={{ width: i === activeIndex ? '20px' : '6px', height: '6px', borderRadius: '3px', background: i === activeIndex ? active.accent : 'var(--border-strong)', transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)' }} />
          ))}
        </div>

        {/* Watermark number */}
        <div style={{ position: 'absolute', right: '-20px', bottom: '-40px', fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(200px, 30vw, 400px)', fontWeight: 700, color: 'var(--border)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.05em', transition: 'all 0.8s ease' }}>
          {active.number}
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 80px)', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

          {/* Left */}
          <div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '32px' }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: active.accent, background: active.accent + '12', border: '1px solid ' + active.accent + '28', padding: '4px 12px', borderRadius: '100px' }}>
                {active.pb}
              </span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>Chapter {active.number}</span>
            </div>

            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.08, color: 'var(--text)', marginBottom: '24px', transition: 'all 0.5s ease' }}>
              {active.title}
            </h2>

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '440px', transition: 'all 0.5s ease' }}>
              {active.body}
            </p>
          </div>

          {/* Right — chapter list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {chapters.map((ch, i) => (
              <div key={i} style={{ padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '16px', alignItems: 'center', opacity: i === activeIndex ? 1 : 0.2, transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1)' }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '0.1em', color: ch.accent, flexShrink: 0, width: '20px' }}>{ch.number}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', color: 'rgba(255,255,255,0.3)', marginBottom: '2px', letterSpacing: '0.06em' }}>{ch.pb}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', fontWeight: 500, color: 'var(--text)' }}>{ch.title}</p>
                </div>
                {i === activeIndex && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: ch.accent, flexShrink: 0 }} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Playbook() {
  const [wordVisible, setWordVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setWordVisible(true), 100);
  }, []);

  const words = "Two playbooks. Zero fluff.".split(' ');
  const words2 = "Take the system.".split(' ');

  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main>

        {/* Light hero with animated gradient */}
        <section style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', overflow: 'hidden', position: 'relative' }}>

          {/* Animated gradient orbs */}
          <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,47,190,0.08) 0%, transparent 70%)', pointerEvents: 'none', animation: 'drift1 8s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(67,97,238,0.06) 0%, transparent 70%)', pointerEvents: 'none', animation: 'drift2 10s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px', height: '800px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,93,229,0.04) 0%, transparent 70%)', pointerEvents: 'none', animation: 'drift3 12s ease-in-out infinite' }} />

          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 80px)', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

            {/* Left — text */}
            <div>
              <div style={{ marginBottom: '24px', opacity: 0, animation: 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s forwards' }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, color: 'var(--purple)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Free Resources
                </span>
              </div>

              <div style={{ marginBottom: '28px' }}>
                <div style={{ overflow: 'hidden', marginBottom: '4px' }}>
                  {words.map((word, i) => (
                    <span key={i} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(40px, 5.5vw, 80px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.08, color: 'var(--text)', display: 'inline-block', marginRight: '0.2em', transform: wordVisible ? 'translateY(0)' : 'translateY(110%)', opacity: wordVisible ? 1 : 0, transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.08}s` }}>
                      {word}
                    </span>
                  ))}
                </div>
                <div style={{ overflow: 'hidden' }}>
                  {words2.map((word, i) => (
                    <span key={i} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(40px, 5.5vw, 80px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.08, color: 'var(--purple)', fontStyle: 'italic', display: 'inline-block', marginRight: '0.2em', transform: wordVisible ? 'translateY(0)' : 'translateY(110%)', opacity: wordVisible ? 1 : 0, transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.5 + i * 0.08}s` }}>
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '440px', marginBottom: '48px', opacity: 0, animation: 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.9s forwards' }}>
                Everything we use with clients — condensed into frameworks you can apply immediately. Free, forever. No fluff, no padding, no filler.
              </p>

              {/* Stats row */}
              <div style={{ display: 'flex', gap: '32px', opacity: 0, animation: 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 1.1s forwards' }}>
                {[['860+', 'Downloads'], ['28', 'Frameworks'], ['90+', 'Pages total']].map(([val, label], i) => (
                  <div key={i}>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1, marginBottom: '4px' }}>{val}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'var(--text-tertiary)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — floating mockup cards */}
            <div style={{ position: 'relative', height: '480px', opacity: 0, animation: 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s forwards' }}>
              {/* Back card */}
              <div style={{ position: 'absolute', top: '40px', right: '0', width: '320px', height: '380px', background: 'linear-gradient(135deg, #0a0a2e 0%, #1a1a4e 100%)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', transform: 'rotate(6deg)', boxShadow: '0 24px 60px rgba(0,0,0,0.4)' }}>
                <div style={{ padding: '28px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(67,97,238,0.2)', border: '1px solid rgba(67,97,238,0.3)', marginBottom: '20px' }} />
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4361EE', marginBottom: '8px' }}>Early Stage</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 500, color: '#FAFAFA', lineHeight: 1.2 }}>90-Day Brand Launch Playbook</p>
                </div>
              </div>
              {/* Front card */}
              <div style={{ position: 'absolute', top: '0', left: '0', width: '320px', height: '380px', background: 'linear-gradient(135deg, #1a0533 0%, #2d1b4e 100%)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', transform: 'rotate(-3deg)', boxShadow: '0 32px 80px rgba(0,0,0,0.5)', animation: 'float 4s ease-in-out infinite' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #9B5DE5, transparent)', borderRadius: '20px 20px 0 0' }} />
                <div style={{ padding: '28px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(155,93,229,0.2)', border: '1px solid rgba(155,93,229,0.3)', marginBottom: '20px' }} />
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B5DE5', marginBottom: '8px' }}>D2C Brands</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 500, color: '#FAFAFA', lineHeight: 1.2, marginBottom: '32px' }}>30-Day D2C Growth Playbook</p>
                  {['Acquisition Architecture', 'Creative Testing', 'Conversion Audit', 'Retention Stack'].map((ch, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#9B5DE5', flexShrink: 0 }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{ch}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(24px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes float {
              0%, 100% { transform: rotate(-3deg) translateY(0px); }
              50% { transform: rotate(-3deg) translateY(-14px); }
            }
            @keyframes drift1 {
              0%, 100% { transform: translate(0, 0) scale(1); }
              33% { transform: translate(40px, -30px) scale(1.05); }
              66% { transform: translate(-20px, 20px) scale(0.97); }
            }
            @keyframes drift2 {
              0%, 100% { transform: translate(0, 0) scale(1); }
              40% { transform: translate(-50px, 30px) scale(1.08); }
              70% { transform: translate(20px, -20px) scale(0.95); }
            }
            @keyframes drift3 {
              0%, 100% { transform: translate(-50%, -50%) scale(1); }
              50% { transform: translate(-50%, -50%) scale(1.12); }
            }
          `}</style>
        </section>

        {/* Scroll chapter previews */}
        <ChapterScroll />

        {/* Playbook cards */}
        <PlaybookCards />

        {/* Bottom CTA */}
        <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px)', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px' }}>
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--text)', marginBottom: '10px' }}>
                Want us to build it<br />
                <span style={{ color: 'var(--purple)', fontStyle: 'italic' }}>for you instead?</span>
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'var(--text-tertiary)', lineHeight: 1.7, maxWidth: '400px' }}>
                The playbooks show you what to do. Thryve does it with you — and hands you a system that runs without us.
              </p>
            </div>
            <a href='/contact' style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 500, color: '#FAFAFA', background: 'var(--purple)', padding: '16px 36px', borderRadius: '100px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1.5px solid var(--purple)', whiteSpace: 'nowrap' }}>
              Book Free Audit →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
