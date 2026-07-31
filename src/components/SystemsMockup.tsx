"use client";

import { motion } from "motion/react";

const steps = [
  { label: "Landing", pct: 100 },
  { label: "Product View", pct: 68 },
  { label: "Add to Cart", pct: 42 },
  { label: "Checkout", pct: 27 },
];

export default function SystemsMockup() {
  return (
    <div className="relative h-56 w-full">
      {/* Main funnel panel */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[86%] -translate-x-1/2 -translate-y-[46%] overflow-hidden rounded-xl border border-white/10 bg-white/95 p-4 shadow-xl backdrop-blur"
        initial={{ opacity: 0, y: 20, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-black/50">Funnel</span>
          <span className="relative flex items-center gap-1 rounded-full bg-purple-50 px-2 py-0.5">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-purple-500"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-[10px] font-medium text-purple-600">Live</span>
          </span>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2">
              <span className="w-20 shrink-0 text-[10px] text-black/50">{step.label}</span>
              <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-black/5">
                <motion.div
                  className="relative h-full rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${step.pct}%` }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/40"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1 + i * 0.3,
                      repeatDelay: 1.5,
                    }}
                    style={{ width: "40%" }}
                  />
                </motion.div>
              </div>
              <motion.span
                className="w-8 shrink-0 text-right text-[10px] font-medium text-black/70"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 0.6 + i * 0.15 }}
              >
                {step.pct}%
              </motion.span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Cursor tracking badge */}
      <motion.div
        className="absolute top-0 right-2"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1.5 shadow-lg"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-green-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[10px] font-medium text-black/70">Cursor tracking</span>
        </motion.div>
      </motion.div>

      {/* Floating cursor dot traveling across the panel */}
      <motion.div
        className="absolute top-10 left-6 h-3 w-3 rounded-full border-2 border-white bg-purple-500 shadow-md"
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: [0, 1, 1, 1, 0],
          x: [0, 60, 120, 160, 160],
          y: [0, 20, 45, 70, 70],
        }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: 3.5,
          delay: 1.4,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.85, 1],
        }}
      />

      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)" }}
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
