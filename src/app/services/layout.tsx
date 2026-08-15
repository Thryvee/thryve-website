import type { Metadata } from "next";
import { servicePages } from "@/lib/servicesData";

const siteUrl = "https://thhryve.com";

export const metadata: Metadata = {
  title: "Services — Acquisition, Conversion & Retention Systems",
  description:
    "Thryve builds D2C growth systems across four connected pillars: acquisition, conversion rate optimization, retention, and scaling — run as one team, not four vendors.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    url: `${siteUrl}/services`,
    title: "Services — Acquisition, Conversion & Retention Systems",
    description:
      "Thryve builds D2C growth systems across four connected pillars: acquisition, conversion rate optimization, retention, and scaling.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
  ],
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${siteUrl}/services/#collectionpage`,
  url: `${siteUrl}/services`,
  name: "Thryve Services",
  isPartOf: { "@id": `${siteUrl}/#website` },
  about: { "@id": `${siteUrl}/#organization` },
  description:
    "D2C growth services: acquisition, ecommerce conversion rate optimization, retention, and D2C growth systems.",
  hasPart: servicePages.map((s) => ({
    "@type": "Service",
    name: s.h1,
    url: `${siteUrl}/services/${s.slug}`,
  })),
};

export default function ServicesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, collectionSchema]) }}
      />
      {children}
    </>
  );
}
