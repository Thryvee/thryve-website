'use client';
import { useState, useEffect } from 'react';
const rows = [
  { label: 'Contract length', thryve: 'Pilot month — then 3 months if results are there', agency: 'Minimum 6–12 month retainer upfront', icon: '📋' },
  { label: 'What you own at the end', thryve: 'Every SOP, flow, dashboard, and framework — yours permanently', agency: 'Nothing. Deliverables belong to the agency', icon: '🏆' },
  { label: 'How results are measured', thryve: 'Specific metrics agreed upfront — ROAS, CVR, LTV, churn', agency: 'Vanity metrics — impressions, reach, engagement', icon: '📊' },
  { label: 'If results do not come', thryve: 'We stop. No awkward conversation, no invoice', agency: 'You still pay. And they blame the market', icon: '🛑' },
  { label: 'Founder time required', thryve: 'Low — weekly 30-minute sync. Everything else we handle', agency: 'High — constant briefing, approval loops, chasing updates', icon: '⏱' },
  { label: 'What scales with you', thryve: 'The system. SOPs, dashboards, teams — built to run without us', agency: 'Their team. Remove the agency, everything stops', icon: '📈' },
  { label: 'Transparency', thryve: 'Live dashboard — every task, metric, and deliverable visible', agency: 'Monthly PDF reports, if you are lucky', icon: '👁' },
];

// MOBILE-PATCHED-COMP
export default function Comparison() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <section className="m-comp-section" style={{ padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 80px)', background: 'var(--bg)', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '72px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: '24px', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple)', display: 'block', marginBottom: '16px' }}>
              The Difference
            </span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.05, color: 'var(--text)' }}>
              Thryve vs<br />a typical agency.
            </h2>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '400px', alignSelf: 'flex-end', paddingBottom: '8px' }}>
            Most agencies optimise for retainer length. We optimise for results you can see in 30 days.
          </p>
        </div>

        {/* Column headers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '0' }}>
          <div style={{ padding: '20px 24px' }} />
          <div style={{
            padding: '20px 28px',
            background: '#0A0A0A',
            borderRadius: '16px 16px 0 0',
            display: 'flex', alignItems: 'center', gap: '10px',
            borderBottom: '2px solid var(--purple)',
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--purple)' }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 600, color: '#FAFAFA', letterSpacing: '0.04em' }}>Thryve</span>
          </div>
          <div style={{
            padding: '20px 28px',
            background: 'var(--bg-secondary)',
            borderRadius: '16px 16px 0 0',
            display: 'flex', alignItems: 'center', gap: '10px',
            marginLeft: '2px',
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--border-strong)' }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.04em' }}>Typical Agency</span>
          </div>
        </div>

        {/* Rows */}
        <div style={{ border: '1px solid var(--border)', borderRadius: '0 0 20px 20px', overflow: 'hidden' }}>
          {rows.map((row, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredRow(i)}
              onMouseLeave={() => setHoveredRow(null)}
              style={{
                display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
                borderTop: i > 0 ? '1px solid var(--border)' : 'none',
                background: hoveredRow === i ? 'var(--bg-secondary)' : 'transparent',
                transition: 'background 0.2s ease',
              }}
            >
              {/* Label */}
              <div style={{ padding: '22px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 600, color: 'var(--text)', letterSpacing: '0.01em' }}>
                  {row.label}
                </p>
              </div>

              {/* Thryve */}
              <div style={{
                padding: '22px 28px',
                background: hoveredRow === i ? 'rgba(123,47,190,0.06)' : 'rgba(123,47,190,0.03)',
                borderLeft: '2px solid',
                borderColor: hoveredRow === i ? 'var(--purple)' : 'rgba(123,47,190,0.2)',
                transition: 'all 0.2s ease',
              }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--text)', lineHeight: 1.6 }}>
                  {row.thryve}
                </p>
              </div>

              {/* Agency */}
              <div style={{ padding: '22px 28px', marginLeft: '2px' }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
                  {row.agency}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom statement */}
        <div style={{ marginTop: '48px', display: 'flex', gap: '32px', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            {[
              { val: '2x', label: 'ROAS minimum' },
              { val: '30', label: 'Days to first results' },
              { val: '100%', label: 'System ownership' },
            ].map((stat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--purple)', lineHeight: 1 }}>{stat.val}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'var(--text-tertiary)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{stat.label}</span>
              </div>
            ))}
          </div>
          <a href='/contact' style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500, color: '#FAFAFA', background: 'var(--purple)', padding: '14px 28px', borderRadius: '100px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1.5px solid var(--purple)', whiteSpace: 'nowrap' }}>
            Book Free Audit →
          </a>
        </div>
      </div>
    </section>
  );
}
