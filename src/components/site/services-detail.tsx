"use client";

import Link from "next/link";
import { BedDouble, Car, CheckCircle2, FileCheck2, Route, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SECTION_SCROLL, SectionNav } from "@/components/site/section-nav";
import { useLocale, useText } from "@/lib/locale";
import { useContent } from "@/lib/content-context";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  transport: Car,
  guides: Users,
  visa: FileCheck2,
  permits: ShieldCheck,
  stay: BedDouble,
  tailor: Route,
};

/** One section per service; the header menu links straight to each section id. */
export function ServicesDetail() {
  const tx = useText();
  const { ui } = useLocale();
  const { pages } = useContent();
  const SERVICES = pages.services;

  return (
    <>
      <SectionNav items={SERVICES.map((s) => ({ id: s.id, label: tx(s.title) }))} />
      <div className="bg-[#faf5eb]">
        <div className="mx-auto max-w-5xl space-y-6 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          {SERVICES.map((service, index) => {
            const Icon = ICONS[service.id] ?? Route;
            return (
              <section
                key={service.id}
                id={service.id}
                aria-labelledby={`${service.id}-title`}
                className={cn(SECTION_SCROLL, "rounded-3xl border border-[#d4a82a]/25 bg-white p-6 sm:p-10")}
              >
                <div className="flex flex-col gap-6 sm:flex-row">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 id={`${service.id}-title`} className="mt-1 font-display text-3xl font-semibold text-foreground">
                      {tx(service.title)}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-foreground/80 sm:text-lg">{tx(service.lead)}</p>
                    <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                      {service.points.map((point) => (
                        <li key={point.en} className="flex items-start gap-2 text-sm text-foreground/85">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          {tx(point)}
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant="outline" className="mt-6">
                      <Link href="/contact">{ui.servicesPage.enquire}</Link>
                    </Button>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
