import { NextResponse } from "next/server";
import { addInquiry } from "@/lib/leads";
import { leadLine, notifyTelegram } from "@/lib/telegram";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { ok: false, error: "Please fill in all fields." },
        { status: 400 },
      );
    }

    const inquiry = await addInquiry({
      name: String(name).slice(0, 120),
      email: String(email).slice(0, 160),
      subject: String(subject).slice(0, 200),
      message: String(message).slice(0, 2000),
    });

    if (!inquiry.email.endsWith("@example.com")) notifyTelegram([
      "📩 <b>GREAT SILK TRAILS — message</b>",
      "",
      leadLine("Name", inquiry.name),
      leadLine("Email", inquiry.email),
      leadLine("Subject", inquiry.subject),
      leadLine("Message", inquiry.message),
    ]).catch((error) => console.error("[telegram] inquiry", error));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[inquiries] create error", err);
    return NextResponse.json(
      { ok: false, error: "Could not send your message." },
      { status: 500 },
    );
  }
}
