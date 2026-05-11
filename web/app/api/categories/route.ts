import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const { name, description } = await req.json();
  const max = await prisma.category.aggregate({ _max: { sortOrder: true } });
  const item = await prisma.category.create({
    data: {
      name,
      description,
      sortOrder: (max._max.sortOrder ?? 0) + 1,
      isActive: true,
    },
  });
  return NextResponse.json({ item }, { status: 201 });
}
