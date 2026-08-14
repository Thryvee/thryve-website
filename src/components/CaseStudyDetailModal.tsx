"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { CaseStudy } from "@/lib/caseStudiesData";
import { categoryAccent } from "@/lib/caseStudiesData";
import CountUp from "./CountUp";
import CaseStudyTrendChart from "./CaseStudyTrendChart";
import CaseStudyTimeline from "./CaseStudyTimeline";

interface CaseStudyDetailModalProps {
  study: CaseStudy | null;
  onClose: () => void;
}

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
};

export default function CaseStudyDetailModal({ study, onClose }: CaseStudyDetailModalProps) {
  useEffect(() => {
    if (!study) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [study, onClose]);

  const accent = study ? categoryAccent[study.category] : "#a855f7";

  return (
    <AnimatePresence>
      {study && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-100 grid place-items-center bg-black/50 p-4 backdrop-blur-xl"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl overflow-hidden bg-white text-black shadow-[0_40px_120px_-20px_rgba(0,0,0,0.35)]"
            style={{ borderRadius: 40 }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/4 text-black/50 backdrop-blur-md transition-colors duration-300 hover:bg-black/8 hover:text-black"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2}>
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>

            <div data-lenis-prevent className="max-h-[88dvh] overflow-y-auto overscroll-contain">
              {/* Hero — headline metric, Apple-product-page style */}
              <div className="relative overflow-hidden bg-black px-8 pt-16 pb-14 text-center md:px-14 md:pt-20 md:pb-16">
                <motion.div
                  className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full blur-[90px]"
                  style={{ background: `radial-gradient(circle, ${accent}59 0%, transparent 70%)` }}
                  animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.15, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 text-xs font-medium tracking-[0.25em] text-white/40 uppercase"
                >
                  {study.category} &nbsp;·&nbsp; {study.industry}
                </motion.p>

                <motion.h3
                  id="case-study-title"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display relative z-10 mt-4 text-3xl leading-tight text-white md:text-5xl"
                >
                  {study.brand}
                </motion.h3>

                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
                  className="relative z-10 mt-8"
                >
                  <div
                    className="font-display bg-linear-to-b from-white to-white/70 bg-clip-text text-transparent"
                    style={{ fontSize: "clamp(56px, 10vw, 96px)", lineHeight: 1 }}
                  >
                    <CountUp value={study.headlineMetric.value} duration={1.6} />
                  </div>
                  <p className="mt-3 text-sm text-white/50 md:text-base">
                    {study.headlineMetric.label}
                  </p>
                </motion.div>
              </div>

              {/* Stats strip with per-stat explanations */}
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="border-b border-black/6 bg-white px-6 py-10 md:px-10"
              >
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                  {study.stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="font-display text-3xl text-black md:text-4xl">{stat.value}</div>
                      <div className="mt-1.5 text-xs font-medium text-black/45 uppercase tracking-wide">
                        {stat.label}
                      </div>
                      <p className="mt-2 text-[13px] leading-relaxed text-black/45">{stat.context}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Trend chart */}
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="border-b border-black/6 bg-black/1.5 px-6 py-10 md:px-10"
              >
                <h4 className="font-display text-xl text-black md:text-2xl">The trajectory</h4>
                <div className="mt-6">
                  <CaseStudyTrendChart trend={study.trend} accent={accent} />
                </div>
              </motion.div>

              {/* Sectioned panels */}
              <div className="px-8 py-14 md:px-14 md:py-16">
                <motion.div {...fadeUp} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                  <h4 className="font-display text-xl text-black md:text-2xl">The challenge</h4>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-black/55 md:text-base">
                    {study.challenge}
                  </p>
                </motion.div>

                <motion.div
                  {...fadeUp}
                  transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-14"
                >
                  <h4 className="font-display text-xl text-black md:text-2xl">What we did</h4>
                  <CaseStudyTimeline steps={study.approach} accent={accent} />
                </motion.div>

                <motion.div
                  {...fadeUp}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-14"
                >
                  <h4 className="font-display text-xl text-black md:text-2xl">The result</h4>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-black/55 md:text-base">
                    {study.result}
                  </p>
                  <p className="mt-3 text-xs font-medium tracking-wide text-black/35 uppercase">
                    Timeframe &nbsp;·&nbsp; {study.timeframe}
                  </p>
                </motion.div>

                <motion.blockquote
                  {...fadeUp}
                  transition={{ duration: 0.9, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
                  className="mt-14 rounded-[28px] bg-black/3 px-7 py-8 md:px-9"
                  style={{ backdropFilter: "blur(6px)" }}
                >
                  <p className="font-display text-lg leading-snug text-black/85 md:text-xl">
                    &ldquo;{study.testimonial.quote}&rdquo;
                  </p>
                  <footer className="mt-4 text-xs text-black/40">
                    {study.testimonial.name} &nbsp;·&nbsp; {study.testimonial.role}
                  </footer>
                </motion.blockquote>

                <motion.div
                  {...fadeUp}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-14 flex justify-center"
                >
                  <a
                    href="/contact"
                    className="rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
                  >
                    Get results like this →
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
