"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

export default function PageEnter({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="pointer-events-none relative z-30 h-full w-full"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
