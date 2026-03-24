'use client';
import { useEffect, useState } from 'react';

const notifications = [
  { brand: 'A D2C brand, Delhi', action: 'just booked a free audit' },
  { brand: 'A B2B SaaS, Bangalore', action: 'downloaded the 30-Day Playbook' },
  { brand: 'A B2C brand, Mumbai', action: 'started their pilot month' },
  { brand: 'A D2C brand, Pune', action: 'just booked a free audit' },
  { brand: 'A C2C marketplace, Hyderabad', action: 'downloaded the Launch Playbook' },
  { brand: 'A B2B firm, Delhi', action: 'just booked a free audit' },
];

export default function SocialProofNotification() {
  const [current, setCurrent] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let idx = 0;
    const show = () => {
      idx = (idx + 1) % notifications.length;
      setCurrent(idx);
      setVisible(true);
      setTimeout(() => setVisible(false), 3500);
    };

    const timer = setTimeout(show, 6000);
    const interval = setInterval(show, 11000);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, []);

  if (current === null) return null;
  const n = notifications[current];

  return (
    <div style={{
      position: 'fixed', bottom: '88px', left: '32px', zIndex: 9000,
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '14px',
      padding: '14px 18px',
      display: 'flex', alignItems: 'center', gap: '12px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      maxWidth: '280px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.96)',
      transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
      pointerEvents: 'none',
    }}>
      <div style={{
        width: '32px', height: '32px', borderRadius: '50%',
        background: 'var(--purple-light)', border: '1px solid var(--purple-mid)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, fontSize: '14px',
      }}>
        ✦
      </div>
      <div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 600, color: 'var(--text)', marginBottom: '2px', lineHeight: 1.3 }}>
          {n.brand}
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'var(--text-tertiary)', lineHeight: 1.3 }}>
          {n.action}
        </p>
      </div>
    </div>
  );
}
