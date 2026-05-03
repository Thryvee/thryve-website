'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const chapters = [
  {
    id: 'problem',
    tab: '01 — The Problem',
    headline: 'Most agencies sell campaigns.\nNot systems.',
    body: 'When you stop paying an agency, the results stop too. No infrastructure. No SOPs. No compounding. Just a monthly dependency that drains budget and never builds anything permanent.',
    stat: '73%', statLabel: 'of brands switch agencies within 18 months',
    accent: '#EF4444',
    nodes: [
      { x: 22, y: 28, label: 'Campaign A', sub: 'Paused ✗', c: '#EF4444', dim: true },
      { x: 55, y: 18, label: 'Campaign B', sub: 'Paused ✗', c: '#EF4444', dim: true },
      { x: 80, y: 33, label: 'Campaign C', sub: 'Paused ✗', c: '#EF4444', dim: true },
      { x: 50, y: 68, label: 'Results: 0', sub: 'Nothing left', c: '#666', dim: true },
    ],
    edges: [
      { x1: 22, y1: 28, x2: 50, y2: 68 },
      { x1: 55, y1: 18, x2: 50, y2: 68 },
      { x1: 80, y1: 33, x2: 50, y2: 68 },
    ],
  },
  {
    id: 'difference',
    tab: '02 — The Difference',
    headline: 'We build infrastructure.\nYou keep it forever.',
    body: 'A Thryve engagement ends with every SOP, flow, dashboard and framework fully documented and handed over. The system keeps running with or without us. That is the entire point.',
    stat: '4 months', statLabel: 'to full operational independence',
    accent: '#9B5DE5',
    nodes: [
      { x: 14, y: 50, label: 'Acquire', sub: 'CAC ↓ 40%', c: '#9B5DE5', dim: false },
      { x: 38, y: 50, label: 'Convert', sub: 'CVR ↑ 0.8%', c: '#4361EE', dim: false },
      { x: 62, y: 50, label: 'Retain', sub: 'LTV ↑ 3×', c: '#2DC653', dim: false },
      { x: 86, y: 50, label: 'Scale', sub: 'You own it', c: '#F4A261', dim: false },
    ],
    edges: [
      { x1: 14, y1: 50, x2: 38, y2: 50 },
      { x1: 38, y1: 50, x2: 62, y2: 50 },
      { x1: 62, y1: 50, x2: 86, y2: 50 },
    ],
  },
  {
    id: 'sequence',
    tab: '03 — The Sequence',
    headline: 'Order matters.\nSkipping costs you.',
    body: 'Scaling before fixing conversion burns budget. Retaining before acquiring is impossible. Acquiring before converting is waste. The sequence is non-negotiable — and we never skip it.',
    stat: '100%', statLabel: 'of engagements follow the exact same order',
    accent: '#4361EE',
    nodes: [
      { x: 50, y: 12, label: '01 Acquire', sub: 'Start here', c: '#9B5DE5', dim: false },
      { x: 83, y: 42, label: '02 Convert', sub: 'Then here', c: '#4361EE', dim: false },
      { x: 67, y: 80, label: '03 Retain', sub: 'Then here', c: '#2DC653', dim: false },
      { x: 28, y: 80, label: '04 Scale', sub: 'Finally', c: '#F4A261', dim: false },
      { x: 12, y: 42, label: 'No skipping', sub: 'Ever.', c: '#555', dim: true },
    ],
    edges: [
      { x1: 50, y1: 12, x2: 83, y2: 42 },
      { x1: 83, y1: 42, x2: 67, y2: 80 },
      { x1: 67, y1: 80, x2: 28, y2: 80 },
      { x1: 28, y1: 80, x2: 12, y2: 42 },
    ],
  },
  {
    id: 'identity',
    tab: '04 — The Identity',
    headline: 'Not an agency.\nA system studio.',
    body: 'We use the language of operators, not marketers. We measure pipeline and LTV:CAC — not impressions. We build compounding systems and hand them over complete. That is what Thryve is.',
    stat: '0', statLabel: 'lock-in contracts. Ever.',
    accent: '#7B2FBE',
    nodes: [
      { x: 50, y: 50, label: 'Thryve', sub: 'Revenue Systems', c: '#7B2FBE', dim: false },
      { x: 50, y: 14, label: 'Operators', sub: 'Not marketers', c: '#9B5DE5', dim: false },
      { x: 84, y: 67, label: 'Systems', sub: 'Not campaigns', c: '#4361EE', dim: false },
      { x: 16, y: 67, label: 'Ownership', sub: 'Not dependency', c: '#2DC653', dim: false },
    ],
    edges: [
      { x1: 50, y1: 50, x2: 50, y2: 14 },
      { x1: 50, y1: 50, x2: 84, y2: 67 },
      { x1: 50, y1: 50, x2: 16, y2: 67 },
    ],
  },
];

