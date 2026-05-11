import { prisma } from "@/lib/prisma";
import { AdminShell, AdminTable } from "../_components";
export const dynamic = "force-dynamic";

export default async function AdminFeedbackPage() {
  const items = await prisma.feedback.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminShell title="用户反馈">
      <p className="rounded-xl border border-[#CFD6C4] bg-white p-3 text-sm text-[#7E8780]">
        家长端提交反馈后，会在这里进行查看、标注和处理。
      </p>
      <AdminTable
        headers={["来源", "类型", "评分", "反馈内容", "处理状态"]}
        rows={items.map((f) => [
          f.source,
          f.type,
          String(f.rating),
          f.content,
          f.status,
        ])}
      />
    </AdminShell>
  );
}
