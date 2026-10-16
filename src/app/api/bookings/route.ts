import { after, NextResponse } from "next/server";
import { getContent, getTour } from "@/lib/content";
import { bookingSchema, clientIp, isBot, rateLimited } from "@/lib/forms";
import { addBooking } from "@/lib/leads";
import { sendMail } from "@/lib/mailer";
import { leadLine, notifyTelegram } from "@/lib/telegram";

export async function POST(req: Request) {
  if (rateLimited(`booking:${clientIp(req)}`)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const parsed = bookingSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please fill in all required fields correctly." }, { status: 400 });
  }
  const input = parsed.data;
  // Pretend success to bots so they don't retry.
  if (isBot(input)) return NextResponse.json({ ok: true, tourTitle: "" });

  const tour = await getTour(input.tourSlug);
  if (!tour) {
    return NextResponse.json({ ok: false, error: "Selected tour not found." }, { status: 404 });
  }

  try {
    const booking = await addBooking({
      name: input.name,
      email: input.email,
      phone: input.phone,
      tourSlug: tour.slug,
      tourTitle: tour.title,
      travelers: input.travelers,
      travelDate: input.travelDate,
      message: input.message || null,
    });
    const total = tour.price * booking.travelers;

    // Notifications run after the response, without delaying the visitor.
    after(async () => {
      const { settings } = await getContent();
      const brand = settings.brandName;
      await Promise.all([
        notifyTelegram([
          "🛎 <b>GREAT SILK TRAILS — booking request</b>",
          "",
          leadLine("Name", booking.name),
          leadLine("Email", booking.email),
          leadLine("Phone", booking.phone),
          leadLine("Tour", booking.tourTitle),
          leadLine("Travelers", String(booking.travelers)),
          leadLine("Date", booking.travelDate),
          leadLine("Total", `$${total}`),
          booking.message ? leadLine("Notes", booking.message) : "",
        ]).catch((error) => console.error("[telegram] booking", error)),
        sendMail({
          to: booking.email,
          replyTo: settings.email || undefined,
          subject: `${brand}: we received your request for ${booking.tourTitle}`,
          text: [
            `Hello ${booking.name},`,
            "",
            `Thank you for your request for "${booking.tourTitle}" (${booking.travelers} traveler(s), from ${booking.travelDate}).`,
            "This is not yet a confirmed booking and no payment is needed now.",
            "A manager will reply within one business day to confirm availability, details and the final price.",
            "",
            `— ${brand}`,
          ].join("\n"),
        }),
        settings.email
          ? sendMail({
              to: settings.email,
              replyTo: booking.email,
              subject: `New booking request: ${booking.tourTitle} — ${booking.name}`,
              text: [
                `Tour: ${booking.tourTitle}`,
                `Name: ${booking.name}`,
                `Email: ${booking.email}`,
                `Phone: ${booking.phone}`,
                `Travelers: ${booking.travelers}`,
                `Date: ${booking.travelDate}`,
                `Total: $${total}`,
                booking.message ? `Notes: ${booking.message}` : "",
              ].join("\n"),
            })
          : null,
      ]);
    });

    return NextResponse.json({ ok: true, id: booking.id, tourTitle: tour.title, totalPrice: total });
  } catch (err) {
    console.error("[bookings] create error", err);
    return NextResponse.json({ ok: false, error: "Could not save your request. Please try again." }, { status: 500 });
  }
}
