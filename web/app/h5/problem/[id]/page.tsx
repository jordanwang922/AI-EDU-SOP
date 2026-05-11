import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { H5Shell } from "../../_components";
export const dynamic = "force-dynamic";

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const problem = await prisma.problem.findUnique({
    where: { id },
    include: { category: true },
  });
  if (!problem) notFound();

  const sections = [
    {
      label: "典型表现",
      value: `• ${problem.title}。\n• 家长一催就容易进入对抗或回避状态。`,
      bg: "bg-white",
    },
    { label: "问题本质", value: problem.essence, bg: "bg-white" },
    { label: "常见误区", value: problem.mistakes, bg: "bg-[#FDE8D3]" },
    { label: "正确原则", value: problem.principles, bg: "bg-[#E8F4F7]" },
    {
      label: "操作步骤（SOP）",
      value: problem.steps,
      bg: "bg-[#EEF5F2]",
    },
    { label: "沟通话术", value: problem.script, bg: "bg-white" },
  ];

  return (
    <H5Shell title="方案详情" showBack backHref={`/h5/category/${problem.categoryId}`}>
      <p className="text-xs text-[#7E8780]">
        首页 › {problem.category.name} › {problem.title}
      </p>
      <h2 className="mt-2 text-4xl font-semibold leading-tight">{problem.title}</h2>

      <div className="mt-3 space-y-2">
        {sections.map((section) => (
          <article
            key={section.label}
            className={`rounded-xl border border-[#CFD6C4] p-3 ${section.bg}`}
          >
            <h3 className="text-sm font-semibold">{section.label}</h3>
            <p className="mt-1 whitespace-pre-line text-sm">{section.value}</p>
          </article>
        ))}
      </div>

      <article className="mt-2 rounded-xl border border-[#CFD6C4] bg-[#FFF8F3] p-3">
        <h3 className="text-sm font-semibold">可复制提示词</h3>
        <p className="mt-2 text-sm">{problem.prompt}</p>
        <button className="mt-3 rounded-full bg-[#F3C3B2] px-4 py-2 text-sm font-semibold">
          一键复制
        </button>
      </article>
    </H5Shell>
  );
}
