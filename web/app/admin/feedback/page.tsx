import { prisma } from "@/lib/prisma";
import { AdminShell } from "../_components";
import { FeedbackList } from "./feedback-list";
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
      <FeedbackList items={items.map((f) => ({
        id: f.id,
        source: f.source,
        type: f.type,
        rating: f.rating,
        content: f.content,
        status: f.status,
        createdAt: f.createdAt.toISOString(),
      }))} />
    </AdminShell>
  );
}
