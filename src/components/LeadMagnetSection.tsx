"use client";

import { useState } from "react";
import { motion } from "motion/react";
import LeadMagnetModal from "./LeadMagnetModal";

export default function LeadMagnetSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="w-full bg-linear-to-b from-white via-purple-50/50 to-white px-6 py-24 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ y: -6 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-5xl"
        style={{ willChange: "transform, opacity" }}
      >
        {/* Ambient glow, larger and more saturated for "pop" */}
        <motion.div
          className="pointer-events-none absolute -top-24 left-1/4 -z-10 h-80 w-80 rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)" }}
          animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -right-16 -bottom-16 -z-10 h-72 w-72 rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)" }}
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Glass surface */}
        <div
          className="relative flex flex-col items-center gap-6 overflow-hidden px-8 py-16 text-center md:px-20 md:py-20"
          style={{
            borderRadius: 40,
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.16) 55%, rgba(255,255,255,0.28) 100%)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1.5px solid rgba(255,255,255,0.9)",
            boxShadow:
              "inset 0 1px 1px rgba(255,255,255,0.95), inset 0 -1px 24px rgba(255,255,255,0.25), 0 40px 100px -20px rgba(80,20,150,0.25), 0 1px 0 rgba(120,60,200,0.08)",
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 rounded-full bg-black/5 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-black/50 uppercase"
          >
            Not ready for a call yet?
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display relative z-10 max-w-2xl text-3xl leading-tight text-black md:text-5xl"
          >
            Get the same checklist we use to audit every client&apos;s funnel — free.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-w-xl text-sm leading-relaxed text-black/55 md:text-base"
          >
            9 questions that reveal exactly where your funnel is leaking revenue, delivered
            straight to your inbox. No call, no pitch — just the framework.
          </motion.p>

          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mt-3 rounded-full bg-black px-8 py-4 text-sm font-semibold text-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] transition-colors duration-300 hover:bg-black/85"
          >
            Get the free checklist →
          </motion.button>
        </div>
      </motion.div>

      <LeadMagnetModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
