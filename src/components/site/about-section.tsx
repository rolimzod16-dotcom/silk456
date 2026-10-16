"use client";

import Image from "next/image";
import Link from "next/link";
import { Award, Globe2, HeartHandshake } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { tourMeta } from "@/lib/catalog";
import { useContent } from "@/lib/content-context";
import { useLocale } from "@/lib/locale";

const ICONS = [Globe2, Award, HeartHandshake];

export function AboutSection() {
  const { ui } = useLocale();
  const { tours } = useContent();
  const t = ui.about;
  const countries = new Set(tours.flatMap((tour) => tourMeta(tour).countries)).size;

  return (
    <section id="about" className="relative scroll-mt-24 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/images/about-bazaar.png"
                alt={t.imageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -left-3 -top-3 hidden h-24 w-24 rotate-[-8deg] items-center justify-center rounded-2xl bg-primary px-2 text-primary-foreground shadow-lg sm:flex">
              <div className="text-center">
                <div className="font-display text-3xl font-bold leading-none">{countries}</div>
                <div className="mt-1 text-[10px] uppercase leading-tight tracking-wider">{t.countries}</div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Badge variant="outline" className="border-primary/30 text-primary">
              {t.badge}
            </Badge>
            <h2 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
              {t.titleStart} <span className="text-gold-gradient">{t.titleAccent}</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground/80 sm:text-lg">{t.p1}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.p2}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {t.values.map((v, index) => {
                const Icon = ICONS[index] ?? Globe2;
                return (
                  <div
                    key={v.title}
                    className="rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/30"
                  >
                    <Icon className="h-6 w-6 text-primary" />
                    <h3 className="mt-2 font-display text-base font-semibold text-foreground">{v.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{v.text}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <Link href="/tours" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                {t.cta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
