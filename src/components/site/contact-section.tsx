"use client";

import { useState } from "react";
import { CheckCircle2, Clock, Loader2, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HoneypotField } from "@/components/site/honeypot-field";
import { useToast } from "@/hooks/use-toast";
import { useContent } from "@/lib/content-context";
import { useLocale } from "@/lib/locale";
import { phoneHref } from "@/lib/site-content";

const EMPTY = { name: "", email: "", subject: "", message: "", website: "" };

export function ContactSection() {
  const { settings } = useContent();
  const { ui } = useLocale();
  const t = ui.contact;
  const { toast } = useToast();
  const [status, setStatus] = useState<"idle" | "loading" | "ok">("idle");
  const [form, setForm] = useState(EMPTY);

  const contacts = [
    { icon: Phone, label: t.phone, value: settings.phone, href: phoneHref(settings.phone) },
    { icon: MessageCircle, label: t.whatsapp, value: settings.whatsapp ? t.whatsapp : "", href: settings.whatsapp },
    { icon: Mail, label: t.email, value: settings.email, href: `mailto:${settings.email}` },
    { icon: MapPin, label: t.office, value: settings.address, href: undefined },
    { icon: Clock, label: t.hours, value: settings.hours, href: undefined },
  ].filter((item) => item.value);

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
      if (!res.ok || !data.ok) throw new Error(data?.error || "Error");
      setStatus("ok");
      setForm(EMPTY);
      toast({ title: t.toastOk, description: t.okText });
    } catch {
      setStatus("idle");
      toast({ title: t.toastFail, description: t.toastFailText, variant: "destructive" });
    }
  }

  const set = (key: keyof typeof EMPTY) => (value: string) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <section id="contact" className="relative scroll-mt-24 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t.eyebrow}</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">{t.title}</h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">{t.text}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {contacts.map((c) => {
                const body = (
                  <>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                      <div className="mt-0.5 break-words text-sm font-semibold text-foreground">{c.value}</div>
                    </div>
                  </>
                );
                const className =
                  "flex items-start gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/30";
                return c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    className={className}
                    {...(c.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {body}
                  </a>
                ) : (
                  <div key={c.label} className={className}>
                    {body}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 card-warm-shadow sm:p-8">
            {status === "ok" ? (
              <div className="flex h-full min-h-[360px] flex-col items-center justify-center gap-3 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="h-9 w-9 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">{t.okTitle}</h3>
                <p className="max-w-sm text-sm text-muted-foreground">{t.okText}</p>
                <Button variant="outline" onClick={() => setStatus("idle")}>
                  {t.again}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4">
                <HoneypotField value={form.website} onChange={set("website")} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-1.5">
                    <Label htmlFor="c-name">{t.name}</Label>
                    <Input id="c-name" autoComplete="name" placeholder={t.namePh} value={form.name} onChange={(e) => set("name")(e.target.value)} required />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="c-email">{t.email}</Label>
                    <Input id="c-email" type="email" autoComplete="email" placeholder={t.emailPh} value={form.email} onChange={(e) => set("email")(e.target.value)} required />
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="c-subject">{t.subject}</Label>
                  <Input id="c-subject" placeholder={t.subjectPh} value={form.subject} onChange={(e) => set("subject")(e.target.value)} required />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="c-message">{t.message}</Label>
                  <Textarea id="c-message" placeholder={t.messagePh} rows={5} value={form.message} onChange={(e) => set("message")(e.target.value)} required />
                </div>
                <Button type="submit" size="lg" disabled={status === "loading"} className="gap-2">
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> {t.sending}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> {t.send}
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground">{t.note}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
