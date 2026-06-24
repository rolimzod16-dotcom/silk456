import { NextResponse } from "next/server";
import { tours } from "@/lib/tours";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({ tours });
}
