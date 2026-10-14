"use client";

import { useMemo, useState } from "react";
import { Mail, Phone, Search, Trash2 } from "lucide-react";
import type { BookingLead, BookingStatus, InquiryLead } from "@/lib/leads";
import { phoneHref } from "@/lib/site-content";
import { buttonClass, inputClass } from "@/components/admin/fields";
import { cn } from "@/lib/utils";

export const STATUS_LABEL: Record<BookingStatus, string> = {
  new: "Новая",
  confirmed: "Подтверждена",
  closed: "Закрыта",
};

const STATUS_STYLE: Record<BookingStatus, string> = {
  new: "bg-[#d4a82a]/20 text-[#7a5c00]",
  confirmed: "bg-emerald-100 text-emerald-800",
  closed: "bg-[#0f1225]/10 text-[#0f1225]/60",
};

const dateFmt = new Intl.DateTimeFormat("ru-RU", { dateStyle: "medium", timeStyle: "short" });
const when = (iso: string) => (iso ? dateFmt.format(new Date(iso)) : "");

const matches = (query: string, ...fields: (string | null | undefined)[]) =>
  !query || fields.some((field) => field?.toLowerCase().includes(query));

export function BookingsPanel({
  bookings,
  onStatus,
  onDelete,
}: {
  bookings: BookingLead[];
  onStatus: (id: string, status: BookingStatus) => void;
  onDelete: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<BookingStatus | "all">("all");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookings.filter(
      (b) =>
        (status === "all" || b.status === status) &&
        matches(q, b.name, b.email, b.phone, b.tourTitle, b.message),
    );
  }, [bookings, query, status]);

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold">Заявки на тур · {bookings.length}</h2>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <SearchBox value={query} onChange={setQuery} />
        <div className="flex flex-wrap gap-1.5">
          {(["all", "new", "confirmed", "closed"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setStatus(value)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold",
                status === value ? "border-[#d4a82a] bg-[#d4a82a] text-[#0f1225]" : "border-[#0f1225]/15 bg-white",
              )}
            >
              {value === "all" ? "Все" : STATUS_LABEL[value]} ·{" "}
              {value === "all" ? bookings.length : bookings.filter((b) => b.status === value).length}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {visible.length === 0 && <p className="text-sm text-[#0f1225]/60">Ничего не найдено.</p>}
        {visible.map((booking) => (
          <article key={booking.id} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">{booking.tourTitle}</h3>
                  <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold", STATUS_STYLE[booking.status])}>
                    {STATUS_LABEL[booking.status]}
                  </span>
                  <span className="text-xs text-[#0f1225]/50">{when(booking.createdAt)}</span>
                </div>
                <p className="mt-1 text-sm font-medium">{booking.name}</p>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  <a href={`mailto:${booking.email}`} className="inline-flex items-center gap-1 text-[#7a5c00] hover:underline">
                    <Mail className="size-3.5" /> {booking.email}
                  </a>
                  <a href={phoneHref(booking.phone)} className="inline-flex items-center gap-1 text-[#7a5c00] hover:underline">
                    <Phone className="size-3.5" /> {booking.phone}
                  </a>
                </div>
                <p className="mt-1 text-sm text-[#0f1225]/70">
                  {booking.travelers} чел. · {booking.travelDate}
                </p>
                {booking.message && <p className="mt-2 whitespace-pre-line text-sm">{booking.message}</p>}
              </div>
              <div className="flex items-end gap-2">
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
                <button
                  type="button"
                  className={buttonClass.danger}
                  aria-label="Удалить заявку"
                  onClick={() => window.confirm(`Удалить заявку от ${booking.name}?`) && onDelete(booking.id)}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function InquiriesPanel({
  inquiries,
  onDelete,
}: {
  inquiries: InquiryLead[];
  onDelete: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return inquiries.filter((i) => matches(q, i.name, i.email, i.subject, i.message));
  }, [inquiries, query]);

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold">Сообщения · {inquiries.length}</h2>
      <div className="mt-4">
        <SearchBox value={query} onChange={setQuery} />
      </div>
      <div className="mt-4 space-y-3">
        {visible.length === 0 && <p className="text-sm text-[#0f1225]/60">Ничего не найдено.</p>}
        {visible.map((inquiry) => (
          <article key={inquiry.id} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">{inquiry.subject}</h3>
                  <span className="text-xs text-[#0f1225]/50">{when(inquiry.createdAt)}</span>
                </div>
                <p className="mt-1 text-sm">
                  {inquiry.name} ·{" "}
                  <a href={`mailto:${inquiry.email}`} className="text-[#7a5c00] hover:underline">
                    {inquiry.email}
                  </a>
                </p>
                <p className="mt-2 whitespace-pre-line text-sm">{inquiry.message}</p>
              </div>
              <button
                type="button"
                className={buttonClass.danger}
                aria-label="Удалить сообщение"
                onClick={() => window.confirm("Удалить сообщение?") && onDelete(inquiry.id)}
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SearchBox({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="relative flex-1">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#0f1225]/40" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Поиск по имени, email, телефону…"
        className={cn(inputClass, "pl-9")}
      />
    </div>
  );
}
