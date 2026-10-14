"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, MapPin } from "lucide-react";
import { useText, type Text } from "@/lib/locale";
import { COMMON } from "@/lib/pages";

type Crumb = { label: Text; href?: string };

type PageHeroProps = {
  eyebrow: Text;
  title: Text;
  text?: Text;
  image?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  text,
  image = "/images/hero-silkroad.png",
  crumbs = [],
  children,
}: PageHeroProps) {
  const tx = useText();
  const trail: Crumb[] = [{ label: COMMON.home, href: "/" }, ...crumbs];

  return (
    <section className="relative w-full overflow-hidden">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-32 pb-14 sm:px-6 sm:pt-40 sm:pb-20 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-white/70">
          {trail.map((crumb, index) => (
            <span key={index} className="inline-flex items-center gap-1">
              {index > 0 && <ChevronRight className="h-3 w-3" />}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-accent">
                  {tx(crumb.label)}
                </Link>
              ) : (
                <span className="text-white/90">{tx(crumb.label)}</span>
              )}
            </span>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-6 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/90">
              {tx(eyebrow)}
            </span>
          </div>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl">
            {tx(title)}
          </h1>
          {text && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              {tx(text)}
            </p>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  );
}
