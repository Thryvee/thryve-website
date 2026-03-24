
const quotes = [
  { text: "We finally understand why every number moves.", brand: "D2C Skincare, Delhi" },
  { text: "The outbound system runs while I am building the product.", brand: "B2B SaaS, Bangalore" },
  { text: "I had 12,000 people on my list doing nothing. Now that list makes more than my ads.", brand: "B2C Fitness, Mumbai" },
  { text: "Fixing LTV changed the entire business model.", brand: "C2C Marketplace, Hyderabad" },
  { text: "We finally understand why every number moves.", brand: "D2C Wellness, Pune" },
  { text: "The pipeline runs on its own now.", brand: "B2B Logistics, Delhi" },
];

export default function TestimonialTicker() {
  const doubled = [...quotes, ...quotes];
  return (
    <div style={{ background: 'var(--bg-secondary)', padding: '48px 0', overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ display: 'flex' }}>
        <div className='marquee-l' style={{ display: 'flex', whiteSpace: 'nowrap', animationDuration: '40s', gap: '0' }}>
          {doubled.map((q, i) => (
            <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', padding: '0 clamp(20px, 4vw, 48px)', flexShrink: 0 }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(18px, 2vw, 26px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--text)', whiteSpace: 'nowrap' }}>
                "{q.text}"
              </span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple)', flexShrink: 0 }}>
                — {q.brand}
              </span>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--border-strong)', display: 'inline-block', flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
