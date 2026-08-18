"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import SpecularButton from "./SpecularButton";
import { useNavTheme } from "./NavThemeContext";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
] as const;

export default function Navbar() {
  const router = useRouter();
  const { isDark } = useNavTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const textColor = isDark ? "text-white" : "text-black";
  const textColorMuted = isDark ? "text-white/70" : "text-black/70";
  const hex = isDark ? "#ffffff" : "#000000";

  return (
    <header className="pointer-events-auto fixed top-0 left-0 z-50 w-full">
      <div className="flex items-center justify-between px-6 py-6 md:px-12">
        <Link
          href="/"
          className={`font-display text-lg tracking-tight transition-colors duration-300 ${textColor}`}
        >
          Thryve
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
          {navLinks.map((link) => {
            const labelSpans = (
              <span className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
                <span
                  className={`block h-4 leading-4 transition-colors duration-300 ${textColorMuted} ${
                    isDark ? "group-hover:text-white" : "group-hover:text-black"
                  }`}
                >
                  {link.label}
                </span>
                <span className={`block h-4 leading-4 transition-colors duration-300 ${textColor}`}>
                  {link.label}
                </span>
              </span>
            );

            return (
              <Link
                key={link.label}
                href={link.href}
                className="group relative block h-4 overflow-hidden text-sm leading-4"
              >
                {labelSpans}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full"
          >
            <div className="relative flex h-4 w-5 flex-col justify-between">
              <motion.span
                className="block h-0.5 w-full rounded-full"
                style={{ background: hex }}
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                className="block h-0.5 w-full rounded-full"
                style={{ background: hex }}
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-0.5 w-full rounded-full"
                style={{ background: hex }}
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </button>
        </div>

        <div className="hidden md:block">
          <SpecularButton
            size="sm"
            radius={999}
            textColor={hex}
            lineColor={hex}
            baseColor={isDark ? "#cccccc" : "#333333"}
            proximity={220}
            className="font-semibold"
            onClick={() => router.push("/contact")}
          >
            Join →
          </SpecularButton>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mx-4 mb-4 overflow-hidden rounded-3xl md:hidden"
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.9)",
              boxShadow: "0 20px 60px -20px rgba(0,0,0,0.3)",
            }}
          >
            <nav className="flex flex-col p-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl px-4 py-3.5 text-base font-medium text-black transition-colors duration-200 hover:bg-black/5"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-1 rounded-2xl bg-black px-4 py-3.5 text-center text-base font-semibold text-white"
              >
                Join →
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
