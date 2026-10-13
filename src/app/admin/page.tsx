"use client";

import { FormEvent, useEffect, useState } from "react";
import type { BookingLead, BookingStatus, InquiryLead } from "@/lib/leads";

const STATUS_LABEL: Record<BookingStatus, string> = {
  new: "Новая",
  confirmed: "Подтверждена",
  closed: "Закрыта",
};

export default function AdminPage() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState<BookingLead[]>([]);
  const [inquiries, setInquiries] = useState<InquiryLead[]>([]);

  async function load() {
    const response = await fetch("/api/admin/leads", { cache: "no-store" });
    if (response.status === 401) {
      setAuthed(false);
      setReady(true);
      return;
    }
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "Не удалось открыть заявки.");
      setReady(true);
      return;
    }
    setBookings(data.bookings || []);
    setInquiries(data.inquiries || []);
    setAuthed(true);
    setError("");
    setReady(true);
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load();
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

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
  }

  async function onStatus(id: string, status: BookingStatus) {
    const response = await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (response.ok) {
      setBookings((current) =>
        current.map((booking) => (booking.id === id ? { ...booking, status } : booking)),
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#faf5eb] px-4 py-10 text-[#0f1225]">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0f1225]/50">
              Great Silk Trails
            </p>
            <h1 className="mt-1 font-display text-4xl font-semibold">Админка</h1>
          </div>
          {authed && (
            <button
              type="button"
              onClick={onLogout}
              className="rounded-full border border-[#0f1225]/20 px-4 py-2 text-sm font-semibold"
            >
              Выйти
            </button>
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
              className="mt-2 w-full rounded-xl border border-[#d4a82a]/40 px-3 py-2"
              autoComplete="current-password"
            />
            {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
            <button
              type="submit"
              className="mt-4 rounded-full bg-[#d4a82a] px-4 py-2 text-sm font-semibold text-[#0f1225]"
            >
              Войти
            </button>
          </form>
        )}

        {authed && (
          <div className="mt-8 space-y-10">
            <section>
              <h2 className="font-display text-2xl font-semibold">Заявки на тур · {bookings.length}</h2>
              <div className="mt-4 space-y-3">
                {bookings.length === 0 && <p className="text-sm text-[#0f1225]/60">Пока пусто.</p>}
                {bookings.map((booking) => (
                  <article key={booking.id} className="rounded-2xl bg-white p-4 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold">{booking.tourTitle}</h3>
                        <p className="mt-1 text-sm">
                          {booking.name} · {booking.email} · {booking.phone}
                        </p>
                        <p className="mt-1 text-sm text-[#0f1225]/70">
                          {booking.travelers} чел. · {booking.travelDate}
                        </p>
                        {booking.message && <p className="mt-2 text-sm">{booking.message}</p>}
                      </div>
                      <label className="text-xs font-semibold uppercase tracking-wide">
                        Статус
                        <select
                          value={booking.status}
                          onChange={(event) => onStatus(booking.id, event.target.value as BookingStatus)}
                          className="mt-1 block rounded-lg border border-[#d4a82a]/40 bg-white px-2 py-1 text-sm normal-case"
                        >
                          {Object.entries(STATUS_LABEL).map(([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold">Сообщения · {inquiries.length}</h2>
              <div className="mt-4 space-y-3">
                {inquiries.length === 0 && <p className="text-sm text-[#0f1225]/60">Пока пусто.</p>}
                {inquiries.map((inquiry) => (
                  <article key={inquiry.id} className="rounded-2xl bg-white p-4 shadow-sm">
                    <h3 className="font-semibold">{inquiry.subject}</h3>
                    <p className="mt-1 text-sm">
                      {inquiry.name} · {inquiry.email}
                    </p>
                    <p className="mt-2 text-sm">{inquiry.message}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
