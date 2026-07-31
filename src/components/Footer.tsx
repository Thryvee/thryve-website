"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

const links = [
  { label: "About", href: "/about", type: "page" },
  { label: "Services", href: "services", type: "scroll" },
  { label: "Testimonials", href: "testimonials", type: "scroll" },
  { label: "FAQs", href: "faq", type: "scroll" },
  { label: "Contact", href: "/contact", type: "page" },
] as const;

export default function Footer() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  return (
    <footer className="w-full bg-white px-6 pt-6 pb-10 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[32px] bg-black px-8 py-14 md:px-14 md:py-16"
      >
        <motion.div
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)" }}
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-sm">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-2xl text-white md:text-3xl"
            >
              Subscribe to Thryve
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 text-sm leading-relaxed text-white/50"
            >
              Growth systems, funnel breakdowns, and the occasional result we can't help
              bragging about — straight to your inbox.
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex w-full max-w-sm items-center gap-1 rounded-full bg-white p-1.5"
            >
              <input
                type="email"
                required
                placeholder="Enter email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full flex-1 bg-transparent px-4 py-2 text-sm text-black placeholder:text-black/40 focus:outline-none"
              />
              <motion.button
                type="submit"
                whileHover={{ y: [0, -4, 0] }}
                transition={{ duration: 0.5, ease: "easeInOut", repeat: Infinity }}
                className="shrink-0 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white"
              >
                Sign Up
              </motion.button>
            </motion.form>
          </div>

          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start gap-3 md:items-end"
          >
            {links.map((link) =>
              link.type === "scroll" ? (
                <button
                  key={link.label}
                  onClick={() => {
                    if (window.location.pathname !== "/") {
                      router.push(`/#${link.href}`);
                      return;
                    }
                    const target = document.getElementById(link.href);
                    if (!target) return;
                    if (window.lenisInstance) {
                      window.lenisInstance.scrollTo(target, { offset: 0 });
                    } else {
                      target.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className="text-sm text-white/60 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/60 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </Link>
              )
            )}
          </motion.nav>
        </div>

        <div className="relative z-10 mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center">
          <p className="text-xs text-white/40">
            Thryve &nbsp;•&nbsp; © {new Date().getFullYear()} &nbsp;•&nbsp; All rights reserved
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/50 transition-colors duration-300 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.07 3.3.15 4.8 1.7 5 5C22 8.6 22 9 22 12.2s0 3.6-.07 4.9c-.15 3.3-1.7 4.8-5 5C15.6 22.15 15.2 22.15 12 22.15s-3.6 0-4.9-.07c-3.3-.15-4.85-1.7-5-5C2.05 15.8 2.05 15.4 2.05 12.2s0-3.6.07-4.9c.15-3.3 1.7-4.85 5-5C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.52 0-4.76.07-2.4.1-3.53 1.25-3.63 3.63C3.55 8.7 3.55 9.05 3.55 12.2s0 3.5.06 4.76c.1 2.38 1.23 3.53 3.63 3.63 1.24.06 1.6.06 4.76.06s3.52 0 4.76-.06c2.38-.1 3.53-1.24 3.63-3.63.06-1.26.06-1.6.06-4.76s0-3.5-.06-4.76c-.1-2.38-1.24-3.53-3.63-3.63C15.52 4 15.15 4 12 4zm0 3.7a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 1.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4zm5.7-2.1a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0z" />
              </svg>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="text-white/50 transition-colors duration-300 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M18.9 2H22l-7.4 8.5L23 22h-6.9l-5.4-6.9L4.6 22H1.5l7.9-9.1L1 2h7l4.9 6.3L18.9 2zm-1.2 18h1.9L7.4 4H5.4l12.3 16z" />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
