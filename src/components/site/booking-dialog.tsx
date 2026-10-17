"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HoneypotField } from "@/components/site/honeypot-field";
import { useToast } from "@/hooks/use-toast";
import { useContent } from "@/lib/content-context";
import { useLocale } from "@/lib/locale";
import { useUiStore } from "@/lib/ui-store";

type Status = "idle" | "loading" | "success" | "error";

export function BookingDialog() {
  const open = useUiStore((s) => s.bookingOpen);
  const presetSlug = useUiStore((s) => s.bookingTourSlug);
  const presetDate = useUiStore((s) => s.bookingDate);
  const close = useUiStore((s) => s.closeBooking);
  const { ui } = useLocale();

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close()}>
      <DialogContent className="max-h-[92svh] overflow-y-auto scrollbar-warm sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-semibold text-foreground">{ui.booking.title}</DialogTitle>
          <DialogDescription>{ui.booking.text}</DialogDescription>
        </DialogHeader>
        {/* Mounted only while open, so every opening starts with a fresh form. */}
        {open && <BookingForm presetSlug={presetSlug} presetDate={presetDate} onDone={close} />}
      </DialogContent>
    </Dialog>
  );
}

function BookingForm({
  presetSlug,
  presetDate,
  onDone,
}: {
  presetSlug: string | null;
  presetDate: string | null;
  onDone: () => void;
}) {
  const { tours } = useContent();
  const { ui } = useLocale();
  const t = ui.booking;
  const { toast } = useToast();

  const [tourSlug, setTourSlug] = useState(presetSlug ?? tours[0]?.slug ?? "");
  const [travelers, setTravelers] = useState("2");
  const [travelDate, setTravelDate] = useState(presetDate ?? "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const selectedTour = tours.find((tour) => tour.slug === tourSlug);
  const people = Number(travelers) || 1;
  const today = new Date().toISOString().split("T")[0];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !phone || !tourSlug || !travelDate) {
      setErrorMsg(t.required);
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, tourSlug, travelers: people, travelDate, message, website }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data?.error || t.failed);
      setStatus("success");
      toast({ title: t.toast, description: t.toastText(selectedTour?.title ?? "") });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : t.failed);
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-9 w-9 text-primary" />
        </div>
        <h3 className="font-display text-xl font-semibold text-foreground">{t.doneTitle}</h3>
        <p className="max-w-sm text-sm text-muted-foreground">{t.doneText(name, selectedTour?.title ?? "", email)}</p>
        <Button className="mt-2" onClick={onDone}>
          {t.done}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <HoneypotField value={website} onChange={setWebsite} />
      <div className="grid gap-1.5">
        <Label htmlFor="b-tour">{t.tour} *</Label>
        <Select value={tourSlug} onValueChange={setTourSlug}>
          <SelectTrigger id="b-tour">
            <SelectValue placeholder={t.tourPh} />
          </SelectTrigger>
          <SelectContent>
            {tours.map((tour) => (
              <SelectItem key={tour.slug} value={tour.slug}>
                {tour.title} — ${tour.price.toLocaleString("en-US")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-1.5">
          <Label htmlFor="b-travelers">{t.travelers} *</Label>
          <Select value={travelers} onValueChange={setTravelers}>
            <SelectTrigger id="b-travelers">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => String(i + 1)).map((n) => (
                <SelectItem key={n} value={n}>
                  {t.people(Number(n))}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="b-date">{t.date} *</Label>
          <Input id="b-date" type="date" min={today} value={travelDate} onChange={(e) => setTravelDate(e.target.value)} required />
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="b-name">{t.name} *</Label>
        <Input id="b-name" autoComplete="name" placeholder={t.namePh} value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="b-email">{t.email} *</Label>
          <Input id="b-email" type="email" autoComplete="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="b-phone">{t.phone} *</Label>
          <Input id="b-phone" type="tel" autoComplete="tel" placeholder={t.phonePh} value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="b-message">{t.notes}</Label>
        <Textarea id="b-message" placeholder={t.notesPh} value={message} onChange={(e) => setMessage(e.target.value)} rows={3} />
      </div>

      {selectedTour && (
        <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/50 p-3">
          <div className="text-sm text-muted-foreground">{t.total(people)}</div>
          <div className="font-display text-2xl font-semibold text-primary">
            ${(selectedTour.price * people).toLocaleString("en-US")}
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{errorMsg}</div>
      )}

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

      <p className="text-center text-xs text-muted-foreground">{t.legal}</p>
    </form>
  );
}
