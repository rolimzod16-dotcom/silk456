"use client";

import Link from "next/link";
import { Compass, Phone, Mail, MapPin } from "lucide-react";

const TOUR_LINKS = [
  { label: "Самаркандское Золото", href: "#tours" },
  { label: "Караван в Кашгар", href: "#tours" },
  { label: "Чарын и Небесные горы", href: "#tours" },
  { label: "Персидские Шёлковые Пути", href: "#tours" },
  { label: "Великий Туркестан", href: "#tours" },
];

const COMPANY_LINKS = [
  { label: "О компании", href: "#about" },
  { label: "Преимущества", href: "#why" },
  { label: "Отзывы", href: "#testimonials" },
  { label: "Контакты", href: "#contact" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-spice-dark text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-accent">
                <Compass className="h-5 w-5" />
              </span>
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg font-semibold text-white">
                  Шёлковый Караван
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                  Silk Road Tours
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              Авторские туры по маршруту Великого шёлкового пути с 2013 года.
              Малые группы, опытные гиды и живые истории на каждом километре.
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <a href="tel:+74951204567" className="flex items-center gap-2 text-white/70 hover:text-accent">
                <Phone className="h-4 w-4" /> +7 (495) 120-45-67
              </a>
              <a href="mailto:hello@silkcaravan.tours" className="flex items-center gap-2 text-white/70 hover:text-accent">
                <Mail className="h-4 w-4" /> hello@silkcaravan.tours
              </a>
              <div className="flex items-center gap-2 text-white/70">
                <MapPin className="h-4 w-4" /> Москва, ул. Самаркандская, 12
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Туры
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {TOUR_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/70 transition-colors hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Компания
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/70 transition-colors hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Рассылка
            </h3>
            <p className="mt-4 text-sm text-white/70">
              Новые маршруты, даты заездов и сезонные скидки — раз в месяц.
            </p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Ваш email"
                className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
              >
                ОК
              </button>
            </form>
            <div className="mt-5 flex gap-3">
              {["VK", "TG", "YT", "IG"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-xs font-semibold text-white/70 transition-colors hover:border-accent hover:text-accent"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Шёлковый Караван. Все права защищены.</p>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-accent">Политика конфиденциальности</Link>
            <Link href="#" className="hover:text-accent">Договор оферты</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
