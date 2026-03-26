import Hero from "@/components/sections/home/Hero";
import ProofBar from "@/components/ui/ProofBar";
import Counters from "@/components/sections/home/Counters";
import SocialProof from "@/components/sections/home/SocialProof";
import PillarsScroll from "@/components/sections/home/PillarsScroll";
import Statement from "@/components/sections/home/Statement";
import StatsComparison from "@/components/sections/home/StatsComparison";
import ProcessTimeline from "@/components/sections/home/ProcessTimeline";
import Results from "@/components/sections/home/Results";
import TestimonialTicker from "@/components/sections/home/TestimonialTicker";
import About from "@/components/sections/home/About";
import FAQ from "@/components/sections/home/FAQ";
import ChallengeSelector from "@/components/sections/home/ChallengeSelector";
import FooterCTA from "@/components/sections/home/FooterCTA";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/ui/Cursor";
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
        <SocialProof />
        <Counters />
        <PillarsScroll />
        <Statement />
        <StatsComparison />
        <ProcessTimeline />
        <Results />
        <TestimonialTicker />
        <About />
        <FAQ />
        <ChallengeSelector />
        <FooterCTA />
      </main>
      <Footer />
    </>
  );
}
