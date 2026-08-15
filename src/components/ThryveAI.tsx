"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  aiGreeting,
  matchEntry,
  findEntry,
  type AiEntry,
  type AiAction,
} from "@/lib/thryveAiData";
import { CONSENT_ANSWERED_EVENT, CONSENT_STORAGE_KEY } from "./CookieConsent";

interface ChatMessage {
  id: string;
  role: "bot" | "user";
  text: string;
  /** Set only on the last bubble of a bot entry's response — used to look up its actions. */
  entryId?: string;
}

type LeadState = "idle" | "asking" | "loading" | "done" | "error";

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `msg-${idCounter}`;
}

function entryToMessages(entry: AiEntry): ChatMessage[] {
  return entry.response.map((text, i) => ({
    id: nextId(),
    role: "bot" as const,
    text,
    entryId: i === entry.response.length - 1 ? entry.id : undefined,
  }));
}

export default function ThryveAI() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chips, setChips] = useState<string[]>(aiGreeting.followUps ?? []);
  const [input, setInput] = useState("");
  const [leadState, setLeadState] = useState<LeadState>("idle");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Only appear once the cookie banner has been answered — never stacked with it.
  useEffect(() => {
    if (localStorage.getItem(CONSENT_STORAGE_KEY)) {
      setReady(true);
      return;
    }
    const check = () => setReady(true);
    window.addEventListener(CONSENT_ANSWERED_EVENT, check);
    return () => window.removeEventListener(CONSENT_ANSWERED_EVENT, check);
  }, []);

  // Hide near the footer, same pattern as StickyBookCTA.
  useEffect(() => {
    const footer = document.querySelector("footer");
    const onScroll = () => {
      const near = footer ? footer.getBoundingClientRect().top < window.innerHeight + 40 : false;
      setNearFooter(near);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages(entryToMessages(aiGreeting));
    }
  }, [open, messages.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, leadState]);

  const runAction = useCallback(
    (action: AiAction) => {
      if (action.type === "book") {
        router.push("/contact");
        setOpen(false);
        return;
      }
      if (action.type === "link" && action.href) {
        router.push(action.href);
        setOpen(false);
        return;
      }
      if (action.type === "lead-capture") {
        setLeadState("asking");
        setMessages((m) => [
          ...m,
          { id: nextId(), role: "bot", text: "What's the best email to send it to?" },
        ]);
      }
    },
    [router]
  );

  const respondWithEntry = useCallback((entry: AiEntry) => {
    setMessages((m) => [...m, ...entryToMessages(entry)]);
    setChips(entry.followUps ?? []);
  }, []);

  const handleChip = useCallback(
    (id: string) => {
      const entry = findEntry(id);
      if (!entry) return;
      setMessages((m) => [...m, { id: nextId(), role: "user", text: entry.chipLabel }]);
      setChips([]);
      setTimeout(() => respondWithEntry(entry), 300);
    },
    [respondWithEntry]
  );

  const submitLead = useCallback(async (email: string) => {
    setLeadState("loading");
    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong.");
      setLeadState("done");
      setMessages((m) => [
        ...m,
        {
          id: nextId(),
          role: "bot",
          text: `Sent — check ${email} in a few minutes. Anything else I can help with?`,
        },
      ]);
      setChips(["services-overview", "results-overview", "book-call"]);
    } catch (err) {
      setLeadState("error");
      setMessages((m) => [
        ...m,
        {
          id: nextId(),
          role: "bot",
          text:
            err instanceof Error
              ? `That didn't go through: ${err.message}`
              : "That didn't go through — mind trying again?",
        },
      ]);
    }
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const value = input.trim();
      if (!value) return;
      setInput("");
      setMessages((m) => [...m, { id: nextId(), role: "user", text: value }]);

      if (leadState === "asking") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(value)) {
          submitLead(value);
        } else {
          setMessages((m) => [
            ...m,
            { id: nextId(), role: "bot", text: "That doesn't look like a valid email — mind double-checking it?" },
          ]);
        }
        return;
      }

      setChips([]);
      const entry = matchEntry(value);
      setTimeout(() => respondWithEntry(entry), 300);
    },
    [input, leadState, respondWithEntry, submitLead]
  );

  const handleActionClick = useCallback(
    (entryId: string, action: AiAction) => {
      void entryId;
      runAction(action);
    },
    [runAction]
  );

  if (!ready || nearFooter) return null;

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        initial={{ opacity: 0, scale: 0.6, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        aria-label={open ? "Close Thryve AI" : "Open Thryve AI"}
        className="fixed right-6 bottom-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)] md:flex"
        style={{
          background: "linear-gradient(135deg, #000000 0%, #2a1a4d 100%)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg
              key="close"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </motion.svg>
          ) : (
            <motion.svg
              key="spark"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="currentColor"
            >
              <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-x-4 bottom-24 z-50 mx-auto hidden max-w-sm flex-col overflow-hidden md:flex md:inset-x-auto md:right-6"
            style={{
              height: "min(600px, 70dvh)",
              maxHeight: "calc(100dvh - 140px)",
              borderRadius: 28,
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.9)",
              boxShadow:
                "inset 0 1px 1px rgba(255,255,255,0.9), 0 40px 100px -20px rgba(0,0,0,0.4)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Thryve AI chat"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center gap-3 border-b border-black/6 bg-white/60 px-5 py-4">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-white"
                style={{ background: "linear-gradient(135deg, #000000 0%, #2a1a4d 100%)" }}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
                </svg>
              </div>
              <div>
                <p className="font-display text-sm text-black">Thryve AI</p>
                <p className="flex items-center gap-1.5 text-[11px] text-black/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Usually replies instantly
                </p>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              data-lenis-prevent
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-5 py-5"
            >
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
                      m.role === "user"
                        ? "bg-black text-white"
                        : "border border-black/6 bg-white text-black/80"
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}

              {/* Actions for the most recent bot entry, if any */}
              {(() => {
                const lastMsg = messages[messages.length - 1];
                if (!lastMsg || lastMsg.role !== "bot" || !lastMsg.entryId) return null;
                const entry = findEntry(lastMsg.entryId);
                if (!entry?.actions?.length) return null;
                return (
                  <div className="flex flex-col items-start gap-2 pt-1">
                    {entry.actions.map((action) => (
                      <button
                        key={action.label}
                        type="button"
                        onClick={() => handleActionClick(entry.id, action)}
                        className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                );
              })()}

              {/* Quick-reply chips */}
              {chips.length > 0 && leadState !== "asking" && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {chips.map((chipId) => {
                    const entry = findEntry(chipId);
                    if (!entry) return null;
                    return (
                      <button
                        key={chipId}
                        type="button"
                        onClick={() => handleChip(chipId)}
                        className="rounded-full border border-black/10 bg-white px-3.5 py-2.5 text-xs font-medium text-black/70 transition-colors duration-300 hover:border-black/20 hover:text-black"
                      >
                        {entry.chipLabel}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex shrink-0 items-center gap-2 border-t border-black/6 bg-white/60 p-3"
            >
              <input
                type={leadState === "asking" ? "email" : "text"}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={leadState === "asking" ? "you@brand.com" : "Ask me anything…"}
                disabled={leadState === "loading"}
                className="w-full flex-1 rounded-full bg-white px-4 py-2.5 text-sm text-black placeholder:text-black/35 focus:outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={leadState === "loading" || !input.trim()}
                aria-label="Send"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white transition-opacity disabled:opacity-30"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
