"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

const faqGroups = [
  {
    category: "General",
    items: [
      {
        q: "What exactly does Thryve do?",
        a: "We're a growth studio that builds and runs the full system behind a brand's revenue — acquisition, conversion, retention, and scaling — instead of handing off a single deliverable and disappearing.",
      },
      {
        q: "How is this different from hiring a normal marketing agency?",
        a: "Most agencies specialize in one channel and hand you a report. We embed across your funnel end to end, ship weekly, and stay accountable to the number that actually matters — revenue, not impressions.",
      },
      {
        q: "Will I be working with a dedicated team or a rotating account manager?",
        a: "A dedicated team stays on your account for the length of the engagement. No handoffs between strategists, no re-explaining your business every quarter.",
      },
      {
        q: "What industries do you typically work with?",
        a: "Mostly consumer brands and product companies with an existing baseline of traffic or customers — we're built for scaling something real, not validating an idea from zero.",
      },
    ],
  },
  {
    category: "Process",
    items: [
      {
        q: "How involved do I need to be day to day?",
        a: "As little as you want. We run async by default with a visible board and weekly updates — most clients spend under an hour a week actually managing us.",
      },
      {
        q: "What happens in the first two weeks?",
        a: "We audit your current funnel, identify the highest-leverage gaps, and ship the first live test — not a strategy deck. You'll see something real move before the first month is out.",
      },
      {
        q: "What if I already have an internal marketing team?",
        a: "We plug in alongside them, not over them. Most of our clients keep their in-house team focused on brand and use us for the systems and execution layer that's harder to hire for.",
      },
      {
        q: "How do you report on progress?",
        a: "A live board plus a weekly async summary — what shipped, what it moved, and what's next. No slide decks written the night before a call to make the week look better than it was.",
      },
      {
        q: "Who actually owns the strategy — us or you?",
        a: "We propose it, you approve it. You'll always see the reasoning behind a test before it ships, and nothing major goes live without a quick sign-off from your side.",
      },
    ],
  },
  {
    category: "Fit & Results",
    items: [
      {
        q: "How do I know this will actually work for my business?",
        a: "We only take on brands where we can see a clear path to a result in the first sprint. If we don't see that path in the audit, we'll tell you honestly instead of taking the engagement anyway.",
      },
      {
        q: "What if it doesn't work out?",
        a: "There's no long lock-in. Engagements run month to month, and either side can step away with notice — we'd rather earn the renewal than force it.",
      },
      {
        q: "How soon can we get started?",
        a: "Most engagements kick off within a week of the initial call, once we've scoped the audit and agreed on the first sprint's priorities.",
      },
      {
        q: "What size is a typical client you work with?",
        a: "Usually brands doing enough volume that a funnel improvement or retention lift has real dollar impact — pre-revenue ideas aren't the right fit for what we do.",
      },
      {
        q: "Do you guarantee results?",
        a: "No agency honestly can, and we won't pretend otherwise. What we guarantee is a disciplined process, visible testing, and a team that tells you the truth about what's working.",
      },
    ],
  },
  {
    category: "Investment",
    items: [
      {
        q: "How much does it cost to work with Thryve?",
        a: "It depends on scope — which channels, how much build work is involved, and your current stage. The clearest way to get an accurate number is a quick call where we scope it against your goals.",
      },
      {
        q: "Do you offer a smaller starting engagement before a full commitment?",
        a: "Yes — most relationships start with a focused first sprint on the highest-leverage part of your funnel, so you can see how we work before scaling the engagement further.",
      },
      {
        q: "Is there a long-term contract required?",
        a: "No. Engagements run month to month by design — we'd rather you stay because it's working than because you're locked into a term.",
      },
      {
        q: "What's included versus billed separately?",
        a: "Strategy, execution, and reporting are always included in scope. Ad spend and any third-party tooling costs are separate and stay fully transparent to you.",
      },
    ],
  },
];

function AccordionItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      layout
      className="overflow-hidden rounded-2xl bg-zinc-100"
      transition={{ layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-base text-black md:text-lg">{q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-6 w-6 shrink-0 items-center justify-center text-xl text-black/50"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="px-6 pb-6 text-sm leading-relaxed text-black/60 md:text-[15px]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openKey, setOpenKey] = useState<string>("General-0");
  const router = useRouter();

  return (
    <section id="faq" className="relative w-full bg-white px-6 py-32 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="font-display leading-snug" style={{ fontSize: "clamp(20px, 3vw, 28px)" }}>
          <span className="text-black">Questions? Answers.</span>{" "}
          <span className="text-black/50">Everything you'd want to know before starting.</span>
        </p>
      </motion.div>

      <div className="mx-auto mt-16 max-w-3xl">
        {faqGroups.map((group) => (
          <RevealGroup
            key={group.category}
            category={group.category}
            items={group.items}
            openKey={openKey}
            setOpenKey={setOpenKey}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mt-20 flex w-fit max-w-full flex-col items-center gap-4 rounded-full bg-black px-3 py-3 shadow-lg shadow-black/10 md:flex-row md:gap-6 md:py-3 md:pr-3 md:pl-6"
      >
        <span className="font-display px-3 text-base text-white md:px-0 md:text-[15px]">
          Start your project with us today!
        </span>
        <motion.button
          onClick={() => router.push("/contact")}
          whileHover={{ y: [0, -6, 0] }}
          transition={{ duration: 0.55, ease: "easeInOut", repeat: Infinity }}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
            <path
              d="M7 17L17 7M17 7H9M17 7V15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Start a Project
        </motion.button>
      </motion.div>
    </section>
  );
}

function RevealGroup({
  category,
  items,
  openKey,
  setOpenKey,
}: {
  category: string;
  items: { q: string; a: string }[];
  openKey: string;
  setOpenKey: (key: string) => void;
}) {
  return (
    <div className="mb-14">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-4 text-sm font-medium text-black/40"
      >
        {category}
      </motion.p>
      <div className="flex flex-col gap-3">
        {items.map((item, ii) => (
          <motion.div
            key={item.q}
            initial={{ opacity: 0, y: 56, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.5, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: ii * 0.06 }}
          >
            <AccordionItem
              q={item.q}
              a={item.a}
              isOpen={openKey === `${category}-${ii}`}
              onToggle={() =>
                setOpenKey(openKey === `${category}-${ii}` ? "" : `${category}-${ii}`)
              }
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
