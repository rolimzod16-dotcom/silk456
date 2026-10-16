import { z } from "zod";

const text = (max: number) => z.string().trim().max(max);

export const bookingSchema = z.object({
  name: text(120).min(1),
  email: z.string().trim().max(160).pipe(z.email()),
  phone: text(60).min(5),
  tourSlug: text(80).min(1),
  travelers: z.coerce.number().int().min(1).max(50),
  travelDate: text(40).min(1),
  message: text(1000).optional().default(""),
  website: z.string().optional(),
});

export const inquirySchema = z.object({
  name: text(120).min(1),
  email: z.string().trim().max(160).pipe(z.email()),
  subject: text(200).min(1),
  message: text(2000).min(1),
  website: z.string().optional(),
});

/** Bots fill the hidden "website" field; real visitors never see it. */
export const isBot = (data: { website?: string }) => !!data.website?.trim();

export function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

const hits = new Map<string, number[]>();

/**
 * Best-effort limit per IP within one server instance: enough to stop a
 * script hammering the form, without blocking a family sharing a router.
 */
export function rateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > limit;
}
