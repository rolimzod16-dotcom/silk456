import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { denyUnlessAdmin } from "@/lib/admin-guard";
import { getContent, saveSection } from "@/lib/content";

const SECTIONS = new Set(["tours", "testimonials", "settings"]);

export async function GET() {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  return NextResponse.json({ ok: true, content: await getContent() });
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
    const content = await saveSection(section as "tours" | "testimonials" | "settings", body.value);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, content });
  } catch (error) {
    console.error("[admin] save content", error);
    return NextResponse.json({ ok: false, error: "Не удалось сохранить." }, { status: 500 });
  }
}
