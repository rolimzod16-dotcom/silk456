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
    label: "Phone",
    value: "+1 (415) 555-0142",
    href: "tel:+14155550142",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@silkcaravan.tours",
    href: "mailto:hello@silkcaravan.tours",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "221 Samarkand St, Suite 5",
    href: "#",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Sat, 10:00–20:00",
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
      if (!res.ok || !data.ok) throw new Error(data?.error || "Error");
      setStatus("ok");
      setForm({ name: "", email: "", subject: "", message: "" });
      toast({
        title: "Message sent",
        description: "We'll reply within one business day.",
      });
    } catch {
      setStatus("idle");
      toast({
        title: "Failed to send",
        description: "Please try again or email us directly.",
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
              Contact
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
              Tell us about your journey
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Not sure which tour to pick? Write to us — we'll find a route that
              fits your dates, budget and dreams. We reply within one business day.
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
                  Thanks for reaching out!
                </h3>
                <p className="max-w-sm text-sm text-muted-foreground">
                  We've received your message and will reply within one
                  business day.
                </p>
                <Button variant="outline" onClick={() => setStatus("idle")}>
                  Send another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="grid gap-1.5">
                    <Label htmlFor="c-name">Name</Label>
                    <Input
                      id="c-name"
                      placeholder="Your name"
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
                  <Label htmlFor="c-subject">Subject</Label>
                  <Input
                    id="c-subject"
                    placeholder="e.g. Samarkand tour in September"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="c-message">Message</Label>
                  <Textarea
                    id="c-message"
                    placeholder="Tell us your wishes: dates, group size, interests…"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" size="lg" disabled={status === "loading"} className="gap-2">
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Send Message
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  We reply within one business day. No spam.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
