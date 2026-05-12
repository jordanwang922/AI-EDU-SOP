import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { H5Shell } from "../../_components";
import { CopyPromptCard } from "./copy-prompt-card";
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

  const categoryName = problem.category.name;
  const isPromptToolbox = categoryName === "AI提示词工具箱";
  const isCourseResource = categoryName === "课程配套资料区";

  return (
    <H5Shell title={isPromptToolbox ? "提示词详情" : isCourseResource ? "课程资料" : "方案详情"} showBack backHref="/h5">
      <p className="text-xs text-[#7E8780]">
        首页 › {problem.category.name} › {problem.title}
      </p>
      <h2 className="mt-2 text-4xl font-semibold leading-tight">{problem.title}</h2>

      {isPromptToolbox ? (
        <PromptToolboxLayout problem={problem} />
      ) : isCourseResource ? (
        <CourseResourceLayout problem={problem} />
      ) : (
        <DefaultLayout problem={problem} />
      )}
    </H5Shell>
  );
}

function DefaultLayout({ problem }: { problem: { essence: string; mistakes: string; principles: string; steps: string; script: string; prompt: string } }) {
  const sections = [
    { label: "问题本质", value: problem.essence, bg: "bg-white" },
    { label: "常见误区", value: problem.mistakes, bg: "bg-[#FDE8D3]" },
    { label: "正确原则", value: problem.principles, bg: "bg-[#E8F4F7]" },
    { label: "操作步骤（SOP）", value: problem.steps, bg: "bg-[#EEF5F2]" },
    { label: "沟通话术", value: problem.script, bg: "bg-white" },
  ];

  return (
    <>
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
      <CopyPromptCard prompt={problem.prompt} />
    </>
  );
}

function PromptToolboxLayout({ problem }: { problem: { essence: string; steps: string; prompt: string } }) {
  return (
    <>
      <article className="mt-3 rounded-xl border border-[#CFD6C4] bg-white p-3">
        <h3 className="text-sm font-semibold">使用说明</h3>
        <p className="mt-1 whitespace-pre-line text-sm">{problem.essence}</p>
        {problem.steps ? (
          <>
            <h3 className="mt-3 text-sm font-semibold">使用步骤</h3>
            <p className="mt-1 whitespace-pre-line text-sm">{problem.steps}</p>
          </>
        ) : null}
      </article>
      <CopyPromptCard prompt={problem.prompt} />
    </>
  );
}

function CourseResourceLayout({ problem }: { problem: { essence: string; steps: string; prompt: string } }) {
  return (
    <>
      <article className="mt-3 rounded-xl border border-[#CFD6C4] bg-white p-3">
        <h3 className="text-sm font-semibold">本节要点</h3>
        <p className="mt-1 whitespace-pre-line text-sm">{problem.essence}</p>
      </article>
      <article className="mt-2 rounded-xl border border-[#CFD6C4] bg-[#EEF5F2] p-3">
        <h3 className="text-sm font-semibold">操作指南</h3>
        <p className="mt-1 whitespace-pre-line text-sm">{problem.steps}</p>
      </article>
      <CopyPromptCard prompt={problem.prompt} />
    </>
  );
}
