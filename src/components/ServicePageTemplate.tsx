"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TestimonialsSection from "./TestimonialsSection";
import { NavThemeProvider, useDarkSection } from "./NavThemeContext";
import CountUp from "./CountUp";
import CaseStudyTrendChart from "./CaseStudyTrendChart";
import CaseStudyTimeline from "./CaseStudyTimeline";
import type { ServicePage } from "@/lib/servicesData";
import { caseStudies, categoryAccent, categoryGlow } from "@/lib/caseStudiesData";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
};

function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div layout className="overflow-hidden rounded-2xl bg-zinc-100" transition={{ layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}>
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
        <span className="font-display text-base text-black md:text-lg">{q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-6 w-6 shrink-0 items-center justify-center text-xl text-black/50"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="px-6 pb-6 text-sm leading-relaxed text-black/60 md:text-[15px]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ServiceHero({ service, accent, glow }: { service: ServicePage; accent: string; glow: string }) {
  const router = useRouter();
  const darkRef = useDarkSection(`service-hero-${service.slug}`);

  return (
    <div
      ref={darkRef}
      className="relative overflow-hidden bg-black px-6 pt-40 pb-24 text-center md:px-16 md:pt-48 md:pb-32"
    >
      <motion.div
        className="pointer-events-none absolute -top-32 left-1/2 h-128 w-lg -translate-x-1/2 rounded-full blur-[110px]"
        style={{ background: glow }}
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.15em] uppercase"
        style={{ background: `${accent}26`, color: accent }}
      >
        {service.eyebrow}
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display relative z-10 mx-auto mt-5 max-w-3xl text-3xl leading-tight text-white md:text-5xl"
      >
        {service.h1}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base"
      >
        {service.intro}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.19, 1, 0.22, 1] }}
        className="relative z-10 mt-10"
      >
        <div
          className="font-display bg-linear-to-b from-white to-white/70 bg-clip-text text-transparent"
          style={{ fontSize: "clamp(44px, 8vw, 76px)", lineHeight: 1 }}
        >
          <CountUp value={service.headlineStat.value} duration={1.6} />
        </div>
        <p className="mt-2 text-sm text-white/45 md:text-base">{service.headlineStat.label}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mt-10 flex w-full max-w-xs flex-col items-stretch gap-3 sm:mx-auto sm:w-auto sm:max-w-none sm:flex-row sm:justify-center"
      >
        <button
          onClick={() => router.push("/contact")}
          className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.03]"
        >
          Book a free audit call
        </button>
        <Link
          href="/case-studies"
          className="rounded-full border border-white/20 px-7 py-3.5 text-center text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03] hover:bg-white/5"
        >
          See case studies
        </Link>
      </motion.div>
    </div>
  );
}

export default function ServicePageTemplate({ service }: { service: ServicePage }) {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState(0);
  const accent = categoryAccent[service.category];
  const glow = categoryGlow[service.category];
  const relatedCaseStudies = caseStudies.filter((c) => c.category === service.category).slice(0, 2);

  return (
    <main className="min-h-screen w-full bg-white">
      <NavThemeProvider>
        <Navbar />

        <ServiceHero service={service} accent={accent} glow={glow} />

        {/* Everything below flows on one continuous white surface — no hard section borders. */}
        <div className="relative mx-auto max-w-3xl px-6 pt-20 pb-8 md:px-0">
          {/* Ambient color wash, tied to the service's accent, bleeding softly into the white surface */}
          <motion.div
            className="pointer-events-none absolute top-0 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
            style={{ background: glow }}
            animate={{ opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* The problem */}
          <motion.div {...fadeUp} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <h2 className="font-display text-2xl text-black md:text-3xl">{service.problem.heading}</h2>
            <div className="mt-5 space-y-4">
              {service.problem.body.map((p, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-black/60 md:text-base">
                  {p}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Live chart, woven directly into the flow — no card border, just breathing room */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20 rounded-4xl bg-zinc-50/80 px-6 py-10 md:px-12 md:py-12"
            style={{ backdropFilter: "blur(6px)" }}
          >
            <h3 className="font-display text-xl text-black md:text-2xl">{service.chart.heading}</h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-black/55 md:text-[15px]">
              {service.chart.caption}
            </p>
            <div className="mt-8">
              <CaseStudyTrendChart trend={service.chart} accent={accent} />
            </div>
          </motion.div>

          {/* Approach */}
          <motion.div {...fadeUp} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mt-20">
            <h2 className="font-display text-2xl text-black md:text-3xl">{service.approach.heading}</h2>
            <CaseStudyTimeline steps={service.approach.steps} accent={accent} />
          </motion.div>

          {/* Deliverables — woven in as a soft grid, not a bordered card list */}
          <motion.div {...fadeUp} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mt-20">
            <h2 className="font-display text-2xl text-black md:text-3xl">What&apos;s included</h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {service.deliverables.map((d, i) => (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span
                    className="mb-3 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ background: accent }}
                  >
                    ✓
                  </span>
                  <h3 className="font-display text-lg text-black">{d.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-black/55 md:text-[15px]">{d.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Related case studies */}
          {relatedCaseStudies.length > 0 && (
            <motion.div {...fadeUp} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mt-20">
              <h2 className="font-display text-2xl text-black md:text-3xl">Real results, same category</h2>
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {relatedCaseStudies.map((cs) => (
                  <Link
                    key={cs.slug}
                    href="/case-studies"
                    className="group rounded-3xl p-6 transition-colors duration-300"
                    style={{ background: `${accent}0d` }}
                  >
                    <div className="font-display text-3xl text-black">{cs.headlineMetric.value}</div>
                    <p className="mt-1 text-xs text-black/40">{cs.headlineMetric.label}</p>
                    <h3 className="font-display mt-4 text-lg text-black">{cs.brand}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-black/55">{cs.summary}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-black/70 transition-transform duration-300 group-hover:translate-x-1">
                      Read case study →
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

        </div>

        <div className="mt-20">
          <TestimonialsSection />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 pt-20 pb-8 md:px-0">
          {/* FAQs */}
          <motion.div {...fadeUp} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <h2 className="font-display text-2xl text-black md:text-3xl">Frequently asked questions</h2>
            <div className="mt-8 flex flex-col gap-3">
              {service.faqs.map((faq, i) => (
                <FaqItem
                  key={faq.q}
                  q={faq.q}
                  a={faq.a}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                />
              ))}
            </div>
          </motion.div>

          {/* Closing CTA */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20 pb-4 text-center"
          >
            <h2 className="font-display text-2xl text-black md:text-4xl">Ready to see where the leverage is?</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-black/50 md:text-base">
              Book a free audit call and we&apos;ll show you exactly where the opportunity is.
            </p>
            <button
              onClick={() => router.push("/contact")}
              className="mt-6 rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
            >
              Book your free audit call →
            </button>
          </motion.div>
        </div>

        <div className="mt-20">
          <Footer />
        </div>
      </NavThemeProvider>
    </main>
  );
}
