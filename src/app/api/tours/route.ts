import { NextResponse } from "next/server";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  const { tours } = await getContent();
  return NextResponse.json({ tours });
}
