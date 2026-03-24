'use client';
import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 47, suffix: '+', label: 'brands audited' },
  { value: 340, suffix: '+', label: 'playbook downloads' },
  { value: 244, suffix: '%', label: 'avg ROAS improvement' },
  { value: 100, suffix: '%', label: 'results or we stop' },
];

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1200, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(eased * end));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{val}{suffix}</span>;
}

export default function ProofBar() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border)',
      padding: '16px 24px',
      display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between',
      gap: '16px',
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {i > 0 && <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--border-strong)', display: 'inline-block' }} />}
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontWeight: 500, color: 'var(--purple)' }}>
            <CountUp end={s.value} suffix={s.suffix} />
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'var(--text-tertiary)', letterSpacing: '0.04em' }}>
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
