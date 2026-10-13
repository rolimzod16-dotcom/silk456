import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type BookingStatus = "new" | "confirmed" | "closed";

export type BookingLead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  tourSlug: string;
  tourTitle: string;
  travelers: number;
  travelDate: string;
  message: string | null;
  status: BookingStatus;
  createdAt: string;
};

export type InquiryLead = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

type LeadStore = {
  bookings: BookingLead[];
  inquiries: InquiryLead[];
};

const DOC_ID = "silk456-leads.json";
const EMPTY: LeadStore = { bookings: [], inquiries: [] };

function supabaseConfig() {
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

export function leadsBackend(): "supabase" | "file" | "none" {
  if (supabaseConfig()) return "supabase";
  if (process.env.NODE_ENV !== "production") return "file";
  return "none";
}

function localFile() {
  return path.join(process.cwd(), "data", DOC_ID);
}

async function readFileStore(): Promise<LeadStore> {
  try {
    const raw = await readFile(localFile(), "utf8");
    return normalize(JSON.parse(raw));
  } catch {
    return EMPTY;
  }
}

async function writeFileStore(store: LeadStore) {
  const file = localFile();
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(store, null, 2));
}

async function readRemote(): Promise<LeadStore> {
  const cfg = supabaseConfig();
  if (!cfg) throw new Error("Supabase is not configured");
  const response = await fetch(
    `${cfg.url}/rest/v1/cms_documents?id=eq.${DOC_ID}&select=payload`,
    {
      headers: { apikey: cfg.key, Authorization: `Bearer ${cfg.key}` },
      cache: "no-store",
    },
  );
  if (!response.ok) {
    throw new Error(`Could not read leads (${response.status})`);
  }
  const rows = (await response.json()) as { payload?: LeadStore }[];
  if (!rows.length || !rows[0]?.payload) return EMPTY;
  return normalize(rows[0].payload);
}

async function writeRemote(store: LeadStore) {
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
    body: JSON.stringify({
      id: DOC_ID,
      payload: store,
      updated_at: new Date().toISOString(),
    }),
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Could not save leads (${response.status}) ${detail.slice(0, 180)}`);
  }
}

function normalize(value: unknown): LeadStore {
  const record = value && typeof value === "object" ? (value as Partial<LeadStore>) : {};
  return {
    bookings: Array.isArray(record.bookings) ? record.bookings : [],
    inquiries: Array.isArray(record.inquiries) ? record.inquiries : [],
  };
}

async function readStore(): Promise<LeadStore> {
  const backend = leadsBackend();
  if (backend === "supabase") return readRemote();
  if (backend === "file") return readFileStore();
  throw new Error("Lead storage is not configured");
}

async function writeStore(store: LeadStore) {
  const backend = leadsBackend();
  if (backend === "supabase") return writeRemote(store);
  if (backend === "file") return writeFileStore(store);
  throw new Error("Lead storage is not configured");
}

let chain: Promise<unknown> = Promise.resolve();

function mutate<T>(change: (store: LeadStore) => { store: LeadStore; result: T }): Promise<T> {
  const run = chain.then(async () => {
    const current = await readStore();
    const next = change(current);
    await writeStore(next.store);
    return next.result;
  });
  chain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

export function listLeads() {
  return readStore();
}

export function addBooking(input: Omit<BookingLead, "id" | "status" | "createdAt">) {
  const booking: BookingLead = {
    ...input,
    id: crypto.randomUUID(),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  return mutate((store) => ({
    store: { ...store, bookings: [booking, ...store.bookings] },
    result: booking,
  }));
}

export function addInquiry(input: Omit<InquiryLead, "id" | "createdAt">) {
  const inquiry: InquiryLead = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  return mutate((store) => ({
    store: { ...store, inquiries: [inquiry, ...store.inquiries] },
    result: inquiry,
  }));
}

export function setBookingStatus(id: string, status: BookingStatus) {
  return mutate((store) => ({
    store: {
      ...store,
      bookings: store.bookings.map((booking) =>
        booking.id === id ? { ...booking, status } : booking,
      ),
    },
    result: true,
  }));
}
