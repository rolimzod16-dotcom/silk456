"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, ExternalLink, Pencil, Plus, Star, Trash2, X } from "lucide-react";
import { COUNTRIES, REGIONS, SEASONS, STYLES, tourMeta } from "@/lib/catalog";
import type { Tour } from "@/lib/tours";
import {
  buttonClass,
  Chips,
  Field,
  ImageField,
  LinesInput,
  TextArea,
  TextInput,
} from "@/components/admin/fields";

const REGION_LABEL: Record<(typeof REGIONS)[number], string> = {
  "Central Asia": "Центральная Азия",
  "West Asia": "Персия",
  "East Asia": "Китай и степи",
};

const label = <T extends string>(items: readonly { id: T; ru: string }[]) =>
  items.map((item) => ({ id: item.id, label: item.ru }));

function blankTour(): Tour {
  return {
    slug: "",
    title: "",
    subtitle: "",
    country: "",
    region: REGIONS[0],
    duration: "",
    days: 7,
    price: 0,
    image: "",
    rating: 5,
    reviews: 0,
    groupSize: "up to 12 guests",
    difficulty: "Easy",
    season: "",
    highlights: [],
    itinerary: [{ day: 1, title: "", description: "" }],
    included: [],
    excluded: [],
    description: "",
    countries: [],
    seasons: [],
    styles: [],
  };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ToursPanel({
  tours,
  onSave,
}: {
  tours: Tour[];
  onSave: (tours: Tour[]) => Promise<boolean>;
}) {
  const [editing, setEditing] = useState<{ index: number | null; tour: Tour } | null>(null);
  const [busy, setBusy] = useState(false);

  async function commit(next: Tour[]) {
    setBusy(true);
    const ok = await onSave(next);
    setBusy(false);
    return ok;
  }

  function move(index: number, delta: number) {
    const next = [...tours];
    const [item] = next.splice(index, 1);
    next.splice(index + delta, 0, item);
    void commit(next);
  }

  function remove(index: number) {
    if (!window.confirm(`Удалить тур «${tours[index].title}»? Это сразу отразится на сайте.`)) return;
    void commit(tours.filter((_, i) => i !== index));
  }

  if (editing) {
    return (
      <TourEditor
        initial={editing.tour}
        isNew={editing.index === null}
        taken={tours.filter((_, i) => i !== editing.index).map((t) => t.slug)}
        busy={busy}
        onCancel={() => setEditing(null)}
        onSubmit={async (tour) => {
          const next =
            editing.index === null
              ? [...tours, tour]
              : tours.map((item, i) => (i === editing.index ? tour : item));
          if (await commit(next)) setEditing(null);
        }}
      />
    );
  }

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-semibold">Туры · {tours.length}</h2>
        <button type="button" className={buttonClass.primary} onClick={() => setEditing({ index: null, tour: blankTour() })}>
          <Plus className="size-4" /> Добавить тур
        </button>
      </div>
      <p className="mt-1 text-sm text-[#0f1225]/60">Порядок здесь — это порядок туров на сайте.</p>

      <div className="mt-4 space-y-3">
        {tours.map((tour, index) => (
          <article key={tour.slug} className="flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-sm sm:flex-row sm:items-center">
            <img src={tour.image} alt="" className="aspect-[16/10] w-full rounded-xl object-cover sm:w-36" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold">{tour.title}</h3>
                {tour.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#d4a82a]/20 px-2 py-0.5 text-xs font-semibold">
                    <Star className="size-3" /> Хит сезона
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-sm text-[#0f1225]/70">
                {tour.country} · {tour.duration} · ${tour.price}
                {tour.oldPrice ? <span className="ml-1 line-through opacity-60">${tour.oldPrice}</span> : null}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <button type="button" className={buttonClass.icon} disabled={busy || index === 0} onClick={() => move(index, -1)} aria-label="Выше">
                <ArrowUp className="size-4" />
              </button>
              <button
                type="button"
                className={buttonClass.icon}
                disabled={busy || index === tours.length - 1}
                onClick={() => move(index, 1)}
                aria-label="Ниже"
              >
                <ArrowDown className="size-4" />
              </button>
              <a href={`/tours/${tour.slug}`} target="_blank" className={buttonClass.icon} aria-label="Открыть на сайте">
                <ExternalLink className="size-4" />
              </a>
              <button
                type="button"
                className={buttonClass.ghost}
                disabled={busy}
                onClick={() => setEditing({ index, tour: { ...tour, ...tourMeta(tour) } })}
              >
                <Pencil className="size-4" /> Изменить
              </button>
              <button type="button" className={buttonClass.danger} disabled={busy} onClick={() => remove(index)}>
                <Trash2 className="size-4" />
              </button>
            </div>
          </article>
        ))}
        {tours.length === 0 && <p className="text-sm text-[#0f1225]/60">Туров пока нет.</p>}
      </div>
    </section>
  );
}

function TourEditor({
  initial,
  isNew,
  taken,
  busy,
  onCancel,
  onSubmit,
}: {
  initial: Tour;
  isNew: boolean;
  taken: string[];
  busy: boolean;
  onCancel: () => void;
  onSubmit: (tour: Tour) => void;
}) {
  const [tour, setTour] = useState<Tour>(initial);
  const [error, setError] = useState("");
  const set = <K extends keyof Tour>(key: K, value: Tour[K]) => setTour((t) => ({ ...t, [key]: value }));

  function setDay(index: number, patch: Partial<Tour["itinerary"][number]>) {
    set(
      "itinerary",
      tour.itinerary.map((day, i) => (i === index ? { ...day, ...patch } : day)),
    );
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const slug = slugify(tour.slug || tour.title);
    if (!tour.title.trim()) return setError("Укажите название тура.");
    if (!slug) return setError("Адрес страницы должен содержать латинские буквы или цифры.");
    if (taken.includes(slug)) return setError("Тур с таким адресом уже есть — измените адрес страницы.");
    if (!tour.price) return setError("Укажите цену.");
    setError("");
    onSubmit({
      ...tour,
      slug,
      days: tour.days || tour.itinerary.length,
      itinerary: tour.itinerary
        .filter((day) => day.title.trim())
        .map((day, i) => ({ ...day, day: i + 1 })),
    });
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-semibold">{isNew ? "Новый тур" : `Тур: ${initial.title}`}</h2>
        <button type="button" className={buttonClass.ghost} onClick={onCancel}>
          <X className="size-4" /> Отмена
        </button>
      </div>

      <Card title="Основное">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Название">
            <TextInput value={tour.title} onChange={(v) => set("title", v)} required />
          </Field>
          <Field label="Адрес страницы" hint={`/tours/${slugify(tour.slug || tour.title) || "…"} — латиница, без пробелов`}>
            <TextInput value={tour.slug} onChange={(v) => set("slug", v)} placeholder="из названия" />
          </Field>
          <Field label="Подзаголовок" className="sm:col-span-2">
            <TextInput value={tour.subtitle} onChange={(v) => set("subtitle", v)} />
          </Field>
          <Field label="Описание" className="sm:col-span-2">
            <TextArea value={tour.description} onChange={(v) => set("description", v)} rows={4} />
          </Field>
        </div>
      </Card>

      <Card title="Фото">
        <ImageField value={tour.image} onChange={(v) => set("image", v)} />
      </Card>

      <Card title="Цена и параметры">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Цена, $ за человека">
            <TextInput type="number" min={0} value={tour.price} onChange={(v) => set("price", Number(v))} />
          </Field>
          <Field label="Старая цена, $" hint="Для скидки; пусто — без скидки">
            <TextInput
              type="number"
              min={0}
              value={tour.oldPrice ?? ""}
              onChange={(v) => set("oldPrice", Number(v) || undefined)}
            />
          </Field>
          <Field label="Дней">
            <TextInput type="number" min={1} value={tour.days} onChange={(v) => set("days", Number(v))} />
          </Field>
          <Field label="Длительность (текст)" hint="Например: 7 days / 6 nights">
            <TextInput value={tour.duration} onChange={(v) => set("duration", v)} />
          </Field>
          <Field label="Группа">
            <TextInput value={tour.groupSize} onChange={(v) => set("groupSize", v)} />
          </Field>
          <Field label="Сложность">
            <TextInput value={tour.difficulty} onChange={(v) => set("difficulty", v)} />
          </Field>
          <Field label="Сезон (текст)" hint="Например: April — October">
            <TextInput value={tour.season} onChange={(v) => set("season", v)} />
          </Field>
          <Field label="Рейтинг">
            <TextInput type="number" min={1} max={5} step={0.1} value={tour.rating} onChange={(v) => set("rating", Number(v))} />
          </Field>
          <Field label="Кол-во отзывов">
            <TextInput type="number" min={0} value={tour.reviews} onChange={(v) => set("reviews", Number(v))} />
          </Field>
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" checked={!!tour.featured} onChange={(e) => set("featured", e.target.checked)} />
          Показывать значок «Season Favorite»
        </label>
      </Card>

      <Card title="Где и когда" hint="Отсюда работают фильтры и страницы направлений и стилей.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Страна (подпись на карточке)">
            <TextInput value={tour.country} onChange={(v) => set("country", v)} />
          </Field>
          <Field label="Регион (вкладка в каталоге)">
            <select value={tour.region} onChange={(e) => set("region", e.target.value)} className="w-full rounded-xl border border-[#d4a82a]/40 bg-white px-3 py-2 text-sm">
              {REGIONS.map((region) => (
                <option key={region} value={region}>
                  {REGION_LABEL[region]}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="mt-4 space-y-4">
          <Field label="Страны маршрута">
            <Chips options={label(COUNTRIES)} value={tour.countries ?? []} onChange={(v) => set("countries", v)} />
          </Field>
          <Field label="Сезоны">
            <Chips options={label(SEASONS)} value={tour.seasons ?? []} onChange={(v) => set("seasons", v)} />
          </Field>
          <Field label="Стили путешествия">
            <Chips options={label(STYLES)} value={tour.styles ?? []} onChange={(v) => set("styles", v)} />
          </Field>
        </div>
      </Card>

      <Card title="Программа по дням">
        <ol className="space-y-3">
          {tour.itinerary.map((day, index) => (
            <li key={index} className="rounded-xl border border-[#d4a82a]/25 p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold">День {index + 1}</span>
                <button
                  type="button"
                  className={buttonClass.icon}
                  onClick={() => set("itinerary", tour.itinerary.filter((_, i) => i !== index))}
                  aria-label="Удалить день"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="mt-2 space-y-2">
                <TextInput value={day.title} onChange={(v) => setDay(index, { title: v })} placeholder="Заголовок дня" />
                <TextArea value={day.description} onChange={(v) => setDay(index, { description: v })} rows={2} />
              </div>
            </li>
          ))}
        </ol>
        <button
          type="button"
          className={`${buttonClass.ghost} mt-3`}
          onClick={() =>
            set("itinerary", [...tour.itinerary, { day: tour.itinerary.length + 1, title: "", description: "" }])
          }
        >
          <Plus className="size-4" /> Добавить день
        </button>
      </Card>

      <Card title="Списки" hint="Каждый пункт с новой строки.">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Что увидите">
            <LinesInput value={tour.highlights} onChange={(v) => set("highlights", v)} rows={6} />
          </Field>
          <Field label="Включено">
            <LinesInput value={tour.included} onChange={(v) => set("included", v)} rows={6} />
          </Field>
          <Field label="Не включено">
            <LinesInput value={tour.excluded} onChange={(v) => set("excluded", v)} rows={6} />
          </Field>
        </div>
      </Card>

      <div className="sticky bottom-0 -mx-4 flex flex-wrap items-center gap-3 border-t border-[#d4a82a]/30 bg-[#faf5eb]/95 px-4 py-3 backdrop-blur">
        <button type="submit" className={buttonClass.primary} disabled={busy}>
          {busy ? "Сохраняем…" : isNew ? "Создать тур" : "Сохранить"}
        </button>
        <button type="button" className={buttonClass.ghost} onClick={onCancel}>
          Отмена
        </button>
        {error && <p className="text-sm text-red-700">{error}</p>}
      </div>
    </form>
  );
}

export function Card({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
      <h3 className="font-semibold">{title}</h3>
      {hint && <p className="mt-0.5 text-xs text-[#0f1225]/50">{hint}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}
