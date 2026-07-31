"use client";

import { motion } from "motion/react";
import ContactNav from "@/components/ContactNav";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <ContactNav />

      <section className="relative w-full px-6 pt-16 pb-16 text-center md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl"
        >
          <p className="font-display leading-snug" style={{ fontSize: "clamp(20px, 3vw, 28px)" }}>
            <span className="text-black">Book your free 30-minute growth audit call below.</span>{" "}
            <span className="text-black/50">
              We&apos;ll audit your funnel, find the highest-leverage gaps, and show you exactly
              where the opportunity is.
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-4xl border border-black/10"
        >
          <CalendlyEmbed />
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
