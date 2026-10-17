"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/site-content";
import { buttonClass, Field, RowsEditor, TextArea, TextInput } from "@/components/admin/fields";

/** Questions on the /faq page, in English and Russian. */
export function FaqPanel({ items, onSave }: { items: FaqItem[]; onSave: (items: FaqItem[]) => Promise<boolean> }) {
  const [draft, setDraft] = useState(items);
  const [busy, setBusy] = useState(false);
  const dirty = JSON.stringify(draft) !== JSON.stringify(items);

  async function save() {
    setBusy(true);
    await onSave(draft);
    setBusy(false);
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-display text-2xl font-semibold">Вопросы и ответы · {items.length}</h2>
        <p className="mt-1 text-sm text-[#0f1225]/60">
          Страница /faq. Английский обязателен, русский — для русской версии сайта (если пусто, покажется английский).
        </p>
      </div>
      <RowsEditor<FaqItem>
        rows={draft}
        onChange={setDraft}
        blank={() => ({ q: { en: "", ru: "" }, a: { en: "", ru: "" } })}
        addLabel="Добавить вопрос"
        render={(row, update) => (
          <div className="grid gap-3 lg:grid-cols-2">
            <div className="space-y-2">
              <Field label="Вопрос (EN)">
                <TextInput value={row.q.en} onChange={(v) => update({ q: { ...row.q, en: v } })} />
              </Field>
              <Field label="Ответ (EN)">
                <TextArea value={row.a.en} onChange={(v) => update({ a: { ...row.a, en: v } })} rows={4} />
              </Field>
            </div>
            <div className="space-y-2">
              <Field label="Вопрос (RU)">
                <TextInput value={row.q.ru} onChange={(v) => update({ q: { ...row.q, ru: v } })} />
              </Field>
              <Field label="Ответ (RU)">
                <TextArea value={row.a.ru} onChange={(v) => update({ a: { ...row.a, ru: v } })} rows={4} />
              </Field>
            </div>
          </div>
        )}
      />
      <div className="sticky bottom-0 -mx-4 flex flex-wrap items-center gap-3 border-t border-[#d4a82a]/30 bg-[#faf5eb]/95 px-4 py-3 backdrop-blur">
        <button type="button" className={buttonClass.primary} disabled={busy || !dirty} onClick={save}>
          {busy ? "Сохраняем…" : "Сохранить"}
        </button>
        {dirty && (
          <button type="button" className={buttonClass.ghost} onClick={() => setDraft(items)}>
            Отменить изменения
          </button>
        )}
      </div>
    </section>
  );
}
