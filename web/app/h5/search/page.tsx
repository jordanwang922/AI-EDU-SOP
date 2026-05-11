import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { H5Shell, Tag } from "../_components";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const keyword = q.trim();
  const result = await prisma.problem.findMany({
    where: keyword
      ? {
          OR: [
            { title: { contains: keyword } },
            { tags: { some: { tag: { name: { contains: keyword } } } } },
          ],
        }
      : undefined,
    include: { tags: { include: { tag: true } } },
    orderBy: { updatedAt: "desc" },
    take: 12,
  });
  const tags = Array.from(
    new Set(result.flatMap((p) => p.tags.map((t) => t.tag.name))),
  ).slice(0, 10);

  return (
    <H5Shell title="搜索" showBack>
      <div className="rounded-xl border border-[#CFD6C4] bg-white px-4 py-3 text-sm text-[#7E8780]">
        🔍 搜关键词：拖拉、顶嘴、手机、焦虑…
      </div>

      <h3 className="mt-3 text-sm font-semibold">猜你想搜</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <Link key={`${tag}-${idx}`} href={`/h5/search/result?q=${encodeURIComponent(tag)}`}>
            <Tag>{tag}</Tag>
          </Link>
        ))}
      </div>
      {keyword ? (
        <Link
          href={`/h5/search/result?q=${encodeURIComponent(keyword)}`}
          className="mt-4 inline-block text-sm text-[#99CDD8]"
        >
          查看“{keyword}”搜索结果 →
        </Link>
      ) : null}
    </H5Shell>
  );
}
