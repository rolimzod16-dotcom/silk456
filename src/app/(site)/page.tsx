import { Hero } from "@/components/site/hero";
import { ToursSection } from "@/components/site/tours-section";
import { AboutSection } from "@/components/site/about-section";
import { ServicesSection } from "@/components/site/services-section";
import { FeaturesSection } from "@/components/site/features-section";
import { ProcessSection } from "@/components/site/process-section";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { CtaSection } from "@/components/site/cta-section";
import { ContactSection } from "@/components/site/contact-section";
import { getContent } from "@/lib/content";

export default async function Home() {
  const { tours, testimonials } = await getContent();
  return (
    <>
      <Hero />
      <ToursSection tours={tours} />
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
