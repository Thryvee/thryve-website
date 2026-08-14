"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface CaseStudyTimelineProps {
  steps: string[];
  accent: string;
}

export default function CaseStudyTimeline({ steps, accent }: CaseStudyTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.6"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative mt-5">
      {/* Connecting rail */}
      <div className="absolute top-4 bottom-4 left-[15px] w-px bg-black/8">
        <motion.div
          className="w-full origin-top"
          style={{ height: "100%", scaleY: lineScale, background: accent }}
        />
      </div>

      <div className="space-y-7">
        {steps.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-start gap-5 pl-0"
          >
            <motion.span
              className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
              style={{ background: accent }}
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: i * 0.12 + 0.1, ease: "backOut" }}
            >
              {i + 1}
            </motion.span>
            <p className="mt-1 text-[15px] leading-relaxed text-black/70 md:text-base">{step}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
