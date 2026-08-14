"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

type SubmitState = "idle" | "loading" | "success" | "error";
type Step = "email" | "details";

interface LeadMagnetModalProps {
  open: boolean;
  onClose: () => void;
}

const checklistItems = [
  "The 9-point audit we run on every new client's funnel before touching a single ad",
  "Where D2C brands leak the most revenue between click and checkout",
  "The 3 retention levers that outperform acquisition spend at scale",
];

export default function LeadMagnetModal({ open, onClose }: LeadMagnetModalProps) {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [website, setWebsite] = useState("");
  const [niche, setNiche] = useState("");
  const [status, setStatus] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStep("details");
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company, name, brandName, website, niche }),
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
          onClick={onClose}
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-magnet-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-[32px] bg-black text-white"
          >
            <motion.div
              className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)" }}
              animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors duration-300 hover:bg-white/20 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>

            <div className="relative z-1 px-8 py-10 md:px-10 md:py-12">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="py-6 text-center"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-2xl">
                    ✓
                  </div>
                  <h3 className="font-display text-2xl">Check your inbox</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    The Funnel Audit Checklist is on its way to <span className="text-white">{email}</span>.
                    While you wait — want us to run this audit on your funnel directly?
                  </p>
                  <a
                    href="/contact"
                    className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.03]"
                  >
                    Book your free audit call →
                  </a>
                </motion.div>
              ) : (
                <>
                  <p className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
                    Free download
                  </p>
                  <h3
                    id="lead-magnet-title"
                    className="font-display mt-3 text-2xl leading-tight md:text-3xl"
                  >
                    The D2C Funnel Audit Checklist
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    The exact 9-point checklist our team runs before every client engagement —
                    yours free, no call required.
                  </p>

                  <ul className="mt-6 space-y-3">
                    {checklistItems.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] text-white">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {step === "email" ? (
                    <form onSubmit={handleEmailSubmit} className="mt-8">
                      <div className="flex w-full items-center gap-1 rounded-full bg-white p-1.5">
                        <input
                          type="email"
                          required
                          placeholder="Enter your work email..."
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full flex-1 bg-transparent px-4 py-2 text-sm text-black placeholder:text-black/40 focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="shrink-0 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-opacity"
                        >
                          Send it to me
                        </button>
                      </div>
                      <p className="mt-3 pl-4 text-xs text-white/30">
                        No spam. Unsubscribe anytime. Read our{" "}
                        <a href="/privacy" className="underline hover:text-white/50">
                          privacy policy
                        </a>
                        .
                      </p>
                    </form>
                  ) : (
                    <form onSubmit={handleDetailsSubmit} className="mt-8">
                      <p className="mb-3 text-xs text-white/40">
                        One more step — tell us a bit about your brand so we can tailor the audit.
                      </p>

                      {/* Honeypot field — hidden from real users, catches bots */}
                      <input
                        type="text"
                        name="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        className="hidden"
                      />

                      <div className="space-y-2">
                        <input
                          type="text"
                          required
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          disabled={status === "loading"}
                          className="w-full rounded-full bg-white px-4 py-2.5 text-sm text-black placeholder:text-black/40 focus:outline-none disabled:opacity-60"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Brand name"
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                          disabled={status === "loading"}
                          className="w-full rounded-full bg-white px-4 py-2.5 text-sm text-black placeholder:text-black/40 focus:outline-none disabled:opacity-60"
                        />
                        <input
                          type="text"
                          placeholder="Website (if any)"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          disabled={status === "loading"}
                          className="w-full rounded-full bg-white px-4 py-2.5 text-sm text-black placeholder:text-black/40 focus:outline-none disabled:opacity-60"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Niche"
                          value={niche}
                          onChange={(e) => setNiche(e.target.value)}
                          disabled={status === "loading"}
                          className="w-full rounded-full bg-white px-4 py-2.5 text-sm text-black placeholder:text-black/40 focus:outline-none disabled:opacity-60"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="mt-3 w-full rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-opacity disabled:opacity-60"
                      >
                        {status === "loading" ? "Sending…" : "Get my checklist"}
                      </button>

                      {status === "error" && (
                        <p className="mt-2 pl-4 text-xs text-red-300">{errorMessage}</p>
                      )}
                    </form>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
