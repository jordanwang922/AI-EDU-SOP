import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "../_components";
import { ConfirmSubmitButton } from "./delete-buttons";
import { ProblemSortList } from "./problem-sort-list";
import { ToastBanner } from "./toast-banner";

export const dynamic = "force-dynamic";

export default async function DirectoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ selected?: string; toast?: string }>;
}) {
  const sp = await searchParams;
  const categories = await prisma.category.findMany({
    include: {
      _count: { select: { problems: true } },
      problems: {
        select: { id: true, title: true, sortOrder: true },
        orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      },
    },
    orderBy: { sortOrder: "asc" },
  });

  const validIds = new Set(categories.map((c) => c.id));
  const selectedId =
    sp.selected && validIds.has(sp.selected) ? sp.selected : categories[0]?.id ?? "";
  const active = categories.find((c) => c.id === selectedId);

  async function createCategory(formData: FormData) {
    "use server";
    const name = String(formData.get("name") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    if (!name || !description) return;

    const max = await prisma.category.aggregate({ _max: { sortOrder: true } });
    const created = await prisma.category.create({
      data: {
        name,
        description,
        isActive: true,
        sortOrder: (max._max.sortOrder ?? 0) + 1,
      },
    });
    redirect(
      `/admin/directories?selected=${encodeURIComponent(created.id)}&toast=l1_created#directory-panel`,
    );
  }

  async function updateCategory(formData: FormData) {
    "use server";
    const id = String(formData.get("id") ?? "");
    const name = String(formData.get("name") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    if (!id || !name || !description) return;
    await prisma.category.update({
      where: { id },
      data: { name, description },
    });
    redirect(`/admin/directories?selected=${encodeURIComponent(id)}&toast=l1_saved#directory-panel`);
  }

  async function deleteCategory(formData: FormData) {
    "use server";
    const id = String(formData.get("id") ?? "");
    if (!id) return;
    await prisma.category.delete({ where: { id } });
    const next = await prisma.category.findFirst({ orderBy: { sortOrder: "asc" } });
    if (next) {
      redirect(
        `/admin/directories?selected=${encodeURIComponent(next.id)}&toast=l1_deleted#directory-panel`,
      );
    }
    redirect(`/admin/directories?toast=l1_deleted`);
  }

  async function createSubProblem(formData: FormData) {
    "use server";
    const categoryId = String(formData.get("categoryId") ?? "").trim();
    const title = String(formData.get("title") ?? "").trim();
    if (!categoryId || !title) return;
    const maxSo = await prisma.problem.aggregate({
      where: { categoryId },
      _max: { sortOrder: true },
    });
    await prisma.problem.create({
      data: {
        categoryId,
        title,
        sortOrder: (maxSo._max.sortOrder ?? -1) + 1,
        essence: "待补充",
        mistakes: "待补充",
        principles: "待补充",
        steps: "待补充",
        script: "待补充",
        prompt: "待补充",
        isPublished: true,
      },
    });
    redirect(
      `/admin/directories?selected=${encodeURIComponent(categoryId)}&toast=l2_added#directory-panel`,
    );
  }

  async function updateSubProblem(formData: FormData) {
    "use server";
    const id = String(formData.get("id") ?? "");
    const categoryId = String(formData.get("categoryId") ?? "").trim();
    const title = String(formData.get("title") ?? "").trim();
    if (!id || !title || !categoryId) return;
    await prisma.problem.update({
      where: { id },
      data: { title },
    });
    redirect(
      `/admin/directories?selected=${encodeURIComponent(categoryId)}&toast=l2_saved#directory-panel`,
    );
  }

  async function deleteSubProblem(formData: FormData) {
    "use server";
    const id = String(formData.get("id") ?? "");
    const categoryId = String(formData.get("categoryId") ?? "").trim();
    if (!id || !categoryId) return;
    await prisma.problem.delete({ where: { id } });
    redirect(
      `/admin/directories?selected=${encodeURIComponent(categoryId)}&toast=l2_deleted#directory-panel`,
    );
  }

  return (
    <AdminShell title="一级/二级目录管理">
      <ToastBanner code={sp.toast} selectedId={selectedId} />

      <form className="rounded-xl border border-[#CFD6C4] bg-white p-3" action={createCategory}>
        <p className="text-sm text-[#7E8780]">
          新增一级目录；点选下方表格中的某一行，在页面底部编辑该目录及其二级问题。
        </p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <input
            name="name"
            className="rounded-lg border border-[#CFD6C4] px-3 py-2"
            placeholder="一级目录名称"
            required
          />
          <input
            name="description"
            className="rounded-lg border border-[#CFD6C4] px-3 py-2"
            placeholder="目录描述"
            required
          />
          <button className="rounded-lg bg-[#F3C3B2] px-3 py-2 text-sm font-semibold">
            新增一级目录
          </button>
        </div>
      </form>

      <div className="overflow-hidden rounded-xl border border-[#CFD6C4] bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#F7FAF8] text-[#7E8780]">
            <tr>
              <th className="px-3 py-2 font-semibold">序号 · 一级目录</th>
              <th className="px-3 py-2 font-semibold">二级（问题）数量</th>
              <th className="px-3 py-2 font-semibold">状态</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c, idx) => {
              const isSel = c.id === selectedId;
              return (
                <tr
                  key={c.id}
                  className={`border-t border-[#CFD6C4] ${isSel ? "bg-[#FDE8D3]/80" : ""}`}
                >
                  <td className="px-3 py-2">
                    <Link
                      href={`/admin/directories?selected=${c.id}`}
                      className="block font-semibold text-[#657166] underline-offset-2 hover:underline"
                      scroll={false}
                    >
                      {String(idx + 1).padStart(2, "0")} · {c.name}
                    </Link>
                  </td>
                  <td className="px-3 py-2">{c._count.problems}</td>
                  <td className="px-3 py-2">{c.isActive ? "启用" : "停用"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {active ? (
        <section
          id="directory-panel"
          className="space-y-3 rounded-xl border border-[#CFD6C4] bg-white p-3 scroll-mt-4"
        >
          <h3 className="font-semibold">
            当前选中：{active.name}
            <span className="ml-2 text-sm font-normal text-[#7E8780]">
              （在此修改一级目录名称与描述，并管理下属二级问题）
            </span>
          </h3>
          <form
            key={`l1-${active.id}`}
            action={updateCategory}
            className="grid grid-cols-[1fr_2fr_auto_auto] gap-2"
          >
            <input type="hidden" name="id" value={active.id} />
            <input
              name="name"
              defaultValue={active.name}
              className="rounded border border-[#CFD6C4] px-2 py-1"
            />
            <input
              name="description"
              defaultValue={active.description}
              className="rounded border border-[#CFD6C4] px-2 py-1"
            />
            <button type="submit" className="rounded bg-[#FDE8D3] px-2 py-1 text-sm">
              保存一级
            </button>
            <ConfirmSubmitButton
              formAction={deleteCategory}
              className="rounded bg-[#F3C3B2] px-2 py-1 text-sm"
              label="删除一级"
              message="删除一级目录将同时删除其下所有二级问题，确定删除吗？"
            />
          </form>

          <div className="mt-2 space-y-2 border-t border-[#CFD6C4] pt-3">
            <p className="text-sm font-semibold">二级目录（具体问题）</p>
            <ProblemSortList
              key={`${active.id}-${active.problems.map((p) => `${p.id}:${p.sortOrder}:${p.title}`).join("|")}`}
              categoryId={active.id}
              initialProblems={active.problems.map((p) => ({
                id: p.id,
                title: p.title,
                sortOrder: p.sortOrder,
              }))}
              updateSubProblem={updateSubProblem}
              deleteSubProblem={deleteSubProblem}
            />
            <form action={createSubProblem} className="grid grid-cols-[1fr_auto] gap-2">
              <input type="hidden" name="categoryId" value={active.id} />
              <input
                name="title"
                placeholder="新增一条二级问题"
                className="rounded border border-[#CFD6C4] px-2 py-1"
              />
              <button type="submit" className="rounded bg-[#99CDD8] px-2 py-1 text-sm">
                新增二级
              </button>
            </form>
          </div>
        </section>
      ) : (
        <p className="rounded-xl border border-[#CFD6C4] bg-white p-3 text-sm text-[#7E8780]">
          暂无一级目录，请先在上方新增。
        </p>
      )}
    </AdminShell>
  );
}
