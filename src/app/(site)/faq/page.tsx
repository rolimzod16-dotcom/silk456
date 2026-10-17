import type { Metadata } from "next";
import { CtaSection } from "@/components/site/cta-section";
import { FaqList } from "@/components/site/faq-list";
import { SimplePage } from "@/components/site/inner-pages";
import { JsonLd } from "@/components/site/json-ld";
import { getContent } from "@/lib/content";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Silk Road Travel FAQ: Visas, Seasons, Booking & Safety",
  description:
    "Answers for travelers to Central Asia, Iran, China and Mongolia: visas and the GBAO permit, best time to travel, booking without prepayment, altitude, insurance and safety.",
  path: "/faq",
});

export default async function FaqPage() {
  const { faq } = await getContent();
  return (
    <SimplePage page="faq">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.q.en,
              acceptedAnswer: { "@type": "Answer", text: item.a.en },
            })),
          },
          breadcrumbLd([{ name: "FAQ", path: "/faq" }]),
        ]}
      />
      <FaqList items={faq} />
      <CtaSection />
    </SimplePage>
  );
}
