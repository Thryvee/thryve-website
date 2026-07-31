"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function ContactNav() {
  return (
    <header className="relative w-full border-b border-black/10">
      <div className="relative flex items-center justify-between px-8 py-6 md:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-black/70 transition-colors duration-300 hover:text-black"
        >
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 -translate-x-1/2"
        >
          <Link href="/" className="font-display text-lg tracking-tight text-black">
            Thryve
          </Link>
        </motion.div>

        <span aria-hidden className="pointer-events-none invisible inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium">
          Back to Home
        </span>
      </div>
    </header>
  );
}
