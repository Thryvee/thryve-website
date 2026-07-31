import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ImageTrail from "@/components/ImageTrail";
import PageEnter from "@/components/PageEnter";
import GallerySection from "@/components/GallerySection";
import SocialProofSection from "@/components/SocialProofSection";
import TrustedBySection from "@/components/TrustedBySection";
import ScrollStackSection from "@/components/ScrollStackSection";
import CreativeEngineSection from "@/components/CreativeEngineSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { TrailVisibilityProvider } from "@/components/TrailVisibilityContext";
import { NavThemeProvider } from "@/components/NavThemeContext";
import TrailLayer from "@/components/TrailLayer";

const trailImages = [
  "/images/1.jpg",
  "/images/2.webp",
  "/images/3.webp",
  "/images/4.webp",
  "/images/5.webp",
];

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white">
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

          <GallerySection />

          <SocialProofSection />

          <TrustedBySection />

          <ScrollStackSection />

          <CreativeEngineSection />

          <ProcessSection />

          <TestimonialsSection />

          <FAQSection />

          <Footer />
        </NavThemeProvider>
      </TrailVisibilityProvider>
    </main>
  );
}
