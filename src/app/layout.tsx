import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CookieConsent from "@/components/CookieConsent";
import ThryveAI from "@/components/ThryveAI";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = "https://thhryve.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Thryve — Revenue Systems Agency for D2C Brands",
    template: "%s — Thryve",
  },
  description:
    "Thryve is the world's first revenue systems agency. We build the acquisition, conversion, and retention systems that turn D2C brands into brands people buy from — not just another marketing vendor.",
  keywords: [
    "revenue systems agency",
    "D2C growth agency",
    "e-commerce growth agency",
    "customer acquisition agency",
    "conversion rate optimization agency",
    "retention marketing agency",
    "lifecycle marketing agency",
    "DTC marketing agency",
  ],
  authors: [{ name: "Thryve" }],
  creator: "Thryve",
  publisher: "Thryve",
  applicationName: "Thryve",
  category: "Marketing & Advertising",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Thryve",
    title: "Thryve — Revenue Systems Agency for D2C Brands",
    description:
      "The world's first revenue systems agency. We build acquisition, conversion, and retention channels for D2C brands people buy from.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Thryve — Revenue Systems Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thryve — Revenue Systems Agency for D2C Brands",
    description:
      "The world's first revenue systems agency. We build acquisition, conversion, and retention channels for D2C brands people buy from.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Thryve",
  alternateName: "THHRYVE",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/icon`,
  },
  description:
    "Thryve is the world's first revenue systems agency, building acquisition, conversion, and retention systems for D2C and consumer brands.",
  sameAs: [
    "https://www.instagram.com/thesakchamr/",
    "https://x.com/thesakchamr",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: `${siteUrl}/contact`,
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Thryve",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema]),
          }}
        />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <CookieConsent />
        <ThryveAI />
      </body>
    </html>
  );
}
