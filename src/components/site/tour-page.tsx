"use client";

import Link from "next/link";
import {
  Clock,
  Users,
  Star,
  MapPin,
  TrendingUp,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { TourCard } from "@/components/site/tours-section";
import { useLocale, useText } from "@/lib/locale";
import { useContent } from "@/lib/content-context";
import { COMMON } from "@/lib/pages";
import { Tour } from "@/lib/tours";
import { useUiStore } from "@/lib/ui-store";

export function TourPage({ tour, related }: { tour: Tour; related: Tour[] }) {
  const tx = useText();
  const { ui } = useLocale();
  const { settings } = useContent();
  const t = ui.tour;
  const whatsapp = settings.whatsapp
    ? `${settings.whatsapp}${settings.whatsapp.includes("?") ? "&" : "?"}text=${encodeURIComponent(t.whatsappText(tour.title))}`
    : "";
  const openBooking = useUiStore((s) => s.openBooking);
  const plain = (value: string) => ({ en: value, ru: value });

  return (
    <>
      <PageHero
        eyebrow={plain(`${tour.country} · ${tour.region}`)}
        title={plain(tour.title)}
        text={plain(tour.subtitle)}
        image={tour.image}
        crumbs={[{ label: COMMON.tours, href: "/tours" }, { label: plain(tour.title) }]}
      >
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/85">
          {tour.reviews > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-semibold text-white">{tour.rating}</span> · {ui.tours.reviews(tour.reviews)}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> {tour.duration}
          </span>
        </div>
      </PageHero>

      <section className="bg-silk-pattern py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
          <div className="min-w-0">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <InfoTile icon={Clock} label={t.duration} value={tour.duration} />
              <InfoTile icon={Users} label={t.group} value={tour.groupSize} />
              <InfoTile icon={TrendingUp} label={t.difficulty} value={tour.difficulty} />
              <InfoTile icon={CalendarDays} label={t.season} value={tour.season} />
            </div>

            <p className="mt-8 text-base leading-relaxed text-foreground/85">{tour.description}</p>

            <section className="mt-10">
              <SectionTitle icon={Sparkles} text={t.highlights} />
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {tour.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 rounded-lg border border-border bg-secondary/40 p-3 text-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <SectionTitle icon={CalendarDays} text={t.itinerary} />
              <ol className="mt-4 space-y-3">
                {tour.itinerary.map((day) => (
                  <li key={day.day} className="flex gap-3 rounded-xl border border-border bg-card p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-semibold text-primary">
                      {day.day}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-foreground">
                        {t.day} {day.day}. {day.title}
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">{day.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <section>
                <SectionTitle icon={CheckCircle2} text={t.included} />
                <ul className="mt-4 space-y-2 text-sm">
                  {tour.included.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-foreground/80">{i}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <SectionTitle icon={XCircle} text={t.excluded} muted />
                <ul className="mt-4 space-y-2 text-sm">
                  {tour.excluded.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="text-muted-foreground">{i}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6 card-warm-shadow">
              {tour.oldPrice && (
                <div className="text-sm text-muted-foreground line-through">${tour.oldPrice}</div>
              )}
              <div className="font-display text-4xl font-semibold text-primary">${tour.price}</div>
              <div className="text-sm text-muted-foreground">{tx(COMMON.perPerson)}</div>

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
                {tx(COMMON.bookThis)} <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="mt-2 w-full" asChild>
                <Link href="/contact">{tx(COMMON.askQuestion)}</Link>
              </Button>
              {whatsapp && (
                <Button size="lg" variant="outline" className="mt-2 w-full gap-2" asChild>
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" /> {t.askWhatsapp}
                  </a>
                </Button>
              )}
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{tx(COMMON.noPrepay)}</p>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border bg-background py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
                {tx(COMMON.related)}
              </h2>
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

function InfoTile({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
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

function SectionTitle({
  icon: Icon,
  text,
  muted = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  muted?: boolean;
}) {
  return (
    <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-foreground">
      <Icon className={muted ? "h-5 w-5 text-muted-foreground" : "h-5 w-5 text-primary"} />
      {text}
    </h2>
  );
}
