import type { Metadata } from "next";
import { staticPageMeta } from "@/lib/seo";
import { SimplePage } from "@/components/site/inner-pages";
import { AboutSection } from "@/components/site/about-section";
import { FeaturesSection } from "@/components/site/features-section";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { CtaSection } from "@/components/site/cta-section";
import { PartnerSection } from "@/components/site/partner-sites";
import { getContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return staticPageMeta("about", {
  title: "About Us — Local Silk Road Tour Operator",
  description:
    "Boutique Silk Road tours with local guides, small groups and family guesthouses across Central Asia.",
  path: "/about",
});
}

export default async function AboutPage() {
  const { testimonials } = await getContent();
  return (
    <SimplePage page="about">
      <AboutSection />
      <FeaturesSection />
      <TestimonialsSection testimonials={testimonials} />
      <PartnerSection />
      <CtaSection />
    </SimplePage>
  );
}
