import Hero from "@/components/sections/home/Hero";
import ProofBar from "@/components/ui/ProofBar";
import Counters from "@/components/sections/home/Counters";
import PillarsScroll from "@/components/sections/home/PillarsScroll";
import Statement from "@/components/sections/home/Statement";
import StatsComparison from "@/components/sections/home/StatsComparison";
import ProcessTimeline from "@/components/sections/home/ProcessTimeline";
import Results from "@/components/sections/home/Results";
import TestimonialTicker from "@/components/sections/home/TestimonialTicker";

import FAQ from "@/components/sections/home/FAQ";
import ChallengeSelector from "@/components/sections/home/ChallengeSelector";
import FooterCTA from "@/components/sections/home/FooterCTA";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/ui/Cursor";
import FounderSection from "@/components/sections/home/FounderSection";
import BrandStoryDiagram from "@/components/sections/home/BrandStoryDiagram";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <ProofBar />
        
        <Counters />
        <PillarsScroll />
        <Statement />
        <StatsComparison />
        <ProcessTimeline />
        <Results />
        <TestimonialTicker />

        <FounderSection />
        <BrandStoryDiagram />
        <FAQ />
        <ChallengeSelector />
        <FooterCTA />
      </main>
      <Footer />
    </>
  );
}
