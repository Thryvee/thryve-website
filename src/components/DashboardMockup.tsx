"use client";

import { motion } from "motion/react";

interface DashboardMockupProps {
  chartLabel: string;
  chartValue: string;
  statLabel: string;
  bars: number[];
  floatingLabel: string;
  floatingSubLabel: string;
  accent: string;
}

export default function DashboardMockup({
  chartLabel,
  chartValue,
  statLabel,
  bars,
  floatingLabel,
  floatingSubLabel,
  accent,
}: DashboardMockupProps) {
  return (
    <div className="relative h-64 w-full md:h-full">
      <div className="absolute inset-0 flex flex-col gap-4 rounded-2xl border border-black/5 bg-zinc-50 p-5">
        <div className="rounded-xl border border-black/5 bg-white p-4">
          <p className="text-sm font-medium text-black">{chartLabel}</p>
          <p className="text-xs text-black/40">{statLabel}</p>
          <svg viewBox="0 0 200 60" className="mt-3 h-12 w-full">
            <motion.path
              d="M0 45 Q 30 10, 60 30 T 120 25 T 200 15"
              fill="none"
              stroke={accent}
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
          </svg>
          <p className="mt-1 text-lg font-semibold text-black">{chartValue}</p>
        </div>

        <div className="flex flex-1 items-end gap-2 rounded-xl border border-black/5 bg-white p-4">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-md"
              style={{ background: accent, opacity: 0.35 + (i / bars.length) * 0.65 }}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="absolute -right-2 -bottom-4 w-48 md:-right-6 md:w-56"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      >
        <motion.div
          className="rounded-xl border border-black/5 bg-white p-4 shadow-lg"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="text-sm font-medium text-black">{floatingLabel}</p>
          <p className="text-xs text-black/40">{floatingSubLabel}</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
            <div className="h-full rounded-full" style={{ width: "72%", background: accent }} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
