"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle2, Leaf, MapPinned, Mountain, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/lib/content-context";
import { useLocale } from "@/lib/locale";
import { useUiStore } from "@/lib/ui-store";
import { isForeignPhoto } from "@/lib/utils";

const APPROACH = {
  en: {
    eyebrow: "Our approach",
    title: "How We Travel",
    items: [
      { title: "Authentic Experiences", text: "Meet local people and discover real life in the region." },
      { title: "Responsible Travel", text: "Support local communities and protect nature." },
      { title: "Carefully Planned Journeys", text: "Well-designed routes with reliable logistics and local expertise." },
      { title: "Small Groups & Personal Care", text: "Flexible, friendly and more meaningful travel experiences." },
    ],
  },
  ru: {
    eyebrow: "Наш подход",
    title: "Как мы путешествуем",
    items: [
      { title: "Настоящие впечатления", text: "Знакомство с местными жителями и настоящей жизнью региона." },
      { title: "Ответственный туризм", text: "Поддерживаем местные сообщества и бережём природу." },
      { title: "Продуманные маршруты", text: "Хорошо спланированные маршруты, надёжная логистика и местный опыт." },
      { title: "Малые группы и внимание", text: "Гибкие, дружелюбные и более осмысленные путешествия." },
    ],
  },
};

const ICONS = [Mountain, Leaf, MapPinned, Users];

const WHY = {
  en: {
    title: "Why Travel with Us",
    points: [
      "Local knowledge and regional experience",
      "Private and small-group travel",
      "Transparent arrangements and fair pricing",
      "Personal support at every step",
    ],
    button: "Plan My Journey",
  },
  ru: {
    title: "Почему с нами",
    points: [
      "Знание региона и местный опыт",
      "Индивидуальные поездки и малые группы",
      "Прозрачные условия и честные цены",
      "Личная поддержка на каждом этапе",
    ],
    button: "Спланировать поездку",
  },
};

export function ApproachSection() {
  const { locale } = useLocale();
  const t = APPROACH[locale];
  return (
    <section className="border-t border-border bg-background py-14 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_3fr] lg:items-center lg:px-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t.eyebrow}</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">{t.title}</h2>
          <div className="mt-4 h-0.5 w-14 bg-accent" />
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {t.items.map((item, index) => {
            const Icon = ICONS[index];
            return (
              <div key={item.title} className={index > 0 ? "lg:border-l lg:border-border lg:px-5" : "lg:pr-5"}>
                <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-foreground">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function WhyUsSection() {
  const { locale } = useLocale();
  const { pages } = useContent();
  const openBooking = useUiStore((s) => s.openBooking);
  const t = WHY[locale];
  const photo = pages.photos.whyUs;
  return (
    <section className="bg-background pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-3xl bg-spice-dark">
          <Image
            src={photo}
            unoptimized={isForeignPhoto(photo)}
            alt=""
            fill
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="-z-10 -scale-x-100 object-cover object-left"
          />
          {/* Dark on the left for the text, the photo shows on the right. */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[oklch(0.27_0.04_45)] via-[oklch(0.27_0.04_45/0.85)] to-[oklch(0.27_0.04_45/0.1)]" />
          <div className="max-w-xl px-6 py-12 sm:px-10 sm:py-14">
            <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">{t.title}</h2>
            <ul className="mt-6 space-y-3">
              {t.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-white/90">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  {point}
                </li>
              ))}
            </ul>
            <Button onClick={() => openBooking()} className="mt-8 gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90">
              {t.button} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
