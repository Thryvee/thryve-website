import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ImageTrail from "@/components/ImageTrail";
import PageEnter from "@/components/PageEnter";
// Hidden for now until we have enough content
// import VideoMarqueeSection from "@/components/VideoMarqueeSection";
import SocialProofSection from "@/components/SocialProofSection";
import TrustedBySection from "@/components/TrustedBySection";
import ScrollStackSection from "@/components/ScrollStackSection";
import CreativeEngineSection from "@/components/CreativeEngineSection";
// Hidden for now until we have enough content
// import ReelsMarqueeSection from "@/components/ReelsMarqueeSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { TrailVisibilityProvider } from "@/components/TrailVisibilityContext";
import { NavThemeProvider } from "@/components/NavThemeContext";
import TrailLayer from "@/components/TrailLayer";
import { faqGroups } from "@/lib/faqData";

const trailImages = [
  "/images/1.jpg",
  "/images/2.webp",
  "/images/3.webp",
  "/images/4.webp",
  "/images/5.webp",
];

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://thhryve.com/#faq",
  mainEntity: faqGroups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    }))
  ),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://thhryve.com/#service",
  serviceType: "Revenue Systems / D2C Growth Marketing",
  provider: { "@id": "https://thhryve.com/#organization" },
  areaServed: "Worldwide",
  description:
    "End-to-end acquisition, conversion, retention, and scaling systems for D2C and consumer brands, delivered by a dedicated team under a single monthly engagement.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Thryve Revenue Systems",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Acquisition",
          description:
            "Paid, organic, and creative-led channels engineered to attract buyers who actually convert.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Conversion",
          description:
            "Landing pages, funnels, and creative built to move visitors from interested to purchased.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Retention",
          description:
            "Lifecycle marketing and CRM systems that turn one-time buyers into repeat customers.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Scaling",
          description:
            "Systematic, profitable scaling of winning acquisition and retention systems.",
        },
      },
    ],
  },
};

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqPageSchema, serviceSchema]),
        }}
      />
      <TrailVisibilityProvider>
        <NavThemeProvider>
          <Navbar />

          {/* Hero section */}
          <section className="relative h-screen w-full overflow-hidden bg-white">
            <TrailLayer>
              <ImageTrail items={trailImages} variant={1} />
            </TrailLayer>
            <PageEnter>
              <Hero />
            </PageEnter>
          </section>

          {/* Hidden for now until we have enough content — see AGENTS/CLAUDE notes */}
          {/* <VideoMarqueeSection /> */}

          <SocialProofSection />

          <TrustedBySection />

          <ScrollStackSection />

          <CreativeEngineSection />

          {/* Hidden for now until we have enough content */}
          {/* <ReelsMarqueeSection /> */}

          <ProcessSection />

          <TestimonialsSection />

          <FAQSection />

          <Footer />
        </NavThemeProvider>
      </TrailVisibilityProvider>
    </main>
  );
}
