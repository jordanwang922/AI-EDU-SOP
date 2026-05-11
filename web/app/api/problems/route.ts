import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const keyword = req.nextUrl.searchParams.get("q")?.trim().toLowerCase();
  const categoryId = req.nextUrl.searchParams.get("categoryId");

  const items = await prisma.problem.findMany({
    where: {
      ...(categoryId ? { categoryId } : {}),
      ...(keyword
        ? {
            OR: [
              { title: { contains: keyword } },
              { tags: { some: { tag: { name: { contains: keyword } } } } },
            ],
          }
        : {}),
    },
    include: {
      category: true,
      tags: { include: { tag: true } },
    },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  const normalized = items.map((p) => ({
    ...p,
    tags: p.tags.map((x) => x.tag.name),
  }));
  return NextResponse.json({ items: normalized });
}

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const {
    title,
    categoryId,
    essence,
    mistakes,
    principles,
    steps,
    script,
    prompt,
    tags = [],
  } = payload;

  const maxSo = await prisma.problem.aggregate({
    where: { categoryId },
    _max: { sortOrder: true },
  });
  const item = await prisma.problem.create({
    data: {
      title,
      categoryId,
      sortOrder: (maxSo._max.sortOrder ?? -1) + 1,
      essence: essence ?? "待补充",
      mistakes: mistakes ?? "待补充",
      principles: principles ?? "待补充",
      steps: steps ?? "待补充",
      script: script ?? "待补充",
      prompt: prompt ?? "待补充",
      isPublished: true,
    },
  });

  for (const tagName of tags as string[]) {
    const tag = await prisma.tag.upsert({
      where: { name: tagName.trim() },
      update: {},
      create: { name: tagName.trim() },
    });
    await prisma.problemTag.create({
      data: { problemId: item.id, tagId: tag.id },
    });
  }

  return NextResponse.json({ item }, { status: 201 });
}
