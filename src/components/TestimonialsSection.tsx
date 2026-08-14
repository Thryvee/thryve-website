"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import AvatarGlyph from "./AvatarGlyph";
import { testimonials } from "@/lib/testimonialsData";

const cards = [...testimonials, ...testimonials];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 });
  const sectionOpacity = useTransform(smoothProgress, [0, 1], [0.3, 1]);
  const sectionY = useTransform(smoothProgress, [0, 1], [60, 0]);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-zinc-300 py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-2xl px-6 text-center"
      >
        <h2 className="font-display leading-snug" style={{ fontSize: "clamp(20px, 3vw, 28px)" }}>
          <span className="text-black">Trusted by growing brands.</span>{" "}
          <span className="text-black/50">Hear what clients are saying about Thryve.</span>
        </h2>
      </motion.div>

      {/* Mobile: plain vertical stack, no auto-scroll — the visitor scrolls through every testimonial themselves. */}
      <div className="mt-12 flex w-full flex-col gap-5 px-6 md:hidden">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-black/5 bg-white p-7 shadow-sm"
          >
            <p className="text-[15px] leading-relaxed text-black/80">{t.quote}</p>
            <div className="mt-6 flex items-center gap-3">
              <AvatarGlyph
                seed={t.name}
                size={36}
                className="shrink-0 rounded-full shadow-sm ring-1 ring-black/5"
              />
              <div>
                <p className="text-sm font-medium text-black">{t.name}</p>
                <p className="text-xs text-black/50">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: self-playing horizontal marquee. */}
      <motion.div
        style={{ opacity: sectionOpacity, y: sectionY, willChange: "transform, opacity" }}
        className="relative mt-16 hidden w-full overflow-hidden md:block"
      >
        <div
          className="flex w-max items-stretch gap-6 px-6"
          style={{ animation: "testimonial-marquee 95s linear infinite" }}
        >
          {cards.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="relative flex h-72 w-[420px] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-black/5 bg-white p-8 shadow-sm"
            >
              <motion.div
                className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl"
                style={{
                  background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
                }}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (i % testimonials.length) * 0.3,
                }}
              />

              <p className="relative z-10 text-[15px] leading-relaxed text-black/80">
                {t.quote}
              </p>

              <div className="relative z-10 flex items-center gap-3">
                <AvatarGlyph
                  seed={t.name}
                  size={36}
                  className="shrink-0 rounded-full shadow-sm ring-1 ring-black/5"
                />
                <div>
                  <p className="text-sm font-medium text-black">{t.name}</p>
                  <p className="text-xs text-black/50">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32"
          style={{ background: "linear-gradient(to right, #d4d4d8, #d4d4d800)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32"
          style={{ background: "linear-gradient(to left, #d4d4d8, #d4d4d800)" }}
        />
      </motion.div>

      <style>{`
        @keyframes testimonial-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
