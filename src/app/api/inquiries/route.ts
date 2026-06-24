import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { ok: false, error: "Заполните все поля формы." },
        { status: 400 }
      );
    }

    await db.inquiry.create({
      data: {
        name: String(name).slice(0, 120),
        email: String(email).slice(0, 160),
        subject: String(subject).slice(0, 200),
        message: String(message).slice(0, 2000),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[inquiries] create error", err);
    return NextResponse.json(
      { ok: false, error: "Не удалось отправить сообщение." },
      { status: 500 }
    );
  }
}
