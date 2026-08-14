"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";

type SubmitState = "idle" | "loading" | "success" | "error";

interface CalendlyEventPayload {
  event: string;
}

function isCalendlyEvent(data: unknown): data is CalendlyEventPayload {
  return (
    typeof data === "object" &&
    data !== null &&
    "event" in data &&
    typeof (data as { event: unknown }).event === "string" &&
    (data as { event: string }).event.startsWith("calendly.")
  );
}

export default function PostBookingModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [goal, setGoal] = useState("");
  const [brandName, setBrandName] = useState("");
  const [website, setWebsite] = useState("");
  const [niche, setNiche] = useState("");
  const [hpField, setHpField] = useState("");
  const [status, setStatus] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (!isCalendlyEvent(e.data)) return;
      if (e.data.event === "calendly.event_scheduled") {
        setOpen(true);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/booking-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, goal, brandName, website, niche, hpField }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error ?? "Something went wrong. Try again.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Try again.");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-100 grid place-items-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-labelledby="post-booking-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-[32px] bg-white text-black"
          >
            {status !== "success" && (
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/5 text-black/60 transition-colors duration-300 hover:bg-black/10 hover:text-black"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            )}

            <div className="px-8 py-10 md:px-10 md:py-12">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="py-4 text-center"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-black/5 text-2xl">
                    ✓
                  </div>
                  <h3 className="font-display text-2xl">You&apos;re all set</h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/60">
                    We&apos;ll review your goals before the call so we can hit the ground running.
                    See you soon.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <>
                  <p className="text-xs font-semibold tracking-[0.2em] text-black/40 uppercase">
                    Call booked
                  </p>
                  <h3 id="post-booking-title" className="font-display mt-3 text-2xl leading-tight md:text-3xl">
                    Help us prep for your call
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/55">
                    30 seconds now saves 10 minutes of small talk later — tell us who you are and
                    what you&apos;re hoping to get out of this.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-7 space-y-3">
                    {/* Honeypot field — hidden from real users, catches bots */}
                    <input
                      type="text"
                      name="hpField"
                      value={hpField}
                      onChange={(e) => setHpField(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="hidden"
                    />

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={status === "loading"}
                        className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-black/40 focus:border-black/30 focus:outline-none disabled:opacity-60"
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        disabled={status === "loading"}
                        className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-black/40 focus:border-black/30 focus:outline-none disabled:opacity-60"
                      />
                    </div>

                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "loading"}
                      className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-black/40 focus:border-black/30 focus:outline-none disabled:opacity-60"
                    />

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <input
                        type="text"
                        placeholder="Brand name"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        disabled={status === "loading"}
                        className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-black/40 focus:border-black/30 focus:outline-none disabled:opacity-60"
                      />
                      <input
                        type="text"
                        placeholder="Website (if any)"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        disabled={status === "loading"}
                        className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-black/40 focus:border-black/30 focus:outline-none disabled:opacity-60"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Niche"
                      value={niche}
                      onChange={(e) => setNiche(e.target.value)}
                      disabled={status === "loading"}
                      className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-black/40 focus:border-black/30 focus:outline-none disabled:opacity-60"
                    />

                    <textarea
                      placeholder="What's the one thing you want to walk away from this call with?"
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      disabled={status === "loading"}
                      rows={3}
                      className="w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-black/40 focus:border-black/30 focus:outline-none disabled:opacity-60"
                    />

                    {status === "error" && <p className="text-xs text-red-500">{errorMessage}</p>}

                    <div className="flex items-center gap-3 pt-1">
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
                      >
                        {status === "loading" ? "Sending…" : "Send it over"}
                      </button>
                      <button
                        type="button"
                        onClick={close}
                        className="text-sm text-black/40 transition-colors duration-300 hover:text-black/70"
                      >
                        Skip for now
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
