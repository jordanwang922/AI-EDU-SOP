import { prisma } from "@/lib/prisma";
import { AdminShell } from "../_components";
export const dynamic = "force-dynamic";

export default async function TemplatePage() {
  const templateFields = await prisma.templateField.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return (
    <AdminShell title="详情模板配置">
      <div className="rounded-xl border border-[#CFD6C4] bg-white p-4">
        <p className="text-sm text-[#7E8780]">
          二级目录问题进入详情页后，统一按该模板结构展示。
        </p>
        <div className="mt-3 space-y-3">
          <label className="block space-y-1">
            <span className="text-sm font-semibold">模板名称</span>
            <input
              className="w-full rounded-lg border border-[#CFD6C4] px-3 py-2"
              defaultValue="问题详情标准模板"
            />
          </label>
          {templateFields.map((field) => (
            <div
              key={field.id}
              className="rounded-lg border border-[#CFD6C4] bg-[#F7FAF8] px-3 py-2"
            >
              {field.name}
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
