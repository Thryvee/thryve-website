"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

export const CONSENT_ANSWERED_EVENT = "thryve-cookie-consent-answered";
export const CONSENT_STORAGE_KEY = "thryve-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadyAnswered = localStorage.getItem(CONSENT_STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable client-side, so this can't be a lazy useState initializer without risking a hydration mismatch
    setVisible(!alreadyAnswered);
    if (alreadyAnswered) {
      window.dispatchEvent(new Event(CONSENT_ANSWERED_EVENT));
    }
  }, []);

  const respond = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, "answered");
    setVisible(false);
    window.dispatchEvent(new Event(CONSENT_ANSWERED_EVENT));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-4 z-90 mx-auto flex max-w-xl flex-col gap-4 rounded-3xl border border-black/10 bg-white/95 p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between md:inset-x-auto md:right-6 md:bottom-6 md:max-w-md"
          role="dialog"
          aria-label="Cookie consent"
        >
          <p className="text-xs leading-relaxed text-black/60">
            We use cookies to understand how visitors use this site and improve it. See our{" "}
            <Link href="/privacy" className="underline hover:text-black">
              privacy policy
            </Link>{" "}
            for details.
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={respond}
              className="rounded-full border border-black/10 px-4 py-2 text-xs font-medium text-black/60 transition-colors duration-300 hover:text-black"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={respond}
              className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-85"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
