import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** POST body: { categoryId: string, orderedIds: string[] } — 同一类目下二级问题的排序 */
export async function POST(req: NextRequest) {
  const session = (await cookies()).get("admin_session")?.value;
  if (session !== "ok") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const categoryId = String(body.categoryId ?? "").trim();
  const orderedIds = body.orderedIds as unknown;
  if (!categoryId || !Array.isArray(orderedIds) || orderedIds.length === 0) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  const ids = orderedIds.map((x) => String(x)).filter(Boolean);
  const rows = await prisma.problem.findMany({
    where: { categoryId },
    select: { id: true },
  });
  const allowed = new Set(rows.map((r) => r.id));
  if (ids.length !== allowed.size || ids.some((id) => !allowed.has(id))) {
    return NextResponse.json({ message: "IDs must match category problems" }, { status: 400 });
  }

  await prisma.$transaction(
    ids.map((id, index) =>
      prisma.problem.update({
        where: { id },
        data: { sortOrder: index },
      }),
    ),
  );

  return NextResponse.json({ ok: true });
}
