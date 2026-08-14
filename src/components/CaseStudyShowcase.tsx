"use client";

import { useState, type ComponentType } from "react";
import { motion } from "motion/react";
import { caseStudies, categoryAccent, categoryGlow, type CaseStudy } from "@/lib/caseStudiesData";
import CaseStudyDetailModal from "./CaseStudyDetailModal";
import TiltCard from "./TiltCard";
import DashboardMockup from "./DashboardMockup";
import ProjectBoardMockup from "./ProjectBoardMockup";
import GrowthMockup from "./GrowthMockup";
import RetentionBoardMockup from "./RetentionBoardMockup";
import ScalingMockup from "./ScalingMockup";
import SystemsMockup from "./SystemsMockup";

const mockupBySlug: Record<string, ComponentType> = {
  "juniper-and-oat": GrowthMockup,
  "northfield-supply-co": SystemsMockup,
  "birchwell-labs": RetentionBoardMockup,
  "harlow-and-fern": ScalingMockup,
  "solstice-eyewear": () => (
    <DashboardMockup
      chartLabel="New Visitors"
      chartValue="+340% YoY"
      statLabel="Compared to Last Quarter"
      bars={[40, 65, 50, 90, 70]}
      floatingLabel="Campaign Reach"
      floatingSubLabel="Live across 4 channels"
      accent="#5b0fd6"
    />
  ),
  "wrenhouse-coffee": ProjectBoardMockup,
};

// Distinct entrance per card index so the grid doesn't read as one repeated animation.
const entranceVariants = [
  { initial: { opacity: 0, y: 60, rotate: -3, scale: 0.92 }, animate: { opacity: 1, y: 0, rotate: 0, scale: 1 } },
  { initial: { opacity: 0, x: -50, rotate: 2, scale: 0.94 }, animate: { opacity: 1, x: 0, rotate: 0, scale: 1 } },
  { initial: { opacity: 0, y: 50, scale: 0.85 }, animate: { opacity: 1, y: 0, scale: 1 } },
  { initial: { opacity: 0, x: 50, rotate: -2, scale: 0.94 }, animate: { opacity: 1, x: 0, rotate: 0, scale: 1 } },
  { initial: { opacity: 0, y: 70, rotate: 3, scale: 0.9 }, animate: { opacity: 1, y: 0, rotate: 0, scale: 1 } },
  { initial: { opacity: 0, y: 40, scale: 0.88 }, animate: { opacity: 1, y: 0, scale: 1 } },
];

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/50">
      <div className="flex shrink-0 items-center gap-1.5 border-b border-black/5 bg-white/70 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden p-3">{children}</div>
    </div>
  );
}

export default function CaseStudyShowcase() {
  const [active, setActive] = useState<CaseStudy | null>(null);

  return (
    <section className="w-full bg-white px-6 pt-8 pb-24 md:px-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((study, i) => {
          const Mockup = mockupBySlug[study.slug];
          const variant = entranceVariants[i % entranceVariants.length];

          return (
            <motion.div
              key={study.slug}
              initial={variant.initial}
              whileInView={variant.animate}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "transform, opacity" }}
            >
              <TiltCard rotateAmplitude={7} scaleOnHover={1.02} className="group">
                <button
                  type="button"
                  onClick={() => setActive(study)}
                  className="flex w-full flex-col text-left"
                >
                  <div className="relative h-72 w-full overflow-hidden rounded-3xl">
                    {/* Ambient glow, pulsing */}
                    <motion.div
                      className="pointer-events-none absolute -top-16 -right-16 z-0 h-56 w-56 rounded-full blur-3xl"
                      style={{ background: categoryGlow[study.category] }}
                      animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.12, 1] }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3,
                      }}
                    />

                    {/* Glass surface */}
                    <div
                      className="relative z-10 h-full w-full p-3"
                      style={{
                        background:
                          "linear-gradient(160deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 55%, rgba(255,255,255,0.3) 100%)",
                        backdropFilter: "blur(14px) saturate(180%)",
                        WebkitBackdropFilter: "blur(14px) saturate(180%)",
                        border: "1.5px solid rgba(255,255,255,0.85)",
                        borderRadius: "24px",
                        boxShadow:
                          "inset 0 1px 1px rgba(255,255,255,0.95), inset 0 -1px 20px rgba(255,255,255,0.2), 0 25px 70px rgba(80,20,150,0.12)",
                      }}
                    >
                      <BrowserFrame>
                        <Mockup />
                      </BrowserFrame>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2.5">
                    <motion.span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: categoryAccent[study.category] }}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.2,
                      }}
                    />
                    <h3 className="font-display text-lg text-black md:text-xl">{study.brand}</h3>
                  </div>
                  <p className="mt-1.5 pl-4.5 text-sm text-black/45">
                    {study.category} &nbsp;•&nbsp; {study.headlineMetric.value}{" "}
                    {study.headlineMetric.label}
                  </p>
                  <p className="mt-2.5 pl-4.5 text-sm leading-relaxed text-black/60 italic">
                    &ldquo;{study.testimonial.quote}&rdquo;
                    <span className="not-italic text-black/35"> — {study.testimonial.name}</span>
                  </p>
                </button>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>

      <CaseStudyDetailModal study={active} onClose={() => setActive(null)} />
    </section>
  );
}
