"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { copy, type Locale } from "@/lib/messages";
import { UI, type UiText } from "@/lib/ui-text";

const STORAGE_KEY = "gst-locale";
const listeners = new Set<() => void>();

function readLocale(): Locale {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "ru" ? "ru" : "en";
  } catch {
    return "en";
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function writeLocale(next: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {}
  listeners.forEach((listener) => listener());
}

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: ReturnType<typeof copy>;
  ui: UiText;
} | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  // The server always renders English; the saved choice applies after hydration.
  const locale = useSyncExternalStore(subscribe, readLocale, () => "en" as Locale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale: writeLocale, t: copy(locale), ui: UI[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used inside LocaleProvider");
  return value;
}

export type Text = { en: string; ru: string };

/** Picks the current-locale string from an { en, ru } pair. */
export function useText() {
  const { locale } = useLocale();
  return (text: Text) => text[locale];
}
