"use client";
import { useEffect, useState } from "react";

const notifications = [
  { city: "Bangalore", action: "just booked a free audit" },
  { city: "Delhi", action: "downloaded the 30-Day D2C Playbook" },
  { city: "Mumbai", action: "started their pilot month" },
  { city: "Pune", action: "just booked a free audit" },
  { city: "Hyderabad", action: "downloaded the 90-Day Launch Playbook" },
  { city: "Chennai", action: "just booked a free audit" },
  { city: "Ahmedabad", action: "downloaded the 30-Day D2C Playbook" },
  { city: "Kolkata", action: "started their pilot month" },
];

const MAX_SHOWN = 3;

// Random interval between lo and hi milliseconds
function randInterval(lo: number, hi: number) {
  return lo + Math.floor(Math.random() * (hi - lo));
}

export default function SocialProofNotification() {
  const [current, setCurrent] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [shownCount, setShownCount] = useState(0);

  useEffect(() => {
    if (shownCount >= MAX_SHOWN) return;

    let hideTimer: ReturnType<typeof setTimeout>;
    let showTimer: ReturnType<typeof setTimeout>;

    const show = () => {
      const idx = Math.floor(Math.random() * notifications.length);
      setCurrent(idx);
      setVisible(true);
      setShownCount((c) => c + 1);
      hideTimer = setTimeout(() => setVisible(false), 4000);
    };

    // First show: 15-25s after mount. Subsequent: 90-120s intervals.
    const delay = shownCount === 0 ? randInterval(15000, 25000) : randInterval(90000, 120000);
    showTimer = setTimeout(show, delay);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shownCount]);

  // Schedule next after each hide (90-120s)
  // This is handled by the shownCount dep above re-running the effect,
  // but we delay only after the toast has hidden. We trigger re-run by
  // incrementing shownCount inside show(), which re-fires the effect.

  if (current === null || shownCount > MAX_SHOWN) return null;
  const n = notifications[current];

  return (
    <div
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: "88px",
        left: "32px",
        zIndex: 9000,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "14px",
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        maxWidth: "280px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.96)",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: "var(--purple-light)",
          border: "1px solid var(--purple-mid)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontSize: "14px",
        }}
      >
        ✦
      </div>
      <div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "var(--text)", marginBottom: "2px", lineHeight: 1.3 }}>
          A founder from {n.city}
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "var(--text-tertiary)", lineHeight: 1.3 }}>
          {n.action}
        </p>
      </div>
    </div>
  );
}
