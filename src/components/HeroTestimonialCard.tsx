"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import AvatarGlyph from "./AvatarGlyph";
import { testimonials } from "@/lib/testimonialsData";

const ROTATE_MS = 4000;
const MAX_QUOTE_LENGTH = 140;

function trimQuote(quote: string) {
  if (quote.length <= MAX_QUOTE_LENGTH) return quote;
  return `${quote.slice(0, MAX_QUOTE_LENGTH).trimEnd()}…`;
}

export default function HeroTestimonialCard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <div className="pointer-events-none absolute bottom-8 left-8 z-20 hidden w-72 md:block">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.name}
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.97 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto rounded-2xl border border-black/10 bg-white/80 p-4 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.15)] backdrop-blur-md"
        >
          <p className="text-[13px] leading-relaxed text-black/70">
            &ldquo;{trimQuote(current.quote)}&rdquo;
          </p>
          <div className="mt-3 flex items-center gap-2.5">
            <AvatarGlyph
              seed={current.name}
              size={28}
              className="shrink-0 rounded-full shadow-sm ring-1 ring-black/5"
            />
            <div>
              <p className="text-xs font-medium text-black">{current.name}</p>
              <p className="text-[11px] text-black/45">{current.role}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
