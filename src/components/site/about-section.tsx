import Image from "next/image";
import Link from "next/link";
import { Quote, Award, Globe2, HeartHandshake } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const VALUES = [
  {
    icon: Globe2,
    title: "Deep immersion",
    text: "Not tourist clichés, but real encounters — with carpet masters, nomads and keepers of the mosques.",
  },
  {
    icon: Award,
    title: "Expert guides",
    text: "Historians, archaeologists and art historians in love with the region. Not scripted text, but dialogue.",
  },
  {
    icon: HeartHandshake,
    title: "Local economy",
    text: "We work with family guesthouses and workshops. Your money stays in the region.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/images/about-bazaar.png"
                alt="Silk Road bazaar with spices and silk"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 hidden w-56 rotate-1 rounded-2xl border border-border bg-card p-4 shadow-lg sm:block">
              <Quote className="h-5 w-5 text-accent" />
              <p className="mt-1 font-display text-sm italic text-foreground/85">
                "The road itself guides the caravan — one only needs to take the first step."
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                — from travel notes, 2014
              </p>
            </div>
            <div className="absolute -left-3 -top-3 hidden h-20 w-20 rotate-[-8deg] items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg sm:flex">
              <div className="text-center">
                <div className="font-display text-2xl font-bold leading-none">12</div>
                <div className="text-[10px] uppercase tracking-wider">years on the road</div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Badge variant="outline" className="border-primary/30 text-primary">
              About Us
            </Badge>
            <h2 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
              Reviving the Silk Road —{" "}
              <span className="text-gold-gradient">for real</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground/80 sm:text-lg">
              Silk Caravan was born in 2013 out of an expedition by three
              friends along the Khiva — Bukhara — Samarkand route. Today it's a
              team of 18 guides and coordinators across eight countries, leading
              over 600 travelers every year along the same trails once walked by
              caravans carrying silk, lapis lazuli and spices.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We don't shuttle you "from sight to sight." We tell stories,
              introduce you to people and show the Silk Road the way merchants
              and pilgrims saw it a thousand years ago.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {VALUES.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/30"
                >
                  <v.icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-2 font-display text-base font-semibold text-foreground">
                    {v.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{v.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="#tours"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                Choose a route →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
