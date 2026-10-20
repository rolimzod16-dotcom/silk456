"use client";

import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { tourMatches } from "@/lib/catalog";
import { useContent } from "@/lib/content-context";
import { useLocale } from "@/lib/locale";
import { scrollToId, useUiStore } from "@/lib/ui-store";
import { cn } from "@/lib/utils";

function chipClass(active: boolean) {
  return active
    ? "border-accent bg-accent text-accent-foreground"
    : "border-white/30 bg-white/10 text-white hover:border-white/50 hover:bg-white/20";
}

export function TripFinder() {
  const { t, ui } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const filters = useUiStore((state) => state.filters);
  const setFilters = useUiStore((state) => state.setFilters);
  const clearFilters = useUiStore((state) => state.clearFilters);
  const { tours } = useContent();
  const count = useMemo(() => tours.filter((tour) => tourMatches(tour, filters)).length, [tours, filters]);
  // The home page shows only featured tours, so search opens the full catalogue.
  function showResults() {
    if (pathname === "/tours") return scrollToId("tours");
    const query = new URLSearchParams();
    if (filters.season) query.set("season", filters.season);
    if (filters.duration) query.set("duration", filters.duration);
    if (filters.country) query.set("country", filters.country);
    const qs = query.toString();
    router.push(`/tours${qs ? `?${qs}` : ""}#tours`);
  }

  const active = filters.season !== null || filters.duration !== null || filters.country !== null;

  return (
    <div className="mt-8 w-full max-w-3xl rounded-2xl border border-white/20 bg-white/10 p-4 text-left text-white shadow-lg backdrop-blur-md sm:p-5">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">
        {t.finder.season}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {t.finder.seasons.map((item) => {
          const active = filters.season === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilters({ season: active ? null : item.id })}
              className={cn("rounded-full border px-3 py-1 text-xs transition", chipClass(active))}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">
            {t.finder.howLong}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {t.finder.durations.map((item) => {
              const active = filters.duration === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilters({ duration: active ? null : item.id })}
                  className={cn("rounded-full border px-3 py-1.5 text-xs transition", chipClass(active))}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">
            {t.finder.where}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {t.countries.map((item) => {
              const active = filters.country === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilters({ country: active ? null : item.id, region: "all" })}
                  className={cn("rounded-full border px-3 py-1.5 text-xs transition", chipClass(active))}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={showResults}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs hover:bg-primary/90"
        >
          {active ? t.finder.showN(count) : t.finder.explore}
        </button>
        {active && (
          <button type="button" onClick={clearFilters} className="text-sm font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline">
            {ui.filters.reset}
          </button>
        )}
      </div>
    </div>
  );
}
