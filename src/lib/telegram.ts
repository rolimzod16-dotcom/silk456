function chatIds(): string[] {
  const multi = process.env.TELEGRAM_CHAT_IDS?.trim();
  if (multi) {
    return multi
      .split(/[,;\s]+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  const one = process.env.TELEGRAM_CHAT_ID?.trim();
  return one ? [one] : [];
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function notifyTelegram(lines: string[]) {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chats = chatIds();
  if (!token || chats.length === 0) return;

  const text = lines.filter(Boolean).join("\n");
  await Promise.all(
    chats.map(async (chatId) => {
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      });
      if (!response.ok) {
        console.error("[telegram] send failed", response.status);
      }
    }),
  );
}

export function leadLine(label: string, value: string) {
  return `<b>${escapeHtml(label)}:</b> ${escapeHtml(value)}`;
}
