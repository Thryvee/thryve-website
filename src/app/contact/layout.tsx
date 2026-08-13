import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Book a Free Growth Audit Call",
  description:
    "Book a free 30-minute growth audit with Thryve. We'll audit your funnel, find the highest-leverage gaps in acquisition, conversion, and retention, and show you exactly where the opportunity is.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    url: "https://thhryve.com/contact",
    title: "Contact Thryve — Book a Free Growth Audit Call",
    description:
      "Book a free 30-minute growth audit with Thryve. We'll audit your funnel and show you exactly where the opportunity is.",
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://thhryve.com/contact/#contactpage",
  url: "https://thhryve.com/contact",
  name: "Contact Thryve",
  isPartOf: { "@id": "https://thhryve.com/#website" },
  about: { "@id": "https://thhryve.com/#organization" },
  description:
    "Book a free 30-minute growth audit call with Thryve to review your acquisition, conversion, and retention funnel.",
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      {children}
    </>
  );
}
