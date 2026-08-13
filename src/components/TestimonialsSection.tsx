"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import AvatarGlyph from "./AvatarGlyph";

const testimonials = [
  {
    quote:
      "We needed a partner who could move fast without cutting corners. Thryve rebuilt our entire funnel in three weeks and conversion jumped almost immediately — no long onboarding, no wasted calls, just work landing on schedule. It's rare to find a team that treats your deadline like their own.",
    name: "Marcus Webb",
    role: "Founder",
  },
  {
    quote:
      "What stood out was how little we had to manage them. Weekly async updates, a visible board, and every deliverable landed on time. Our retention numbers have never looked this good, and for the first time I'm not chasing an agency for status updates every other day.",
    name: "Priya Anand",
    role: "Head of Growth",
  },
  {
    quote:
      "Thryve designed our brand system and the funnel that sits underneath it in the same sprint. Most agencies split that across two teams that never talk to each other, so things get lost in translation. This just worked, end to end, without a single handoff issue.",
    name: "Jonah Reyes",
    role: "CEO",
  },
  {
    quote:
      "Every test they ran had a clear hypothesis and a clear result. No vanity metrics, no fluff in the reporting — just what moved the number and what didn't. I finally have a dashboard I actually trust enough to make decisions from.",
    name: "Elena Novak",
    role: "COO",
  },
  {
    quote:
      "Six months in, our paid channels finally have a system behind them instead of guesswork. Thryve's team caught things our last three agencies missed entirely, and the CAC improvement alone paid for the engagement twice over.",
    name: "Theo Bramwell",
    role: "Founder",
  },
  {
    quote:
      "They didn't just execute our brief — they questioned it. Half the improvements in our funnel came from things Thryve caught that we hadn't even asked about, which tells you they're actually paying attention to the business, not just the tickets.",
    name: "Sasha Lindqvist",
    role: "Marketing Director",
  },
  {
    quote:
      "I've worked with five agencies in four years. This is the first one that actually reduced how much time I spend managing an agency instead of increasing it. The board is always current, the updates are honest, and nothing slips through the cracks.",
    name: "Derek Osei",
    role: "Founder",
  },
  {
    quote:
      "The retention flows alone paid for the entire engagement in the first quarter. Everything since then has been pure upside — new segments, new lifecycle campaigns, and a team that keeps finding angles we hadn't considered.",
    name: "Naomi Fitzgerald",
    role: "VP Marketing",
  },
  {
    quote:
      "Thryve's reporting is the first I've trusted enough to bring straight into a board meeting without editing it first. Clear numbers, clear attribution, and none of the spin I've gotten used to from other partners.",
    name: "Callum Brady",
    role: "CEO",
  },
  {
    quote:
      "We came in wanting a landing page. We left with an entire acquisition system we didn't know we needed — paid, organic, and lifecycle all working off the same playbook. That's the difference between a vendor and an actual partner.",
    name: "Yuki Tanaka",
    role: "Co-Founder",
  },
  {
    quote:
      "Fast doesn't usually mean careful. With Thryve it did — every sprint shipped clean, tested, and genuinely ready to launch, not a draft we had to fix ourselves before it went live.",
    name: "Ines Calderon",
    role: "Head of Product",
  },
  {
    quote:
      "What sold me wasn't the pitch, it was the first sprint. Results were visible within two weeks and never slowed down after that. Three months later we're still finding new wins in the same system they built us.",
    name: "Owen Marsh",
    role: "Founder",
  },
];

const cards = [...testimonials, ...testimonials];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 });
  const sectionOpacity = useTransform(smoothProgress, [0, 1], [0.3, 1]);
  const sectionY = useTransform(smoothProgress, [0, 1], [60, 0]);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-zinc-300 py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-2xl px-6 text-center"
      >
        <h2 className="font-display leading-snug" style={{ fontSize: "clamp(20px, 3vw, 28px)" }}>
          <span className="text-black">Trusted by growing brands.</span>{" "}
          <span className="text-black/50">Hear what clients are saying about Thryve.</span>
        </h2>
      </motion.div>

      <motion.div
        style={{ opacity: sectionOpacity, y: sectionY, willChange: "transform, opacity" }}
        className="relative mt-16 w-full overflow-hidden"
      >
        <div
          className="flex w-max items-stretch gap-6 px-6"
          style={{ animation: "testimonial-marquee 95s linear infinite" }}
        >
          {cards.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="relative flex h-72 w-[420px] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-black/5 bg-white p-8 shadow-sm"
            >
              <motion.div
                className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl"
                style={{
                  background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
                }}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (i % testimonials.length) * 0.3,
                }}
              />

              <p className="relative z-10 text-[15px] leading-relaxed text-black/80">
                {t.quote}
              </p>

              <div className="relative z-10 flex items-center gap-3">
                <AvatarGlyph
                  seed={t.name}
                  size={36}
                  className="shrink-0 rounded-full shadow-sm ring-1 ring-black/5"
                />
                <div>
                  <p className="text-sm font-medium text-black">{t.name}</p>
                  <p className="text-xs text-black/50">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32"
          style={{ background: "linear-gradient(to right, #d4d4d8, #d4d4d800)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32"
          style={{ background: "linear-gradient(to left, #d4d4d8, #d4d4d800)" }}
        />
      </motion.div>

      <style>{`
        @keyframes testimonial-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
