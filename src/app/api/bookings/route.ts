import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getTourBySlug } from "@/lib/tours";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, tourSlug, travelers, travelDate, message } = body;

    if (!name || !email || !phone || !tourSlug || !travelers || !travelDate) {
      return NextResponse.json(
        { ok: false, error: "Заполните все обязательные поля." },
        { status: 400 }
      );
    }

    const tour = getTourBySlug(tourSlug);
    if (!tour) {
      return NextResponse.json(
        { ok: false, error: "Выбранный тур не найден." },
        { status: 404 }
      );
    }

    const booking = await db.booking.create({
      data: {
        name: String(name).slice(0, 120),
        email: String(email).slice(0, 160),
        phone: String(phone).slice(0, 60),
        tourSlug,
        tourTitle: tour.title,
        travelers: Number(travelers) || 1,
        travelDate: String(travelDate),
        message: message ? String(message).slice(0, 1000) : null,
        status: "new",
      },
    });

    return NextResponse.json({
      ok: true,
      id: booking.id,
      tourTitle: tour.title,
      totalPrice: tour.price * (Number(travelers) || 1),
    });
  } catch (err) {
    console.error("[bookings] create error", err);
    return NextResponse.json(
      { ok: false, error: "Не удалось сохранить заявку. Попробуйте ещё раз." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const bookings = await db.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ ok: true, bookings });
  } catch (err) {
    console.error("[bookings] list error", err);
    return NextResponse.json({ ok: true, bookings: [] });
  }
}
