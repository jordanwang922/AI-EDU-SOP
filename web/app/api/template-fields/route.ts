import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.templateField.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json({ items });
}
