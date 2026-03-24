'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const challenges = [
  { id: 'acquisition', label: 'Acquisition', icon: '↗', desc: 'CAC too high, ROAS declining, ads not working', color: '#9B5DE5' },
  { id: 'conversion', label: 'Conversion', icon: '⟳', desc: 'Traffic exists but nobody is buying', color: '#4361EE' },
  { id: 'retention', label: 'Retention', icon: '♻', desc: 'Customers buy once and never return', color: '#2DC653' },
  { id: 'scaling', label: 'Scaling', icon: '⬆', desc: 'Growing but systems are breaking', color: '#F4A261' },
];

export default function ChallengeSelector() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const handleSelect = (id: string) => {
    setSelected(id);
    setTimeout(() => router.push(`/contact?challenge=${id}`), 400);
  };

  return (
    <section style={{ padding: isMobile ? '48px 20px 56px' : '80px 80px 100px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple)', display: 'block', marginBottom: '12px' }}>
            Quick diagnosis
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 500, letterSpacing: '-0.025em', color: 'var(--text)', lineHeight: 1.1 }}>
            Where is your biggest leak?
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'var(--text-tertiary)', marginTop: '12px' }}>
            Pick the one that hurts most. We will tell you exactly how to fix it.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '12px' }}>
          {challenges.map((c) => (
            <button
              key={c.id}
              onClick={() => handleSelect(c.id)}
              style={{
                background: selected === c.id ? c.color : 'var(--surface)',
                border: '1px solid',
                borderColor: selected === c.id ? c.color : 'var(--border)',
                borderRadius: '16px', padding: '28px 20px',
                cursor: 'pointer', textAlign: 'left',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                transform: selected === c.id ? 'scale(1.03)' : 'scale(1)',
              }}
              onMouseEnter={e => {
                if (selected !== c.id) {
                  (e.currentTarget as HTMLElement).style.borderColor = c.color;
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                }
              }}
              onMouseLeave={e => {
                if (selected !== c.id) {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                }
              }}
            >
              <div style={{ fontSize: '20px', marginBottom: '12px', color: selected === c.id ? '#FAFAFA' : c.color }}>
                {c.icon}
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 500, color: selected === c.id ? '#FAFAFA' : 'var(--text)', marginBottom: '8px' }}>
                {c.label}
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: selected === c.id ? 'rgba(255,255,255,0.7)' : 'var(--text-tertiary)', lineHeight: 1.5 }}>
                {c.desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
