"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import SpecularButton from "./SpecularButton";
import { useNavTheme } from "./NavThemeContext";

const navLinks = [
  { label: "About", href: "/about", type: "page" },
  { label: "Services", href: "services", type: "scroll" },
] as const;

export default function Navbar() {
  const router = useRouter();
  const { isDark } = useNavTheme();

  const textColor = isDark ? "text-white" : "text-black";
  const textColorMuted = isDark ? "text-white/70" : "text-black/70";
  const hex = isDark ? "#ffffff" : "#000000";

  return (
    <header className="pointer-events-auto fixed top-0 left-0 z-50 w-full">
      <div className="flex items-center justify-between px-8 py-6 md:px-12">
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

            if (link.type === "scroll") {
              return (
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
                  className="group relative block h-4 overflow-hidden text-sm leading-4"
                >
                  {labelSpans}
                </button>
              );
            }

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
    </header>
  );
}
