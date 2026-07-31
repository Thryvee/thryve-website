"use client";

import { motion } from "motion/react";
import CountUp from "./CountUp";

const milestones = [
  { label: "Month 1", value: "1.0x" },
  { label: "Month 3", value: "2.4x" },
  { label: "Month 6", value: "4.6x" },
];

export default function ScalingMockup() {
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-black/5 bg-white p-5 md:h-full">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-black">Revenue Growth</span>
        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-600">
          Scaling
        </span>
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <CountUp value="4.6x" className="font-display text-4xl text-black" duration={2} />
        <span className="text-xs text-black/40">vs. Month 1</span>
      </div>

      <svg viewBox="0 0 300 100" className="mt-4 h-24 w-full">
        <motion.path
          d="M0 90 C 60 85, 100 60, 150 55 S 240 20, 300 10"
          fill="none"
          stroke="#0038ff"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
        <motion.path
          d="M0 90 C 60 85, 100 60, 150 55 S 240 20, 300 10 L 300 100 L 0 100 Z"
          fill="url(#scaleFade)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, delay: 1 }}
        />
        <defs>
          <linearGradient id="scaleFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0038ff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0038ff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="mt-2 flex justify-between gap-2">
        {milestones.map((m, i) => (
          <motion.div
            key={m.label}
            className="flex-1 rounded-xl bg-zinc-50 p-2.5 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.2 + i * 0.2 }}
          >
            <p className="text-[11px] text-black/40">{m.label}</p>
            <p className="text-sm font-semibold text-black">{m.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
