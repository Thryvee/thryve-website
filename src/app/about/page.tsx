import Navbar from "@/components/Navbar";
import AboutHero from "@/components/AboutHero";
import AboutValues from "@/components/AboutValues";
import AboutTrustedBy from "@/components/AboutTrustedBy";
import AboutCTA from "@/components/AboutCTA";
import Footer from "@/components/Footer";
import { NavThemeProvider } from "@/components/NavThemeContext";

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <NavThemeProvider>
        <Navbar />

        <AboutHero />

        <AboutValues />

        <AboutTrustedBy />

        <AboutCTA />

        <Footer />
      </NavThemeProvider>
    </main>
  );
}
