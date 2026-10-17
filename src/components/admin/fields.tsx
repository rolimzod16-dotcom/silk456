"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const inputClass =
  "w-full rounded-xl border border-[#d4a82a]/40 bg-white px-3 py-2 text-sm outline-none focus:border-[#d4a82a] focus:ring-2 focus:ring-[#d4a82a]/20";

export const buttonClass = {
  primary:
    "inline-flex items-center justify-center gap-1.5 rounded-full bg-[#d4a82a] px-4 py-2 text-sm font-semibold text-[#0f1225] hover:bg-[#c99d20] disabled:opacity-50",
  ghost:
    "inline-flex items-center justify-center gap-1.5 rounded-full border border-[#0f1225]/20 px-4 py-2 text-sm font-semibold hover:bg-[#0f1225]/5 disabled:opacity-50",
  danger:
    "inline-flex items-center justify-center gap-1.5 rounded-full border border-red-700/30 px-3 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50",
  icon: "inline-flex size-8 items-center justify-center rounded-full border border-[#0f1225]/15 hover:bg-[#0f1225]/5 disabled:opacity-30",
};

export function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="text-xs font-semibold uppercase tracking-wide text-[#0f1225]/70">{label}</span>
      <div className="mt-1">{children}</div>
      {hint && <span className="mt-1 block text-xs text-[#0f1225]/50">{hint}</span>}
    </label>
  );
}

export function TextInput({
  value,
  onChange,
  ...rest
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
  value: string | number | undefined;
  onChange: (value: string) => void;
}) {
  return (
    <input
      {...rest}
      value={value ?? ""}
      onChange={(event) => onChange(event.target.value)}
      className={cn(inputClass, rest.className)}
    />
  );
}

export function TextArea({
  value,
  onChange,
  rows = 3,
}: {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      rows={rows}
      onChange={(event) => onChange(event.target.value)}
      className={cn(inputClass, "resize-y")}
    />
  );
}

/** Edits a string[] as one item per line. */
export function LinesInput({
  value,
  onChange,
  rows = 4,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  rows?: number;
}) {
  const [text, setText] = useState(value.join("\n"));
  return (
    <textarea
      value={text}
      rows={rows}
      onChange={(event) => {
        setText(event.target.value);
        onChange(
          event.target.value
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean),
        );
      }}
      className={cn(inputClass, "resize-y")}
    />
  );
}

export function Chips<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly { id: T; label: string }[];
  value: T[];
  onChange: (value: T[]) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((option) => {
        const active = value.includes(option.id);
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            onClick={() =>
              onChange(active ? value.filter((id) => id !== option.id) : [...value, option.id])
            }
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition",
              active
                ? "border-[#d4a82a] bg-[#d4a82a] text-[#0f1225]"
                : "border-[#0f1225]/15 bg-white text-[#0f1225]/70 hover:border-[#d4a82a]",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

/** Downscales a photo in the browser so uploads stay small and fast. */
async function shrink(file: File, maxSide = 2000): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("encode"))), "image/jpeg", 0.85),
  );
}

/** Shrinks a photo in the browser and uploads it; returns the public URL. */
export async function uploadPhoto(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", new File([await shrink(file)], "photo.jpg", { type: "image/jpeg" }));
  const response = await fetch("/api/admin/upload", { method: "POST", body });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Не удалось загрузить.");
  return data.url;
}

