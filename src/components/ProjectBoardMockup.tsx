"use client";

import { motion } from "motion/react";

const columns = [
  { label: "Not Started", dot: "#a1a1aa", count: 2 },
  { label: "In Progress", dot: "#a855f7", count: 3 },
  { label: "Shipped", dot: "#22c55e", count: 4 },
];

export default function ProjectBoardMockup() {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-purple-200/60 bg-white md:h-full">
      {/* Ambient purple glow */}
      <motion.div
        className="pointer-events-none absolute -top-16 left-1/3 z-0 h-48 w-48 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(147,51,234,0.3) 0%, transparent 70%)" }}
        animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.12, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex items-center justify-between border-b border-purple-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <motion.span
            className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #a855f7, #4338ca)" }}
            animate={{
              boxShadow: [
                "0 0 0px rgba(168,85,247,0)",
                "0 0 10px rgba(168,85,247,0.5)",
                "0 0 0px rgba(168,85,247,0)",
              ],
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            T
          </motion.span>
          <span className="text-xs font-medium text-black">Your Project</span>
        </div>
        <div className="flex gap-3 text-[10px] text-black/40">
          <span>Figma</span>
          <span>Slack</span>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-3 gap-2.5 px-4 py-4">
        {columns.map((col, ci) => (
          <motion.div
            key={col.label}
            className="rounded-lg p-2"
            style={{
              background: col.label === "In Progress" ? "rgba(168,85,247,0.06)" : "#fafafa",
            }}
            animate={
              col.label === "In Progress"
                ? { y: [0, -3, 0] }
                : undefined
            }
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="mb-2 flex items-center gap-1.5 px-0.5">
              <motion.span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: col.dot }}
                animate={col.label === "In Progress" ? { scale: [1, 1.4, 1] } : undefined}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-[9px] font-medium text-black/60">{col.label}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {Array.from({ length: col.count }).map((_, ti) => (
                <motion.div
                  key={ti}
                  className="h-3 rounded-md border"
                  style={{
                    width: `${60 + ((ti * 13) % 35)}%`,
                    background: col.label === "In Progress" ? "#f3e8ff" : "#ffffff",
                    borderColor:
                      col.label === "In Progress" ? "rgba(168,85,247,0.25)" : "rgba(0,0,0,0.05)",
                  }}
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.4 + ci * 0.2 + ti * 0.12,
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative z-10 mx-4 mb-4 flex items-center justify-between rounded-lg px-3 py-2"
        style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.15)" }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-[10px] text-black/50">Sprint progress</span>
        <div className="relative h-1.5 w-20 overflow-hidden rounded-full bg-purple-100">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #a855f7, #6366f1)" }}
            initial={{ width: "0%" }}
            whileInView={{ width: "68%" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-white/40"
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
                repeatDelay: 1.2,
              }}
              style={{ width: "40%" }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
