"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { COUNTRIES, type CountryId } from "@/lib/catalog";
import type { CountryContent } from "@/lib/country-content";
import { buttonClass, Chips, Field, ImageField, RowsEditor, TextArea, TextInput } from "@/components/admin/fields";
import { Card } from "@/components/admin/tours-panel";

/** Guide content for each destination page; empty sections stay hidden on the site. */
export function CountriesPanel({
  countries,
  onSave,
}: {
  countries: Record<CountryId, CountryContent>;
  onSave: (countries: Record<CountryId, CountryContent>) => Promise<boolean>;
}) {
  const [selected, setSelected] = useState<CountryId>(COUNTRIES[0].id);
  const [drafts, setDrafts] = useState(countries);
  const [busy, setBusy] = useState(false);
  const draft = drafts[selected];
  const dirty = JSON.stringify(drafts[selected]) !== JSON.stringify(countries[selected]);
  const set = <K extends keyof CountryContent>(key: K, value: CountryContent[K]) =>
    setDrafts((all) => ({ ...all, [selected]: { ...all[selected], [key]: value } }));

  async function save() {
    setBusy(true);
    // Only the selected country changes; others keep their saved content.
    await onSave({ ...countries, [selected]: draft });
    setBusy(false);
  }

  const name = COUNTRIES.find((c) => c.id === selected)?.ru ?? selected;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold">Страны</h2>
        <p className="mt-1 text-sm text-[#0f1225]/60">
          Содержимое страниц направлений. Пишите на английском. Пустые разделы на сайте не показываются; туры страны подтягиваются автоматически.
        </p>
      </div>

      <Chips
        options={COUNTRIES.map((c) => ({ id: c.id, label: c.ru }))}
        value={[selected]}
        onChange={(ids) => {
          const next = ids.find((id) => id !== selected);
          if (next) setSelected(next);
        }}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-xl font-semibold">{name}</h3>
        <a href={`/destinations/${selected}`} target="_blank" className={buttonClass.ghost}>
          <ExternalLink className="size-4" /> Открыть страницу
        </a>
      </div>

      <Card title="Overview — обзор" hint="Пустая строка — новый абзац.">
        <TextArea value={draft.overview} onChange={(v) => set("overview", v)} rows={6} />
      </Card>

      <Card title="Фото страницы" hint="Обложка вверху страницы. Пусто — фото первого тура страны.">
        <ImageField value={draft.image} onChange={(v) => set("image", v)} />
      </Card>

      <Card title="Короткие факты" hint="Столица, валюта, язык и т.п. — плашки рядом с обзором.">
        <RowsEditor
          rows={draft.facts}
          onChange={(v) => set("facts", v)}
          blank={() => ({ label: "", value: "" })}
          addLabel="Добавить факт"
          render={(row, update) => (
            <div className="grid gap-2 sm:grid-cols-2">
              <TextInput value={row.label} onChange={(v) => update({ label: v })} placeholder="Например: Capital" />
              <TextInput value={row.value} onChange={(v) => update({ value: v })} placeholder="Например: Dushanbe" />
            </div>
          )}
        />
      </Card>

      <Card title="Highlights — что посмотреть" hint="Места и причины поехать: Памир, Фанские горы, Семь озёр, Душанбе, культура…">
        <RowsEditor<CountryContent["highlights"][number]>
          rows={draft.highlights}
          onChange={(v) => set("highlights", v)}
          blank={() => ({ title: "", text: "" })}
          addLabel="Добавить место"
          render={(row, update) => (
            <div className="space-y-2">
              <TextInput value={row.title} onChange={(v) => update({ title: v })} placeholder="Название" />
              <TextArea value={row.text} onChange={(v) => update({ text: v })} rows={2} />
              <details className="rounded-lg border border-[#d4a82a]/20 px-3 py-2">
                <summary className="cursor-pointer text-sm font-medium">Фото {row.image ? "· добавлено" : "(необязательно)"}</summary>
                <div className="mt-3">
                  <ImageField value={row.image ?? ""} onChange={(v) => update({ image: v })} />
                </div>
              </details>
            </div>
          )}
        />
      </Card>

      <Card title="Best time to visit — когда ехать">
        <RowsEditor
          rows={draft.bestTime}
          onChange={(v) => set("bestTime", v)}
          blank={() => ({ season: "", text: "" })}
          addLabel="Добавить сезон"
          render={(row, update) => (
            <div className="space-y-2">
              <TextInput value={row.season} onChange={(v) => update({ season: v })} placeholder="Например: June – September" />
              <TextArea value={row.text} onChange={(v) => update({ text: v })} rows={2} />
            </div>
          )}
        />
      </Card>

      <Card title="Travel information — полезная информация" hint="Визы, разрешения, транспорт, деньги, связь.">
        <RowsEditor
          rows={draft.travelInfo}
          onChange={(v) => set("travelInfo", v)}
          blank={() => ({ title: "", text: "" })}
          addLabel="Добавить пункт"
          render={(row, update) => (
            <div className="space-y-2">
              <TextInput value={row.title} onChange={(v) => update({ title: v })} placeholder="Например: Visa" />
              <TextArea value={row.text} onChange={(v) => update({ text: v })} rows={3} />
            </div>
          )}
        />
      </Card>

      <Card title="SEO — как страница выглядит в Google" hint="Необязательно. Если пусто, собирается автоматически.">
        <div className="space-y-4">
          <Field label={`SEO-заголовок · ${(draft.seoTitle ?? "").length}/60`}>
            <TextInput value={draft.seoTitle ?? ""} onChange={(v) => set("seoTitle", v)} maxLength={70} />
          </Field>
          <Field label={`SEO-описание · ${(draft.seoDescription ?? "").length}/160`}>
            <TextArea value={draft.seoDescription ?? ""} onChange={(v) => set("seoDescription", v)} rows={2} />
          </Field>
        </div>
      </Card>

      <Card title="FAQ страны">
        <RowsEditor
          rows={draft.faq}
          onChange={(v) => set("faq", v)}
          blank={() => ({ q: "", a: "" })}
          addLabel="Добавить вопрос"
          render={(row, update) => (
            <div className="space-y-2">
              <Field label="Вопрос">
                <TextInput value={row.q} onChange={(v) => update({ q: v })} />
              </Field>
              <Field label="Ответ">
                <TextArea value={row.a} onChange={(v) => update({ a: v })} rows={3} />
              </Field>
            </div>
          )}
        />
      </Card>

      <div className="sticky bottom-0 -mx-4 flex flex-wrap items-center gap-3 border-t border-[#d4a82a]/30 bg-[#faf5eb]/95 px-4 py-3 backdrop-blur">
        <button type="button" className={buttonClass.primary} disabled={busy || !dirty} onClick={save}>
          {busy ? "Сохраняем…" : `Сохранить: ${name}`}
        </button>
        {dirty && (
          <button
            type="button"
            className={buttonClass.ghost}
            onClick={() => setDrafts((all) => ({ ...all, [selected]: countries[selected] }))}
          >
            Отменить изменения
          </button>
        )}
      </div>
    </section>
  );
}
