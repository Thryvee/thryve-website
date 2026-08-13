"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import BlurText from "./BlurText";
import GradientText from "./GradientText";
import SpotlightCard from "./SpotlightCard";
import CountUp from "./CountUp";

const gradientColors = ["#5227FF", "#6366F1", "#A855F7"];

const founder = {
  name: "Sakcham Raj",
  title: "Founder & CEO, Thryve",
  quote:
    "No guesswork, no vanity metrics. Just numbers you can trust and results you can trace.",
  bio: "After years in the industry, I was tired of the \"just wing it\" method when it came to marketing. So, I built something around the idea that all results and processes must be backed by transparent metrics and tracked relentlessly.",
  signature: [
    { label: "Years in D2C growth", value: "6+" },
    { label: "Brands scaled", value: "120+" },
  ],
};

export default function MeetTheFounder() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white px-6 py-24 md:px-16"
    >
      <motion.div
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-lg w-lg -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto max-w-3xl text-center">
        <h2
          className="font-display leading-[1.15] font-normal tracking-tight text-black"
          style={{ fontSize: "clamp(1.6rem, 4.2vw, 3.25rem)" }}
        >
          <BlurText text="Meet the" delay={60} animateBy="words" direction="top" />{" "}
          <GradientText
            colors={gradientColors}
            animationSpeed={2}
            blurIn
            blurDelay={0.14}
            className="text-inherit font-[inherit]"
          >
            founder
          </GradientText>
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 70, scale: 0.97, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto mt-16 max-w-5xl overflow-hidden rounded-[40px]"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.25) 100%)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow:
            "inset 0 1px 1px rgba(255,255,255,0.8), 0 30px 70px -35px rgba(0,0,0,0.18)",
        }}
      >
        <div
          className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.14) 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)" }}
        />

        <SpotlightCard
          spotlightColor="rgba(99, 102, 241, 0.1)"
          className="grid grid-cols-1 gap-12 p-8 md:grid-cols-[auto_1fr] md:gap-14 md:p-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center gap-5 md:items-start"
          >
            <div
              className="relative overflow-hidden rounded-3xl p-1.5"
              style={{
                background:
                  "linear-gradient(135deg, rgba(168,85,247,0.55), rgba(99,102,241,0.35), rgba(236,72,153,0.4))",
              }}
            >
              <div className="relative h-33 w-33 overflow-hidden rounded-[20px]">
                <Image
                  src="/images/founder-portrait.png"
                  alt={founder.name}
                  fill
                  sizes="132px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="text-center md:text-left">
              <p className="font-display text-lg text-black md:text-xl">{founder.name}</p>
              <p className="mt-1 text-sm text-black/45">{founder.title}</p>
            </div>

            <div className="flex gap-6 pt-1">
              {founder.signature.map((s) => (
                <div key={s.label} className="text-center md:text-left">
                  <CountUp
                    value={s.value}
                    duration={1.6}
                    className="font-display block text-2xl text-black"
                  />
                  <span className="text-[11px] text-black/40">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative z-10 flex flex-col justify-center">
            <svg viewBox="0 0 32 24" className="h-8 w-10 text-black/10" fill="currentColor">
              <path d="M0 24V14.4C0 6.4 4.8 1.2 13.6 0l1.6 4.4c-5.2 1.6-7.6 4.8-7.6 8.8h6.4V24H0zm17.6 0V14.4c0-8 4.8-13.2 13.6-14.4L32.8 4.4c-5.2 1.6-7.6 4.8-7.6 8.8h6.4V24H17.6z" />
            </svg>

            <motion.p
              initial={{ opacity: 0, y: 26, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-display mt-3 text-xl leading-snug text-black md:text-[1.7rem]"
            >
              {founder.quote}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-lg text-sm leading-relaxed text-black/55 md:text-[15px]"
            >
              {founder.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-black/15" />
              <span
                className="font-display text-2xl text-black/70"
                style={{ fontStyle: "italic" }}
              >
                {founder.name.split(" ")[0]}
              </span>
            </motion.div>
          </div>
        </SpotlightCard>
      </motion.div>
    </section>
  );
}
