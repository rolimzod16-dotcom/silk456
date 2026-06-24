import { SiteHeader } from "@/components/site/site-header";
import { Hero } from "@/components/site/hero";
import { ToursSection } from "@/components/site/tours-section";
import { AboutSection } from "@/components/site/about-section";
import { FeaturesSection } from "@/components/site/features-section";
import { ProcessSection } from "@/components/site/process-section";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { CtaSection } from "@/components/site/cta-section";
import { ContactSection } from "@/components/site/contact-section";
import { SiteFooter } from "@/components/site/site-footer";
import { BookingDialog } from "@/components/site/booking-dialog";
import { tours } from "@/lib/tours";
import { testimonials } from "@/lib/testimonials";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <ToursSection tours={tours} />
        <AboutSection />
        <FeaturesSection />
        <ProcessSection />
        <TestimonialsSection testimonials={testimonials} />
        <CtaSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <BookingDialog />
    </div>
  );
}
