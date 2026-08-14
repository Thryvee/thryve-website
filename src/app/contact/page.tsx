"use client";

import { motion } from "motion/react";
import ContactNav from "@/components/ContactNav";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import Footer from "@/components/Footer";
import PostBookingModal from "@/components/PostBookingModal";
import AvatarGlyph from "@/components/AvatarGlyph";

const attendees = ["Marcus Webb", "Priya Anand", "Jonah Reyes", "Elena Novak", "Theo Bramwell"];

const whatYouGet = [
  "A written audit of your funnel's top 3 leaks, sent within 24 hours",
  "Benchmarks for your CAC, conversion rate, and retention vs. your category",
  "A no-pitch breakdown of where the fastest revenue win is",
];

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
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8"
        >
          <ul className="flex flex-col gap-2 text-left">
            {whatYouGet.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-black/60">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-black/5 text-[10px] text-black/70">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-full border border-black/10 bg-black/2 px-4 py-2.5"
        >
          <div className="flex -space-x-2">
            {attendees.map((n) => (
              <AvatarGlyph key={n} seed={n} size={26} className="rounded-full ring-2 ring-white" />
            ))}
          </div>
          <span className="text-xs text-black/50">
            Booked by <span className="font-medium text-black/70">40+ founders</span> this quarter
            &nbsp;•&nbsp; limited slots each week
          </span>
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

      <PostBookingModal />
    </main>
  );
}
