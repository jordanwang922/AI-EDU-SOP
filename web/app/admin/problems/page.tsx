"use client";

import { FormEvent, useEffect, useState } from "react";
import { AdminShell } from "../_components";

export const dynamic = "force-dynamic";

type Category = { id: string; name: string };

type ProblemListItem = {
  id: string;
  title: string;
  categoryId: string;
};

type ProblemDetail = {
  id: string;
  title: string;
  categoryId: string;
  essence: string;
  mistakes: string;
  principles: string;
  steps: string;
  script: string;
  prompt: string;
  tags: string[];
};

export default function ProblemsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [problems, setProblems] = useState<ProblemListItem[]>([]);
  const [problemId, setProblemId] = useState("");
  const [current, setCurrent] = useState<ProblemDetail | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        const items = (data.items ?? []) as Category[];
        setCategories(items);
        if (items[0]) setCategoryId(items[0].id);
      });
  }, []);

  useEffect(() => {
    if (!categoryId) return;
    fetch(`/api/problems?categoryId=${encodeURIComponent(categoryId)}`)
      .then((res) => res.json())
      .then((data) => {
        const items = (data.items ?? []) as ProblemListItem[];
        setProblems(items);
        const first = items[0];
        setProblemId(first?.id ?? "");
      });
  }, [categoryId]);

  useEffect(() => {
    if (!problemId) {
      void Promise.resolve().then(() => setCurrent(null));
      return;
    }
    fetch(`/api/problems/${problemId}`)
      .then((res) => {
        if (!res.ok) throw new Error("load failed");
        return res.json();
      })
      .then((data) => setCurrent(data.item as ProblemDetail))
      .catch(() => setCurrent(null));
  }, [problemId]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!current) return;
    const fd = new FormData(e.currentTarget);
    const payload = {
      ...current,
      categoryId,
      essence: String(fd.get("essence") ?? ""),
      mistakes: String(fd.get("mistakes") ?? ""),
      principles: String(fd.get("principles") ?? ""),
      steps: String(fd.get("steps") ?? ""),
      script: String(fd.get("script") ?? ""),
      prompt: String(fd.get("prompt") ?? ""),
      tags: String(fd.get("tags") ?? "")
        .split(/[,，、]/)
        .map((s) => s.trim())
        .filter(Boolean),
    };
    const res = await fetch(`/api/problems/${current.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setMsg(res.ok ? "保存成功" : "保存失败");
  }

  const catName = categories.find((c) => c.id === categoryId)?.name ?? "";

  return (
    <AdminShell title="问题详情内容编辑">
      <div className="rounded-xl border border-[#CFD6C4] bg-white p-4">
        <p className="text-sm text-[#7E8780]">
          先选大类，再选该大类下的具体问题，避免列表过长。标签在每个问题下维护，搜索时标签与标题均可命中。
        </p>
        <form key={current?.id} className="mt-3 space-y-3" onSubmit={onSubmit}>
          <label className="block space-y-1">
            <span className="text-sm font-semibold">1. 选择大类</span>
            <select
              className="w-full rounded-lg border border-[#CFD6C4] px-3 py-2"
              value={categoryId}
              onChange={(e) => {
                setMsg("");
                setCategoryId(e.target.value);
              }}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-semibold">2. 选择问题（{catName || "—"}）</span>
            <select
              className="w-full rounded-lg border border-[#CFD6C4] px-3 py-2"
              value={problemId}
              onChange={(e) => {
                setMsg("");
                setProblemId(e.target.value);
              }}
              disabled={!problems.length}
            >
              {problems.length === 0 ? (
                <option value="">该大类下暂无问题，请先到「一级/二级目录」新增</option>
              ) : (
                problems.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))
              )}
            </select>
          </label>

          {current ? (
            <>
              <label className="block space-y-1">
                <span className="text-sm font-semibold">问题本质</span>
                <textarea
                  name="essence"
                  defaultValue={current.essence}
                  className="w-full rounded-lg border border-[#CFD6C4] px-3 py-2"
                  rows={3}
                />
              </label>
              <label className="block space-y-1">
                <span className="text-sm font-semibold">常见误区</span>
                <textarea
                  name="mistakes"
                  defaultValue={current.mistakes}
                  className="w-full rounded-lg border border-[#CFD6C4] px-3 py-2"
                  rows={3}
                />
              </label>
              <label className="block space-y-1">
                <span className="text-sm font-semibold">正确原则</span>
                <textarea
                  name="principles"
                  defaultValue={current.principles}
                  className="w-full rounded-lg border border-[#CFD6C4] px-3 py-2"
                  rows={3}
                />
              </label>
              <label className="block space-y-1">
                <span className="text-sm font-semibold">操作步骤SOP</span>
                <textarea
                  name="steps"
                  defaultValue={current.steps}
                  className="w-full rounded-lg border border-[#CFD6C4] px-3 py-2"
                  rows={4}
                />
              </label>
              <label className="block space-y-1">
                <span className="text-sm font-semibold">沟通话术</span>
                <textarea
                  name="script"
                  defaultValue={current.script}
                  className="w-full rounded-lg border border-[#CFD6C4] px-3 py-2"
                  rows={3}
                />
              </label>
              <label className="block space-y-1">
                <span className="text-sm font-semibold">可复制提示词</span>
                <textarea
                  name="prompt"
                  defaultValue={current.prompt}
                  className="w-full rounded-lg border border-[#CFD6C4] px-3 py-2"
                  rows={4}
                />
              </label>
              <label className="block space-y-1">
                <span className="text-sm font-semibold">搜索关键词（标签）</span>
                <input
                  name="tags"
                  defaultValue={current.tags?.join(",")}
                  placeholder="多个关键词用逗号分隔，用于搜索命中（类似论文关键词）"
                  className="w-full rounded-lg border border-[#CFD6C4] px-3 py-2"
                />
                <span className="text-xs text-[#7E8780]">
                  每一词会在后台建立/关联标签；家长端搜索关键词与标签匹配即可找到该问题。
                </span>
              </label>
              <div className="space-x-2">
                <button type="submit" className="rounded-lg bg-[#FDE8D3] px-3 py-2 text-sm">
                  保存草稿
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-[#F3C3B2] px-3 py-2 text-sm font-semibold"
                >
                  发布
                </button>
              </div>
            </>
          ) : (
            <p className="text-sm text-[#7E8780]">请选择大类与问题后再编辑内容。</p>
          )}
          {msg ? <p className="text-sm text-[#7E8780]">{msg}</p> : null}
        </form>
      </div>
    </AdminShell>
  );
}
