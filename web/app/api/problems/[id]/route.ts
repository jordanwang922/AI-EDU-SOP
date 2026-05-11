import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const item = await prisma.problem.findUnique({
    where: { id },
    include: { tags: { include: { tag: true } }, category: true },
  });
  if (!item) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json({
    item: { ...item, tags: item.tags.map((x) => x.tag.name) },
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const payload = await req.json();

  const current = await prisma.problem.findUnique({ where: { id } });
  if (!current) return NextResponse.json({ message: "Not found" }, { status: 404 });

  const updated = await prisma.problem.update({
    where: { id },
    data: {
      title: payload.title ?? current.title,
      categoryId: payload.categoryId ?? current.categoryId,
      essence: payload.essence ?? current.essence,
      mistakes: payload.mistakes ?? current.mistakes,
      principles: payload.principles ?? current.principles,
      steps: payload.steps ?? current.steps,
      script: payload.script ?? current.script,
      prompt: payload.prompt ?? current.prompt,
    },
  });

  if (Array.isArray(payload.tags)) {
    await prisma.problemTag.deleteMany({ where: { problemId: id } });
    for (const tagName of payload.tags as string[]) {
      const name = tagName.trim();
      if (!name) continue;
      const tag = await prisma.tag.upsert({
        where: { name },
        update: {},
        create: { name },
      });
      await prisma.problemTag.create({ data: { problemId: id, tagId: tag.id } });
    }
  }

  return NextResponse.json({ item: updated });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await prisma.problem.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
