'use client';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Count up 0 to 100
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + Math.floor(Math.random() * 12) + 4;
      });
    }, 60);

    const fadeTimer = setTimeout(() => setFading(true), 1400);
    const hideTimer = setTimeout(() => setVisible(false), 1900);

    return () => { clearInterval(interval); clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999999,
      background: '#0A0A0A',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: '32px',
      opacity: fading ? 0 : 1,
      transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1)',
      pointerEvents: fading ? 'none' : 'all',
    }}>
      {/* Logo */}
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(32px, 6vw, 56px)',
        fontWeight: 500, color: '#FAFAFA',
        letterSpacing: '0.12em', textTransform: 'uppercase',
      }}>
        Thryve
      </div>

      {/* Progress bar */}
      <div style={{ width: '200px', height: '1px', background: 'rgba(255,255,255,0.1)', borderRadius: '1px', overflow: 'hidden' }}>
        <div style={{
          height: '100%', background: 'var(--purple)',
          width: `${Math.min(count, 100)}%`,
          transition: 'width 0.15s ease',
          borderRadius: '1px',
        }} />
      </div>

      {/* Counter */}
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '11px', fontWeight: 600,
        letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)',
      }}>
        {Math.min(count, 100)}
      </span>
    </div>
  );
}
