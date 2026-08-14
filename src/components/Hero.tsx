"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import BlurText from "./BlurText";
import GradientText from "./GradientText";
import SpecularButton from "./SpecularButton";
import CountUp from "./CountUp";
import { useTrailVisibility } from "./TrailVisibilityContext";

const gradientColors = ["#5227FF", "#6366F1", "#A855F7"];

export default function Hero() {
  const router = useRouter();
  const { setHidden } = useTrailVisibility();

  return (
    <div className="pointer-events-none flex h-full w-full flex-col items-center justify-center gap-7 px-6 md:px-12">
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-black/3 px-4 py-2 text-sm tracking-tight text-black/70"
      >
        World&apos;s 1st{" "}
        <GradientText
          colors={gradientColors}
          animationSpeed={2}
          className="text-inherit font-semibold"
        >
          Revenue Systems Agency
        </GradientText>
      </motion.span>

      <h1
        className="font-display mx-auto text-center leading-[1.15] font-normal tracking-tight text-black"
        style={{ fontSize: "clamp(1.15rem, 5.8vw, 4rem)" }}
      >
        <span className="block whitespace-nowrap">
          <BlurText text="We build" delay={80} animateBy="words" direction="top" />{" "}
          <GradientText
            colors={gradientColors}
            animationSpeed={2}
            blurIn
            blurDelay={0.16}
            className="text-[inherit] font-[inherit]"
          >
            acquisition,
          </GradientText>
        </span>
        <span className="block whitespace-nowrap">
          <GradientText
            colors={gradientColors}
            animationSpeed={2}
            blurIn
            blurDelay={0}
            className="text-[inherit] font-[inherit]"
          >
            conversion &amp; retention
          </GradientText>{" "}
          <BlurText text="channels" delay={50} animateBy="words" direction="top" />
        </span>
        <span className="block whitespace-nowrap">
          <BlurText text="for D2C brand people buy from" delay={50} animateBy="words" direction="top" />
        </span>
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex flex-col items-center gap-1 text-center"
      >
        <div className="flex items-baseline gap-2">
          <span className="font-display text-3xl text-black md:text-4xl">
            <CountUp value="$4.2M" duration={1.8} />
          </span>
          <span className="text-sm text-black/50 md:text-[15px]">
            generated for <span className="font-semibold text-black/70">128 brands</span>
          </span>
        </div>
        <span className="text-sm text-black/40 md:text-[15px]">
          No churned engagements without a documented lift in LTV.
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="mt-2 flex w-full max-w-xs flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center"
      >
        <SpecularButton
          size="md"
          radius={999}
          tint="#ffffff"
          tintOpacity={0.15}
          blur={12}
          textColor="#000000"
          lineColor="#000000"
          baseColor="#999999"
          proximity={220}
          className="pointer-events-auto w-full border border-black/15 font-semibold sm:w-auto"
          onClick={() => {
            const target = document.getElementById("services");
            if (!target) return;
            if (window.lenisInstance) {
              window.lenisInstance.scrollTo(target, { offset: 0 });
            } else {
              target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
        >
          Explore Services
        </SpecularButton>

        <SpecularButton
          size="md"
          radius={999}
          tint="#000000"
          tintOpacity={1}
          textColor="#ffffff"
          lineColor="#ffffff"
          baseColor="#333333"
          proximity={220}
          className="pointer-events-auto w-full font-semibold sm:w-auto"
          onClick={() => router.push("/contact")}
          onMouseEnter={() => setHidden(true)}
          onMouseLeave={() => setHidden(false)}
        >
          Get in Touch →
        </SpecularButton>
      </motion.div>
    </div>
  );
}
