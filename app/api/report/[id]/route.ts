import { NextResponse } from "next/server";
import { getAuditFromStore } from "@/lib/storage";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const audit = getAuditFromStore(id);

  if (!audit) {
    return NextResponse.json({ error: "Audit report not found or expired." }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: audit });
}
