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

  const groups = [
    {
      title: t.finder.season,
      items: t.finder.seasons.map((item) => ({ id: item.id, label: item.label, on: filters.season === item.id })),
      pick: (id: string, on: boolean) => setFilters({ season: on ? null : (id as typeof filters.season) }),
    },
    {
      title: t.finder.howLong,
      items: t.finder.durations.map((item) => ({ id: item.id, label: item.label, on: filters.duration === item.id })),
      pick: (id: string, on: boolean) => setFilters({ duration: on ? null : (id as typeof filters.duration) }),
    },
    {
      title: t.finder.where,
      items: t.countries.map((item) => ({ id: item.id, label: item.label, on: filters.country === item.id })),
      pick: (id: string, on: boolean) => setFilters({ country: on ? null : (id as typeof filters.country), region: "all" }),
    },
  ];

  return (
    <div className="mt-8 w-full max-w-5xl rounded-2xl border border-white/20 bg-white/10 p-5 text-left text-white shadow-lg backdrop-blur-md sm:p-6">
      <div className="grid gap-5 md:grid-cols-[auto_auto_1fr] md:gap-0">
        {groups.map((group, index) => (
          <div key={group.title} className={cn(index > 0 && "md:border-l md:border-white/20 md:pl-7", index < 2 && "md:pr-7")}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">{group.title}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={item.on}
                  onClick={() => group.pick(item.id, item.on)}
                  className={cn("rounded-full border px-3 py-1.5 text-[13px] transition", chipClass(item.on))}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* The search button appears once something is picked, so the empty panel stays calm. */}
      {active && (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={showResults}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs hover:bg-primary/90"
          >
            {t.finder.showN(count)}
          </button>
          <button type="button" onClick={clearFilters} className="text-sm font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline">
            {ui.filters.reset}
          </button>
        </div>
      )}
    </div>
  );
}
