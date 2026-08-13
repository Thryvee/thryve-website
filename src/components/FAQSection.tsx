"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { faqGroups } from "@/lib/faqData";

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
        <h2 className="font-display leading-snug" style={{ fontSize: "clamp(20px, 3vw, 28px)" }}>
          <span className="text-black">Questions? Answers.</span>{" "}
          <span className="text-black/50">Everything you&apos;d want to know before starting.</span>
        </h2>
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
