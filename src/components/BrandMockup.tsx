"use client";

import { motion } from "motion/react";

const palette = ["#38bdf8", "#6366f1", "#0ea5e9", "#818cf8", "#a5b4fc"];

export default function BrandMockup() {
  return (
    <div className="relative h-56 w-full">
      {/* Main brand kit panel */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[82%] -translate-x-1/2 -translate-y-[58%] overflow-hidden rounded-xl border border-white/10 bg-white/95 p-4 shadow-xl backdrop-blur"
        initial={{ opacity: 0, y: 24, scale: 0.92 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-black/50">Brand Kit</span>
          <div className="relative flex gap-1">
            {palette.map((c, i) => (
              <motion.span
                key={c}
                className="relative h-3 w-3 rounded-full"
                style={{ background: c }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.07, ease: "backOut" }}
              />
            ))}
            <motion.span
              className="absolute top-1/2 left-0 h-3 w-3 -translate-y-1/2 rounded-full ring-2 ring-black/20"
              initial={{ x: 0, opacity: 0 }}
              whileInView={{
                x: [0, 16, 32, 48, 64, 0],
                opacity: [0, 1, 1, 1, 1, 1],
              }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 4,
                delay: 1,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.2, 0.4, 0.6, 0.8, 1],
              }}
            />
          </div>
        </div>

        <motion.div
          className="mt-3 flex items-baseline gap-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.span
            className="font-display text-2xl text-black"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            Aa
          </motion.span>
          <span className="text-xs text-black/40">Display / 700</span>
        </motion.div>

        <div className="mt-3 flex gap-1.5">
          {[70, 45, 90, 30].map((w, i) => (
            <motion.div
              key={i}
              className="h-1.5 overflow-hidden rounded-full bg-black/10"
              style={{ flex: 1 }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1, ease: "easeOut" }}
            >
              <motion.div
                className="h-full rounded-full bg-indigo-400"
                style={{ width: `${w}%` }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating logo card, top-right */}
      <motion.div
        className="absolute top-0 right-1"
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-lg"
          animate={{ rotate: [-8, -4, -8], y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 32 32" className="h-6 w-6">
            <motion.path
              d="M6 16 L14 24 L26 8"
              fill="none"
              stroke="#6366f1"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Secondary floating swatch card, bottom-left */}
      <motion.div
        className="absolute bottom-0 left-0"
        initial={{ opacity: 0, x: -16, y: 10 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-1.5 shadow-lg"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >
          <motion.span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: "#6366f1" }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[10px] font-medium text-black/60">Primary #6366f1</span>
        </motion.div>
      </motion.div>

      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, #818cf8 0%, transparent 70%)" }}
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
