"use client";

import Image from "next/image";
import {
  Clock,
  Users,
  Star,
  MapPin,
  TrendingUp,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tour } from "@/lib/tours";

type Props = {
  tour: Tour | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBook: (slug: string) => void;
};

export function TourDetailDialog({ tour, open, onOpenChange, onBook }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-3xl gap-0 overflow-hidden p-0 sm:max-w-3xl"
        aria-describedby={undefined}
      >
        <DialogHeader className="sr-only p-0">
          <DialogTitle>{tour?.title ?? "Tour details"}</DialogTitle>
          <DialogDescription>
            Itinerary, included services and booking for this tour.
          </DialogDescription>
        </DialogHeader>
        {tour && (
          <>
            <div className="relative aspect-[16/9] w-full shrink-0">
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                sizes="(min-width: 640px) 768px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/0" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-accent text-accent-foreground hover:bg-accent">
                    {tour.country}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-white/40 bg-black/30 text-white backdrop-blur-sm"
                  >
                    {tour.region}
                  </Badge>
                </div>
                <h2 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
                  {tour.title}
                </h2>
                <p className="mt-1 text-sm text-white/85">{tour.subtitle}</p>
              </div>
            </div>

            <ScrollArea className="max-h-[60vh]">
              <div className="p-5 sm:p-6">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <InfoTile icon={Clock} label="Duration" value={tour.duration} />
                  <InfoTile icon={Users} label="Group" value={tour.groupSize} />
                  <InfoTile icon={TrendingUp} label="Difficulty" value={tour.difficulty} />
                  <InfoTile icon={CalendarDays} label="Season" value={tour.season} />
                </div>

                <div className="mt-5 flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="font-semibold text-foreground">{tour.rating}</span>
                    <span className="text-muted-foreground">· {tour.reviews} reviews</span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-4 w-4" /> {tour.country}, {tour.region}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-foreground/85">
                  {tour.description}
                </p>

                <section className="mt-6">
                  <SectionTitle icon={Sparkles} text="What you'll see" />
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {tour.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 rounded-lg border border-border bg-secondary/40 p-2.5 text-sm"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="mt-6">
                  <SectionTitle icon={CalendarDays} text="Day-by-day itinerary" />
                  <ol className="mt-3 space-y-3">
                    {tour.itinerary.map((day) => (
                      <li
                        key={day.day}
                        className="relative flex gap-3 rounded-lg border border-border bg-card p-3"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-semibold text-primary">
                          {day.day}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-foreground">
                            Day {day.day}. {day.title}
                          </div>
                          <p className="mt-0.5 text-sm text-muted-foreground">
                            {day.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <section>
                    <SectionTitle icon={CheckCircle2} text="Included" accent="primary" />
                    <ul className="mt-3 space-y-1.5 text-sm">
                      {tour.included.map((i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span className="text-foreground/80">{i}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <SectionTitle icon={XCircle} text="Not included" accent="muted" />
                    <ul className="mt-3 space-y-1.5 text-sm">
                      {tour.excluded.map((i) => (
                        <li key={i} className="flex items-start gap-2">
                          <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                          <span className="text-muted-foreground">{i}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>
            </ScrollArea>

            <div className="flex items-center justify-between gap-4 border-t border-border bg-secondary/30 p-4 sm:px-6">
              <div>
                {tour.oldPrice && (
                  <div className="text-xs text-muted-foreground line-through">
                    ${tour.oldPrice}
                  </div>
                )}
                <div className="font-display text-2xl font-semibold text-primary">
                  ${tour.price}
                  <span className="ml-1 text-xs font-normal text-muted-foreground">
                    / person
                  </span>
                </div>
              </div>
              <Button size="lg" onClick={() => onBook(tour.slug)}>
                Book This Tour
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function InfoTile({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-secondary/40 p-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  text,
  accent = "primary",
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  accent?: "primary" | "muted";
}) {
  return (
    <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
      <Icon
        className={
          accent === "primary" ? "h-4 w-4 text-primary" : "h-4 w-4 text-muted-foreground"
        }
      />
      {text}
    </h3>
  );
}
