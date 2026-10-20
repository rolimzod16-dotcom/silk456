"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { ExternalLink, LogOut } from "lucide-react";
import type { BookingLead, BookingStatus, InquiryLead } from "@/lib/leads";
import type { SiteContent } from "@/lib/site-content";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { buttonClass, inputClass } from "@/components/admin/fields";
import { BookingsPanel, InquiriesPanel } from "@/components/admin/leads-panel";
import { ToursPanel } from "@/components/admin/tours-panel";
import { TestimonialsPanel } from "@/components/admin/testimonials-panel";
import { SettingsPanel } from "@/components/admin/settings-panel";
import { CountriesPanel } from "@/components/admin/countries-panel";
import { FaqPanel } from "@/components/admin/faq-panel";
import { PagesPanel } from "@/components/admin/pages-panel";

type Tab = "bookings" | "inquiries" | "tours" | "countries" | "pages" | "faq" | "testimonials" | "settings";

export default function AdminPage() {
  const { toast } = useToast();
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("bookings");
  const [bookings, setBookings] = useState<BookingLead[]>([]);
  const [inquiries, setInquiries] = useState<InquiryLead[]>([]);
  const [content, setContent] = useState<SiteContent | null>(null);

  const load = useCallback(async () => {
    const [leadsRes, contentRes] = await Promise.all([
      fetch("/api/admin/leads", { cache: "no-store" }),
      fetch("/api/admin/content", { cache: "no-store" }),
    ]);
    if (leadsRes.status === 401 || contentRes.status === 401) {
      setAuthed(false);
      setReady(true);
      return;
    }
    const leads = await leadsRes.json();
    const data = await contentRes.json();
    if (!leadsRes.ok) setError(leads.error || "Не удалось открыть заявки.");
    setBookings(leads.bookings || []);
    setInquiries(leads.inquiries || []);
    setContent(data.content ?? null);
    setAuthed(true);
    setReady(true);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  async function onLogin(event: FormEvent) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "Вход не удался.");
      return;
    }
    setPassword("");
    await load();
  }

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setBookings([]);
    setInquiries([]);
    setContent(null);
  }

  async function saveSection<K extends keyof SiteContent>(section: K, value: SiteContent[K]) {
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section, value }),
    });
    const data = await response.json().catch(() => ({}));
    if (response.status === 401) {
      setAuthed(false);
      return false;
    }
    if (!response.ok || !data.ok) {
      toast({ title: "Не сохранилось", description: data.error || "Попробуйте ещё раз.", variant: "destructive" });
      return false;
    }
    setContent(data.content);
    toast({ title: "Сохранено", description: "Изменения уже на сайте." });
    return true;
  }

  async function onStatus(id: string, status: BookingStatus) {
    const response = await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (response.ok) {
      setBookings((current) => current.map((b) => (b.id === id ? { ...b, status } : b)));
    }
  }

  async function onDeleteLead(kind: "booking" | "inquiry", id: string) {
    const response = await fetch("/api/admin/leads", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, id }),
    });
    if (!response.ok) {
      toast({ title: "Не удалось удалить", variant: "destructive" });
      return;
    }
    if (kind === "booking") setBookings((current) => current.filter((b) => b.id !== id));
    else setInquiries((current) => current.filter((i) => i.id !== id));
  }

  const newCount = bookings.filter((b) => b.status === "new").length;
  const tabs: { id: Tab; label: string; badge?: number }[] = [
    { id: "bookings", label: "Заявки", badge: newCount },
    { id: "inquiries", label: "Сообщения", badge: inquiries.length },
    { id: "tours", label: "Туры" },
    { id: "countries", label: "Страны" },
    { id: "pages", label: "Страницы" },
    { id: "faq", label: "FAQ" },
    { id: "testimonials", label: "Отзывы" },
    { id: "settings", label: "Контакты" },
  ];

  return (
    <main className="min-h-screen bg-[#faf5eb] px-4 py-8 text-[#0f1225] sm:py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0f1225]/50">Great Silk Trails</p>
            <h1 className="mt-1 font-display text-4xl font-semibold">Админка</h1>
          </div>
          {authed && (
            <div className="flex gap-2">
              <a href="/" target="_blank" className={buttonClass.ghost}>
                <ExternalLink className="size-4" /> Сайт
              </a>
              <button type="button" onClick={onLogout} className={buttonClass.ghost}>
                <LogOut className="size-4" /> Выйти
              </button>
            </div>
          )}
        </div>

        {!ready && <p className="mt-10 text-sm">Открываем…</p>}

        {ready && !authed && (
          <form onSubmit={onLogin} className="mt-10 max-w-sm rounded-2xl bg-white p-6 shadow-sm">
            <label className="text-sm font-semibold" htmlFor="admin-password">
              Пароль
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={cn(inputClass, "mt-2")}
              autoComplete="current-password"
            />
            {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
            <button type="submit" className={cn(buttonClass.primary, "mt-4")}>
              Войти
            </button>
          </form>
        )}

        {authed && (
          <>
            <nav className="mt-6 flex gap-1 overflow-x-auto rounded-full bg-white p-1 shadow-sm">
              {tabs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition",
                    tab === item.id ? "bg-[#0f1225] text-white" : "text-[#0f1225]/70 hover:bg-[#0f1225]/5",
                  )}
                >
                  {item.label}
                  {!!item.badge && (
                    <span className="rounded-full bg-[#d4a82a] px-1.5 text-xs text-[#0f1225]">{item.badge}</span>
                  )}
                </button>
              ))}
            </nav>

            {error && <p className="mt-4 text-sm text-red-700">{error}</p>}

            <div className="mt-6">
              {tab === "bookings" && (
                <BookingsPanel bookings={bookings} onStatus={onStatus} onDelete={(id) => onDeleteLead("booking", id)} />
              )}
              {tab === "inquiries" && (
                <InquiriesPanel inquiries={inquiries} onDelete={(id) => onDeleteLead("inquiry", id)} />
              )}
              {content && tab === "tours" && (
                <ToursPanel tours={content.tours} onSave={(value) => saveSection("tours", value)} />
              )}
              {content && tab === "countries" && (
                <CountriesPanel countries={content.countries} onSave={(value) => saveSection("countries", value)} />
              )}
              {content && tab === "pages" && <PagesPanel pages={content.pages} onSave={(value) => saveSection("pages", value)} />}
              {content && tab === "faq" && <FaqPanel items={content.faq} onSave={(value) => saveSection("faq", value)} />}
              {content && tab === "testimonials" && (
                <TestimonialsPanel
                  testimonials={content.testimonials}
                  tourTitles={content.tours.map((t) => t.title)}
                  onSave={(value) => saveSection("testimonials", value)}
                />
              )}
              {content && tab === "settings" && (
                <SettingsPanel settings={content.settings} onSave={(value) => saveSection("settings", value)} />
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