function DiagramCanvas({ ch, show }: { ch: typeof chapters[0]; show: boolean }) {
  return (
    <div style={{ position: 'relative', width: '100%', paddingTop: '78%' }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>

        {/* Grid */}
        {Array.from({ length: 10 }, (_, r) =>
          Array.from({ length: 10 }, (_, c) => (
            <circle key={`${r}-${c}`} cx={c * 11 + 1} cy={r * 11 + 1} r="0.35" fill="currentColor" opacity="0.08" />
          ))
        )}

        {/* Edges */}
        {ch.edges.map((e, i) => (
          <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
            stroke={ch.accent} strokeWidth="0.6" strokeOpacity={show ? 0.3 : 0}
            strokeDasharray="2.5 2" strokeLinecap="round"
            style={{ transition: `stroke-opacity 0.5s ease ${i * 0.08}s` }} />
        ))}

        {/* Nodes */}
        {ch.nodes.map((n, i) => (
          <g key={i} style={{ opacity: show ? (n.dim ? 0.3 : 1) : 0, transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.1}s` }}>
            <circle cx={n.x} cy={n.y} r="8.5" fill={n.c} fillOpacity="0.07" />
            <circle cx={n.x} cy={n.y} r="5.5" fill={n.c} fillOpacity="0.14" />
            <circle cx={n.x} cy={n.y} r="2.4" fill={n.c} />
            <text x={n.x} y={n.y - 10} textAnchor="middle" fontSize="2.9"
              fontFamily="'DM Sans',sans-serif" fontWeight="600" fill="var(--text)" opacity="0.85">{n.label}</text>
            <text x={n.x} y={n.y + 13} textAnchor="middle" fontSize="2.3"
              fontFamily="'DM Sans',sans-serif" fill="var(--text-tertiary)">{n.sub}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function BrandStoryDiagram() {
  const [active, setActive] = useState(0);
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    setTimeout(() => setShow(true), 300);
    timer.current = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setActive(a => (a + 1) % chapters.length);
        setShow(true);
      }, 240);
    }, 4800);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [visible]);

  const go = (i: number) => {
    if (timer.current) clearInterval(timer.current);
    setShow(false);
    setTimeout(() => { setActive(i); setShow(true); }, 240);
  };

  const ch = chapters[active];

  return (
    <section ref={ref} style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: isMobile ? '64px 20px 56px' : 'clamp(80px,10vw,130px) clamp(20px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>

      {/* Ambient orb */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', borderRadius: '50%', background: `radial-gradient(circle, ${ch.accent}08 0%, transparent 70%)`, pointerEvents: 'none', transition: 'background 0.8s ease' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: isMobile ? '36px' : '56px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)' }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--purple)', display: 'block', marginBottom: '14px' }}>Brand Identity</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: isMobile ? 'clamp(36px,10vw,52px)' : 'clamp(40px,4.5vw,64px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.06, color: 'var(--text)', maxWidth: '700px' }}>
            The story of how <span style={{ color: 'var(--purple)', fontStyle: 'italic' }}>Thryve is different.</span>
          </h2>
        </div>

        {/* Tab pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: isMobile ? '32px' : '48px', opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.2s' }}>
          {chapters.map((c, i) => (
            <button key={c.id} onClick={() => go(i)} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: isMobile ? '11px' : '12px', fontWeight: 500, padding: isMobile ? '8px 14px' : '9px 18px', borderRadius: '100px', border: `1px solid ${i === active ? c.accent : 'var(--border)'}`, background: i === active ? c.accent + '18' : 'transparent', color: i === active ? c.accent : 'var(--text-tertiary)', cursor: 'pointer', transition: 'all 0.25s ease', letterSpacing: '0.02em' }}>{c.tab}</button>
          ))}
        </div>

        {/* Main layout */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '32px' : '64px', alignItems: 'center' }}>

          {/* Left — content */}
          <div style={{ opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(12px)', transition: 'all 0.45s cubic-bezier(0.16,1,0.3,1)' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: isMobile ? 'clamp(30px,8vw,42px)' : 'clamp(32px,3.5vw,52px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.08, color: 'var(--text)', marginBottom: '20px', whiteSpace: 'pre-line' }}>{ch.headline}</h3>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: isMobile ? '13px' : '14px', color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '32px', maxWidth: '440px' }}>{ch.body}</p>

            {/* Stat */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', padding: '16px 24px', background: 'var(--bg)', border: `1px solid ${ch.accent}30`, borderRadius: '14px' }}>
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 300, letterSpacing: '-0.03em', color: ch.accent, lineHeight: 1 }}>{ch.stat}</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px', maxWidth: '200px', lineHeight: 1.4 }}>{ch.statLabel}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ marginTop: '32px', height: '2px', background: 'var(--border)', borderRadius: '1px', maxWidth: '320px' }}>
              <div style={{ height: '100%', background: ch.accent, borderRadius: '1px', width: `${((active + 1) / chapters.length) * 100}%`, transition: 'width 0.6s cubic-bezier(0.16,1,0.3,1), background 0.4s ease' }} />
            </div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '8px', letterSpacing: '0.06em' }}>{active + 1} of {chapters.length}</p>
          </div>

          {/* Right — diagram */}
          <div style={{ background: 'var(--bg)', border: `1px solid ${ch.accent}20`, borderRadius: '24px', padding: isMobile ? '24px' : '32px', transition: 'border-color 0.4s ease', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
            <DiagramCanvas ch={ch} show={show} />
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: isMobile ? '48px' : '64px', textAlign: 'center', opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.5s' }}>
          <Link href="/methodology" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', fontWeight: 500, color: 'var(--purple)', textDecoration: 'none', borderBottom: '1px solid var(--purple-mid)', paddingBottom: '2px', letterSpacing: '0.02em' }}>
            See the full methodology →
          </Link>
        </div>

      </div>
    </section>
  );
}
