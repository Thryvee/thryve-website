"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

export default function AboutCTA() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.5 });
  const cardOpacity = useTransform(smoothProgress, [0, 1], [0.3, 1]);
  const cardScale = useTransform(smoothProgress, [0, 1], [0.9, 1]);
  const cardY = useTransform(smoothProgress, [0, 1], [90, 0]);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-white px-6 pt-10 pb-28 md:px-16">
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-144 w-xl -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[110px]"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        style={{ opacity: cardOpacity, scale: cardScale, y: cardY, willChange: "transform, opacity" }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-[40px] bg-zinc-50 px-8 py-16 text-center md:px-16"
      >
        <motion.div
          className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)" }}
          animate={{ opacity: [0.4, 0.7, 0.4], x: [0, 20, 0], y: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(236,72,153,0.16) 0%, transparent 70%)" }}
          animate={{ opacity: [0.3, 0.6, 0.3], x: [0, -20, 0], y: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display relative z-10 text-2xl leading-snug text-black md:text-4xl"
        >
          Ready to scale what&apos;s working?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto mt-1 max-w-md text-sm text-black/50 md:text-base"
        >
          Book a free audit call and we&apos;ll show you exactly where the leverage is.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto mt-6 flex w-full max-w-xs flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
        >
          <button
            onClick={() => router.push("/contact")}
            className="rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105"
          >
            Contact Us
          </button>
          <button
            onClick={() => router.push("/case-studies")}
            className="rounded-full border border-black/15 bg-white px-6 py-2.5 text-sm font-semibold text-black transition-transform duration-300 hover:scale-105"
          >
            See Case Studies
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
