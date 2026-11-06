import type { Metadata } from "next";
import { staticPageMeta } from "@/lib/seo";
import { SimplePage } from "@/components/site/inner-pages";
import { AboutSection } from "@/components/site/about-section";
import { ApproachSection, WhyUsSection } from "@/components/site/about-page-sections";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { PartnerSection } from "@/components/site/partner-sites";
import { TeamSection } from "@/components/site/team-section";
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
      <AboutSection variant="page" />
      <TeamSection />
      <ApproachSection />
      <WhyUsSection />
      <TestimonialsSection testimonials={testimonials} />
      <PartnerSection />
    </SimplePage>
  );
}
