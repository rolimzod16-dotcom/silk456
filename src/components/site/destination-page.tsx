"use client";

import Image from "next/image";
import { CalendarRange, ChevronDown, Compass, Info, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaSection } from "@/components/site/cta-section";
import { PageHero } from "@/components/site/page-hero";
import { SECTION_SCROLL, SectionNav, type SectionLink } from "@/components/site/section-nav";
import { TourCard } from "@/components/site/tours-section";
import type { CountryContent } from "@/lib/country-content";
import { useLocale, useText } from "@/lib/locale";
import { PAGE_COPY, type Collection } from "@/lib/pages";
import { useUiStore } from "@/lib/ui-store";

export function DestinationPage({ collection, content }: { collection: Collection; content: CountryContent }) {
  const tx = useText();
  const { ui } = useLocale();
  const openBooking = useUiStore((s) => s.openBooking);
  const t = ui.destPage;
  const name = tx(collection.label);

  const nav: SectionLink[] = [
    ...(content.overview || content.facts.length ? [{ id: "overview", label: ui.destNav.overview }] : []),
    ...(content.highlights.length ? [{ id: "highlights", label: ui.destNav.highlights }] : []),
    { id: "tours", label: ui.destNav.tours },
    ...(content.bestTime.length ? [{ id: "best-time", label: ui.destNav.bestTime }] : []),
    ...(content.travelInfo.length ? [{ id: "travel-info", label: ui.destNav.travelInfo }] : []),
    ...(content.faq.length ? [{ id: "faq", label: ui.destNav.faq }] : []),
  ];

  return (
    <>
      <PageHero
        eyebrow={collection.tagline}
        title={collection.label}
        text={collection.text}
        image={content.image || collection.image}
        crumbs={[{ label: PAGE_COPY.destinations.title, href: "/destinations" }, { label: collection.label }]}
      />
      <SectionNav items={nav} />

      <div className="bg-silk-pattern">
        <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          {(content.overview || content.facts.length > 0) && (
            <Block id="overview" title={ui.destNav.overview}>
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="space-y-4 text-base leading-relaxed text-foreground/85 sm:text-lg">
                  {content.overview
                    .split(/\n\s*\n/)
                    .filter((p) => p.trim())
                    .map((p, i) => (
                      <p key={i}>{p.trim()}</p>
                    ))}
                </div>
                {content.facts.length > 0 && (
                  <dl className="grid h-fit grid-cols-2 gap-3 lg:grid-cols-1">
                    {content.facts.map((fact) => (
                      <div key={fact.label} className="rounded-xl border border-border bg-card p-4">
                        <dt className="text-xs uppercase tracking-wider text-muted-foreground">{fact.label}</dt>
                        <dd className="mt-1 font-semibold text-foreground">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </Block>
          )}

          {content.highlights.length > 0 && (
            <Block id="highlights" title={t.highlightsTitle}>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {content.highlights.map((h) => (
                  <article key={h.title} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
                    {h.image && (
                      <div className="relative aspect-[16/10]">
                        <Image src={h.image} alt={h.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1 p-5">
                      <h3 className="flex items-start gap-2 font-display text-xl font-semibold text-foreground">
                        <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" /> {h.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </Block>
          )}

          <Block id="tours" title={t.toursTitle(name)}>
            {collection.tours.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {collection.tours.map((tour, index) => (
                  <TourCard key={tour.slug} tour={tour} index={index} onBook={() => openBooking(tour.slug)} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-card p-8 text-center">
                <Compass className="mx-auto h-10 w-10 text-primary" />
                <p className="mx-auto mt-3 max-w-md text-muted-foreground">{t.noTours}</p>
                <Button className="mt-5" onClick={() => openBooking()}>
                  {t.custom}
                </Button>
              </div>
            )}
          </Block>

          {content.bestTime.length > 0 && (
            <Block id="best-time" title={t.bestTimeTitle}>
              <div className="grid gap-4 md:grid-cols-2">
                {content.bestTime.map((b) => (
                  <div key={b.season} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                    <CalendarRange className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                    <div>
                      <h3 className="font-semibold text-foreground">{b.season}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Block>
          )}

          {content.travelInfo.length > 0 && (
            <Block id="travel-info" title={t.travelInfoTitle}>
              <div className="grid gap-4 md:grid-cols-2">
                {content.travelInfo.map((item) => (
                  <div key={item.title} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                    <Info className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Block>
          )}

          {content.faq.length > 0 && (
            <Block id="faq" title={t.faqTitle}>
              <div className="max-w-3xl space-y-3">
                {content.faq.map((item) => (
                  <details key={item.q} className="group rounded-2xl border border-border bg-card p-5">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-foreground">
                      {item.q}
                      <ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-3 leading-relaxed text-foreground/80">{item.a}</p>
                  </details>
                ))}
              </div>
            </Block>
          )}
        </div>
      </div>
      <CtaSection />
    </>
  );
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className={SECTION_SCROLL} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
