/**
 * Optional email via Resend (https://resend.com). Sends nothing until
 * RESEND_API_KEY and MAIL_FROM (a sender on a verified domain) are set.
 */
export function mailerConfigured() {
  return !!(process.env.RESEND_API_KEY?.trim() && process.env.MAIL_FROM?.trim());
}

export async function sendMail({
  to,
  subject,
  text,
  replyTo,
}: {
  to: string | string[];
  subject: string;
  text: string;
  replyTo?: string;
}) {
  if (!mailerConfigured()) return;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY!.trim()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.MAIL_FROM!.trim(),
      to,
      subject,
      text,
      ...(replyTo && { reply_to: replyTo }),
    }),
  });
  if (!response.ok) {
    console.error("[mail] send failed", response.status, (await response.text()).slice(0, 200));
  }
}
