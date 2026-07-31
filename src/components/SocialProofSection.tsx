"use client";

import { motion } from "motion/react";
import CountUp from "./CountUp";
import TiltedCard from "./TiltedCard";

const stats = [
  { label: "Audit's Delivered", value: "128+" },
  { label: "Ad Creative Made", value: "10000+" },
  { label: "Client's Satisfaction Rate", value: "98%" },
];

export default function SocialProofSection() {
  return (
    <motion.section
      className="w-full bg-white px-6 pt-20 pb-20 md:px-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <TiltedCard key={stat.label} containerHeight="224px" containerWidth="100%" rotateAmplitude={8} scaleOnHover={1.03}>
            <div
              className="flex h-full w-full flex-col justify-between rounded-2xl p-6"
              style={{ backgroundColor: "#e4e4e7" }}
            >
              <span className="text-sm text-zinc-500">{stat.label}</span>
              <CountUp
                value={stat.value}
                className="font-display text-6xl"
                style={{
                  backgroundImage: "linear-gradient(90deg, #7C3AED, #EC4899)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              />
            </div>
          </TiltedCard>
        ))}
      </div>
    </motion.section>
  );
}
