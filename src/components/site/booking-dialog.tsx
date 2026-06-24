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
      setErrorMsg("Please fill in all required fields.");
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
        throw new Error(data?.error || "Failed to submit your request");
      }
      setStatus("success");
      toast({
        title: "Request received!",
        description: `We'll contact you about the "${data.tourTitle}" tour within 24 hours.`,
      });
      router.refresh();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Submission failed");
    }
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close()}>
      <DialogContent className="max-h-[92svh] overflow-y-auto scrollbar-warm sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-semibold text-foreground">
            Book a Tour
          </DialogTitle>
          <DialogDescription>
            Leave your details — a manager will reach out within 24 hours to
            confirm availability.
          </DialogDescription>
        </DialogHeader>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-9 w-9 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground">
              Request sent!
            </h3>
            <p className="max-w-sm text-sm text-muted-foreground">
              Thank you, {name || "traveler"}! We've received your request for
              the "{selectedTour?.title}" tour and will write to you at {email}.
            </p>
            <Button className="mt-2" onClick={close}>
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="b-tour">Tour *</Label>
              <Select value={tourSlug} onValueChange={setTourSlug}>
                <SelectTrigger id="b-tour">
                  <SelectValue placeholder="Select a tour" />
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
                <Label htmlFor="b-travelers">Travelers *</Label>
                <Select value={travelers} onValueChange={setTravelers}>
                  <SelectTrigger id="b-travelers">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["1", "2", "3", "4", "5", "6", "7", "8"].map((n) => (
                      <SelectItem key={n} value={n}>
                        {n} {n === "1" ? "person" : "people"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="b-date">Start date *</Label>
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
              <Label htmlFor="b-name">Name *</Label>
              <Input
                id="b-name"
                placeholder="How should we address you"
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
                <Label htmlFor="b-phone">Phone *</Label>
                <Input
                  id="b-phone"
                  placeholder="+1 555 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="b-message">Notes (optional)</Label>
              <Textarea
                id="b-message"
                placeholder="e.g. vegetarian meals, allergies, extra nights…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
            </div>

            {selectedTour && (
              <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/50 p-3">
                <div className="text-sm text-muted-foreground">
                  Total for {travelers} {Number(travelers) === 1 ? "person" : "people"}
                </div>
                <div className="font-display text-2xl font-semibold text-primary">
                  ${totalPrice.toLocaleString("en-US")}
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
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Send Request
                </>
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              By submitting, you agree to the processing of your personal data.
              No prepayment required — pay after confirmation.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
