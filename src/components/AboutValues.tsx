"use client";

import { useCallback, useRef } from "react";
import { motion } from "motion/react";
import SpotlightCard from "./SpotlightCard";
import TiltCard from "./TiltCard";
import { useDarkSection } from "./NavThemeContext";

const values = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <path
          d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Move with speed",
    body: "We treat time like the scarce resource it is. Every sprint ships something live, not another round of decks — so momentum never stalls waiting on us.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <path
          d="M3 12l6 6L21 6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Data over opinion",
    body: "Instincts start the conversation, but results end it. We test, measure, and let the numbers decide what stays and what gets killed.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <path
          d="M12 21s-7-4.5-9.5-9C.5 8 2 4 6 4c2 0 3.5 1.2 4 2.5C10.5 5.2 12 4 14 4c4 0 5.5 4 3.5 8-2.5 4.5-9.5 9-9.5 9z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Invested, not detached",
    body: "We run every account like it's our own revenue on the line. If a test isn't moving your number, it doesn't matter how clever it looked on paper.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <path
          d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "No black boxes",
    body: "You see the board, the tests, and the reasoning behind every decision. Nothing ships without a clear line back to the number it's meant to move.",
  },
];

export default function AboutValues() {
  const sectionRef = useRef<HTMLElement>(null);
  const darkRef = useDarkSection("about-values");
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
      className="relative w-full overflow-hidden bg-black px-6 pt-4 pb-32 md:px-16"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
        {values.map((value, i) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 70, scale: 0.95, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.2, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard
              className="overflow-hidden rounded-3xl"
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
              <SpotlightCard spotlightColor="rgba(168, 85, 247, 0.25)" className="p-9">
                <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-white/70">
                  {value.icon}
                </span>
                <h3 className="font-display relative z-10 mt-6 text-2xl text-white md:text-3xl">
                  {value.title}
                </h3>
                <p className="relative z-10 mt-3 max-w-md text-sm leading-relaxed text-white/50 md:text-[15px]">
                  {value.body}
                </p>
              </SpotlightCard>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
