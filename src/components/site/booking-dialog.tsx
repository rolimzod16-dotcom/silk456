"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tours, Tour } from "@/lib/tours";
import { useUiStore } from "@/lib/ui-store";
import { useToast } from "@/hooks/use-toast";

type Status = "idle" | "loading" | "success" | "error";

export function BookingDialog() {
  const open = useUiStore((s) => s.bookingOpen);
  const presetSlug = useUiStore((s) => s.bookingTourSlug);
  const close = useUiStore((s) => s.closeBooking);
  const router = useRouter();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tourSlug, setTourSlug] = useState<string>(tours[0]?.slug ?? "");
  const [travelers, setTravelers] = useState("2");
  const [travelDate, setTravelDate] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (presetSlug) setTourSlug(presetSlug);
  }, [presetSlug]);

  useEffect(() => {
    if (open) {
      setStatus("idle");
      setErrorMsg("");
    }
  }, [open]);

  const selectedTour: Tour | undefined = useMemo(
    () => tours.find((t) => t.slug === tourSlug),
    [tourSlug]
  );

  const totalPrice = selectedTour
    ? selectedTour.price * (Number(travelers) || 1)
    : 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !phone || !tourSlug || !travelers || !travelDate) {
      setErrorMsg("Заполните все обязательные поля.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          tourSlug,
          travelers: Number(travelers),
          travelDate,
          message,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Не удалось отправить заявку");
      }
      setStatus("success");
      toast({
        title: "Заявка принята!",
        description: `Мы свяжемся с вами по поводу тура «${data.tourTitle}» в течение 24 часов.`,
      });
      router.refresh();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Ошибка отправки");
    }
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close()}>
      <DialogContent className="max-h-[92svh] overflow-y-auto scrollbar-warm sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-semibold text-foreground">
            Бронирование тура
          </DialogTitle>
          <DialogDescription>
            Оставьте заявку — менеджер свяжется с вами в течение 24 часов и
            подтвердит наличие мест.
          </DialogDescription>
        </DialogHeader>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-9 w-9 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground">
              Заявка отправлена!
            </h3>
            <p className="max-w-sm text-sm text-muted-foreground">
              Спасибо, {name || "путешественник"}! Мы получили вашу заявку на
              тур «{selectedTour?.title}» и напишем вам на {email}.
            </p>
            <Button className="mt-2" onClick={close}>
              Готово
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="b-tour">Тур *</Label>
              <Select value={tourSlug} onValueChange={setTourSlug}>
                <SelectTrigger id="b-tour">
                  <SelectValue placeholder="Выберите тур" />
                </SelectTrigger>
                <SelectContent>
                  {tours.map((t) => (
                    <SelectItem key={t.slug} value={t.slug}>
                      {t.title} — ${t.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="b-travelers">Путешественников *</Label>
                <Select value={travelers} onValueChange={setTravelers}>
                  <SelectTrigger id="b-travelers">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["1", "2", "3", "4", "5", "6", "7", "8"].map((n) => (
                      <SelectItem key={n} value={n}>
                        {n} {n === "1" ? "человек" : "человек"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="b-date">Дата старта *</Label>
                <Input
                  id="b-date"
                  type="date"
                  min={today}
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="b-name">Имя *</Label>
              <Input
                id="b-name"
                placeholder="Как к вам обращаться"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="b-email">Email *</Label>
                <Input
                  id="b-email"
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="b-phone">Телефон *</Label>
                <Input
                  id="b-phone"
                  placeholder="+7 999 123-45-67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="b-message">Пожелания (необязательно)</Label>
              <Textarea
                id="b-message"
                placeholder="Например: вегетарианское питание, аллергии, дополнительные ночи…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
            </div>

            {selectedTour && (
              <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/50 p-3">
                <div className="text-sm text-muted-foreground">
                  Итого за {travelers} чел.
                </div>
                <div className="font-display text-2xl font-semibold text-primary">
                  ${totalPrice.toLocaleString("ru-RU")}
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {errorMsg}
              </div>
            )}

            <Button type="submit" size="lg" disabled={status === "loading"} className="gap-2">
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Отправляем…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Отправить заявку
                </>
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
              Предоплата не требуется — оплата после подтверждения.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
