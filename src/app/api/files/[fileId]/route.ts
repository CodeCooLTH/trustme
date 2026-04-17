import { NextRequest, NextResponse } from "next/server";
import { getFile } from "@/lib/storage";

const MIME: Record<string, string> = {
  jpg: "image/jpeg", jpeg: "image/jpeg",
  png: "image/png", webp: "image/webp",
};

export async function GET(request: NextRequest, { params }: { params: Promise<{ fileId: string }> }) {
  const { fileId } = await params;
  const result = await getFile(fileId);
  if (!result) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return new NextResponse(new Uint8Array(result.buffer), {
    headers: {
      "Content-Type": MIME[result.ext] || "application/octet-stream",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
