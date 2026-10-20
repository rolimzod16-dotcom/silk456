"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TourCard } from "@/components/site/tours-section";
import { useLocale } from "@/lib/locale";
import type { Tour } from "@/lib/tours";
import { useUiStore } from "@/lib/ui-store";

/** Home page block: tours marked "on the home page" in the admin, in admin order. */
export function FeaturedTours({ tours }: { tours: Tour[] }) {
  const { ui } = useLocale();
  const openBooking = useUiStore((s) => s.openBooking);
  const t = ui.featured;
  const picked = tours.filter((tour) => tour.showOnHome);
  // Nothing picked yet: show the first six so the block is never empty.
  const shown = picked.length ? picked : tours.slice(0, 6);

  return (
    <section id="tours" className="relative scroll-mt-24 bg-silk-pattern py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">{t.eyebrow}</span>
          </div>
          <h2 className="mt-5 font-display text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">{t.title}</h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">{t.text}</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((tour, index) => (
            <TourCard key={tour.slug} tour={tour} index={index} onBook={() => openBooking(tour.slug)} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/tours">
              {t.viewAll(tours.length)} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
