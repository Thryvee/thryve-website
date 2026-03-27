'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Thryve average improvement benchmarks (from case studies & pillar data)
const ROAS_TARGET_MULTIPLIER = 2;     // minimum 2x ROAS guarantee
const CVR_IMPROVEMENT_ABS = 0.008;    // 0.8% absolute CVR improvement
const REPEAT_RATE_UPLIFT = 0.31;      // 31% more repeat purchases

function calcUplift(revenue: number, roas: number, cvr: number, repeat: number) {
  // Acquisition: 40% of revenue is typically from paid. ROAS improvement drives that.
  const targetROAS = Math.max(roas * ROAS_TARGET_MULTIPLIER, roas + 1);
  const roasGain = Math.min((targetROAS - roas) / roas, 1.8); // cap at 180%
  const acquisitionUplift = revenue * 0.40 * roasGain;

  // Conversion: 0.8% absolute CVR lift on non-paid traffic (60% of revenue)
  const cvrGain = Math.min(CVR_IMPROVEMENT_ABS / (cvr / 100), 0.75); // cap at 75%
  const conversionUplift = revenue * 0.60 * cvrGain;

  // Retention: 31% improvement on existing repeat-revenue pool
  const retentionUplift = revenue * (repeat / 100) * REPEAT_RATE_UPLIFT;

  return {
    acquisition: Math.round(acquisitionUplift * 100) / 100,
    conversion: Math.round(conversionUplift * 100) / 100,
    retention: Math.round(retentionUplift * 100) / 100,
    total: Math.round((acquisitionUplift + conversionUplift + retentionUplift) * 100) / 100,
  };
}

function fmt(n: number) {
  if (n >= 100) return `₹${Math.round(n)}L`;
  if (n >= 10) return `₹${n.toFixed(1)}L`;
  return `₹${n.toFixed(2)}L`;
}

function SliderInput({
  label, value, min, max, step, unit, onChange, accent,
}: {
  label: string; value: number; min: number; max: number; step: number;
  unit: string; onChange: (v: number) => void; accent: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
          {label}
        </label>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 500, color: '#fafafa', letterSpacing: '-0.02em' }}>
          {unit === '₹' ? `₹${value}L` : unit === 'x' ? `${value}x` : `${value}%`}
        </span>
      </div>
      <div style={{ position: 'relative', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.08)' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${pct}%`, borderRadius: '2px', background: accent, transition: 'width 0.1s ease' }} />
        <input
          type="range"
          min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{
            position: 'absolute', inset: '-8px 0',
            width: '100%', height: '20px',
            opacity: 0, cursor: 'pointer', margin: 0,
          }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', color: 'rgba(255,255,255,0.2)' }}>{unit === '₹' ? `₹${min}L` : unit === 'x' ? `${min}x` : `${min}%`}</span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', color: 'rgba(255,255,255,0.2)' }}>{unit === '₹' ? `₹${max}L` : unit === 'x' ? `${max}x` : `${max}%`}</span>
      </div>
    </div>
  );
}

export default function RevenueCalculator() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const [revenue, setRevenue] = useState(5);
  const [roas, setRoas] = useState(1.2);
  const [cvr, setCvr] = useState(1.5);
  const [repeat, setRepeat] = useState(20);

  const uplift = calcUplift(revenue, roas, cvr, repeat);
  const bars = [
    { label: 'Acquisition', value: uplift.acquisition, color: '#9B5DE5', bg: 'rgba(155,93,229,0.15)' },
    { label: 'Conversion', value: uplift.conversion, color: '#4361EE', bg: 'rgba(67,97,238,0.15)' },
    { label: 'Retention', value: uplift.retention, color: '#2DC653', bg: 'rgba(45,198,83,0.15)' },
  ];
  const maxBar = Math.max(...bars.map(b => b.value), 0.01);

  return (
    <section style={{ background: '#0A0A0A', padding: isMobile ? '64px 0 56px' : 'clamp(80px, 10vw, 120px) 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '0 24px' : '0 clamp(24px, 5vw, 80px)' }}>

        {/* Header */}
        <div style={{ marginBottom: isMobile ? '40px' : '64px' }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--purple)', display: 'block', marginBottom: '14px' }}>
            Revenue Impact Calculator
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 'clamp(36px, 9vw, 48px)' : 'clamp(40px, 5vw, 68px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.05, color: '#fafafa', marginBottom: '16px' }}>
            See your upside<br />
            <span style={{ color: 'var(--purple)', fontStyle: 'italic' }}>before the call.</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? '13px' : '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, maxWidth: '520px' }}>
            Input your current numbers. We&apos;ll show you exactly how much revenue sits unlocked across Acquisition, Conversion, and Retention — based on Thryve&apos;s average improvement benchmarks.
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '32px' : '48px',
          alignItems: 'start',
        }}>

          {/* Left — inputs */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            padding: isMobile ? '28px 24px' : '40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}>
            <SliderInput label="Monthly Revenue" value={revenue} min={1} max={100} step={1} unit="₹" onChange={setRevenue} accent="#9B5DE5" />
            <SliderInput label="Current ROAS" value={roas} min={0.5} max={5} step={0.1} unit="x" onChange={setRoas} accent="#4361EE" />
            <SliderInput label="Current CVR" value={cvr} min={0.1} max={5} step={0.1} unit="%" onChange={setCvr} accent="#2DC653" />
            <SliderInput label="Repeat Purchase Rate" value={repeat} min={5} max={70} step={1} unit="%" onChange={setRepeat} accent="#F4A261" />
          </div>

          {/* Right — output */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Total uplift card */}
            <div style={{
              background: 'linear-gradient(135deg, #1a0533 0%, #0a0a2e 100%)',
              border: '1px solid rgba(123,47,190,0.3)',
              borderRadius: '20px',
              padding: isMobile ? '28px 24px' : '40px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--purple), transparent)' }} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '8px' }}>
                Potential monthly uplift
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 'clamp(52px, 12vw, 72px)' : 'clamp(56px, 8vw, 88px)', fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1, color: '#fafafa', marginBottom: '6px' }}>
                {fmt(uplift.total)}
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
                per month, based on Thryve&apos;s average benchmarks
              </p>
            </div>

            {/* Breakdown bars */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px',
              padding: isMobile ? '24px' : '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>Breakdown</p>
              {bars.map(b => (
                <div key={b.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.55)' }}>{b.label}</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 500, color: b.color }}>{fmt(b.value)}</span>
                  </div>
                  <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${(b.value / maxBar) * 100}%`,
                      borderRadius: '2px',
                      background: b.color,
                      transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)',
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '16px 32px',
                borderRadius: '100px',
                background: 'var(--purple)',
                color: '#FAFAFA',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.03em',
                textDecoration: 'none',
                border: '1.5px solid var(--purple)',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                boxShadow: '0 8px 32px rgba(123,47,190,0.3)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = 'var(--purple)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'var(--purple)';
                (e.currentTarget as HTMLElement).style.color = '#FAFAFA';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(123,47,190,0.3)';
              }}
            >
              Book the audit — unlock {fmt(uplift.total)} / month
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: 'rgba(255,255,255,0.2)', textAlign: 'center', lineHeight: 1.6 }}>
              Based on averages across Thryve engagements. Actual results vary by brand and market.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
