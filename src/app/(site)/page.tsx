import { Hero } from "@/components/site/hero";
import { FeaturedTours } from "@/components/site/featured-tours";
import { AboutSection } from "@/components/site/about-section";
import { ServicesSection } from "@/components/site/services-section";
import { FeaturesSection } from "@/components/site/features-section";
import { ProcessSection } from "@/components/site/process-section";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { CtaSection } from "@/components/site/cta-section";
import { ContactSection } from "@/components/site/contact-section";
import type { Metadata } from "next";
import { JsonLd } from "@/components/site/json-ld";
import { getContent } from "@/lib/content";
import { staticPageMeta, tourListLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return staticPageMeta("home", {
  title: "Silk Road Tours in Central Asia | Great Silk Trails",
  absoluteTitle: true,
  description:
    "Small-group and private Silk Road tours: Samarkand and Bukhara, the Pamir Highway, Kyrgyz yurts, Persian cities and Kashgar. Local guides, all transfers, no prepayment.",
  path: "/",
});
}

export default async function Home() {
  const { tours, testimonials } = await getContent();
  return (
    <>
      <JsonLd data={tourListLd("Silk Road tours", tours)} />
      <Hero />
      <FeaturedTours tours={tours} />
      <AboutSection />
      <ServicesSection />
      <FeaturesSection />
      <ProcessSection />
      <TestimonialsSection testimonials={testimonials} />
      <CtaSection />
      <ContactSection />
    </>
  );
}
