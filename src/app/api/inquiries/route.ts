import { after, NextResponse } from "next/server";
import { getContent } from "@/lib/content";
import { clientIp, inquirySchema, isBot, rateLimited } from "@/lib/forms";
import { addInquiry } from "@/lib/leads";
import { sendMail } from "@/lib/mailer";
import { leadLine, notifyTelegram } from "@/lib/telegram";

export async function POST(req: Request) {
  if (rateLimited(`inquiry:${clientIp(req)}`)) {
    return NextResponse.json({ ok: false, error: "Too many messages. Please try again later." }, { status: 429 });
  }

  const parsed = inquirySchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please fill in all fields correctly." }, { status: 400 });
  }
  const input = parsed.data;
  if (isBot(input)) return NextResponse.json({ ok: true });

  try {
    const inquiry = await addInquiry({
      name: input.name,
      email: input.email,
      subject: input.subject,
      message: input.message,
    });

    after(async () => {
      const { settings } = await getContent();
      await Promise.all([
        notifyTelegram([
          "📩 <b>GREAT SILK TRAILS — message</b>",
          "",
          leadLine("Name", inquiry.name),
          leadLine("Email", inquiry.email),
          leadLine("Subject", inquiry.subject),
          leadLine("Message", inquiry.message),
        ]).catch((error) => console.error("[telegram] inquiry", error)),
        settings.email
          ? sendMail({
              to: settings.email,
              replyTo: inquiry.email,
              subject: `Website message: ${inquiry.subject}`,
              text: `From: ${inquiry.name} <${inquiry.email}>\n\n${inquiry.message}`,
            })
          : null,
      ]);
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[inquiries] create error", err);
    return NextResponse.json({ ok: false, error: "Could not send your message." }, { status: 500 });
  }
}
