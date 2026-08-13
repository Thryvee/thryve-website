function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface AvatarGlyphProps {
  seed: string;
  size?: number;
  className?: string;
}

/**
 * Deterministic, per-name abstract avatar: a unique gradient plus a
 * generated blob-and-shard pattern. Not a photo and not trying to look
 * like one — a distinct, polished mark per person instead of a plain
 * initials circle.
 */
export default function AvatarGlyph({ seed, size = 36, className = "" }: AvatarGlyphProps) {
  const rand = mulberry32(hashString(seed));

  const hueA = Math.floor(rand() * 360);
  const hueB = (hueA + 40 + Math.floor(rand() * 60)) % 360;
  const rotation = Math.floor(rand() * 360);

  const shapes = Array.from({ length: 3 }, (_, i) => {
    const cx = 20 + rand() * 60;
    const cy = 20 + rand() * 60;
    const r = 14 + rand() * 16;
    return { cx, cy, r, opacity: 0.35 + i * 0.15 };
  });

  const gradientId = `avatar-grad-${seed.replace(/\s+/g, "-")}`;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`${seed} avatar`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={`hsl(${hueA}, 75%, 60%)`} />
          <stop offset="100%" stopColor={`hsl(${hueB}, 70%, 45%)`} />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="50" fill={`url(#${gradientId})`} />
      <g transform={`rotate(${rotation} 50 50)`}>
        {shapes.map((s, i) => (
          <circle
            key={i}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="#ffffff"
            opacity={s.opacity}
          />
        ))}
      </g>
    </svg>
  );
}
