import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-session";

/** Returns a 401 response for anonymous callers, or null when the admin is signed in. */
export async function denyUnlessAdmin() {
  if (await isAdmin()) return null;
  return NextResponse.json({ ok: false, error: "Нужен вход." }, { status: 401 });
}
