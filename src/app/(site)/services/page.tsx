import type { Metadata } from "next";
import { SimplePage } from "@/components/site/inner-pages";
import { ServicesSection } from "@/components/site/services-section";
import { ProcessSection } from "@/components/site/process-section";
import { CtaSection } from "@/components/site/cta-section";

export const metadata: Metadata = {
  title: "Services",
  description: "Transport and car rental, drivers and guides, visa support, permits, accommodation and tailor-made routes.",
};

export default function ServicesPage() {
  return (
    <SimplePage page="services">
      <ServicesSection showHeading={false} />
      <ProcessSection />
      <CtaSection />
    </SimplePage>
  );
}
