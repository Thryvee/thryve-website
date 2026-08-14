import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalContent from "@/components/LegalContent";
import { NavThemeProvider } from "@/components/NavThemeContext";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Thryve collects, uses, and protects your personal information.",
  alternates: {
    canonical: "/privacy",
  },
};

const sections = [
  {
    heading: "Information we collect",
    body: [
      "We collect information you give us directly — your name, email address, company name, and any details you share when you book a call, subscribe to our newsletter, or request a download such as our funnel audit checklist.",
      "We also collect limited technical information automatically when you visit our site, such as your browser type, device information, and pages viewed, typically through cookies and similar technologies described in our cookie notice.",
    ],
  },
  {
    heading: "How we use your information",
    body: [
      "We use the information you provide to respond to inquiries, schedule and prepare for calls, deliver requested content (like the funnel audit checklist), send you marketing communications you've opted into, and improve our website and services.",
      "We do not sell your personal information to third parties.",
    ],
  },
  {
    heading: "Third-party services",
    body: [
      "We use third-party tools to operate our site and business, including scheduling software (Calendly) for booking calls. These providers process data on our behalf and are bound by their own privacy commitments.",
      "If we begin using an email service provider to manage newsletter or lead-magnet subscriptions, this policy will be updated to name that provider before any data is shared with them.",
    ],
  },
  {
    heading: "Data retention",
    body: [
      "We retain personal information for as long as necessary to fulfill the purposes described in this policy, or as required by law. You may request deletion of your data at any time by contacting us.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Depending on your location, you may have the right to access, correct, or delete your personal information, or to opt out of marketing communications. To exercise any of these rights, contact us using the details below.",
    ],
  },
  {
    heading: "Contact",
    body: ["Questions about this policy can be sent to info@thhryve.com."],
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <NavThemeProvider>
        <Navbar />
        <LegalContent
          title="Privacy Policy"
          updated="August 14, 2026"
          intro="This policy explains what personal information Thryve collects, how we use it, and the choices you have. It applies to thhryve.com and any forms, downloads, or booking flows on this site."
          sections={sections}
        />
        <Footer />
      </NavThemeProvider>
    </main>
  );
}
