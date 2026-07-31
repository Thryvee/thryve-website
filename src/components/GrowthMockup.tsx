"use client";

import { motion } from "motion/react";
import CountUp from "./CountUp";

const bars = [30, 45, 38, 60, 52, 75, 68, 90];

export default function GrowthMockup() {
  return (
    <div className="relative h-56 w-full">
      {/* Main growth panel */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[86%] -translate-x-1/2 -translate-y-[42%] overflow-hidden rounded-xl border border-white/10 bg-white/95 p-4 shadow-xl backdrop-blur"
        initial={{ opacity: 0, y: 20, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-black/50">Weekly Tests</span>
          <CountUp value="12" className="text-xs font-semibold text-black" duration={1.2} />
        </div>

        <svg viewBox="0 0 220 70" className="mt-2 h-14 w-full">
          <motion.path
            d="M0 60 C 40 55, 60 30, 90 35 S 140 15, 180 8 L 220 4"
            fill="none"
            stroke="#fb923c"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
          />
          <motion.path
            d="M0 60 C 40 55, 60 30, 90 35 S 140 15, 180 8 L 220 4 L 220 70 L 0 70 Z"
            fill="url(#growthFade)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, delay: 1 }}
          />
          <defs>
            <linearGradient id="growthFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fb923c" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[
            { x: 0, y: 60, delay: 0.5 },
            { x: 90, y: 35, delay: 0.9 },
            { x: 180, y: 8, delay: 1.3 },
          ].map((pt, i) => (
            <motion.circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r="4"
              fill="#ec4899"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: pt.delay, ease: "backOut" }}
            />
          ))}
        </svg>

        <div className="mt-2 flex h-8 items-end gap-1">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-sm bg-orange-300"
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.05, ease: "easeOut" }}
            >
              <motion.div
                className="h-full w-full rounded-t-sm bg-orange-400"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{
                  duration: 1.6,
                  delay: i * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Winner badge, top-left */}
      <motion.div
        className="absolute top-0 left-1"
        initial={{ opacity: 0, x: -14 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="rounded-lg bg-white px-2.5 py-1.5 shadow-lg"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] font-medium text-black/70">Winner detected</span>
          <div className="mt-0.5 flex items-center gap-1">
            <span className="font-display text-sm text-black">+</span>
            <CountUp value="184%" className="font-display text-sm text-black" duration={1.5} />
          </div>
        </motion.div>
      </motion.div>

      {/* Rocket / momentum badge, bottom-right */}
      <motion.div
        className="absolute right-0 bottom-0"
        initial={{ opacity: 0, x: 14, y: 10 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 shadow-lg"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-orange-500"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[10px] font-medium text-black/70">Scaling now</span>
        </motion.div>
      </motion.div>

      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, #fb923c 0%, transparent 70%)" }}
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
