"use client";

import { motion } from "motion/react";
import GraphicCard from "./GraphicCard";

export default function AboutTrustedBy() {
  return (
    <section className="relative w-full bg-white px-6 py-32 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="font-display leading-tight" style={{ fontSize: "clamp(20px, 3vw, 28px)" }}>
          <span className="text-black">A system built for scale.</span>{" "}
          <span className="text-black/50">
            Every engagement runs on the same testing, tracking, and reporting infrastructure —
            proven across dozens of brands.
          </span>
        </h2>
      </motion.div>

      <div className="mx-auto mt-20 grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 120, scale: 0.92, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 1.1,
              delay: (i % 4) * 0.1 + Math.floor(i / 4) * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <GraphicCard variant={i} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
