import { NextResponse } from "next/server";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  const { testimonials } = await getContent();
  return NextResponse.json({ testimonials });
}