export function ImageField({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setBusy(true);
    setError("");
    try {
      onChange(await uploadPhoto(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось загрузить.");
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl border border-[#d4a82a]/30 bg-[#faf5eb] sm:w-56">
        {value ? (
          <img src={value} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-[#0f1225]/40">Нет фото</div>
        )}
      </div>
      <div className="flex-1 space-y-2">
        <input
          ref={input}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void upload(file);
          }}
        />
        <button type="button" className={buttonClass.ghost} disabled={busy} onClick={() => input.current?.click()}>
          {busy ? <Loader2 className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}
          {busy ? "Загружаем…" : "Загрузить фото"}
        </button>
        <TextInput value={value} onChange={onChange} placeholder="или вставьте ссылку на фото" />
        {error && <p className="text-sm text-red-700">{error}</p>}
      </div>
    </div>
  );
}

/** Several photos: upload many at once, remove or reorder them. */
export function GalleryField({ value, onChange }: { value: string[]; onChange: (urls: string[]) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(0);
  const [error, setError] = useState("");

  async function upload(files: File[]) {
    setError("");
    setBusy(files.length);
    const added: string[] = [];
    for (const file of files) {
      try {
        added.push(await uploadPhoto(file));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Не удалось загрузить.");
      }
      setBusy((n) => n - 1);
    }
    onChange([...value, ...added]);
    if (input.current) input.current.value = "";
  }

  const move = (index: number, delta: number) => {
    const next = [...value];
    const [item] = next.splice(index, 1);
    next.splice(index + delta, 0, item);
    onChange(next);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {value.map((url, index) => (
          <div key={`${url}-${index}`} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-[#d4a82a]/30">
            <img src={url} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-x-1 bottom-1 flex justify-between gap-1">
              <button type="button" className={`${buttonClass.icon} bg-white`} disabled={index === 0} onClick={() => move(index, -1)} aria-label="Левее">
                ←
              </button>
              <button type="button" className={`${buttonClass.icon} bg-white text-red-700`} onClick={() => onChange(value.filter((_, i) => i !== index))} aria-label="Удалить фото">
                ×
              </button>
              <button type="button" className={`${buttonClass.icon} bg-white`} disabled={index === value.length - 1} onClick={() => move(index, 1)} aria-label="Правее">
                →
              </button>
            </div>
          </div>
        ))}
      </div>
      <input
        ref={input}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(event) => {
          const files = [...(event.target.files ?? [])];
          if (files.length) void upload(files);
        }}
      />
      <button type="button" className={`${buttonClass.ghost} mt-3`} disabled={busy > 0} onClick={() => input.current?.click()}>
        {busy > 0 ? <Loader2 className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}
        {busy > 0 ? `Загружаем… осталось ${busy}` : "Добавить фото (можно несколько)"}
      </button>
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  );
}

/** Repeatable rows (FAQ, facts, dates…) with add, remove and reorder. */
export function RowsEditor<T>({
  rows,
  onChange,
  blank,
  addLabel,
  render,
}: {
  rows: T[];
  onChange: (rows: T[]) => void;
  blank: () => T;
  addLabel: string;
  render: (row: T, update: (patch: Partial<T>) => void, index: number) => React.ReactNode;
}) {
  const move = (index: number, delta: number) => {
    const next = [...rows];
    const [item] = next.splice(index, 1);
    next.splice(index + delta, 0, item);
    onChange(next);
  };
  return (
    <div className="space-y-3">
      {rows.map((row, index) => (
        <div key={index} className="rounded-xl border border-[#d4a82a]/25 p-3">
          <div className="mb-2 flex items-center justify-end gap-1">
            <span className="mr-auto text-xs font-semibold text-[#0f1225]/50">№ {index + 1}</span>
            <button type="button" className={buttonClass.icon} disabled={index === 0} onClick={() => move(index, -1)} aria-label="Выше">
              ↑
            </button>
            <button type="button" className={buttonClass.icon} disabled={index === rows.length - 1} onClick={() => move(index, 1)} aria-label="Ниже">
              ↓
            </button>
            <button type="button" className={`${buttonClass.icon} text-red-700`} onClick={() => onChange(rows.filter((_, i) => i !== index))} aria-label="Удалить">
              ×
            </button>
          </div>
          {render(row, (patch) => onChange(rows.map((r, i) => (i === index ? { ...r, ...patch } : r))), index)}
        </div>
      ))}
      <button type="button" className={buttonClass.ghost} onClick={() => onChange([...rows, blank()])}>
        + {addLabel}
      </button>
    </div>
  );
}
