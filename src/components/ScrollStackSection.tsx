"use client";

import { useCallback, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ScrollStack from "./ScrollStack";
import DashboardMockup from "./DashboardMockup";
import TechLogoMarquee from "./TechLogoMarquee";
import RetentionBoardMockup from "./RetentionBoardMockup";
import ScalingMockup from "./ScalingMockup";
import { useDarkSection } from "./NavThemeContext";

const pillars = [
  {
    eyebrow: "Acquisition",
    title: "We bring in the right people",
    body: "Paid, organic, and creative-led channels engineered to attract buyers who actually convert — not just traffic.",
    accent: "#5b0fd6",
    chartLabel: "New Visitors",
    chartValue: "+340% YoY",
    statLabel: "Compared to Last Quarter",
    bars: [40, 65, 50, 90, 70],
    floatingLabel: "Campaign Reach",
    floatingSubLabel: "Live across 4 channels",
  },
  {
    eyebrow: "Conversion",
    title: "We turn visitors into customers",
    body: "Landing pages, funnels, and creative built around one job — moving someone from interested to purchased.",
    accent: "#a020f0",
    chartLabel: "Conversion Rate",
    chartValue: "6.8%",
    statLabel: "Compared to Last Quarter",
    bars: [55, 45, 80, 60, 95],
    floatingLabel: "Checkout Funnel",
    floatingSubLabel: "72% completion",
  },
  {
    eyebrow: "Retention",
    title: "We keep them coming back",
    body: "Lifecycle marketing and CRM systems that turn one-time buyers into repeat customers and true fans.",
    accent: "#4c1dff",
    chartLabel: "Repeat Purchase Rate",
    chartValue: "48%",
    statLabel: "Compared to Last Quarter",
    bars: [60, 70, 55, 85, 75],
    floatingLabel: "Customer Lifetime Value",
    floatingSubLabel: "+22% this month",
  },
  {
    eyebrow: "Scaling",
    title: "We scale what already works",
    body: "Once we find a winning system, we pour fuel on it — systematically, profitably, and without the guesswork.",
    accent: "#0038ff",
    chartLabel: "Revenue Growth",
    chartValue: "4.6x",
    statLabel: "Compared to Last Quarter",
    bars: [50, 60, 75, 65, 100],
    floatingLabel: "Ad Spend Efficiency",
    floatingSubLabel: "3.2x ROAS",
  },
];

export default function ScrollStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const darkRef = useDarkSection("scroll-stack-section");
  const setRefs = useCallback(
    (el: HTMLElement | null) => {
      sectionRef.current = el;
      darkRef(el);
    },
    [darkRef]
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const angle = useTransform(scrollYProgress, [0, 1], [90, 450]);
  const background = useTransform(
    angle,
    (a) =>
      `linear-gradient(${a}deg, #000000 0%, #1e0f8f 18%, #5b0fd6 38%, #a020f0 58%, #4c1dff 78%, #0038ff 100%)`
  );

  return (
    <motion.section
      id="services"
      ref={setRefs}
      className="relative w-full"
      style={{ background }}
    >
      <div className="mx-auto max-w-2xl px-6 pt-20 pb-8 text-center md:pt-28">
        <p className="font-display leading-snug" style={{ fontSize: "clamp(20px, 3vw, 28px)" }}>
          <span className="text-white">What services do you get?</span>{" "}
          <span className="text-white/50">
            We simply offer the entire system to anyone who wants to scale their brand with
            absolute certainty.
          </span>
        </p>
      </div>

      <ScrollStack
        baseScale={0.92}
        itemScale={0.02}
        perCardScroll={1.1}
        items={pillars.map((pillar, i) => {
          const isFirst = i === 0;
          const isSecond = i === 1;
          const isThird = i === 2;
          const isFourth = i === 3;
          const fadeUp = {
            initial: { opacity: 0, y: 28 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.5 },
          };

          return {
            content: (
              <div className="flex h-full w-full flex-col items-center gap-10 md:flex-row md:gap-16">
                <div className="flex flex-1 flex-col justify-center gap-6">
                  <motion.span
                    {...fadeUp}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-black/5 px-3 py-1.5 text-xs font-medium tracking-wide text-black/50 uppercase"
                  >
                    {String(i + 1).padStart(2, "0")} — {pillar.eyebrow}
                  </motion.span>
                  <motion.h3
                    {...fadeUp}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                    className="font-display text-4xl leading-[1.05] text-black md:text-6xl"
                  >
                    {isSecond ? (
                      <>
                        We turn visitors
                        <br />
                        into customers
                      </>
                    ) : isThird ? (
                      <>
                        We keep them
                        <br />
                        coming back
                      </>
                    ) : isFourth ? (
                      <>
                        We scale what
                        <br />
                        already works
                      </>
                    ) : (
                      pillar.title
                    )}
                  </motion.h3>
                  <motion.p
                    {...fadeUp}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                    className="max-w-md text-lg leading-relaxed text-black/60"
                  >
                    {pillar.body}
                  </motion.p>
                </div>
                {isFirst && (
                  <motion.div
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
                    className="w-full flex-1"
                  >
                    <DashboardMockup
                      chartLabel={pillar.chartLabel}
                      chartValue={pillar.chartValue}
                      statLabel={pillar.statLabel}
                      bars={pillar.bars}
                      floatingLabel={pillar.floatingLabel}
                      floatingSubLabel={pillar.floatingSubLabel}
                      accent={pillar.accent}
                    />
                  </motion.div>
                )}
                {isSecond && (
                  <motion.div
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
                    className="w-full flex-1"
                  >
                    <TechLogoMarquee />
                  </motion.div>
                )}
                {isThird && (
                  <motion.div
                    initial={{ opacity: 0, x: 90 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    className="w-full flex-1"
                  >
                    <RetentionBoardMockup />
                  </motion.div>
                )}
                {isFourth && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    className="w-full flex-1"
                  >
                    <ScalingMockup />
                  </motion.div>
                )}
              </div>
            ),
          };
        })}
      />
    </motion.section>
  );
}
