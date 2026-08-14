"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

const SHOW_AFTER_PX = 900;

export default function StickyBookCTA() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const footer = document.querySelector("footer");

    const onScroll = () => {
      const pastHero = window.scrollY > SHOW_AFTER_PX;
      const nearFooter = footer
        ? footer.getBoundingClientRect().top < window.innerHeight
        : false;
      setVisible(pastHero && !nearFooter);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          className="fixed inset-x-0 bottom-6 z-40 hidden justify-center px-4 md:flex"
        >
          <motion.button
            type="button"
            onClick={() => router.push("/contact")}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]"
            style={{
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Book your free audit call
            <span aria-hidden="true">→</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
