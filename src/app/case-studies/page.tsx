import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseStudyShowcase from "@/components/CaseStudyShowcase";
import AboutCTA from "@/components/AboutCTA";
import StickyBookCTA from "@/components/StickyBookCTA";
import { NavThemeProvider } from "@/components/NavThemeContext";
import { caseStudies } from "@/lib/caseStudiesData";

export const metadata: Metadata = {
  title: "Case Studies — Real Results from Real D2C Brands",
  description:
    "See how Thryve's acquisition, conversion, retention, and scaling systems moved the numbers that matter for D2C brands — real challenges, real approaches, real results.",
  alternates: {
    canonical: "/case-studies",
  },
  openGraph: {
    url: "https://thhryve.com/case-studies",
    title: "Case Studies — Real Results from Real D2C Brands",
    description:
      "See how Thryve's acquisition, conversion, retention, and scaling systems moved the numbers that matter for D2C brands.",
  },
};

const caseStudiesPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://thhryve.com/case-studies/#collectionpage",
  url: "https://thhryve.com/case-studies",
  name: "Thryve Case Studies",
  isPartOf: { "@id": "https://thhryve.com/#website" },
  about: { "@id": "https://thhryve.com/#organization" },
  description:
    "Case studies covering acquisition, conversion, retention, and scaling engagements delivered by Thryve for D2C and consumer brands.",
  hasPart: caseStudies.map((study) => ({
    "@type": "Article",
    headline: `${study.brand}: ${study.headlineMetric.value} ${study.headlineMetric.label}`,
    about: study.category,
    description: study.summary,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://thhryve.com" },
    { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://thhryve.com/case-studies" },
  ],
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify([caseStudiesPageSchema, breadcrumbSchema]) }}
      />
      <NavThemeProvider>
        <Navbar />

        <section className="w-full bg-white px-6 pt-40 pb-16 text-center md:px-16 md:pt-48">
          <h1 className="font-display mx-auto max-w-2xl text-4xl leading-tight text-black md:text-6xl">
            Explore our work
          </h1>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-black/50 md:text-base">
            Real systems behind real D2C revenue growth. Click any project for the full breakdown.
          </p>
        </section>

        <CaseStudyShowcase />

        <AboutCTA secondaryCtaLabel="See Services" secondaryCtaHref="/services" />

        <Footer />

        <StickyBookCTA />
      </NavThemeProvider>
    </main>
  );
}
