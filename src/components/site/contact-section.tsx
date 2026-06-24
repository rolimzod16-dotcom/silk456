"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const CONTACTS = [
  {
    icon: Phone,
    label: "Телефон",
    value: "+7 (495) 120-45-67",
    href: "tel:+74951204567",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@silkcaravan.tours",
    href: "mailto:hello@silkcaravan.tours",
  },
  {
    icon: MapPin,
    label: "Офис",
    value: "Москва, ул. Самаркандская, 12",
    href: "#",
  },
  {
    icon: Clock,
    label: "Часы работы",
    value: "Пн–Сб, 10:00–20:00 МСК",
    href: "#",
  },
];

export function ContactSection() {
  const { toast } = useToast();
  const [status, setStatus] = useState<"idle" | "loading" | "ok">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data?.error || "Ошибка");
      setStatus("ok");
      setForm({ name: "", email: "", subject: "", message: "" });
      toast({
        title: "Сообщение отправлено",
        description: "Мы ответим вам в течение одного рабочего дня.",
      });
    } catch {
      setStatus("idle");
      toast({
        title: "Не удалось отправить",
        description: "Попробуйте ещё раз или напишите нам на email.",
        variant: "destructive",
      });
    }
  }

  return (
    <section id="contact" className="relative bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Контакты
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
              Расскажите о вашем путешествии
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Не знаете, какой тур выбрать? Напишите нам — подберём маршрут под
              ваши даты, бюджет и мечты. Ответим в течение одного рабочего дня.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {CONTACTS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/30"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      {c.label}
                    </div>
                    <div className="mt-0.5 text-sm font-semibold text-foreground">
                      {c.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 card-warm-shadow sm:p-8">
            {status === "ok" ? (
              <div className="flex h-full min-h-[360px] flex-col items-center justify-center gap-3 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="h-9 w-9 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Спасибо за обращение!
                </h3>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Мы получили ваше сообщение и ответим в течение одного
                  рабочего дня.
                </p>
                <Button variant="outline" onClick={() => setStatus("idle")}>
                  Отправить ещё одно
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="grid gap-1.5">
                    <Label htmlFor="c-name">Имя</Label>
                    <Input
                      id="c-name"
                      placeholder="Ваше имя"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="c-email">Email</Label>
                    <Input
                      id="c-email"
                      type="email"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="c-subject">Тема</Label>
                  <Input
                    id="c-subject"
                    placeholder="Например: тур в Самарканд в сентябре"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="c-message">Сообщение</Label>
                  <Textarea
                    id="c-message"
                    placeholder="Расскажите о пожеланиях: даты, состав группы, интересы…"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" size="lg" disabled={status === "loading"} className="gap-2">
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Отправляем…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Отправить сообщение
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Отвечаем в течение одного рабочего дня. Без спама.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
