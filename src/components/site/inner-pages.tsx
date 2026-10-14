"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { TourCard, ToursSection } from "@/components/site/tours-section";
import { TripFinder } from "@/components/site/trip-finder";
import { CtaSection } from "@/components/site/cta-section";
import { emptyFilters, type TourFilters } from "@/lib/catalog";
import { useText } from "@/lib/locale";
import { COMMON, PAGE_COPY, type Collection } from "@/lib/pages";
import { useUiStore } from "@/lib/ui-store";
import { useContent } from "@/lib/content-context";

export function ToursCatalog({ initial }: { initial: Partial<TourFilters> }) {
  const setFilters = useUiStore((s) => s.setFilters);
  const { tours } = useContent();
  const copy = PAGE_COPY.tours;
  const key = JSON.stringify(initial);

  // Apply filters coming from the URL (e.g. /tours?country=iran).
  useEffect(() => {
    setFilters({ ...emptyFilters, ...JSON.parse(key) });
  }, [key, setFilters]);

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} text={copy.text} crumbs={[{ label: COMMON.tours }]}>
        <TripFinder />
      </PageHero>
      <ToursSection tours={tours} showHeading={false} />
      <CtaSection />
    </>
  );
}

export function CollectionIndex({
  kind,
  items,
}: {
  kind: Collection["kind"];
  items: Collection[];
}) {
  const tx = useText();
  const copy = PAGE_COPY[kind];

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} text={copy.text} crumbs={[{ label: copy.title }]} />
      <section className="bg-silk-pattern py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3) }}
            >
              <Link
                href={`/${kind}/${item.id}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl card-warm-shadow"
              >
                <Image
                  src={item.image}
                  alt={tx(item.label)}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/0" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="text-xs uppercase tracking-[0.2em] text-accent">
                    {tx(COMMON.routes)}: {item.tours.length}
                  </div>
                  <h2 className="mt-1 font-display text-2xl font-semibold">{tx(item.label)}</h2>
                  <p className="mt-1 text-sm text-white/80">{tx(item.tagline)}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white group-hover:text-accent">
                    {tx(COMMON.seeRoutes)} <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      <CtaSection />
    </>
  );
}

export function CollectionDetail({ collection }: { collection: Collection }) {
  const tx = useText();
  const openBooking = useUiStore((s) => s.openBooking);
  const copy = PAGE_COPY[collection.kind];

  return (
    <>
      <PageHero
        eyebrow={collection.tagline}
        title={collection.label}
        text={collection.text}
        image={collection.image}
        crumbs={[{ label: copy.title, href: `/${collection.kind}` }, { label: collection.label }]}
      />
      <section className="bg-silk-pattern py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {collection.tours.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {collection.tours.map((tour, index) => (
                <TourCard key={tour.slug} tour={tour} index={index} onBook={() => openBooking(tour.slug)} />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 text-center card-warm-shadow">
              <Compass className="mx-auto h-10 w-10 text-primary" />
              <h2 className="mt-4 font-display text-2xl font-semibold text-foreground">
                {tx(COMMON.noRoutesTitle)}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{tx(COMMON.noRoutesText)}</p>
              <Button className="mt-6" onClick={() => openBooking()}>
                {tx(COMMON.requestRoute)}
              </Button>
            </div>
          )}
          <div className="mt-10 text-center">
            <Link href="/tours" className="text-sm font-semibold text-primary hover:underline">
              {tx(COMMON.allTours)} →
            </Link>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}

export function SimplePage({
  page,
  children,
}: {
  page: keyof typeof PAGE_COPY;
  children: React.ReactNode;
}) {
  const copy = PAGE_COPY[page];
  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} text={copy.text} crumbs={[{ label: copy.title }]} />
      {children}
    </>
  );
}
