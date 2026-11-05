"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import type { TeamMember } from "@/lib/site-content";
import { buttonClass, Field, ImageField, TextArea, TextInput } from "@/components/admin/fields";

const ROLES = [
  { en: "Owner", ru: "Владелец" },
  { en: "Co-owner", ru: "Совладелец" },
  { en: "General Director", ru: "Генеральный директор" },
  { en: "Assistant", ru: "Помощник" },
  { en: "Manager", ru: "Менеджер" },
  { en: "Guide", ru: "Гид" },
];

function blank(): TeamMember {
  return { id: "", name: "", role: { en: "", ru: "" }, bio: { en: "", ru: "" }, photo: "" };
}

export function TeamPanel({
  team,
  onSave,
}: {
  team: TeamMember[];
  onSave: (items: TeamMember[]) => Promise<boolean>;
}) {
  const [editing, setEditing] = useState<{ index: number | null; item: TeamMember } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function commit(next: TeamMember[]) {
    setBusy(true);
    const ok = await onSave(next);
    setBusy(false);
    return ok;
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!editing) return;
    const item = editing.item;
    if (!item.name.trim()) return setError("Укажите имя.");
    setError("");
    const saved = { ...item, id: item.id || crypto.randomUUID() };
    const next =
      editing.index === null ? [...team, saved] : team.map((member, i) => (i === editing.index ? saved : member));
    if (await commit(next)) setEditing(null);
  }

  function move(index: number, by: number) {
    const next = [...team];
    const [member] = next.splice(index, 1);
    next.splice(index + by, 0, member);
    void commit(next);
  }

  const set = (patch: Partial<TeamMember>) =>
    setEditing((current) => (current ? { ...current, item: { ...current.item, ...patch } } : current));

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-semibold">Команда · {team.length}</h2>
        {!editing && (
          <button type="button" className={buttonClass.primary} onClick={() => setEditing({ index: null, item: blank() })}>
            <Plus className="size-4" /> Добавить человека
          </button>
        )}
      </div>
      <p className="mt-1 text-sm text-[#0f1225]/60">
        Показываются на странице «О нас» в этом порядке. Пока никого нет, раздела на сайте не видно.
      </p>

      {editing && (
        <form onSubmit={submit} className="mt-4 space-y-4 rounded-2xl bg-white p-4 shadow-sm sm:p-5">
          <Field label="Имя">
            <TextInput value={editing.item.name} onChange={(name) => set({ name })} />
          </Field>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-[#0f1225]/70">Быстрый выбор должности</span>
            <div className="mt-1 flex flex-wrap gap-2">
              {ROLES.map((role) => (
                <button key={role.en} type="button" className={buttonClass.ghost} onClick={() => set({ role })}>
                  {role.ru}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Должность (RU)">
              <TextInput value={editing.item.role.ru} onChange={(ru) => set({ role: { ...editing.item.role, ru } })} />
            </Field>
            <Field label="Должность (EN)">
              <TextInput value={editing.item.role.en} onChange={(en) => set({ role: { ...editing.item.role, en } })} />
            </Field>
            <Field label="О человеке (RU)" hint="Необязательно">
              <TextArea value={editing.item.bio.ru} onChange={(ru) => set({ bio: { ...editing.item.bio, ru } })} rows={3} />
            </Field>
            <Field label="О человеке (EN)" hint="Необязательно">
              <TextArea value={editing.item.bio.en} onChange={(en) => set({ bio: { ...editing.item.bio, en } })} rows={3} />
            </Field>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-[#0f1225]/70">Фото</span>
            <div className="mt-1">
              <ImageField value={editing.item.photo} onChange={(photo) => set({ photo })} />
            </div>
          </div>
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
        {team.map((member, index) => (
          <article key={member.id} className="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
            {member.photo ? (
              <img src={member.photo} alt="" className="size-14 shrink-0 rounded-xl object-cover" />
            ) : (
              <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#faf5eb] text-[#0f1225]/40">
                {member.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-[#0f1225]/60">{member.role.ru}</p>
            </div>
            <div className="flex gap-1.5">
              <button type="button" aria-label="Выше" className={buttonClass.ghost} disabled={busy || index === 0} onClick={() => move(index, -1)}>
                <ArrowUp className="size-4" />
              </button>
              <button type="button" aria-label="Ниже" className={buttonClass.ghost} disabled={busy || index === team.length - 1} onClick={() => move(index, 1)}>
                <ArrowDown className="size-4" />
              </button>
              <button type="button" className={buttonClass.ghost} onClick={() => setEditing({ index, item: member })}>
                <Pencil className="size-4" /> Изменить
              </button>
              <button
                type="button"
                aria-label={`Удалить ${member.name}`}
                className={buttonClass.danger}
                disabled={busy}
                onClick={() => {
                  if (window.confirm(`Удалить ${member.name}?`)) void commit(team.filter((_, i) => i !== index));
                }}
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
