'use client';

const items = [
  'Acquire',
  'Convert',
  'Retain',
  'Scale',
  'Grow',
  'Systematise',
  'Optimise',
  'Compound',
];

// Quadruple for seamless infinite loop at all viewport sizes
const strip = [...items, ...items, ...items, ...items];

const Dot = ({ dim = false }: { dim?: boolean }) => (
  <span
    style={{
      width: dim ? '3px' : '4px',
      height: dim ? '3px' : '4px',
      borderRadius: '50%',
      background: dim ? 'rgba(250,250,250,0.2)' : 'var(--purple)',
      display: 'inline-block',
      flexShrink: 0,
    }}
  />
);

export default function MarqueeStrip() {
  return (
    <div
      style={{
        background: 'var(--text)',
        padding: '22px 0',
        overflow: 'hidden',
        borderTop: '1px solid rgba(250,250,250,0.06)',
        borderBottom: '1px solid rgba(250,250,250,0.06)',
        userSelect: 'none',
      }}
    >
      {/* Row 1 — scrolls left */}
      <div style={{ marginBottom: '10px', display: 'flex', overflow: 'hidden' }}>
        <div
          className="marquee-l"
          style={{ display: 'flex', whiteSpace: 'nowrap', willChange: 'transform' }}
        >
          {strip.map((item, i) => (
            <span
              key={i}
              style={{
                padding: '0 32px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(250,250,250,0.7)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '32px',
              }}
            >
              {item}
              <Dot />
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div style={{ display: 'flex', overflow: 'hidden' }}>
        <div
          className="marquee-r"
          style={{ display: 'flex', whiteSpace: 'nowrap', willChange: 'transform' }}
        >
          {strip.map((item, i) => (
            <span
              key={i}
              style={{
                padding: '0 32px',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '14px',
                fontWeight: 400,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(250,250,250,0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '32px',
                fontStyle: 'italic',
              }}
            >
              {item}
              <Dot dim />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
