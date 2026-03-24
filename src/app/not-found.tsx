import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', background: '#0A0A0A',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '0 40px', textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      {/* Giant 404 */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(200px, 35vw, 480px)',
        fontWeight: 700, color: 'rgba(255,255,255,0.03)',
        lineHeight: 1, userSelect: 'none', letterSpacing: '-0.05em',
        whiteSpace: 'nowrap',
      }}>
        404
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600,
          letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--purple)',
          display: 'block', marginBottom: '24px',
        }}>
          Page not found
        </span>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(40px, 6vw, 80px)',
          fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.05,
          color: '#FAFAFA', marginBottom: '20px',
        }}>
          This page doesn't exist.<br />
          <span style={{ color: 'var(--purple)', fontStyle: 'italic' }}>Your revenue leak does.</span>
        </h1>

        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '15px',
          color: 'rgba(255,255,255,0.45)', lineHeight: 1.7,
          maxWidth: '420px', margin: '0 auto 40px',
        }}>
          Whatever you were looking for, let us help you find what actually matters — where your business is losing money.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href='/' style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500,
            color: '#FAFAFA', background: 'var(--purple)', padding: '13px 28px',
            borderRadius: '100px', textDecoration: 'none', border: '1.5px solid var(--purple)',
          }}>
            Back to home
          </Link>
          <Link href='/contact' style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500,
            color: 'rgba(255,255,255,0.6)', background: 'transparent', padding: '13px 28px',
            borderRadius: '100px', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.15)',
          }}>
            Book free audit
          </Link>
        </div>
      </div>
    </div>
  );
}
