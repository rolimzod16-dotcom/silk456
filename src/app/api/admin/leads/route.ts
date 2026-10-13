import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-session";
import { listLeads, setBookingStatus, type BookingStatus } from "@/lib/leads";

const STATUSES = new Set<BookingStatus>(["new", "confirmed", "closed"]);

async function deny() {
  if (await isAdmin()) return null;
  return NextResponse.json({ ok: false, error: "Нужен вход." }, { status: 401 });
}

export async function GET() {
  const denied = await deny();
  if (denied) return denied;
  const leads = await listLeads();
  return NextResponse.json({ ok: true, ...leads });
}

export async function PATCH(req: Request) {
  const denied = await deny();
  if (denied) return denied;
  const body = await req.json().catch(() => ({}));
  const status = String(body.status || "") as BookingStatus;
  if (!body.id || !STATUSES.has(status)) {
    return NextResponse.json({ ok: false, error: "Некорректный статус." }, { status: 400 });
  }
  await setBookingStatus(String(body.id), status);
  return NextResponse.json({ ok: true });
}
