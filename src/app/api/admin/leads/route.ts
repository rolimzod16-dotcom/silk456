import { NextResponse } from "next/server";
import { denyUnlessAdmin } from "@/lib/admin-guard";
import { deleteLead, listLeads, setBookingStatus, type BookingStatus } from "@/lib/leads";

const STATUSES = new Set<BookingStatus>(["new", "confirmed", "closed"]);

export async function GET() {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  const leads = await listLeads();
  return NextResponse.json({ ok: true, ...leads });
}

export async function PATCH(req: Request) {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  const body = await req.json().catch(() => ({}));
  const status = String(body.status || "") as BookingStatus;
  if (!body.id || !STATUSES.has(status)) {
    return NextResponse.json({ ok: false, error: "Некорректный статус." }, { status: 400 });
  }
  await setBookingStatus(String(body.id), status);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  const body = await req.json().catch(() => ({}));
  const kind = body.kind === "inquiry" ? "inquiry" : body.kind === "booking" ? "booking" : null;
  if (!kind || !body.id) {
    return NextResponse.json({ ok: false, error: "Некорректный запрос." }, { status: 400 });
  }
  await deleteLead(kind, String(body.id));
  return NextResponse.json({ ok: true });
}
