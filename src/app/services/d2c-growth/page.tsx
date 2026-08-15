import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { getServicePage } from "@/lib/servicesData";

const service = getServicePage("d2c-growth")!;
const siteUrl = "https://thhryve.com";

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: {
    canonical: "/services/d2c-growth",
  },
  openGraph: {
    url: `${siteUrl}/services/d2c-growth`,
    title: service.metaTitle,
    description: service.metaDescription,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
    { "@type": "ListItem", position: 3, name: service.navLabel, item: `${siteUrl}/services/${service.slug}` },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteUrl}/services/${service.slug}/#service`,
  name: service.h1,
  serviceType: service.navLabel,
  provider: { "@id": `${siteUrl}/#organization` },
  areaServed: "Worldwide",
  description: service.metaDescription,
  url: `${siteUrl}/services/${service.slug}`,
};

export default function D2CGrowthPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, serviceSchema]) }}
      />
      <ServicePageTemplate service={service} />
    </>
  );
}
