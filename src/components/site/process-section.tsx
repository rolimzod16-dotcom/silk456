"use client";

import { motion } from "framer-motion";
import { MessagesSquare, Route, Plane, Map } from "lucide-react";

const STEPS = [
  {
    icon: MessagesSquare,
    step: "01",
    title: "Заявка и звонок",
    text: "Вы оставляете заявку — менеджер звонит в течение суток, уточняет пожелания и помогает выбрать маршрут.",
  },
  {
    icon: Map,
    step: "02",
    title: "Подбор маршрута",
    text: "Согласовываем даты, состав группы, добавки (одиночное поселение, доп. ночи, фототур). Присылаем договор.",
  },
  {
    icon: Plane,
    step: "03",
    title: "Подготовка",
    text: "Помогаем с визами и билетами, присылаем чек-лист снаряжения и приветственный briefing-пакет.",
  },
  {
    icon: Route,
    step: "04",
    title: "В путь!",
    text: "Встречаем вас в аэропорту, передаём гиду — и караван отправляется. На связи весь тур 24/7.",
  },
];

export function ProcessSection() {
  return (
    <section className="relative bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Как мы работаем
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
            От заявки до каравана — четыре шага
          </h2>
        </div>

        <div className="relative mt-14 grid gap-6 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />
          {STEPS.map((s, idx) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: Math.min(idx * 0.1, 0.4) }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary/20 bg-background p-5">
                <s.icon className="h-7 w-7 text-primary" />
                <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary font-display text-xs font-bold text-primary-foreground">
                  {s.step}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
