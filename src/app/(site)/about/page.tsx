import type { Metadata } from "next";
import { SimplePage } from "@/components/site/inner-pages";
import { AboutSection } from "@/components/site/about-section";
import { FeaturesSection } from "@/components/site/features-section";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { CtaSection } from "@/components/site/cta-section";
import { testimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "About us",
  description: "Boutique Silk Road tours with local guides, small groups and family guesthouses.",
};

export default function AboutPage() {
  return (
    <SimplePage page="about">
      <AboutSection />
      <FeaturesSection />
      <TestimonialsSection testimonials={testimonials} />
      <CtaSection />
    </SimplePage>
  );
}
