import { NextResponse } from "next/server";
import { passwordMatches, startAdminSession } from "@/lib/admin-session";

export async function POST(req: Request) {
  if (!process.env.ADMIN_PASSWORD?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Админка ещё не настроена." },
      { status: 503 },
    );
  }

  const body = await req.json().catch(() => ({}));
  const password = String(body.password || "");
  if (!passwordMatches(password)) {
    return NextResponse.json({ ok: false, error: "Неверный пароль." }, { status: 401 });
  }

  await startAdminSession();
  return NextResponse.json({ ok: true });
}
