"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale";

/** Shared body for the 404 and error pages. */
export function StatusPage({ kind, onRetry }: { kind: "notFound" | "error"; onRetry?: () => void }) {
  const { ui } = useLocale();
  const t = kind === "notFound" ? ui.notFound : ui.error;
  return (
    <div className="flex flex-1 items-center justify-center bg-silk-pattern px-4 pt-32 pb-20 text-center">
      <div>
        <p className="font-display text-7xl font-semibold text-primary">{kind === "notFound" ? "404" : "!"}</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-foreground">{t.title}</h1>
        <p className="mt-3 text-muted-foreground">{t.text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              {ui.error.retry}
            </button>
          )}
          <Link
            href="/"
            className={
              onRetry
                ? "rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary"
                : "rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            }
          >
            {ui.notFound.home}
          </Link>
          {!onRetry && (
            <Link href="/tours" className="rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary">
              {ui.notFound.tours}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
