"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  Users,
  Star,
  MapPin,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tourMatches } from "@/lib/catalog";
import { useLocale } from "@/lib/locale";
import { Tour } from "@/lib/tours";
import { useUiStore } from "@/lib/ui-store";
import { cn } from "@/lib/utils";

type ToursSectionProps = {
  tours: Tour[];
  showHeading?: boolean;
};

const REGIONS = ["all", "Central Asia", "East Asia"];

export function ToursSection({ tours, showHeading = true }: ToursSectionProps) {
  const { t, ui } = useLocale();
  const filters = useUiStore((state) => state.filters);
  const setFilters = useUiStore((state) => state.setFilters);
  const clearFilters = useUiStore((state) => state.clearFilters);
  const openBooking = useUiStore((s) => s.openBooking);
  const region = filters.region;

  const filtered = useMemo(() => {
    return tours.filter((tour) => tourMatches(tour, filters));
  }, [filters, tours]);

  const filtersActive =
    filters.season !== null ||
    filters.duration !== null ||
    filters.country !== null ||
    filters.style !== null ||
    filters.region !== "all";

  return (
    <section id="tours" className="relative scroll-mt-24 bg-silk-pattern py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {showHeading && (
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {ui.tours.eyebrow}
            </span>
          </div>
          <h2 className="mt-5 font-display text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
            {ui.tours.title}
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            {ui.tours.text}
          </p>
        </div>
        )}

        <div className={cn("flex flex-col items-center gap-3", showHeading && "mt-10")}>
          {filtersActive && (
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
              <span>
                {t.finder.showing}: {filtered.length}
              </span>
              <Button type="button" size="sm" variant="outline" onClick={clearFilters} className="gap-1.5">
                <RotateCcw className="h-3.5 w-3.5" /> {ui.filters.reset}
              </Button>
            </div>
          )}
          <Tabs value={region} onValueChange={(value) => setFilters({ region: value, country: null })}>
            <TabsList className="h-auto flex-wrap justify-center gap-1 bg-secondary/60 p-1.5">
              {REGIONS.map((r) => (
                <TabsTrigger
                  key={r}
                  value={r}
                  className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  {ui.tours.regions[r] ?? r}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tour, idx) => (
            <TourCard
              key={tour.slug}
              tour={tour}
              index={idx}
              onBook={() => openBooking(tour.slug)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 flex flex-col items-center gap-4 text-center text-muted-foreground">
            <p>{t.finder.empty}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline" onClick={clearFilters}>
                {ui.filters.reset}
              </Button>
              <Button onClick={() => openBooking()}>{t.finder.request}</Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function TourCard({
  tour,
  index,
  onBook,
}: {
  tour: Tour;
  index: number;
  onBook: () => void;
}) {
  const href = `/tours/${tour.slug}`;
  const { ui } = useLocale();
  const t = ui.tours;
  const discount = tour.oldPrice
    ? Math.round(((tour.oldPrice - tour.price) / tour.oldPrice) * 100)
    : 0;
  const groupSize = tour.groupSize.replace(/\s+if capacity confirmed$/i, "");
  const [level, levelNote] = tour.difficulty.split(/\s+[—–]\s+/, 2);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3) }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card card-warm-shadow transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Link href={href} aria-label={tour.title} className="absolute inset-0">
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {tour.featured && (
            <Badge className="bg-accent text-accent-foreground hover:bg-accent">
              {t.favorite}
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="bg-primary text-primary-foreground hover:bg-primary">
              −{discount}%
            </Badge>
          )}
        </div>
        <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-xs backdrop-blur-sm">
            <MapPin className="h-3 w-3" /> {tour.country}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs backdrop-blur-sm">
            <Clock className="h-3 w-3" /> {tour.duration}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        {/* The price row sits at the bottom, so prices and buttons stay aligned across a row. */}
        <h3 className="line-clamp-2 font-display text-xl font-semibold leading-snug text-foreground">
          <Link href={href} className="hover:text-primary">
            {tour.title}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground">
          {tour.subtitle}
        </p>

        <ul className="mt-3 space-y-1 text-sm text-foreground/80">
          {tour.highlights.slice(0, 2).map((h) => (
            <li key={h} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="line-clamp-1">{h}</span>
            </li>
          ))}
        </ul>

        <div className="mb-3 mt-3 space-y-1 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5" /> {groupSize}
            </span>
            <span className="inline-flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" /> {level}
            </span>
            {tour.reviews > 0 && (
              <span className="inline-flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                <span className="font-medium text-foreground">{tour.rating}</span> ({tour.reviews})
              </span>
            )}
          </div>
          {levelNote && (
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 shrink-0" />
              <span className="line-clamp-1">{levelNote.charAt(0).toUpperCase() + levelNote.slice(1)}</span>
            </div>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-border pt-3">
          <div className="min-w-0">
            <div className="text-xs text-muted-foreground">
              {ui.tourPage.from}
              {tour.oldPrice && <span className="ml-1.5 line-through">${tour.oldPrice.toLocaleString("en-US")}</span>}
            </div>
            <div className="font-display text-2xl font-semibold leading-tight text-primary">
              ${tour.price.toLocaleString("en-US")}
            </div>
            <div className="text-xs text-muted-foreground">
              {t.perPerson} · {t.twinSharing}
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link href={href}>{t.details}</Link>
            </Button>
            <Button size="sm" onClick={onBook} className={cn("gap-1")}>
              {t.book} <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
