import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import Cursor from '@/components/ui/Cursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import MethodologyScroll from '@/components/sections/methodology/Accordion';
import Guarantee from '@/components/sections/methodology/Guarantee';
import Comparison from '@/components/sections/methodology/Comparison';

export default function Methodology() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main>
        {/* Hero */}
        <section style={{ padding: 'clamp(90px, 12vw, 160px) clamp(20px, 5vw, 80px) clamp(40px, 6vw, 100px)', background: 'var(--bg)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple)', display: 'block', marginBottom: '20px' }}>
              Our Method
            </span>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(56px, 8vw, 112px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--text)', marginBottom: '28px' }}>
              Four pillars.<br />
              <span style={{ color: 'var(--purple)', fontStyle: 'italic' }}>One sequence.</span>
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '520px', marginBottom: '48px' }}>
              Every Thryve engagement follows the same order. Acquire first. Then Convert. Then Retain. Then Scale. Skipping steps is how brands stall. The sequence exists for a reason.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '1px', background: 'var(--text-tertiary)' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Scroll to go deeper
              </span>
            </div>
          </div>
        </section>

        <MethodologyScroll />
        <Guarantee />
        <Comparison />

        {/* CTA at bottom */}
        <section style={{ padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 80px)', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px' }}>
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--text)', marginBottom: '12px' }}>
                Ready to build<br />
                <span style={{ color: 'var(--purple)', fontStyle: 'italic' }}>your system?</span>
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'var(--text-tertiary)', lineHeight: 1.7, maxWidth: '400px' }}>
                Start with a free 15-minute audit. We will tell you exactly which pillar to fix first.
              </p>
            </div>
            <a href='/contact' style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 500, color: '#FAFAFA', background: 'var(--purple)', padding: '16px 36px', borderRadius: '100px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1.5px solid var(--purple)', transition: 'all 0.3s ease', whiteSpace: 'nowrap' }}>
              Book Free Audit →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
