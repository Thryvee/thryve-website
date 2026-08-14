"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import "./ScrollStack.css";

export interface ScrollStackCardData {
  content: ReactNode;
  itemClassName?: string;
}

interface ScrollStackProps {
  items: ScrollStackCardData[];
  className?: string;
  baseScale?: number;
  itemScale?: number;
  /** Extra scroll distance (in viewport heights) consumed per card. */
  perCardScroll?: number;
}

function StackCard({
  index,
  total,
  progress,
  baseScale,
  itemScale,
  itemClassName,
  children,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  baseScale: number;
  itemScale: number;
  itemClassName?: string;
  children: ReactNode;
}) {
  // progress runs 0 -> total across the whole stack. Card `index` is the
  // "active incoming" card while progress is within [index, index + 1).
  // Before that range it sits below the viewport; after it, it's parked
  // at the top of the stack (scaled down, offset upward slightly per
  // later card so a thin edge of it stays visible behind newer cards).
  const isLast = index === total - 1;

  const y = useTransform(progress, (p) => {
    if (index === 0) return 0; // first card is always at rest
    const local = p - (index - 1); // <0 not arrived yet, 0..1 arriving, >1 settled
    if (local <= 0) return 100; // parked below, off-screen (vh)
    if (local >= 1) return 0; // settled at rest position
    const eased = 1 - Math.pow(1 - local, 3);
    return 100 * (1 - eased);
  });

  const scale = useTransform(progress, (p) => {
    if (isLast) return 1;
    // Scale down in sync with the NEXT card's arrival, so this card
    // visibly shrinks and recedes as the new one covers it.
    const local = p - index;
    const target = baseScale + index * itemScale;
    if (local <= 0) return 1;
    if (local >= 1) return target;
    const eased = 1 - Math.pow(1 - local, 3);
    return 1 - eased * (1 - target);
  });

  const translateYPx = useTransform(y, (v) => `${v}vh`);

  return (
    <motion.div
      className={`scroll-stack-card ${itemClassName ?? ""}`.trim()}
      style={{
        y: translateYPx,
        scale,
        zIndex: index + 1,
        marginTop: index === 0 ? 0 : 28 * index,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function ScrollStack({
  items,
  className = "",
  baseScale = 0.92,
  itemScale = 0.02,
  perCardScroll = 1.1,
}: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const total = items.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map 0..1 scroll progress across the whole container to 0..total
  // "card units" so each StackCard can work in simple per-card local space.
  const progress = useTransform(scrollYProgress, [0, 1], [0, total]);

  return (
    <div
      ref={containerRef}
      className={`scroll-stack-scroller ${className}`.trim()}
      style={{ height: `${(total * perCardScroll + 0.3) * 100}dvh` }}
    >
      <div className="scroll-stack-stage">
        {items.map((item, i) => (
          <StackCard
            key={i}
            index={i}
            total={total}
            progress={progress}
            baseScale={baseScale}
            itemScale={itemScale}
            itemClassName={item.itemClassName}
          >
            {item.content}
          </StackCard>
        ))}
      </div>
    </div>
  );
}
