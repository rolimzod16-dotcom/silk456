import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionDetail } from "@/components/site/inner-pages";
import { getContent } from "@/lib/content";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbLd, pageMeta, tourListLd } from "@/lib/seo";
import { countryCollection } from "@/lib/pages";

type Props = { params: Promise<{ country: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const collection = countryCollection((await params).country, (await getContent()).tours);
  if (!collection) return {};
  const count = collection.tours.length;
  return pageMeta({
    title: `${collection.label.en} Tours & Travel Packages`,
    description: `${collection.text.en}${count ? ` ${count} ready-made ${count === 1 ? "itinerary" : "itineraries"} with local guides.` : " Private routes built to order."}`,
    path: `/destinations/${collection.id}`,
    image: collection.image,
  });
}

export default async function DestinationPage({ params }: Props) {
  const collection = countryCollection((await params).country, (await getContent()).tours);
  if (!collection) notFound();
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
      <CollectionDetail collection={collection} />
    </>
  );
}
