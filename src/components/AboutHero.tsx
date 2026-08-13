"use client";

import { useCallback, useRef } from "react";
import { motion } from "motion/react";
import CountUp from "./CountUp";
import BlurText from "./BlurText";
import GradientText from "./GradientText";
import TiltCard from "./TiltCard";
import { useDarkSection } from "./NavThemeContext";

const gradientColors = ["#5227FF", "#6366F1", "#A855F7"];

const stats = [
  { label: "Brands Audited", value: "128+", accent: "linear-gradient(135deg, #a855f7, #6366f1)" },
  { label: "Avg. Client CAC Reduced", value: "38%", accent: "linear-gradient(135deg, #ec4899, #a855f7)" },
  { label: "Client Retention Rate", value: "94%", accent: "linear-gradient(135deg, #6366f1, #ec4899)" },
];

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const darkRef = useDarkSection("about-hero");
  const setRefs = useCallback(
    (el: HTMLElement | null) => {
      sectionRef.current = el;
      darkRef(el);
    },
    [darkRef]
  );

  return (
    <section
      ref={setRefs}
      className="relative w-full overflow-hidden bg-black px-6 pt-64 pb-32 md:px-16"
    >
      <div className="mx-auto max-w-4xl text-center">
        <h1
          className="font-display leading-[1.15] font-normal tracking-tight text-white"
          style={{ fontSize: "clamp(1.75rem, 5vw, 4rem)" }}
        >
          <span className="block">
            <BlurText text="We help" delay={80} animateBy="words" direction="top" />{" "}
            <GradientText
              colors={gradientColors}
              animationSpeed={2}
              blurIn
              blurDelay={0.16}
              className="text-inherit font-[inherit]"
            >
              ambitious brands
            </GradientText>
          </span>
          <span className="block">
            <BlurText text="turn attention into revenue." delay={50} animateBy="words" direction="top" />
          </span>
        </h1>
      </div>

      <div className="mx-auto mt-40 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 90, scale: 0.94, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.4, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard
              className="relative flex h-56 flex-col justify-between overflow-hidden rounded-3xl p-8"
              style={{
                background:
                  "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 100%)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow:
                  "inset 0 1px 1px rgba(255,255,255,0.08), inset 0 -20px 40px rgba(255,255,255,0.02)",
              }}
            >
              <span className="relative z-10 text-sm text-white/40">{stat.label}</span>
              <CountUp
                value={stat.value}
                duration={2}
                className="font-display relative z-10 text-5xl md:text-6xl"
                style={{
                  background: stat.accent,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              />
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
