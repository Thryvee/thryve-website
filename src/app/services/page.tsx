"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyBookCTA from "@/components/StickyBookCTA";
import AboutCTA from "@/components/AboutCTA";
import BlurText from "@/components/BlurText";
import GradientText from "@/components/GradientText";
import TiltCard from "@/components/TiltCard";
import ScalingMockup from "@/components/ScalingMockup";
import SystemsMockup from "@/components/SystemsMockup";
import GrowthMockup from "@/components/GrowthMockup";
import RetentionBoardMockup from "@/components/RetentionBoardMockup";
import { NavThemeProvider } from "@/components/NavThemeContext";
import { servicePages } from "@/lib/servicesData";

const gradientColors = ["#5227FF", "#6366F1", "#A855F7"];

// Canonical order: Acquisition → Conversion → Retention → Scaling.
const cardOrder = ["ecommerce-acquisition", "ecommerce-cro", "ecommerce-retention", "d2c-growth"];

const cardStyles: Record<
  string,
  { gradient: string; blurb: string; Mockup: React.ComponentType }
> = {
  "ecommerce-acquisition": {
    gradient: "linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)",
    blurb:
      "New ad concepts ship every week, so your best-performing creative gets replaced before it fatigues — not after CAC has already climbed.",
    Mockup: GrowthMockup,
  },
  "ecommerce-cro": {
    gradient: "linear-gradient(135deg, #f472b6 0%, #a855f7 100%)",
    blurb:
      "We track every step of the funnel live, so we know the exact page where buyers give up — and fix that page first.",
    Mockup: SystemsMockup,
  },
  "ecommerce-retention": {
    gradient: "linear-gradient(135deg, #34d399 0%, #0ea5e9 100%)",
    blurb:
      "Flows triggered by real customer behavior — reorder windows, churn signals — not a generic email blast on a fixed schedule.",
    Mockup: RetentionBoardMockup,
  },
  "d2c-growth": {
    gradient: "linear-gradient(135deg, #fb923c 0%, #ec4899 100%)",
    blurb:
      "One dashboard, one team, one number: revenue growth tracked month over month as acquisition, conversion, and retention compound together.",
    Mockup: ScalingMockup,
  },
};

export default function ServicesHubPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full bg-white">
      <NavThemeProvider>
        <Navbar />

        <section className="px-6 pt-40 pb-16 text-center md:px-16 md:pt-48 md:pb-16">
          <h1
            className="font-display mx-auto max-w-3xl leading-[1.15] font-normal tracking-tight text-black"
            style={{ fontSize: "clamp(1.5rem, 5vw, 3.75rem)" }}
          >
            <span className="block whitespace-nowrap">
              <BlurText text="Every dollar spent should" delay={80} animateBy="words" direction="top" />
            </span>
            <span className="block whitespace-nowrap">
              <GradientText
                colors={gradientColors}
                animationSpeed={2}
                blurIn
                blurDelay={0.16}
                className="text-inherit font-[inherit]"
              >
                compound,
              </GradientText>{" "}
              <BlurText text="not disappear." delay={50} animateBy="words" direction="top" />
            </span>
          </h1>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => router.push("/contact")}
              className="rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105"
            >
              Contact Us
            </button>
          </div>
        </section>

        <section className="px-6 pb-24 md:px-16">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
            {cardOrder.map((slug, i) => {
              const s = servicePages.find((sp) => sp.slug === slug)!;
              const style = cardStyles[slug];
              const Mockup = style.Mockup;
              return (
                <motion.div
                  key={slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
                  className="h-120"
                >
                  <TiltCard
                    className="relative flex h-120 w-full flex-col overflow-hidden rounded-3xl p-7"
                    style={{ background: style.gradient }}
                  >
                    {/* Liquid glass layer */}
                    <div
                      className="pointer-events-none absolute inset-0 z-20 rounded-3xl"
                      style={{
                        backdropFilter: "blur(10px) saturate(180%)",
                        WebkitBackdropFilter: "blur(10px) saturate(180%)",
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.14) 25%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.22) 100%)",
                        boxShadow:
                          "inset 0 2px 2px rgba(255,255,255,0.85), inset 0 -30px 50px rgba(255,255,255,0.12), inset 0 0 80px rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.55)",
                      }}
                    />
                    <div
                      className="pointer-events-none absolute -top-1/3 -left-1/4 z-20 h-2/3 w-3/4 rotate-20 rounded-full opacity-70 blur-2xl"
                      style={{
                        background:
                          "linear-gradient(120deg, rgba(255,255,255,0.85), rgba(255,255,255,0) 65%)",
                      }}
                    />
                    <div
                      className="pointer-events-none absolute right-0 bottom-0 z-20 h-1/2 w-1/2 translate-x-1/4 translate-y-1/4 rounded-full opacity-40 blur-3xl"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(255,255,255,0.6), rgba(255,255,255,0) 70%)",
                      }}
                    />
                    <a href={`/services/${s.slug}`} className="relative z-30 flex h-full flex-col">
                      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase backdrop-blur-sm">
                        {String(i + 1).padStart(2, "0")} — {s.category}
                      </span>
                      <div className="relative mt-5 min-h-0 flex-1 overflow-visible">
                        <Mockup />
                      </div>
                      <div className="mt-5">
                        <h2 className="font-display text-2xl text-white">{s.category}</h2>
                        <p className="mt-2 text-sm leading-relaxed text-white/80">{style.blurb}</p>
                      </div>
                    </a>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </section>

        <AboutCTA secondaryCtaLabel="About Us" secondaryCtaHref="/about" />

        <Footer />

        <StickyBookCTA />
      </NavThemeProvider>
    </main>
  );
}
