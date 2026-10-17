"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  MessageCircle,
  Moon,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PageHero } from "@/components/site/page-hero";
import { SECTION_SCROLL, SectionNav, type SectionLink } from "@/components/site/section-nav";
import { TourCard } from "@/components/site/tours-section";
import { useContent } from "@/lib/content-context";
import { useLocale, useText } from "@/lib/locale";
import { COMMON } from "@/lib/pages";
import type { Departure, Tour, TourDay } from "@/lib/tours";
import { useUiStore } from "@/lib/ui-store";
import { cn } from "@/lib/utils";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

function formatRange(d: Departure, locale: string) {
  const fmt = new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-GB", { day: "numeric", month: "short", year: "numeric" });
  const start = fmt.format(new Date(`${d.start}T00:00:00`));
  return d.end ? `${start} – ${fmt.format(new Date(`${d.end}T00:00:00`))}` : start;
}

export function TourPage({ tour, related }: { tour: Tour; related: Tour[] }) {
  const tx = useText();
  const { ui, locale } = useLocale();
  const { settings } = useContent();
  const openBooking = useUiStore((s) => s.openBooking);
  const t = ui.tourPage;
  const plain = (value: string) => ({ en: value, ru: value });

  const today = new Date().toISOString().slice(0, 10);
  const departures = (tour.departures ?? []).filter((d) => (d.end ?? d.start) >= today);
  const photos = [tour.image, ...(tour.gallery ?? [])].filter(Boolean);
  const faq = tour.faq ?? [];
  const whatsapp = settings.whatsapp
    ? `${settings.whatsapp}${settings.whatsapp.includes("?") ? "&" : "?"}text=${encodeURIComponent(ui.tour.whatsappText(tour.title))}`
    : "";

  // Sections with nothing to show are left out of the page and the menu.
  const nav: SectionLink[] = [
    { id: "overview", label: ui.tourNav.overview },
    ...(tour.itinerary.length ? [{ id: "itinerary", label: ui.tourNav.itinerary }] : []),
    ...(tour.included.length || tour.excluded.length ? [{ id: "inclusions", label: ui.tourNav.inclusions }] : []),
    { id: "dates", label: ui.tourNav.dates },
    ...(photos.length > 1 ? [{ id: "gallery", label: ui.tourNav.gallery }] : []),
    ...(faq.length ? [{ id: "faq", label: ui.tourNav.faq }] : []),
  ];

  return (
    <>
      <PageHero
        eyebrow={plain(`${tour.country} · ${tour.region}`)}
        title={plain(tour.title)}
        text={plain(tour.subtitle)}
        image={tour.image}
        crumbs={[{ label: COMMON.tours, href: "/tours" }, { label: plain(tour.title) }]}
      >
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/85">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> {tour.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            {t.from} <span className="font-display text-lg font-semibold text-white">{money(tour.price)}</span> {t.perPerson}
          </span>
          {tour.reviews > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-semibold text-white">{tour.rating}</span> · {ui.tours.reviews(tour.reviews)}
            </span>
          )}
        </div>
      </PageHero>

      <SectionNav items={nav} />

      <section className="bg-silk-pattern pb-24 pt-10 sm:pt-14 lg:pb-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
          <div className="min-w-0 space-y-14">
            <TourSection id="overview" title={ui.tourNav.overview}>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <InfoTile icon={Clock} label={ui.tour.duration} value={tour.duration} />
                <InfoTile icon={Users} label={ui.tour.group} value={tour.groupSize} />
                <InfoTile icon={TrendingUp} label={ui.tour.difficulty} value={tour.difficulty} />
                <InfoTile icon={CalendarDays} label={ui.tour.season} value={tour.season} />
              </div>
              {tour.description && <Paragraphs text={tour.description} className="mt-6" />}
              {tour.highlights.length > 0 && (
                <>
                  <h3 className="mt-8 flex items-center gap-2 font-display text-xl font-semibold text-foreground">
                    <Sparkles className="h-5 w-5 text-primary" /> {ui.tour.highlights}
                  </h3>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {tour.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </TourSection>

            {tour.itinerary.length > 0 && (
              <TourSection id="itinerary" title={ui.tourNav.itinerary}>
                <Itinerary days={tour.itinerary} />
              </TourSection>
            )}

            {(tour.included.length > 0 || tour.excluded.length > 0) && (
              <TourSection id="inclusions" title={ui.tourNav.inclusions}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <ListCard title={ui.tour.included} items={tour.included} icon={CheckCircle2} tone="text-primary" />
                  <ListCard title={ui.tour.excluded} items={tour.excluded} icon={XCircle} tone="text-muted-foreground" />
                </div>
              </TourSection>
            )}

            <TourSection id="dates" title={t.datesTitle}>
              {departures.length > 0 ? (
                <div className="overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="hidden grid-cols-[1.4fr_0.8fr_1fr_auto] gap-4 border-b border-border bg-secondary/50 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:grid">
                    <span>{t.dates}</span>
                    <span>{t.price}</span>
                    <span>{t.availability}</span>
                    <span className="w-24" />
                  </div>
                  {departures.map((d) => (
                    <div
                      key={`${d.start}-${d.end ?? ""}`}
                      className="grid gap-2 border-b border-border px-5 py-4 last:border-0 sm:grid-cols-[1.4fr_0.8fr_1fr_auto] sm:items-center sm:gap-4"
                    >
                      <div>
                        <div className="font-medium text-foreground">{formatRange(d, locale)}</div>
                        {d.note && <div className="text-xs text-muted-foreground">{d.note}</div>}
                      </div>
                      <div className="font-display text-lg font-semibold text-primary">{money(d.price ?? tour.price)}</div>
                      <div>
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold",
                            d.status === "available" && "bg-emerald-100 text-emerald-800",
                            d.status === "limited" && "bg-accent/25 text-[#7a5c00]",
                            d.status === "full" && "bg-secondary text-muted-foreground",
                          )}
                        >
                          {t.status[d.status]}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        className="w-full sm:w-24"
                        disabled={d.status === "full"}
                        onClick={() => openBooking(tour.slug, d.start)}
                      >
                        {t.enquire}
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-foreground">{t.onRequestTitle}</h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{t.onRequestText}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">{t.from}</div>
                      <div className="font-display text-3xl font-semibold text-primary">{money(tour.price)}</div>
                      <div className="text-xs text-muted-foreground">{t.perPerson}</div>
                    </div>
                  </div>
                  <Button className="mt-5 gap-2" onClick={() => openBooking(tour.slug)}>
                    {t.requestQuote} <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <p className="mt-3 text-xs text-muted-foreground">{t.priceNote}</p>
            </TourSection>

            {photos.length > 1 && (
              <TourSection id="gallery" title={t.galleryTitle}>
                <Gallery photos={photos} title={tour.title} />
              </TourSection>
            )}

            {faq.length > 0 && (
              <TourSection id="faq" title={t.faqTitle}>
                <div className="space-y-3">
                  {faq.map((item) => (
                    <details key={item.q} className="group rounded-2xl border border-border bg-card p-5">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-foreground">
                        {item.q}
                        <ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180" />
                      </summary>
                      <Paragraphs text={item.a} className="mt-3" />
                    </details>
                  ))}
                </div>
              </TourSection>
            )}
          </div>

          <aside className="hidden lg:sticky lg:top-40 lg:block lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6 card-warm-shadow">
              <div className="text-sm text-muted-foreground">{t.from}</div>
              <div className="font-display text-4xl font-semibold text-primary">{money(tour.price)}</div>
              <div className="text-sm text-muted-foreground">{t.perPerson}</div>
              <div className="mt-5 space-y-2 border-t border-border pt-5 text-sm text-foreground/80">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> {tour.country}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" /> {tour.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" /> {tour.groupSize}
                </div>
              </div>
              <Button size="lg" className="mt-6 w-full gap-2" onClick={() => openBooking(tour.slug)}>
                {t.requestQuote} <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="mt-2 w-full" asChild>
                <Link href="/contact">{t.askQuestion}</Link>
              </Button>
              {whatsapp && (
                <Button size="lg" variant="outline" className="mt-2 w-full gap-2" asChild>
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" /> {ui.tour.askWhatsapp}
                  </a>
                </Button>
              )}
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{tx(COMMON.noPrepay)}</p>
            </div>
          </aside>
        </div>
      </section>

      {/* Phones: price and the main action stay in reach at the bottom. */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-border bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="min-w-0 flex-1">
          <div className="text-[11px] text-muted-foreground">
            {t.from} · {t.perPerson}
          </div>
          <div className="font-display text-xl font-semibold leading-tight text-primary">{money(tour.price)}</div>
        </div>
        {whatsapp && (
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ui.tour.askWhatsapp}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-[#25D366]"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
        )}
        <Button className="h-11 gap-1.5" onClick={() => openBooking(tour.slug)}>
          {t.requestQuote}
        </Button>
      </div>

      {related.length > 0 && (
        <section className="border-t border-border bg-background py-14 pb-28 sm:py-20 lg:pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">{tx(COMMON.related)}</h2>
              <Link href="/tours" className="text-sm font-semibold text-primary hover:underline">
                {tx(COMMON.allTours)} →
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <TourCard key={item.slug} tour={item} index={index} onBook={() => openBooking(item.slug)} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function TourSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className={SECTION_SCROLL} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="font-display text-3xl font-semibold text-foreground">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

/** Text from the admin; blank lines start new paragraphs. */
function Paragraphs({ text, className }: { text: string; className?: string }) {
  return (
    <div className={cn("space-y-3 text-base leading-relaxed text-foreground/85", className)}>
      {text
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p, i) => (
          <p key={i} className="whitespace-pre-line">
            {p}
          </p>
        ))}
    </div>
  );
}

function Itinerary({ days }: { days: TourDay[] }) {
  const { ui } = useLocale();
  const t = ui.tourPage;
  const [open, setOpen] = useState<Set<number>>(() => new Set([days[0]?.day]));
  const allOpen = open.size === days.length;
  const toggle = (day: number) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });

  return (
    <>
      <div className="mb-4 flex justify-end gap-2">
        <Button size="sm" variant="outline" onClick={() => setOpen(new Set(days.map((d) => d.day)))} disabled={allOpen}>
          {t.expandAll}
        </Button>
        <Button size="sm" variant="outline" onClick={() => setOpen(new Set())} disabled={open.size === 0}>
          {t.collapseAll}
        </Button>
      </div>
      <ol className="space-y-3">
        {days.map((day) => {
          const isOpen = open.has(day.day);
          return (
            <li key={day.day} className="overflow-hidden rounded-2xl border border-border bg-card">
              <button
                type="button"
                onClick={() => toggle(day.day)}
                aria-expanded={isOpen}
                aria-controls={`day-${day.day}`}
                className="flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-secondary/40 sm:px-5"
              >
                <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 font-display text-sm font-semibold text-primary">
                  {ui.tour.day} {day.day}
                </span>
                <span className="min-w-0 flex-1 font-semibold text-foreground">{day.title}</span>
                <ChevronDown className={cn("h-5 w-5 shrink-0 text-primary transition-transform", isOpen && "rotate-180")} />
              </button>
              {isOpen && (
                <div id={`day-${day.day}`} className="border-t border-border px-4 pb-5 pt-4 sm:px-5">
                  {day.image && (
                    <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-xl">
                      <Image src={day.image} alt={day.title} fill sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
                    </div>
                  )}
                  {day.description && <Paragraphs text={day.description} className="text-sm sm:text-base" />}
                  {day.overnight && (
                    <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm text-foreground/80">
                      <Moon className="h-4 w-4 text-primary" /> {t.overnight}: {day.overnight}
                    </p>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </>
  );
}

function ListCard({
  title,
  items,
  icon: Icon,
  tone,
}: {
  title: string;
  items: string[];
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
}) {
  if (!items.length) return null;
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="font-display text-xl font-semibold text-foreground">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", tone)} />
            <span className="text-foreground/85">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Gallery({ photos, title }: { photos: string[]; title: string }) {
  const { ui } = useLocale();
  const t = ui.tourPage;
  const [index, setIndex] = useState<number | null>(null);
  const count = photos.length;
  const current = useMemo(() => (index === null ? null : photos[index]), [index, photos]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={`${t.photo} ${i + 1}`}
          >
            <Image
              src={src}
              alt={`${title} — ${t.photo} ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 260px, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>
      <Dialog open={index !== null} onOpenChange={(o) => !o && setIndex(null)}>
        <DialogContent className="max-w-5xl border-0 bg-black/95 p-2 sm:max-w-5xl" aria-describedby={undefined}>
          <DialogTitle className="sr-only">
            {title} — {t.photo} {(index ?? 0) + 1}
          </DialogTitle>
          {current && (
            <div className="relative aspect-[3/2] w-full">
              <Image src={current} alt={`${title} — ${t.photo} ${(index ?? 0) + 1}`} fill sizes="100vw" className="object-contain" />
              {count > 1 && (
                <>
                  <button
                    type="button"
                    aria-label={t.prev}
                    onClick={() => setIndex(((index ?? 0) - 1 + count) % count)}
                    className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    aria-label={t.next}
                    onClick={() => setIndex(((index ?? 0) + 1) % count)}
                    className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function InfoTile({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  if (!value) return null;
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}
