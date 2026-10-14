import type { Metadata } from "next";
import { SimplePage } from "@/components/site/inner-pages";
import { ContactSection } from "@/components/site/contact-section";

export const metadata: Metadata = {
  title: "Contact",
  description: "Ask about a tour or request a custom Silk Road itinerary. We reply within one business day.",
};

export default function ContactPage() {
  return (
    <SimplePage page="contact">
      <ContactSection />
    </SimplePage>
  );
}
