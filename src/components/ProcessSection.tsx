"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import AsyncChatMockup from "./AsyncChatMockup";
import ProjectBoardMockup from "./ProjectBoardMockup";
import CountUp from "./CountUp";

const painPoints = [
  { label: "Long meetings", delay: 0 },
  { label: "Slow agency turnaround", delay: 0.12 },
  { label: "Micromanagement", delay: 0.24 },
  { label: "Rigid retainers", delay: 0.36 },
];

function GlassCard({
  children,
  glow,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  glow: string;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 70, x: 36, scale: 0.9, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
      className={`relative ${className}`}
      style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
    >
      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute -inset-10 -z-10 rounded-full blur-3xl"
        style={{ background: glow }}
        animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
      />

      {/* Glass surface */}
      <div
        className="relative h-full overflow-hidden rounded-4xl p-7"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.12) 55%, rgba(255,255,255,0.22) 100%)",
          backdropFilter: "blur(14px) saturate(180%)",
          WebkitBackdropFilter: "blur(14px) saturate(180%)",
          border: "1.5px solid rgba(255,255,255,0.85)",
          boxShadow:
            "inset 0 1px 1px rgba(255,255,255,0.95), inset 0 -1px 20px rgba(255,255,255,0.2), 0 25px 70px rgba(80,20,150,0.1), 0 1px 0 rgba(120,60,200,0.06)",
          transform: "translateZ(0)",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

function FreedomOrbit() {
  const rings = [
    { size: 130, duration: 12, dot: "#3b82f6" },
    { size: 200, duration: 18, dot: "#a020f0" },
    { size: 270, duration: 26, dot: "#f472b6" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto flex w-full shrink-0 items-center justify-center md:mx-0 md:w-72"
    >
      <motion.div
        className="relative h-52 w-52 md:h-72 md:w-72"
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {rings.map((ring) => (
          <div
            key={ring.size}
            className="absolute top-1/2 left-1/2 rounded-full border border-black/10"
            style={{
              width: ring.size,
              height: ring.size,
              marginLeft: -ring.size / 2,
              marginTop: -ring.size / 2,
            }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
            >
              <motion.span
                className="absolute top-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-md"
                style={{ background: ring.dot }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        ))}

        <motion.div
          className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black shadow-lg"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5">
            <motion.path
              d="M12 4 L12 20 M4 12 L20 12"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function ShiftGraphic() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, rotate: 6 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex w-full shrink-0 items-center justify-center md:mr-6 md:w-64 md:-translate-x-6"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(34,197,94,0.25) 0%, transparent 70%)" }}
        animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="flex flex-col items-center gap-4 rounded-3xl border border-black/5 bg-white/70 px-8 py-7 shadow-lg"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      >
        <div className="relative h-24 w-24">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#f4f4f5" strokeWidth="10" />
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#22c55e"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 42}
              initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
              whileInView={{ strokeDashoffset: 2 * Math.PI * 42 * 0.08 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.6, delay: 0.6, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <CountUp value="92%" className="font-display text-xl text-black" duration={1.6} />
          </div>
        </div>
        <motion.span
          className="text-center text-xs font-medium text-black/50"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          fewer hours lost
          <br />
          to process overhead
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.5,
  });

  const gridOpacity = useTransform(smoothProgress, [0, 1], [0.4, 1]);
  const gridY = useTransform(smoothProgress, [0, 1], [50, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-linear-to-b from-white via-purple-50/40 to-white px-8 pt-36 pb-16 md:px-12"
    >
      <motion.div
        className="pointer-events-none absolute top-1/4 left-1/3 -z-10 h-128 w-lg rounded-full opacity-30 blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)",
          willChange: "transform",
        }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-1/4 bottom-1/4 -z-10 h-104 w-104 rounded-full opacity-25 blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)",
          willChange: "transform",
        }}
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <div className="mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs font-medium tracking-[0.25em] text-black/35 uppercase"
        >
          First sprint
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display mt-3 leading-snug"
          style={{ fontSize: "clamp(20px, 3vw, 28px)" }}
        >
          <span className="text-black">Already live. Already selling.</span>{" "}
          <span className="text-black/50">
            By the end of sprint one, not somewhere on a future roadmap.
          </span>
        </motion.h2>
      </div>

      <motion.div
        style={{ opacity: gridOpacity, y: gridY, willChange: "transform, opacity" }}
        className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-5"
      >
        <GlassCard
          glow="radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 70%)"
          delay={0}
          className="md:col-span-2"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <AsyncChatMockup />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6"
          >
            <h3 className="font-display text-2xl text-black">Async by default</h3>
            <p className="mt-2 text-sm leading-relaxed text-black/50">
              Weekly syncs, daily async updates — no calendar full of check-in calls. You always
              know where things stand.
            </p>
          </motion.div>
        </GlassCard>

        <GlassCard
          glow="radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)"
          delay={0.15}
          className="md:col-span-3"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: 6 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectBoardMockup />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6"
          >
            <h3 className="font-display text-2xl text-black">Execution over templates</h3>
            <p className="mt-2 text-sm leading-relaxed text-black/50">
              Every sprint ships against a visible board — no black boxes, no guesswork on where
              your budget is going.
            </p>
          </motion.div>
        </GlassCard>

        <GlassCard
          glow="radial-gradient(circle, rgba(244,63,94,0.28) 0%, transparent 70%)"
          delay={0.3}
          className="flex md:col-span-2 md:row-span-1"
        >
          <div className="flex min-h-88 w-full flex-col gap-8 md:min-h-104 md:flex-row md:items-center">
            <div className="flex flex-1 flex-col justify-center">
              <h3 className="font-display text-2xl text-black">Say no more to</h3>
              <div className="mt-6 flex flex-col gap-4">
                {painPoints.map((point, i) => (
                  <motion.div
                    key={point.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.5 + point.delay,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex items-center gap-3"
                  >
                    <motion.span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-red-50 text-red-500"
                      animate={{ scale: [1, 1.12, 1] }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3,
                      }}
                    >
                      <svg viewBox="0 0 12 12" className="h-3 w-3">
                        <motion.path
                          d="M2 2 L10 10 M10 2 L2 10"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true, amount: 0.5 }}
                          transition={{ duration: 0.4, delay: 0.65 + point.delay }}
                        />
                      </svg>
                    </motion.span>
                    <span className="text-sm text-black/70">{point.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <ShiftGraphic />
          </div>
        </GlassCard>

        <GlassCard
          glow="radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)"
          delay={0.45}
          className="flex md:col-span-3"
        >
          <div className="flex min-h-88 w-full flex-col items-center justify-center gap-8 md:min-h-104 md:flex-row md:justify-between md:gap-4">
            <div className="flex flex-1 flex-col justify-center">
              <motion.h3
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-2xl text-black"
              >
                Operate with freedom
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="mt-3 text-sm leading-relaxed text-black/50"
              >
                No rigid contracts. Just an open, flexible process that adapts to how you work —
                not the other way around.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                className="mt-6 flex flex-wrap items-center gap-2"
              >
                {["Month-to-month", "Cancel anytime", "No lock-in"].map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="rounded-full bg-black/5 px-3 py-1.5 text-xs font-medium text-black/60"
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 2.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.25,
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            <FreedomOrbit />
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}
