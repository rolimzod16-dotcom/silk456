"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, ExternalLink, Home, Pencil, Plus, Star, Trash2, X } from "lucide-react";
import { COUNTRIES, REGIONS, SEASONS, STYLES, tourMeta } from "@/lib/catalog";
import type { Departure, Tour } from "@/lib/tours";
import {
  buttonClass,
  Chips,
  Field,
  GalleryField,
  ImageField,
  inputClass,
  RowsEditor,
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
    rating: 0,
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
    gallery: [],
    departures: [],
    faq: [],
    // New tours start as drafts until the content is ready.
    published: false,
  };
}

const STATUS_LABEL: Record<Departure["status"], string> = {
  guaranteed: "Гарантирован",
  open: "Идёт набор",
  closed: "Набор закрыт",
};

const optionalCount = (v: string) => (v === "" ? undefined : Math.max(0, Math.round(Number(v)) || 0));

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

  function toggleHome(index: number) {
    void commit(tours.map((tour, i) => (i === index ? { ...tour, showOnHome: !tour.showOnHome } : tour)));
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
      <p className="mt-1 text-sm text-[#0f1225]/60">
        Порядок здесь — это порядок туров на сайте. Кнопка с домиком добавляет тур в блок «Избранные туры» на главной
        (сейчас: {tours.filter((t) => t.showOnHome).length}, рекомендуем 6).
      </p>

      <div className="mt-4 space-y-3">
        {tours.map((tour, index) => (
          <article key={tour.slug} className="flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-sm sm:flex-row sm:items-center">
            <img src={tour.image} alt="" className="aspect-[16/10] w-full rounded-xl object-cover sm:w-36" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold">{tour.title}</h3>
                {tour.showOnHome && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
                    <Home className="size-3" /> На главной
                  </span>
                )}
                {tour.published === false && (
                  <span className="rounded-full bg-[#0f1225]/10 px-2 py-0.5 text-xs font-semibold text-[#0f1225]/70">
                    Черновик — не виден на сайте
                  </span>
                )}
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
              <button
                type="button"
                className={`${buttonClass.icon} ${tour.showOnHome ? "border-emerald-600 bg-emerald-50 text-emerald-700" : ""}`}
                disabled={busy}
                onClick={() => toggleHome(index)}
                aria-label={tour.showOnHome ? "Убрать с главной" : "Показать на главной"}
                title={tour.showOnHome ? "Убрать с главной" : "Показать на главной"}
              >
                <Home className="size-4" />
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
    // A draft can be saved half-finished; publishing needs everything visitors rely on.
    const publishing = tour.published !== false;
    if (publishing && !tour.price) return setError("Укажите цену.");
    // Filters, destination and style pages are built from these tags.
    if (publishing && !tour.countries?.length) return setError("Отметьте хотя бы одну страну — иначе тур не попадёт в фильтр «Куда» и на страницы направлений.");
    if (publishing && !tour.seasons?.length) return setError("Отметьте хотя бы один сезон — иначе тур не найдётся по фильтру «Сезон».");
    if (publishing && !tour.styles?.length) return setError("Отметьте хотя бы один стиль путешествия.");
    if (publishing && (!tour.days || tour.days < 1)) return setError("Укажите количество дней — по нему работает фильтр «Сколько дней».");
    setError("");
    // Remember the old address so existing links and Google results keep working.
    const aliases = [...(tour.aliases ?? [])];
    if (!isNew && initial.slug && initial.slug !== slug && !aliases.includes(initial.slug)) aliases.push(initial.slug);
    onSubmit({
      ...tour,
      aliases: aliases.filter((alias) => alias !== slug),
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

      <Card title="Публикация">
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            className="mt-1 size-4"
            checked={tour.published !== false}
            onChange={(e) => set("published", e.target.checked)}
          />
          <span>
            <span className="font-semibold">Опубликован на сайте</span>
            <span className="block text-[#0f1225]/60">
              Снимите галочку, чтобы сохранить тур как черновик: посетители его не увидят, пока программа, фото и цены не готовы.
            </span>
          </span>
        </label>
        <label className="mt-4 flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            className="mt-1 size-4"
            checked={!!tour.showOnHome}
            onChange={(e) => set("showOnHome", e.target.checked)}
          />
          <span>
            <span className="font-semibold">Показывать на главной</span>
            <span className="block text-[#0f1225]/60">
              Тур попадёт в блок «Избранные туры». Порядок — как в списке туров. В каталоге, странах и фильтрах тур есть в любом случае.
            </span>
          </span>
        </label>
      </Card>

      <Card title="Основное">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Название">
            <TextInput value={tour.title} onChange={(v) => set("title", v)} required />
          </Field>
          <Field
            label="Адрес страницы"
            hint={`/tours/${slugify(tour.slug || tour.title) || "…"} — латиница, без пробелов. Если поменять, старый адрес будет перенаправлять на новый.`}
          >
            <TextInput value={tour.slug} onChange={(v) => set("slug", v)} placeholder="из названия" />
          </Field>
          <Field label="Подзаголовок" className="sm:col-span-2">
            <TextInput value={tour.subtitle} onChange={(v) => set("subtitle", v)} />
          </Field>
          <Field label="Описание" className="sm:col-span-2" hint="Раздел Overview на странице тура. Пустая строка — новый абзац.">
            <TextArea value={tour.description} onChange={(v) => set("description", v)} rows={4} />
          </Field>
        </div>
      </Card>

      <Card title="Главное фото" hint="Обложка карточки и страницы тура. Лучше горизонтальное, без надписей.">
        <ImageField value={tour.image} onChange={(v) => set("image", v)} />
      </Card>

      <Card title="Галерея" hint="Раздел Gallery на странице тура. Появляется, когда добавлено хотя бы одно фото.">
        <GalleryField value={tour.gallery ?? []} onChange={(v) => set("gallery", v)} />
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
          <Field label="Группа" hint="Например: up to 15 travelers">
            <TextInput value={tour.groupSize} onChange={(v) => set("groupSize", v)} />
          </Field>
          <Field label="Гарантия от, чел." hint="«Guaranteed from 4 guests» над датами">
            <TextInput type="number" min={0} value={tour.guaranteedFrom ?? ""} onChange={(v) => set("guaranteedFrom", optionalCount(v))} />
          </Field>
          <Field label="Сложность">
            <TextInput value={tour.difficulty} onChange={(v) => set("difficulty", v)} />
          </Field>
          <Field label="Сезон (текст)" hint="Например: April — October">
            <TextInput value={tour.season} onChange={(v) => set("season", v)} />
          </Field>
          <Field label="Рейтинг" hint="Только настоящий, например с TripAdvisor">
            <TextInput type="number" min={0} max={5} step={0.1} value={tour.rating} onChange={(v) => set("rating", Number(v))} />
          </Field>
          <Field label="Кол-во отзывов" hint="0 — рейтинг на сайте не показывается">
            <TextInput type="number" min={0} value={tour.reviews} onChange={(v) => set("reviews", Number(v))} />
          </Field>
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" checked={!!tour.featured} onChange={(e) => set("featured", e.target.checked)} />
          Показывать значок «Season Favorite»
        </label>
      </Card>

      <Card title="Где и когда (фильтры)" hint="Обязательно: по этим отметкам тур появляется в фильтрах поиска, на страницах стран и стилей. Длительность для фильтра берётся из поля «Дней».">
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
          <Field label="Страны маршрута *">
            <Chips options={label(COUNTRIES)} value={tour.countries ?? []} onChange={(v) => set("countries", v)} />
          </Field>
          <Field label="Сезоны *">
            <Chips options={label(SEASONS)} value={tour.seasons ?? []} onChange={(v) => set("seasons", v)} />
          </Field>
          <Field label="Стили путешествия *">
            <Chips options={label(STYLES)} value={tour.styles ?? []} onChange={(v) => set("styles", v)} />
          </Field>
        </div>
      </Card>

      <Card title="Программа по дням" hint="Номер дня ставится автоматически — в заголовке писать «Day 1» не нужно.">
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
                <TextInput value={day.title} onChange={(v) => setDay(index, { title: v })} placeholder="Заголовок дня, например: Dushanbe Arrival" />
                <TextArea value={day.description} onChange={(v) => setDay(index, { description: v })} rows={4} />
                <TextInput
                  value={day.overnight ?? ""}
                  onChange={(v) => setDay(index, { overnight: v })}
                  placeholder="Ночёвка (необязательно), например: Guesthouse in Khorog"
                />
                <details className="rounded-lg border border-[#d4a82a]/20 px-3 py-2">
                  <summary className="cursor-pointer text-sm font-medium">
                    Фото дня {day.image ? "· добавлено" : "(необязательно)"}
                  </summary>
                  <div className="mt-3">
                    <ImageField value={day.image ?? ""} onChange={(v) => setDay(index, { image: v })} />
                  </div>
                </details>
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

      <Card
        title="Карта маршрута"
        hint="Раздел Map. Можно загрузить схему маршрута картинкой и/или вставить карту Google. Пусто — раздела не будет."
      >
        {/* Not a <label>: the image field has its own buttons. */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-[#0f1225]/70">Схема маршрута (картинка)</span>
          <div className="mt-1">
            <ImageField value={tour.mapImage ?? ""} onChange={(v) => set("mapImage", v)} />
          </div>
        </div>
        <Field
          label="Карта Google (необязательно)"
          hint="Google Maps → «Поделиться» → «Встраивание карт» → «Копировать HTML» и вставить сюда целиком. Подходят и карты из Google My Maps."
          className="mt-4"
        >
          <TextInput value={tour.mapEmbed ?? ""} onChange={(v) => set("mapEmbed", v)} placeholder='<iframe src="https://www.google.com/maps/embed?..."' />
        </Field>
      </Card>

      <Card title="SEO — как тур выглядит в Google" hint="Необязательно. Если пусто, заголовок и описание собираются автоматически из названия и подзаголовка.">
        <div className="space-y-4">
          <Field label={`SEO-заголовок · ${(tour.seoTitle ?? "").length}/60`} hint="До 60 символов, например: Pamir Highway Tour — 12 Days Across Tajikistan">
            <TextInput value={tour.seoTitle ?? ""} onChange={(v) => set("seoTitle", v)} maxLength={70} />
          </Field>
          <Field label={`SEO-описание · ${(tour.seoDescription ?? "").length}/160`} hint="До 160 символов: о чём тур и почему стоит выбрать его.">
            <TextArea value={tour.seoDescription ?? ""} onChange={(v) => set("seoDescription", v)} rows={2} />
          </Field>
        </div>
      </Card>

      <Card
        title="Даты и цены"
        hint="Раздел Dates & Prices. Если дат нет, на сайте будет «выезд в ваши даты» с кнопкой запроса. Прошедшие даты скрываются сами."
      >
        <RowsEditor<Departure>
          rows={tour.departures ?? []}
          onChange={(v) => set("departures", v)}
          blank={() => ({ start: "", status: "open" })}
          addLabel="Добавить дату выезда"
          render={(row, update) => (
            <div className="grid gap-3 sm:grid-cols-4">
              <Field label="Начало">
                <input type="date" className={inputClass} value={row.start} onChange={(e) => update({ start: e.target.value })} />
              </Field>
              <Field label="Конец">
                <input
                  type="date"
                  className={inputClass}
                  value={row.end ?? ""}
                  onChange={(e) => update({ end: e.target.value || undefined })}
                />
              </Field>
              <Field label="Цена, $" hint="Пусто — базовая цена">
                <TextInput type="number" min={0} value={row.price ?? ""} onChange={(v) => update({ price: Number(v) || undefined })} />
              </Field>
              <Field label="Статус">
                <select
                  className={inputClass}
                  value={row.status}
                  onChange={(e) => update({ status: e.target.value as Departure["status"] })}
                >
                  {Object.entries(STATUS_LABEL).map(([value, text]) => (
                    <option key={value} value={value}>
                      {text}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Осталось мест" hint="0 — набор закрыт. Пусто — не показывать">
                <TextInput type="number" min={0} value={row.spotsLeft ?? ""} onChange={(v) => update({ spotsLeft: optionalCount(v) })} />
              </Field>
              <Field label="До гарантии ещё, чел." hint="Для «Идёт набор»: «2 more to guarantee»">
                <TextInput type="number" min={0} value={row.toGuarantee ?? ""} onChange={(v) => update({ toGuarantee: optionalCount(v) })} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Примечание" hint="Мелкий текст под датами, необязательно">
                  <TextInput value={row.note ?? ""} onChange={(v) => update({ note: v })} placeholder="напр. Start in Dushanbe" />
                </Field>
              </div>
            </div>
          )}
        />
      </Card>

      <Card title="Вопросы по туру (FAQ)" hint="Раздел FAQ на странице тура. Пишите на английском — для иностранных клиентов.">
        <RowsEditor<{ q: string; a: string }>
          rows={tour.faq ?? []}
          onChange={(v) => set("faq", v)}
          blank={() => ({ q: "", a: "" })}
          addLabel="Добавить вопрос"
          render={(row, update) => (
            <div className="space-y-2">
              <TextInput value={row.q} onChange={(v) => update({ q: v })} placeholder="Вопрос" />
              <TextArea value={row.a} onChange={(v) => update({ a: v })} rows={3} />
            </div>
          )}
        />
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
