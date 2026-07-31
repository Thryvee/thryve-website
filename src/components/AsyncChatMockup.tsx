"use client";

import { motion } from "motion/react";

const messages = [
  { from: "you", text: "Hey! Can we get a landing page for the new launch?", delay: 0.3 },
  { from: "thryve", text: "On it — first draft by tomorrow.", delay: 0.9 },
  { from: "you", text: "Perfect, no meeting needed then?", delay: 1.5 },
  { from: "thryve", text: "None. We'll async update you as we go.", delay: 2.1 },
];

export default function AsyncChatMockup() {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-purple-200/60 bg-white p-4 md:h-full">
      {/* Ambient purple glow pulsing behind the chat */}
      <motion.div
        className="pointer-events-none absolute -top-10 -right-10 z-0 h-40 w-40 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 70%)" }}
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <motion.span
            className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #a855f7, #6366f1)" }}
            animate={{ boxShadow: ["0 0 0px rgba(168,85,247,0)", "0 0 12px rgba(168,85,247,0.6)", "0 0 0px rgba(168,85,247,0)"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            T
          </motion.span>
          <span className="text-[10px] font-medium text-black/50">Thryve Studio</span>
        </div>
        <motion.span
          className="flex items-center gap-1 rounded-full bg-purple-50 px-2 py-0.5 text-[9px] font-medium text-purple-600"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-purple-500"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
          Active now
        </motion.span>
      </div>

      <div className="relative z-10 flex flex-col gap-2.5">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: m.delay, ease: [0.16, 1, 0.3, 1] }}
            className={`flex ${m.from === "you" ? "justify-end" : "justify-start"}`}
          >
            <div
              className="max-w-[75%] rounded-xl px-3 py-2 text-xs leading-relaxed"
              style={
                m.from === "you"
                  ? { background: "linear-gradient(135deg, #7c3aed, #4338ca)", color: "#fff" }
                  : { background: "#faf5ff", border: "1px solid rgba(168,85,247,0.15)", color: "rgba(0,0,0,0.75)" }
              }
            >
              {m.text}
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 2.6, duration: 0.4 }}
          className="mt-1 flex items-center gap-1.5 self-start rounded-xl px-3 py-2"
          style={{ background: "#faf5ff", border: "1px solid rgba(168,85,247,0.15)" }}
        >
          {[0, 1, 2].map((d) => (
            <motion.span
              key={d}
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "#a855f7" }}
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: d * 0.2, ease: "easeInOut" }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
