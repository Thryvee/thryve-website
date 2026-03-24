import { useEffect, useRef, useState } from 'react';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';

export function useScramble(text: string, trigger: boolean, speed = 30) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<NodeJS.Timeout>();
  const iterRef = useRef(0);

  useEffect(() => {
    if (!trigger) { setDisplay(text); return; }
    iterRef.current = 0;
    clearInterval(frameRef.current);
    frameRef.current = setInterval(() => {
      iterRef.current += 0.6;
      setDisplay(
        text.split('').map((char, i) => {
          if (char === ' ') return ' ';
          if (i < iterRef.current) return text[i];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      if (iterRef.current >= text.length) {
        clearInterval(frameRef.current);
        setDisplay(text);
      }
    }, speed);
    return () => clearInterval(frameRef.current);
  }, [trigger, text, speed]);

  return display;
}
