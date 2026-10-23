import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { DestinationPage as DestinationView } from "@/components/site/destination-page";
import { getContent } from "@/lib/content";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbLd, pageMeta, tourListLd } from "@/lib/seo";
import type { CountryId } from "@/lib/catalog";
import { countryCollection } from "@/lib/pages";

type Props = { params: Promise<{ country: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const collection = countryCollection((await params).country, (await getContent()).tours);
  if (!collection) return {};
  const count = collection.tours.length;
  const guide = (await getContent()).countries[collection.id as CountryId];
  return pageMeta({
    title: guide?.seoTitle || `${collection.label.en} Tours & Travel Packages`,
    description: guide?.seoDescription || `${((await getContent()).countries[collection.id as CountryId]?.overview.split(". ")[0] || collection.text.en).replace(/\.$/, "")}.${count ? ` ${count} ready-made ${count === 1 ? "itinerary" : "itineraries"} with local guides.` : " Private routes built to order."}`,
    path: `/destinations/${collection.id}`,
    image: collection.image,
  });
}

export default async function DestinationPage({ params }: Props) {
  const content = await getContent();
  const collection = countryCollection((await params).country, content.tours);
  if (!collection) permanentRedirect("/destinations"); // unknown or old slug
  const country = content.countries[collection.id as CountryId];
  return (
    <>
      <JsonLd
        data={[
          tourListLd(`${collection.label.en} tours`, collection.tours),
          breadcrumbLd([
            { name: "Destinations", path: "/destinations" },
            { name: collection.label.en, path: `/destinations/${collection.id}` },
          ]),
        ]}
      />
      {country.faq.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: country.faq.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }}
        />
      )}
      <DestinationView collection={collection} content={country} />
    </>
  );
}
