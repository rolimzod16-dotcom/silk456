"use client";

import { useLocale } from "@/lib/locale";

const PARTNERS = [
  {
    name: "Pamir Moto",
    href: { en: "https://pamirmoto.com/en", ru: "https://pamirmoto.com/ru" },
    text: {
      en: "Motorcycle and 4x4 rental in Tajikistan, plus guided rides on the Pamir Highway.",
      ru: "Аренда мотоциклов и 4x4 в Таджикистане и мототуры по Памирскому тракту.",
    },
  },
  {
    name: "Pamir Ecotourism",
    href: { en: "https://pamirecotourism.com/", ru: "https://pamirecotourism.com/" },
    text: {
      en: "Treks, 4x4 routes and homestays in the Pamirs, planned by a local team from Rushan.",
      ru: "Треки, маршруты на 4x4 и хоумстеи на Памире от местной команды из Рушана.",
    },
  },
];

const COPY = {
  en: {
    title: "Our partners",
    intro: "Want to ride the Pamirs or spend longer in the mountains? These local teams cover the rest of the journey.",
  },
  ru: {
    title: "Наши партнёры",
    intro: "Хотите проехать Памир на мотоцикле или задержаться в горах? Эти местные команды помогут с остальной частью путешествия.",
  },
};

export function FooterPartners() {
  const { locale } = useLocale();
  return (
    <div className="mt-12 border-t border-white/10 pt-8">
      <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">{COPY[locale].title}</h3>
      <ul className="mt-4 grid gap-4 text-sm md:grid-cols-2">
        {PARTNERS.map((partner) => (
          <li key={partner.name}>
            <a href={partner.href[locale]} target="_blank" rel="noopener" className="font-semibold text-white transition-colors hover:text-accent">
              {partner.name}
            </a>
            <p className="mt-1 text-white/70">{partner.text[locale]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PartnerSection() {
  const { locale } = useLocale();
  return (
    <section className="bg-background pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-semibold text-foreground">{COPY[locale].title}</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">{COPY[locale].intro}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {PARTNERS.map((partner) => (
            <a
              key={partner.name}
              href={partner.href[locale]}
              target="_blank"
              rel="noopener"
              className="block rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/30"
            >
              <span className="font-display text-xl font-semibold text-foreground">{partner.name}</span>
              <span className="mt-2 block text-sm text-muted-foreground">{partner.text[locale]}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
