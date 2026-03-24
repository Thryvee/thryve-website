'use client';
import { useEffect, useState } from 'react';

export default function LiveCounter() {
  const [count, setCount] = useState(47);

  useEffect(() => {
    // Simulate live increments every 45-90 seconds
    const tick = () => {
      const delay = 45000 + Math.random() * 45000;
      setTimeout(() => {
        setCount(c => c + 1);
        tick();
      }, delay);
    };
    tick();
  }, []);

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      padding: '6px 14px', borderRadius: '100px',
      background: 'rgba(123,47,190,0.06)',
      border: '1px solid var(--purple-mid)',
    }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--purple)', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, color: 'var(--purple)' }}>
        {count} brands audited
      </span>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
      `}</style>
    </div>
  );
}
