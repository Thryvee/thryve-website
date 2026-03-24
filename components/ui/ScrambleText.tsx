'use client';
import { useState } from 'react';
import { useScramble } from '@/hooks/useScramble';

export default function ScrambleText({ text, style, className }: { text: string; style?: React.CSSProperties; className?: string }) {
  const [hover, setHover] = useState(false);
  const display = useScramble(text, hover);

  return (
    <span
      style={{ ...style, display: 'inline-block', fontVariantNumeric: 'tabular-nums' }}
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {display}
    </span>
  );
}
