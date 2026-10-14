"use client";

import { useState } from "react";
import { SETTINGS_FIELDS, type SiteSettings } from "@/lib/site-content";
import { buttonClass, Field, TextInput } from "@/components/admin/fields";

export function SettingsPanel({
  settings,
  onSave,
}: {
  settings: SiteSettings;
  onSave: (settings: SiteSettings) => Promise<boolean>;
}) {
  const [draft, setDraft] = useState(settings);
  const [busy, setBusy] = useState(false);
  const dirty = JSON.stringify(draft) !== JSON.stringify(settings);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    await onSave(draft);
    setBusy(false);
  }

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold">Контакты и соцсети</h2>
      <p className="mt-1 text-sm text-[#0f1225]/60">
        Показываются в футере и на странице контактов. Пустые соцсети на сайте скрываются.
      </p>
      <form onSubmit={submit} className="mt-4 rounded-2xl bg-white p-4 shadow-sm sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          {SETTINGS_FIELDS.map((field) => (
            <Field key={field.key} label={field.label} hint={field.hint}>
              <TextInput
                value={draft[field.key]}
                onChange={(value) => setDraft((current) => ({ ...current, [field.key]: value }))}
              />
            </Field>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-3">
          <button type="submit" className={buttonClass.primary} disabled={busy || !dirty}>
            {busy ? "Сохраняем…" : "Сохранить"}
          </button>
          {dirty && (
            <button type="button" className={buttonClass.ghost} onClick={() => setDraft(settings)}>
              Отменить изменения
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
