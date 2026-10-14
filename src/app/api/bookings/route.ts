import { NextResponse } from "next/server";
import { addBooking } from "@/lib/leads";
import { getTour } from "@/lib/content";
import { leadLine, notifyTelegram } from "@/lib/telegram";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, tourSlug, travelers, travelDate, message } = body;

    if (!name || !email || !phone || !tourSlug || !travelers || !travelDate) {
      return NextResponse.json(
        { ok: false, error: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    const tour = await getTour(String(tourSlug));
    if (!tour) {
      return NextResponse.json(
        { ok: false, error: "Selected tour not found." },
        { status: 404 },
      );
    }

    const people = Number(travelers) || 1;
    const booking = await addBooking({
      name: String(name).slice(0, 120),
      email: String(email).slice(0, 160),
      phone: String(phone).slice(0, 60),
      tourSlug,
      tourTitle: tour.title,
      travelers: people,
      travelDate: String(travelDate).slice(0, 40),
      message: message ? String(message).slice(0, 1000) : null,
    });

    if (!booking.email.endsWith("@example.com")) notifyTelegram([
      "🛎 <b>GREAT SILK TRAILS — booking request</b>",
      "",
      leadLine("Name", booking.name),
      leadLine("Email", booking.email),
      leadLine("Phone", booking.phone),
      leadLine("Tour", booking.tourTitle),
      leadLine("Travelers", String(booking.travelers)),
      leadLine("Date", booking.travelDate),
      leadLine("Total", `$${tour.price * people}`),
      booking.message ? leadLine("Notes", booking.message) : "",
    ]).catch((error) => console.error("[telegram] booking", error));

    return NextResponse.json({
      ok: true,
      id: booking.id,
      tourTitle: tour.title,
      totalPrice: tour.price * people,
    });
  } catch (err) {
    console.error("[bookings] create error", err);
    return NextResponse.json(
      { ok: false, error: "Could not save your request. Please try again." },
      { status: 500 },
    );
  }
}
