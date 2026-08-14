import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AboutHero from "@/components/AboutHero";
import MeetTheFounder from "@/components/MeetTheFounder";
import AboutValues from "@/components/AboutValues";
import AboutCTA from "@/components/AboutCTA";
import Footer from "@/components/Footer";
import StickyBookCTA from "@/components/StickyBookCTA";
import { NavThemeProvider } from "@/components/NavThemeContext";

export const metadata: Metadata = {
  title: "About Us — Our Approach to Revenue Systems",
  description:
    "Thryve helps ambitious D2C brands turn attention into revenue. Meet the team and the audit-first, dedicated-team approach behind 128+ brand audits and a 94% client retention rate.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    url: "https://thhryve.com/about",
    title: "About Thryve — Our Approach to Revenue Systems",
    description:
      "Thryve helps ambitious D2C brands turn attention into revenue. Meet the team and the audit-first, dedicated-team approach behind our results.",
  },
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://thhryve.com/about/#aboutpage",
  url: "https://thhryve.com/about",
  name: "About Thryve",
  isPartOf: { "@id": "https://thhryve.com/#website" },
  about: { "@id": "https://thhryve.com/#organization" },
  description:
    "Thryve helps ambitious D2C brands turn attention into revenue through a dedicated-team, audit-first approach to acquisition, conversion, and retention.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <NavThemeProvider>
        <Navbar />

        <AboutHero />

        <AboutValues />

        <MeetTheFounder />

        <AboutCTA />

        <Footer />

        <StickyBookCTA />
      </NavThemeProvider>
    </main>
  );
}
