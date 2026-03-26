import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import Cursor from '@/components/ui/Cursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import WorkHero from '@/components/sections/work/WorkHero';
import CaseStudies from '@/components/sections/work/CaseStudies';
import PinterestGrid from '@/components/sections/work/PinterestGrid';

export default function Work() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main>
        <WorkHero />
        <CaseStudies />
        <PinterestGrid />
      </main>
      <Footer />
    </>
  );
}
