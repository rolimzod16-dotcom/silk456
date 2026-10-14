import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { SimplePage } from "@/components/site/inner-pages";
import { ServicesSection } from "@/components/site/services-section";
import { ProcessSection } from "@/components/site/process-section";
import { CtaSection } from "@/components/site/cta-section";

export const metadata: Metadata = pageMeta({
  title: "Silk Road Travel Services: Transport, Guides & Visas",
  description:
    "Transport and car rental, drivers and guides, visa support, GBAO permits, accommodation and tailor-made routes across Central Asia.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <SimplePage page="services">
      <ServicesSection showHeading={false} />
      <ProcessSection />
      <CtaSection />
    </SimplePage>
  );
}
