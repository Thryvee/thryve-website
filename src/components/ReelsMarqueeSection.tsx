"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useDarkSection } from "./NavThemeContext";

interface ReelItem {
  id: string;
  url: string;
  title: string;
}

// Placeholder public reels — swap in real links whenever ready.
const reels: ReelItem[] = [
  { id: "r1", url: "https://www.instagram.com/reel/C1234567890/", title: "Placeholder reel 1" },
  { id: "r2", url: "https://www.instagram.com/reel/C2234567890/", title: "Placeholder reel 2" },
  { id: "r3", url: "https://www.instagram.com/reel/C3234567890/", title: "Placeholder reel 3" },
  { id: "r4", url: "https://www.instagram.com/reel/C4234567890/", title: "Placeholder reel 4" },
  { id: "r5", url: "https://www.instagram.com/reel/C5234567890/", title: "Placeholder reel 5" },
  { id: "r6", url: "https://www.instagram.com/reel/C6234567890/", title: "Placeholder reel 6" },
];

const SCROLL_DURATION_S = 36;
const RESUME_DELAY_MS = 3000;

declare global {
  interface Window {
    instgrm?: {
      Embeds: { process: () => void };
    };
  }
}

let scriptPromise: Promise<void> | null = null;

function loadInstagramEmbedScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve) => {
    if (window.instgrm?.Embeds) {
      resolve();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.instagram.com/embed.js"]'
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });

  return scriptPromise;
}

function ReelEmbed({ reel }: { reel: ReelItem }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    loadInstagramEmbedScript().then(() => {
      if (cancelled) return;
      window.instgrm?.Embeds.process();
    });
    return () => {
      cancelled = true;
    };
  }, [reel.id]);

  return (
    <div ref={containerRef} className="h-full w-full overflow-hidden bg-zinc-900">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={reel.url}
        data-instgrm-version="14"
        style={{ margin: 0, width: "100%", height: "100%", background: "transparent" }}
      />
    </div>
  );
}

export default function ReelsMarqueeSection() {
  const darkRef = useDarkSection("reels-marquee-section");
  const [openId, setOpenId] = useState<string | null>(null);
  const [isFrozen, setIsFrozen] = useState(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearResumeTimeout = useCallback(() => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => clearResumeTimeout, [clearResumeTimeout]);

  const closeReel = useCallback(() => {
    setOpenId(null);
    clearResumeTimeout();
    resumeTimeoutRef.current = setTimeout(() => {
      setIsFrozen(false);
    }, RESUME_DELAY_MS);
  }, [clearResumeTimeout]);

  const openReel = useCallback(
    (instanceKey: string) => {
      clearResumeTimeout();
      setOpenId(instanceKey);
      setIsFrozen(true);
    },
    [clearResumeTimeout]
  );

  const marqueeItems = [...reels, ...reels];

  return (
    <section
      ref={darkRef}
      className="relative flex w-full flex-col items-center justify-center gap-16 overflow-hidden bg-black py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-2xl px-6 text-center"
      >
        <h2 className="font-display leading-snug" style={{ fontSize: "clamp(20px, 3vw, 28px)" }}>
          <span className="text-white">Social Proof?</span>{" "}
          <span className="text-white/50">We are everywhere helping every D2C brand we can find.</span>
        </h2>
      </motion.div>

      <div className="relative w-full overflow-hidden">
        <div
          className="flex w-max items-center gap-8 px-8"
          style={{
            animation: `reel-marquee-scroll ${SCROLL_DURATION_S}s linear infinite`,
            animationPlayState: isFrozen ? "paused" : "running",
          }}
        >
          {marqueeItems.map((reel, i) => {
            const instanceKey = `${reel.id}-${i}`;
            const isOpen = openId === instanceKey;

            return (
              <div
                key={instanceKey}
                className="relative aspect-9/16 w-70 shrink-0 overflow-hidden rounded-2xl bg-zinc-900 shadow-lg md:w-80"
              >
                {isOpen ? (
                  <>
                    <ReelEmbed reel={reel} />
                    <button
                      type="button"
                      onClick={closeReel}
                      className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white/90 backdrop-blur-sm transition-colors hover:bg-black/90"
                      aria-label="Close reel"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4">
                        <path
                          d="M6 6l12 12M18 6L6 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => openReel(instanceKey)}
                    className="group relative h-full w-full cursor-pointer"
                    aria-label={`Play ${reel.title}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/30 via-purple-600/30 to-amber-400/30" />
                    <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10" />
                    <span className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-black">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    <span className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
                        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
                      </svg>
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32"
          style={{ background: "linear-gradient(to right, #000000, #00000000)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32"
          style={{ background: "linear-gradient(to left, #000000, #00000000)" }}
        />
      </div>

      <style>{`
        @keyframes reel-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
