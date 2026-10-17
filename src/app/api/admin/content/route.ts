import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { denyUnlessAdmin } from "@/lib/admin-guard";
import { CONTENT_TAG, getFreshContent, saveSection } from "@/lib/content";

const SECTIONS = new Set(["tours", "testimonials", "settings", "countries", "faq"]);

export async function GET() {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  return NextResponse.json({ ok: true, content: await getFreshContent() });
}

export async function PUT(req: Request) {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  const body = await req.json().catch(() => ({}));
  const section = String(body.section || "");
  if (!SECTIONS.has(section) || body.value === undefined) {
    return NextResponse.json({ ok: false, error: "Некорректные данные." }, { status: 400 });
  }
  try {
    const content = await saveSection(section as "tours" | "testimonials" | "settings" | "countries" | "faq", body.value);
    // Expire immediately so the next visitor sees the change.
    revalidateTag(CONTENT_TAG, { expire: 0 });
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, content });
  } catch (error) {
    console.error("[admin] save content", error);
    return NextResponse.json({ ok: false, error: "Не удалось сохранить." }, { status: 500 });
  }
}
