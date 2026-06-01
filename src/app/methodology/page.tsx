import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import Cursor from '@/components/ui/Cursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import MethodologyHero from '@/components/sections/methodology/MethodologyHero';
import MethodologyScroll from '@/components/sections/methodology/Accordion';
import Guarantee from '@/components/sections/methodology/Guarantee';
import Comparison from '@/components/sections/methodology/Comparison';
import MethodologyFooterCTA from '@/components/sections/methodology/MethodologyFooterCTA';

export default function Methodology() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main>
        <MethodologyHero />
        <MethodologyScroll />
        <Guarantee />
        <Comparison />
        <MethodologyFooterCTA />
      </main>
      <Footer />
    </>
  );
}
