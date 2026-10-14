"use client";

import { useState } from "react";
import { Pencil, Plus, Star, Trash2 } from "lucide-react";
import type { Testimonial } from "@/lib/testimonials";
import { buttonClass, Field, TextArea, TextInput } from "@/components/admin/fields";

function blank(): Testimonial {
  return { id: "", name: "", location: "", initials: "", rating: 5, text: "", tour: "", date: "" };
}

export function TestimonialsPanel({
  testimonials,
  tourTitles,
  onSave,
}: {
  testimonials: Testimonial[];
  tourTitles: string[];
  onSave: (items: Testimonial[]) => Promise<boolean>;
}) {
  const [editing, setEditing] = useState<{ index: number | null; item: Testimonial } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function commit(next: Testimonial[]) {
    setBusy(true);
    const ok = await onSave(next);
    setBusy(false);
    return ok;
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!editing) return;
    const item = editing.item;
    if (!item.name.trim() || !item.text.trim()) return setError("Нужны имя и текст отзыва.");
    setError("");
    const saved = { ...item, id: item.id || crypto.randomUUID(), initials: "" };
    const next =
      editing.index === null
        ? [saved, ...testimonials]
        : testimonials.map((t, i) => (i === editing.index ? saved : t));
    if (await commit(next)) setEditing(null);
  }

  const set = <K extends keyof Testimonial>(key: K, value: Testimonial[K]) =>
    setEditing((current) => (current ? { ...current, item: { ...current.item, [key]: value } } : current));

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-semibold">Отзывы · {testimonials.length}</h2>
        {!editing && (
          <button type="button" className={buttonClass.primary} onClick={() => setEditing({ index: null, item: blank() })}>
            <Plus className="size-4" /> Добавить отзыв
          </button>
        )}
      </div>

      {editing && (
        <form onSubmit={submit} className="mt-4 space-y-4 rounded-2xl bg-white p-4 shadow-sm sm:p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Имя">
              <TextInput value={editing.item.name} onChange={(v) => set("name", v)} />
            </Field>
            <Field label="Откуда">
              <TextInput value={editing.item.location} onChange={(v) => set("location", v)} placeholder="Berlin, Germany" />
            </Field>
            <Field label="Тур">
              <TextInput value={editing.item.tour} onChange={(v) => set("tour", v)} list="tour-titles" />
              <datalist id="tour-titles">
                {tourTitles.map((title) => (
                  <option key={title} value={title} />
                ))}
              </datalist>
            </Field>
            <Field label="Когда" hint="Например: September 2025">
              <TextInput value={editing.item.date} onChange={(v) => set("date", v)} />
            </Field>
            <Field label="Оценка">
              <select
                value={editing.item.rating}
                onChange={(e) => set("rating", Number(e.target.value))}
                className="w-full rounded-xl border border-[#d4a82a]/40 bg-white px-3 py-2 text-sm"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {"★".repeat(n)}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Текст отзыва">
            <TextArea value={editing.item.text} onChange={(v) => set("text", v)} rows={4} />
          </Field>
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" className={buttonClass.primary} disabled={busy}>
              {busy ? "Сохраняем…" : "Сохранить"}
            </button>
            <button type="button" className={buttonClass.ghost} onClick={() => setEditing(null)}>
              Отмена
            </button>
            {error && <p className="text-sm text-red-700">{error}</p>}
          </div>
        </form>
      )}

      <div className="mt-4 space-y-3">
        {testimonials.map((item, index) => (
          <article key={item.id} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">{item.name}</h3>
                  <span className="text-sm text-[#0f1225]/60">{item.location}</span>
                  <span className="inline-flex items-center gap-0.5 text-[#d4a82a]">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-current" />
                    ))}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#0f1225]/60">
                  {item.tour} {item.date && `· ${item.date}`}
                </p>
                <p className="mt-2 text-sm">{item.text}</p>
              </div>
              <div className="flex gap-1.5">
                <button type="button" className={buttonClass.ghost} onClick={() => setEditing({ index, item })}>
                  <Pencil className="size-4" /> Изменить
                </button>
                <button
                  type="button"
                  className={buttonClass.danger}
                  disabled={busy}
                  onClick={() => {
                    if (window.confirm(`Удалить отзыв от ${item.name}?`)) {
                      void commit(testimonials.filter((_, i) => i !== index));
                    }
                  }}
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
