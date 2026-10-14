import { NextResponse } from "next/server";
import { denyUnlessAdmin } from "@/lib/admin-guard";
import { supabaseConfig } from "@/lib/store";

const BUCKET = "site-media";
const TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const MAX_BYTES = 4 * 1024 * 1024;

async function ensureBucket(url: string, key: string) {
  const headers = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
  const found = await fetch(`${url}/storage/v1/bucket/${BUCKET}`, { headers, cache: "no-store" });
  if (found.ok) return;
  await fetch(`${url}/storage/v1/bucket`, {
    method: "POST",
    headers,
    body: JSON.stringify({ id: BUCKET, name: BUCKET, public: true }),
  });
}

export async function POST(req: Request) {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;

  const cfg = supabaseConfig();
  if (!cfg) {
    return NextResponse.json({ ok: false, error: "Хранилище не настроено." }, { status: 503 });
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "Файл не найден." }, { status: 400 });
  }
  const ext = TYPES[file.type];
  if (!ext) {
    return NextResponse.json({ ok: false, error: "Нужен JPG, PNG или WebP." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: "Файл больше 4 МБ." }, { status: 400 });
  }

  await ensureBucket(cfg.url, cfg.key);
  const path = `tours/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
  const upload = await fetch(`${cfg.url}/storage/v1/object/${BUCKET}/${path}`, {
    method: "POST",
    headers: {
      apikey: cfg.key,
      Authorization: `Bearer ${cfg.key}`,
      "Content-Type": file.type,
      "Cache-Control": "31536000",
    },
    body: Buffer.from(await file.arrayBuffer()),
  });
  if (!upload.ok) {
    console.error("[admin] upload", upload.status, await upload.text());
    return NextResponse.json({ ok: false, error: "Не удалось загрузить файл." }, { status: 500 });
  }
  return NextResponse.json({ ok: true, url: `${cfg.url}/storage/v1/object/public/${BUCKET}/${path}` });
}
