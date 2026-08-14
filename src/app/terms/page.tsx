import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalContent from "@/components/LegalContent";
import { NavThemeProvider } from "@/components/NavThemeContext";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of the Thryve website.",
  alternates: {
    canonical: "/terms",
  },
};

const sections = [
  {
    heading: "Acceptance of terms",
    body: [
      "By accessing or using thhryve.com, you agree to be bound by these terms. If you don't agree, please don't use this site.",
    ],
  },
  {
    heading: "Use of this site",
    body: [
      "This website is provided for informational purposes to help you learn about Thryve's services and to book consultations. You agree not to misuse the site, including attempting to disrupt its operation, scrape content without permission, or submit false information through our forms.",
    ],
  },
  {
    heading: "Content and intellectual property",
    body: [
      "All content on this site — including text, graphics, case studies, and design — is owned by Thryve or its licensors and may not be reproduced without permission.",
      "Case studies and results referenced on this site describe representative engagements. Individual results vary by business and are not guaranteed.",
    ],
  },
  {
    heading: "Bookings and communications",
    body: [
      "Booking a call through this site does not create a contractual engagement with Thryve. Any services engagement is governed by a separate agreement signed by both parties.",
      "By submitting a form on this site, you consent to being contacted by Thryve regarding your inquiry.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "This site and its content are provided \"as is\" without warranties of any kind. Thryve is not liable for any indirect, incidental, or consequential damages arising from your use of this site.",
    ],
  },
  {
    heading: "Changes to these terms",
    body: [
      "We may update these terms from time to time. Continued use of the site after changes are posted constitutes acceptance of the revised terms.",
    ],
  },
  {
    heading: "Contact",
    body: ["Questions about these terms can be sent to info@thhryve.com."],
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <NavThemeProvider>
        <Navbar />
        <LegalContent
          title="Terms of Service"
          updated="August 14, 2026"
          intro="These terms govern your use of thhryve.com. Please read them carefully before using this site."
          sections={sections}
        />
        <Footer />
      </NavThemeProvider>
    </main>
  );
}
