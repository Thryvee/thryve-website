export default function RiskBadge() {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: '5px 12px', borderRadius: '100px',
      background: 'rgba(45,198,83,0.08)',
      border: '1px solid rgba(45,198,83,0.2)',
    }}>
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#2DC653', display: 'inline-block' }} />
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, color: '#2DC653', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
        Results in 30 days or we stop
      </span>
    </div>
  );
}
