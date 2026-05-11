import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.tag.findMany({
    include: { problems: true },
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json({
    items: items.map((t) => ({
      id: t.id,
      name: t.name,
      count: t.problems.length,
      updatedAt: t.updatedAt,
    })),
  });
}
