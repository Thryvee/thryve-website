"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import SpecularButton from "./SpecularButton";
import TiltCard from "./TiltCard";
import BrandMockup from "./BrandMockup";
import SystemsMockup from "./SystemsMockup";
import GrowthMockup from "./GrowthMockup";

const cards = [
  {
    title: "Brand",
    body: "Identity systems, positioning, and visual language that make a brand instantly recognizable.",
    gradient: "linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)",
    Mockup: BrandMockup,
  },
  {
    title: "Systems",
    body: "Funnels and landing pages engineered to turn attention into revenue, not just clicks.",
    gradient: "linear-gradient(135deg, #f472b6 0%, #a855f7 100%)",
    Mockup: SystemsMockup,
  },
  {
    title: "Growth",
    body: "Testing and scaling infrastructure that compounds results week over week.",
    gradient: "linear-gradient(135deg, #fb923c 0%, #ec4899 100%)",
    Mockup: GrowthMockup,
  },
];

export default function CreativeEngineSection() {
  const router = useRouter();

  return (
    <section className="relative w-full bg-white px-6 pt-24 pb-10 md:px-16">
      <div className="mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs font-medium tracking-[0.25em] text-black/35 uppercase"
        >
          The process
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display mt-3 leading-snug"
          style={{ fontSize: "clamp(20px, 3vw, 28px)" }}
        >
          <span className="text-black">Brand first. Systems second. Growth third.</span>{" "}
          <span className="text-black/50">
            Every engagement is tested rigorously in that order — nothing ships on a hunch.
          </span>
        </motion.h2>

        <div className="mt-8 flex items-center justify-center gap-4">
          <SpecularButton
            size="sm"
            radius={999}
            tint="#000000"
            tintOpacity={1}
            textColor="#ffffff"
            lineColor="#ffffff"
            baseColor="#333333"
            proximity={220}
            className="font-semibold"
            onClick={() => router.push("/contact")}
          >
            Contact Us
          </SpecularButton>
          <SpecularButton
            size="sm"
            radius={999}
            tint="#000000"
            tintOpacity={0.05}
            textColor="#000000"
            lineColor="#000000"
            baseColor="#999999"
            proximity={220}
            className="font-semibold"
            onClick={() => {
              const target = document.getElementById("services");
              if (!target) return;
              if (window.lenisInstance) {
                window.lenisInstance.scrollTo(target, { offset: 0 });
              } else {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          >
            See Services
          </SpecularButton>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((card, i) => {
          const Mockup = card.Mockup;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
              className="h-96"
            >
              <TiltCard
                className="relative flex h-96 w-full flex-col overflow-hidden rounded-3xl p-6"
                style={{ background: card.gradient }}
              >
                {/* Liquid glass layer */}
                <div
                  className="pointer-events-none absolute inset-0 z-20 rounded-3xl"
                  style={{
                    backdropFilter: "blur(10px) saturate(180%)",
                    WebkitBackdropFilter: "blur(10px) saturate(180%)",
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.14) 25%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.22) 100%)",
                    boxShadow:
                      "inset 0 2px 2px rgba(255,255,255,0.85), inset 0 -30px 50px rgba(255,255,255,0.12), inset 0 0 80px rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.55)",
                  }}
                />
                <div
                  className="pointer-events-none absolute -top-1/3 -left-1/4 z-20 h-2/3 w-3/4 rotate-20 rounded-full opacity-70 blur-2xl"
                  style={{
                    background:
                      "linear-gradient(120deg, rgba(255,255,255,0.85), rgba(255,255,255,0) 65%)",
                  }}
                />
                <div
                  className="pointer-events-none absolute right-0 bottom-0 z-20 h-1/2 w-1/2 translate-x-1/4 translate-y-1/4 rounded-full opacity-40 blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.6), rgba(255,255,255,0) 70%)",
                  }}
                />
                <div className="relative z-30 flex h-full flex-col">
                  <Mockup />
                  <div className="mt-auto">
                    <h3 className="font-display text-2xl text-white">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/80">{card.body}</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
