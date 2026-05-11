import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { H5Shell } from "../../_components";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { id: slug } });
  const list = await prisma.problem.findMany({
    where: { categoryId: slug, isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  if (!category) {
    return <H5Shell title="分类">分类不存在</H5Shell>;
  }

  return (
    <H5Shell title={category.name} showBack backHref="/h5">
      <p className="text-xs text-[#7E8780]">首页 › {category.name}</p>
      <p className="mt-2 text-xs text-[#7E8780]">
        选择具体问题，进入后可查看完整方案与提示词。
      </p>

      <div className="mt-4 space-y-2">
        {list.length === 0 ? (
          <p className="text-sm text-[#7E8780]">该分类下暂无问题，请稍后再试。</p>
        ) : (
          list.map((problem) => (
            <Link
              key={problem.id}
              href={`/h5/problem/${problem.id}`}
              className="flex items-center justify-between border-b border-[#CFD6C4] py-3"
            >
              <span>{problem.title}</span>
              <span className="text-[#99CDD8]">›</span>
            </Link>
          ))
        )}
      </div>
    </H5Shell>
  );
}
