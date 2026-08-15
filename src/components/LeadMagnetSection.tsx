"use client";

import { useState } from "react";
import { motion } from "motion/react";
import LeadMagnetModal from "./LeadMagnetModal";

const previewItems = [
  { label: "Traffic quality vs. on-page conversion", status: "check" },
  { label: "Checkout friction (steps, express pay)", status: "check" },
  { label: "Retargeting vs. cold-audience spend split", status: "flag" },
  { label: "Post-purchase flow coverage", status: "check" },
  { label: "Creative fatigue / testing cadence", status: "flag" },
];

export default function LeadMagnetSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="w-full bg-linear-to-b from-white via-purple-50/50 to-white px-6 py-24 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-5xl"
        style={{ willChange: "transform, opacity" }}
      >
        {/* Ambient glow */}
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
          className="relative grid grid-cols-1 items-center gap-10 overflow-hidden px-8 py-14 md:grid-cols-[1.1fr_0.9fr] md:gap-8 md:px-14 md:py-16"
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
          {/* Copy column */}
          <div className="relative z-10 text-center md:text-left">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-1.5 rounded-full bg-black/5 px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-black/50 uppercase"
            >
              Not booking a call yet?
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display mt-4 text-2xl leading-[1.15] text-black md:text-4xl"
            >
              Run the same funnel audit we run on every new client — on your own site, this week.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 max-w-md text-sm leading-relaxed text-black/55 md:text-[15px]"
            >
              It&apos;s the checklist that tells us where a brand is actually leaking revenue before we
              ever touch an ad account. No call, no pitch — just the same 9 checkpoints, in your
              inbox in the next few minutes.
            </motion.p>

            <motion.button
              type="button"
              onClick={() => setOpen(true)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 mt-7 rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] transition-colors duration-300 hover:bg-black/85"
            >
              Send me the checklist →
            </motion.button>
          </div>

          {/* Preview panel */}
          <motion.div
            initial={{ opacity: 0, x: 24, rotate: 2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 overflow-hidden rounded-3xl border border-black/8 bg-white/90 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-center justify-between border-b border-black/6 px-5 py-3.5">
              <span className="font-display text-sm text-black">Funnel Audit Checklist</span>
              <span className="rounded-full bg-black/5 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-black/45 uppercase">
                Preview
              </span>
            </div>
            <ul className="flex flex-col gap-1 p-3">
              {previewItems.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] text-black/75"
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                      item.status === "check"
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-amber-100 text-amber-600"
                    }`}
                  >
                    {item.status === "check" ? "✓" : "!"}
                  </span>
                  {item.label}
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: 0.75 }}
                className="mt-1 px-3 pb-1 text-[11px] text-black/35"
              >
                + 4 more checkpoints in the full audit
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </motion.div>

      <LeadMagnetModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
