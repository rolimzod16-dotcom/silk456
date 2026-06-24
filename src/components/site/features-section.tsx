"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Users,
  MapPinned,
  Compass,
  Wallet,
  Headphones,
} from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Безопасность прежде всего",
    text: "Все маршруты проходят оценку рисков, гиды сертифицированы, на связи 24/7 координатор и страховка включена в пакеты.",
  },
  {
    icon: Users,
    title: "Малые группы",
    text: "От 6 до 14 человек. Никаких автобусов на 50 мест — только живой диалог и внимание гида к каждому.",
  },
  {
    icon: MapPinned,
    title: "Авторские маршруты",
    text: "Мы сами проезжаем каждый километр перед запуском тура. Нетипичные стоянки, секретные смотровые и местные мастера.",
  },
  {
    icon: Compass,
    title: "Опытные гиды-энтузиасты",
    text: "Историки, этнографы и фотографы. Не зачитывают Википедию, а рассказывают то, что узнали сами в экспедициях.",
  },
  {
    icon: Wallet,
    title: "Честная цена",
    text: "В пакете уже всё — трансферы, проживание, билеты, гиды и большинство ужинов. Без скрытых доплат на месте.",
  },
  {
    icon: Headphones,
    title: "Поддержка 24/7",
    text: "Персональный координатор на весь тур. Задержался рейс, потеряли багаж — решаем за вас, пока вы пьёте чай.",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="why"
      className="relative border-y border-border bg-secondary/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Почему мы
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
            Шёлковый путь без сюрпризов
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Двенадцать лет назад мы поняли: путешествие по этому маршруту
            требует не билета, а проводника. Поэтому мы им стали.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: Math.min(idx * 0.05, 0.25) }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
