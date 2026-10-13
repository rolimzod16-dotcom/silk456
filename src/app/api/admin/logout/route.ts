import { NextResponse } from "next/server";
import { endAdminSession } from "@/lib/admin-session";

export async function POST() {
  await endAdminSession();
  return NextResponse.json({ ok: true });
}
