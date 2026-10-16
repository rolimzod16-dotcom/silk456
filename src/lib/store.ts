import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

/**
 * Tiny JSON document store: one row per document in the Supabase
 * `cms_documents` table, or a local file under ./data in development.
 */

export function supabaseConfig() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "")
    .trim()
    .replace(/\/$/, "");
  const key = (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    ""
  ).trim();
  if (!url || !key) return null;
  return { url, key };
}

export function storeBackend(): "supabase" | "file" | "none" {
  if (supabaseConfig()) return "supabase";
  if (process.env.NODE_ENV !== "production") return "file";
  return "none";
}

function localFile(id: string) {
  return path.join(process.cwd(), "data", id);
}

/** Pass a cache tag to let Next cache the read until that tag is revalidated. */
export type ReadOptions = { tag?: string };

async function readRemote(id: string, options: ReadOptions = {}): Promise<unknown> {
  const cfg = supabaseConfig();
  if (!cfg) throw new Error("Supabase is not configured");
  const response = await fetch(
    `${cfg.url}/rest/v1/cms_documents?id=eq.${encodeURIComponent(id)}&select=payload`,
    {
      headers: { apikey: cfg.key, Authorization: `Bearer ${cfg.key}` },
      ...(options.tag ? { next: { tags: [options.tag], revalidate: 3600 } } : { cache: "no-store" as const }),
    },
  );
  if (!response.ok) throw new Error(`Could not read ${id} (${response.status})`);
  const rows = (await response.json()) as { payload?: unknown }[];
  return rows[0]?.payload ?? null;
}

async function writeRemote(id: string, payload: unknown) {
  const cfg = supabaseConfig();
  if (!cfg) throw new Error("Supabase is not configured");
  const response = await fetch(`${cfg.url}/rest/v1/cms_documents`, {
    method: "POST",
    headers: {
      apikey: cfg.key,
      Authorization: `Bearer ${cfg.key}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify({ id, payload, updated_at: new Date().toISOString() }),
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Could not save ${id} (${response.status}) ${detail.slice(0, 180)}`);
  }
}

/** Returns the stored payload, or null when the document does not exist yet. */
export async function readDoc(id: string, options: ReadOptions = {}): Promise<unknown> {
  const backend = storeBackend();
  if (backend === "supabase") return readRemote(id, options);
  if (backend === "file") {
    try {
      return JSON.parse(await readFile(localFile(id), "utf8"));
    } catch {
      return null;
    }
  }
  throw new Error("Storage is not configured");
}

export async function writeDoc(id: string, payload: unknown) {
  const backend = storeBackend();
  if (backend === "supabase") return writeRemote(id, payload);
  if (backend === "file") {
    const file = localFile(id);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, JSON.stringify(payload, null, 2));
    return;
  }
  throw new Error("Storage is not configured");
}

const chains = new Map<string, Promise<unknown>>();

/** Serialises read-modify-write cycles per document within one instance. */
export function mutateDoc<S, T>(
  id: string,
  read: () => Promise<S>,
  change: (store: S) => { store: S; result: T },
): Promise<T> {
  const previous = chains.get(id) ?? Promise.resolve();
  const run = previous.then(async () => {
    const next = change(await read());
    await writeDoc(id, next.store);
    return next.result;
  });
  chains.set(
    id,
    run.then(
      () => undefined,
      () => undefined,
    ),
  );
  return run;
}
