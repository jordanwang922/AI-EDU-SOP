import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { H5Shell } from "../../_components";

export const dynamic = "force-dynamic";

export default async function SearchResultPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "拖拉" } = await searchParams;
  const items = await prisma.problem.findMany({
    where: {
      OR: [
        { title: { contains: q } },
        { tags: { some: { tag: { name: { contains: q } } } } },
      ],
    },
    take: 50,
    orderBy: { updatedAt: "desc" },
  });

  return (
    <H5Shell title={`「${q}」`} showBack backHref="/h5">
      <p className="text-xs text-[#7E8780]">为你找到 {items.length} 条相关问题</p>
      <div className="mt-3 space-y-2">
        {items.map((problem) => (
          <Link
            key={problem.id}
            href={`/h5/problem/${problem.id}`}
            className="flex items-center justify-between border-b border-[#CFD6C4] py-3"
          >
            <span>{problem.title}</span>
            <span className="text-[#99CDD8]">›</span>
          </Link>
        ))}
      </div>
    </H5Shell>
  );
}
