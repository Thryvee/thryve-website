"use client";

import { useRouter } from "next/navigation";
import BlurText from "./BlurText";
import GradientText from "./GradientText";
import SpecularButton from "./SpecularButton";
import { useTrailVisibility } from "./TrailVisibilityContext";

const gradientColors = ["#5227FF", "#6366F1", "#A855F7"];

export default function Hero() {
  const router = useRouter();
  const { setHidden } = useTrailVisibility();

  return (
    <div className="pointer-events-none flex h-full w-full -translate-y-8 flex-col items-center justify-center gap-6 px-6 md:px-12">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-black/[0.03] px-4 py-2 text-sm text-black/70">
        World&apos;s 1st{" "}
        <span className="font-semibold text-black">Revenue Systems Agency</span>
      </span>
      <h1
        className="font-display mx-auto text-center leading-[1.15] font-normal tracking-tight text-black"
        style={{ fontSize: "clamp(1.5rem, 4.6vw, 4rem)" }}
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

      <div className="flex items-center gap-4">
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
          className="pointer-events-auto border border-black/15 font-semibold"
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
          className="pointer-events-auto font-semibold"
          onClick={() => router.push("/contact")}
          onMouseEnter={() => setHidden(true)}
          onMouseLeave={() => setHidden(false)}
        >
          Get in Touch →
        </SpecularButton>
      </div>
    </div>
  );
}
