import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NavThemeProvider } from "@/components/NavThemeContext";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen w-full bg-white">
      <NavThemeProvider>
        <Navbar />

        <section className="flex min-h-screen w-full flex-col items-center justify-center px-6 text-center">
          <span className="font-display text-[clamp(80px,18vw,180px)] leading-none text-black/10">
            404
          </span>
          <h1 className="font-display -mt-4 text-3xl text-black md:text-4xl">
            This funnel led nowhere.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-black/50 md:text-base">
            The page you&apos;re looking for doesn&apos;t exist, moved, or never did. Let&apos;s
            get you back on track.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
            >
              Back to home
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-black/10 px-6 py-3 text-sm font-medium text-black/70 transition-colors duration-300 hover:text-black"
            >
              Book a call instead
            </Link>
          </div>
        </section>

        <Footer />
      </NavThemeProvider>
    </main>
  );
}
