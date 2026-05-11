import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.feedback.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const ct = req.headers.get("content-type") ?? "";
  let source = "H5";
  let type = "内容建议";
  let content = "";
  let rating = 5;
  let wantRedirect = false;

  if (ct.includes("application/json")) {
    const payload = await req.json();
    source = String(payload.source ?? "H5");
    type = String(payload.type ?? "其他");
    content = String(payload.content ?? "");
    rating = Number(payload.rating ?? 5);
  } else {
    const fd = await req.formData();
    source = String(fd.get("source") ?? "H5");
    type = String(fd.get("type") ?? "内容建议");
    content = String(fd.get("content") ?? "");
    rating = Number(fd.get("rating") ?? 5);
    wantRedirect = fd.get("redirect") === "1" || fd.get("redirect") === "true";
  }

  content = content.trim();
  if (!content) {
    if (wantRedirect) {
      const h = req.headers.get("host") ?? req.nextUrl.host;
      const p = req.headers.get("x-forwarded-proto") ?? "http";
      return NextResponse.redirect(new URL("/h5/feedback?err=empty", `${p}://${h}`));
    }
    return NextResponse.json({ message: "content required" }, { status: 400 });
  }

  await prisma.feedback.create({
    data: {
      source,
      type,
      content,
      rating: Number.isFinite(rating) ? Math.min(5, Math.max(1, rating)) : 5,
      status: "待处理",
    },
  });

  if (wantRedirect) {
    const host = req.headers.get("host") ?? req.nextUrl.host;
    const proto = req.headers.get("x-forwarded-proto") ?? "http";
    return NextResponse.redirect(new URL("/h5/feedback?sent=1", `${proto}://${host}`));
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
