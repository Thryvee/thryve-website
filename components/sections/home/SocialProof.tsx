export default function SocialProof() {
  const brands = ['D2C Skincare', 'B2B SaaS', 'B2C Fitness', 'C2C Marketplace', 'D2C Wellness', 'B2B Logistics', 'D2C Apparel', 'B2C EdTech'];
  const doubled = [...brands, ...brands];

  return (
    <div style={{ padding: '32px 0', background: 'var(--bg)', overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-tertiary)', textAlign: 'center', marginBottom: '24px' }}>
        Trusted by brands across
      </p>
      <div style={{ display: 'flex' }}>
        <div className='marquee-l' style={{ display: 'flex', whiteSpace: 'nowrap', animationDuration: '25s', alignItems: 'center' }}>
          {doubled.map((brand, i) => (
            <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '32px', padding: '0 40px' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontWeight: 500, letterSpacing: '0.04em', color: 'var(--text-tertiary)', opacity: 0.5, whiteSpace: 'nowrap' }}>
                {brand}
              </span>
              <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--border-strong)', display: 'inline-block' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
