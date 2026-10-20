"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { STYLES } from "@/lib/catalog";
import type { Text } from "@/lib/locale";
import { SEO_PAGES, type PagesContent } from "@/lib/pages-content";
import { buttonClass, Field, inputClass, TextArea, TextInput } from "@/components/admin/fields";
import { Card } from "@/components/admin/tours-panel";

type Section = "home" | "about" | "services" | "styles" | "seo";

const SECTIONS: { id: Section; label: string; link?: string }[] = [
  { id: "home", label: "Главная", link: "/" },
  { id: "about", label: "О нас", link: "/about" },
  { id: "services", label: "Услуги", link: "/services" },
  { id: "styles", label: "Стили путешествий", link: "/travel-styles" },
  { id: "seo", label: "SEO страниц" },
];

/** Texts of the fixed pages (home, about, services, travel styles) and their SEO. */
export function PagesPanel({ pages, onSave }: { pages: PagesContent; onSave: (pages: PagesContent) => Promise<boolean> }) {
  const [section, setSection] = useState<Section>("home");
  const [draft, setDraft] = useState(pages);
  const [busy, setBusy] = useState(false);
  const dirty = JSON.stringify(draft) !== JSON.stringify(pages);

  async function save() {
    setBusy(true);
    await onSave(draft);
    setBusy(false);
  }

  const current = SECTIONS.find((s) => s.id === section)!;

  return (
    <section className="space-y-5">
      <div>
        <h2 className="font-display text-2xl font-semibold">Страницы</h2>
        <p className="mt-1 text-sm text-[#0f1225]/60">
          Тексты постоянных страниц на английском и русском. Если поле оставить пустым, вернётся стандартный текст.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSection(s.id)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
              section === s.id ? "border-[#d4a82a] bg-[#d4a82a] text-[#0f1225]" : "border-[#0f1225]/15 bg-white"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {current.link && (
        <a href={current.link} target="_blank" className={buttonClass.ghost}>
          <ExternalLink className="size-4" /> Открыть страницу
        </a>
      )}

      {section === "home" && (
        <Card title="Главный экран">
          <div className="space-y-4">
            <Pair label="Плашка над заголовком" value={draft.home.badge} onChange={(v) => setDraft({ ...draft, home: { ...draft.home, badge: v } })} />
            <Pair label="Заголовок — начало" value={draft.home.titleStart} onChange={(v) => setDraft({ ...draft, home: { ...draft.home, titleStart: v } })} />
            <Pair label="Заголовок — выделенная часть (золотом)" value={draft.home.titleAccent} onChange={(v) => setDraft({ ...draft, home: { ...draft.home, titleAccent: v } })} />
            <Pair label="Текст под заголовком" value={draft.home.text} onChange={(v) => setDraft({ ...draft, home: { ...draft.home, text: v } })} multiline />
          </div>
        </Card>
      )}

      {section === "about" && (
        <Card title="Блок «О нас»" hint="Показывается на главной и на странице About.">
          <div className="space-y-4">
            <Pair label="Заголовок — начало" value={draft.about.titleStart} onChange={(v) => setDraft({ ...draft, about: { ...draft.about, titleStart: v } })} />
            <Pair label="Заголовок — выделенная часть" value={draft.about.titleAccent} onChange={(v) => setDraft({ ...draft, about: { ...draft.about, titleAccent: v } })} />
            <Pair label="Первый абзац" value={draft.about.p1} onChange={(v) => setDraft({ ...draft, about: { ...draft.about, p1: v } })} multiline />
            <Pair label="Второй абзац" value={draft.about.p2} onChange={(v) => setDraft({ ...draft, about: { ...draft.about, p2: v } })} multiline />
          </div>
        </Card>
      )}

      {section === "services" &&
        draft.services.map((service, index) => {
          const update = (patch: Partial<typeof service>) =>
            setDraft({ ...draft, services: draft.services.map((s, i) => (i === index ? { ...s, ...patch } : s)) });
          return (
            <Card key={service.id} title={`Услуга ${index + 1}: ${service.title.ru || service.title.en}`} hint={`Раздел /services#${service.id} и пункт меню «Services».`}>
              <div className="space-y-4">
                <Pair label="Название" value={service.title} onChange={(v) => update({ title: v })} />
                <Pair label="Описание" value={service.lead} onChange={(v) => update({ lead: v })} multiline />
                <PointsPair points={service.points} onChange={(points) => update({ points })} />
              </div>
            </Card>
          );
        })}

      {section === "styles" &&
        STYLES.map((style) => {
          const value = draft.styles[style.id];
          const update = (patch: Partial<typeof value>) =>
            setDraft({ ...draft, styles: { ...draft.styles, [style.id]: { ...value, ...patch } } });
          return (
            <Card key={style.id} title={style.ru} hint={`Страница /travel-styles/${style.id}`}>
              <div className="space-y-4">
                <Pair label="Подзаголовок" value={value.tagline} onChange={(v) => update({ tagline: v })} />
                <Pair label="Описание" value={value.text} onChange={(v) => update({ text: v })} multiline />
              </div>
            </Card>
          );
        })}

      {section === "seo" && (
        <Card title="Как страницы выглядят в Google" hint="Необязательно. Пусто — используется стандартный заголовок и описание.">
          <div className="space-y-5">
            {SEO_PAGES.map((page) => {
              const value = draft.seo[page.key];
              const update = (patch: Partial<typeof value>) =>
                setDraft({ ...draft, seo: { ...draft.seo, [page.key]: { ...value, ...patch } } });
              return (
                <div key={page.key} className="rounded-xl border border-[#d4a82a]/25 p-3">
                  <p className="text-sm font-semibold">
                    {page.label} <span className="font-normal text-[#0f1225]/50">{page.path}</span>
                  </p>
                  <div className="mt-2 grid gap-2 lg:grid-cols-2">
                    <Field label={`Заголовок · ${value.title.length}/60`}>
                      <TextInput value={value.title} onChange={(v) => update({ title: v })} maxLength={70} />
                    </Field>
                    <Field label={`Описание · ${value.description.length}/160`}>
                      <TextArea value={value.description} onChange={(v) => update({ description: v })} rows={2} />
                    </Field>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      <div className="sticky bottom-0 -mx-4 flex flex-wrap items-center gap-3 border-t border-[#d4a82a]/30 bg-[#faf5eb]/95 px-4 py-3 backdrop-blur">
        <button type="button" className={buttonClass.primary} disabled={busy || !dirty} onClick={save}>
          {busy ? "Сохраняем…" : "Сохранить"}
        </button>
        {dirty && (
          <button type="button" className={buttonClass.ghost} onClick={() => setDraft(pages)}>
            Отменить изменения
          </button>
        )}
      </div>
    </section>
  );
}

function Pair({ label, value, onChange, multiline = false }: { label: string; value: Text; onChange: (v: Text) => void; multiline?: boolean }) {
  const input = (lang: "en" | "ru") =>
    multiline ? (
      <TextArea value={value[lang]} onChange={(v) => onChange({ ...value, [lang]: v })} rows={3} />
    ) : (
      <TextInput value={value[lang]} onChange={(v) => onChange({ ...value, [lang]: v })} />
    );
  return (
    <div className="grid gap-2 lg:grid-cols-2">
      <Field label={`${label} · EN`}>{input("en")}</Field>
      <Field label={`${label} · RU`}>{input("ru")}</Field>
    </div>
  );
}

/** Bullet points as two aligned line lists: English left, Russian right. */
function PointsPair({ points, onChange }: { points: Text[]; onChange: (points: Text[]) => void }) {
  const [en, setEn] = useState(points.map((p) => p.en).join("\n"));
  const [ru, setRu] = useState(points.map((p) => p.ru).join("\n"));
  const combine = (enText: string, ruText: string) => {
    const ruLines = ruText.split("\n");
    onChange(
      enText
        .split("\n")
        .map((line, i) => ({ en: line.trim(), ru: (ruLines[i] ?? "").trim() }))
        .filter((p) => p.en),
    );
  };
  return (
    <div className="grid gap-2 lg:grid-cols-2">
      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-wide text-[#0f1225]/70">Что входит · EN (по строке)</span>
        <textarea
          className={`${inputClass} mt-1 resize-y`}
          rows={5}
          value={en}
          onChange={(e) => {
            setEn(e.target.value);
            combine(e.target.value, ru);
          }}
        />
      </label>
      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-wide text-[#0f1225]/70">Что входит · RU (в том же порядке)</span>
        <textarea
          className={`${inputClass} mt-1 resize-y`}
          rows={5}
          value={ru}
          onChange={(e) => {
            setRu(e.target.value);
            combine(en, e.target.value);
          }}
        />
      </label>
    </div>
  );
}
