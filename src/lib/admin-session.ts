import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "silk_admin";
const WEEK = 7 * 24 * 60 * 60 * 1000;

function secret() {
  return process.env.ADMIN_PASSWORD?.trim() || "";
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function passwordMatches(password: string) {
  const expected = secret();
  if (!expected || !password) return false;
  return safeEqual(password, expected);
}

export async function isAdmin() {
  if (!secret()) return false;
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const [mark, exp] = payload.split(":");
  if (mark !== "ok" || Number(exp) < Date.now()) return false;
  return safeEqual(signature, sign(payload));
}

export async function startAdminSession() {
  const payload = `ok:${Date.now() + WEEK}`;
  const jar = await cookies();
  jar.set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: WEEK / 1000,
  });
}

export async function endAdminSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}
