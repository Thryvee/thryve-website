import type { Metadata } from "next";
import "./globals.css";
import "./mobile.css";
import LenisProvider from "@/components/ui/LenisProvider";
import ScrollToTop from "@/components/ui/ScrollToTop";
import LoadingScreen from "@/components/ui/LoadingScreen";
import CursorTrail from "@/components/ui/CursorTrail";
import Spotlight from "@/components/ui/Spotlight";
import PageTransition from "@/components/ui/PageTransition";
import FloatingCTA from "@/components/ui/FloatingCTA";
import BackToTop from "@/components/ui/BackToTop";
import SocialProofNotification from "@/components/ui/SocialProofNotification";
import SectionLabel from "@/components/ui/SectionLabel";
import ExitIntent from "@/components/ui/ExitIntent";

export const metadata: Metadata = {
  title: "Thryve — Revenue Systems Agency",
  description:
    "We build the revenue system most agencies only talk about. Acquire. Convert. Retain. Scale.",
  openGraph: {
    title: "Thryve — Revenue Systems Agency",
    description: "Acquire. Convert. Retain. Scale.",
    url: "https://thhryve.com",
    siteName: "Thryve",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <div className="noise-overlay" aria-hidden="true" />
        <LoadingScreen />
        <CursorTrail />
        <Spotlight />
        <SectionLabel />
        <FloatingCTA />
        <BackToTop />
        <SocialProofNotification />
        <ExitIntent />
        <LenisProvider>
          <ScrollToTop />
          <PageTransition>{children}</PageTransition>
        </LenisProvider>
      </body>
    </html>
  );
}
