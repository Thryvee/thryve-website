"use client";

import { motion } from "motion/react";
import CountUp from "./CountUp";
import TiltCard from "./TiltCard";
import SpotlightCard from "./SpotlightCard";

const accents = ["#a855f7", "#6366f1", "#ec4899", "#3b82f6", "#f97316", "#22c55e", "#a855f7", "#6366f1"];

export default function GraphicCard({ variant }: { variant: number }) {
  const accent = accents[variant % accents.length];

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 5 + (variant % 3),
        repeat: Infinity,
        ease: "easeInOut",
        delay: variant * 0.25,
      }}
    >
      <TiltCard className="overflow-hidden rounded-3xl border border-black/5 bg-zinc-50">
        <SpotlightCard
          spotlightColor={`${accent}33`}
          className="relative flex h-64 flex-col justify-between p-5"
        >
          <motion.div
            className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full blur-2xl"
            animate={{ opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: variant * 0.3 }}
            style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
          />
          <Graphic variant={variant} accent={accent} />
        </SpotlightCard>
      </TiltCard>
    </motion.div>
  );
}

function Graphic({ variant, accent }: { variant: number; accent: string }) {
  const type = variant % 8;

  if (type === 0) {
    const bars = [40, 65, 50, 85, 60, 95, 70];
    return (
      <>
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-[10px] font-medium text-black/40">Revenue Growth</span>
          <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-medium text-emerald-600">
            <motion.span
              className="h-1 w-1 rounded-full bg-emerald-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            Live
          </span>
        </div>
        <CountUp value="+340%" duration={2} className="font-display relative z-10 text-3xl text-black" />
        <svg viewBox="0 0 140 60" className="relative z-10 h-16 w-full">
          {bars.map((h, i) => (
            <motion.rect
              key={i}
              x={i * 20 + 2}
              width="14"
              rx="3"
              fill={accent}
              y={60 - h * 0.55}
              height={h * 0.55}
              animate={{ scaleY: [0.6, 1, 0.6] }}
              style={{ transformOrigin: "bottom", originY: 1 }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
            />
          ))}
        </svg>
      </>
    );
  }

  if (type === 1) {
    return (
      <>
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-[10px] font-medium text-black/40">Conversion Funnel</span>
          <CountUp value="6.8%" duration={1.6} className="text-xs font-semibold text-black" />
        </div>
        <svg viewBox="0 0 140 70" className="relative z-10 mt-2 h-20 w-full">
          <motion.path
            d="M4 58 C 30 50, 40 25, 60 30 S 100 12, 136 4"
            fill="none"
            stroke={accent}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
          />
          {[
            { x: 4, y: 58 },
            { x: 60, y: 30 },
            { x: 136, y: 4 },
          ].map((pt, i) => (
            <motion.circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r="3.5"
              fill={accent}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </svg>
        <div className="relative z-10 mt-1 flex gap-1">
          {[100, 68, 27].map((p, i) => (
            <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-black/5">
              <motion.div
                className="h-full rounded-full"
                style={{ background: accent, width: `${p}%` }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
            </div>
          ))}
        </div>
      </>
    );
  }

  if (type === 2) {
    const rings = [26, 19, 12];
    return (
      <>
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-[10px] font-medium text-black/40">Channel Mix</span>
          <span className="text-xs font-semibold text-black">4 active</span>
        </div>
        <div className="relative z-10 flex flex-1 items-center justify-center">
          <svg viewBox="0 0 60 60" className="h-24 w-24">
            {rings.map((r, i) => (
              <motion.circle
                key={r}
                cx="30"
                cy="30"
                r={r}
                fill="none"
                stroke={accent}
                strokeWidth="2"
                strokeDasharray="5 4"
                opacity={0.35 + i * 0.22}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 10 + i * 4, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "50% 50%" }}
              />
            ))}
            <motion.circle
              cx="30"
              cy="30"
              r="4"
              fill={accent}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
        </div>
      </>
    );
  }

  if (type === 3) {
    const nodes = [
      { x: 20, y: 18 },
      { x: 55, y: 10 },
      { x: 90, y: 22 },
      { x: 38, y: 50 },
      { x: 75, y: 54 },
    ];
    const edges = [
      [0, 1],
      [1, 2],
      [0, 3],
      [1, 4],
      [3, 4],
    ];
    return (
      <>
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-[10px] font-medium text-black/40">Attribution Map</span>
          <span className="text-xs font-semibold text-black">5 touchpoints</span>
        </div>
        <svg viewBox="0 0 110 65" className="relative z-10 mt-2 h-24 w-full">
          {edges.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke={accent}
              strokeWidth="1.4"
              opacity={0.4}
              animate={{ opacity: [0.15, 0.5, 0.15] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
          {nodes.map((n, i) => (
            <motion.circle
              key={i}
              cx={n.x}
              cy={n.y}
              r="4"
              fill={accent}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </svg>
      </>
    );
  }

  if (type === 4) {
    return (
      <>
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-[10px] font-medium text-black/40">Sprint Progress</span>
          <CountUp value="88%" duration={1.8} className="text-xs font-semibold text-black" />
        </div>
        <div className="relative z-10 flex flex-1 items-center justify-center">
          <svg viewBox="0 0 60 60" className="h-24 w-24">
            <circle cx="30" cy="30" r="24" fill="none" stroke="#e4e4e7" strokeWidth="6" />
            <motion.circle
              cx="30"
              cy="30"
              r="24"
              fill="none"
              stroke={accent}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 24}
              animate={{
                strokeDashoffset: [
                  2 * Math.PI * 24 * 0.9,
                  2 * Math.PI * 24 * 0.12,
                  2 * Math.PI * 24 * 0.9,
                ],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
            />
          </svg>
        </div>
      </>
    );
  }

  if (type === 5) {
    return (
      <>
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-[10px] font-medium text-black/40">Test Queue</span>
          <span className="rounded-full bg-black/5 px-2 py-0.5 text-[9px] font-medium text-black/50">
            4 running
          </span>
        </div>
        <div className="relative z-10 mt-3 flex flex-col gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <motion.span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: accent }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }}
              />
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/5">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: accent }}
                  animate={{ width: [`${20 + i * 10}%`, `${60 + i * 8}%`, `${20 + i * 10}%`] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (type === 6) {
    return (
      <>
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-[10px] font-medium text-black/40">Retention Index</span>
          <CountUp value="94" duration={1.8} className="text-xs font-semibold text-black" />
        </div>
        <div className="relative z-10 flex flex-1 items-center justify-center">
          <svg viewBox="0 0 60 60" className="h-20 w-20">
            <motion.path
              d="M30 6 L36 24 L54 30 L36 36 L30 54 L24 36 L6 30 L24 24 Z"
              fill="none"
              stroke={accent}
              strokeWidth="2"
              strokeLinejoin="round"
              animate={{ rotate: 360, scale: [0.9, 1.05, 0.9] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "50% 50%" }}
            />
            <motion.circle
              cx="30"
              cy="30"
              r="4"
              fill={accent}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[10px] font-medium text-black/40">Active Cohorts</span>
        <span className="text-xs font-semibold text-black">3 stages</span>
      </div>
      <svg viewBox="0 0 100 60" className="relative z-10 mt-2 h-24 w-full">
        {[0, 1, 2].map((i) => (
          <motion.rect
            key={i}
            x={4 + i * 32}
            width="26"
            rx="8"
            fill="none"
            stroke={accent}
            strokeWidth="1.8"
            opacity={0.7}
            animate={{
              y: [6 + (2 - i) * 4, 2, 6 + (2 - i) * 4],
              height: [48 - (2 - i) * 4, 52, 48 - (2 - i) * 4],
            }}
            transition={{ duration: 3.4, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </>
  );
}
