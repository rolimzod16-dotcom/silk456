import type { Metadata } from "next";
import { staticPageMeta } from "@/lib/seo";
import { SimplePage } from "@/components/site/inner-pages";
import { ContactSection } from "@/components/site/contact-section";

export async function generateMetadata(): Promise<Metadata> {
  return staticPageMeta("contact", {
  title: "Contact Us — Plan Your Silk Road Trip",
  description:
    "Ask about a tour or request a custom Silk Road itinerary. We reply within one business day, in English or Russian.",
  path: "/contact",
});
}

export default function ContactPage() {
  return (
    <SimplePage page="contact">
      <ContactSection />
    </SimplePage>
  );
}
