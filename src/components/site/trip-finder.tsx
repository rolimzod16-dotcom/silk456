"use client";

import { useLocale } from "@/lib/locale";
import { scrollToId, useUiStore } from "@/lib/ui-store";
import { cn } from "@/lib/utils";

function chipClass(active: boolean) {
  return active
    ? "border-[#0f1225] bg-[#0f1225] text-[#d4a82a]"
    : "border-[#d4a82a]/40 bg-[#faf5eb] text-[#0f1225] hover:border-[#d4a82a] hover:bg-[#d4a82a]/20";
}

export function TripFinder() {
  const { t } = useLocale();
  const filters = useUiStore((state) => state.filters);
  const setFilters = useUiStore((state) => state.setFilters);

  return (
    <div className="mt-8 w-full max-w-3xl rounded-2xl border border-white/50 bg-white/70 p-4 text-left text-[#0f1225] shadow-2xl backdrop-blur-md sm:p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0f1225]/60">
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0f1225]/60">
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0f1225]/60">
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

      <button
        type="button"
        onClick={() => scrollToId("tours")}
        className="mt-4 rounded-full bg-[#d4a82a] px-4 py-2 text-sm font-semibold text-[#0f1225] hover:bg-[#e0b84a]"
      >
        {t.finder.explore}
      </button>
    </div>
  );
}
