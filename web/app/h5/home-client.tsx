"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Tag } from "./_components";

type Category = {
  id: string;
  name: string;
  description: string;
};

export default function H5HomeClient({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<{ id: string; title: string }[]>([]);
  const [searchStatus, setSearchStatus] = useState<"idle" | "loading" | "done">("idle");
  const [searchError, setSearchError] = useState<string | null>(null);

  function apiBase(): string {
    if (typeof window === "undefined" || !window.location?.origin) return "";
    return window.location.origin;
  }

  async function onSearch() {
    const q = keyword.trim();
    setSearchError(null);
    if (!q) {
      setResults([]);
      setSearchStatus("idle");
      return;
    }

    setSearchStatus("loading");
    try {
      const url = `${apiBase()}/api/problems?q=${encodeURIComponent(q)}`;
      const res = await fetch(url, {
        credentials: "same-origin",
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = (await res.json()) as { items?: { id: string; title: string }[] };
      const items = (data.items ?? []).map((x) => ({ id: x.id, title: x.title }));
      setResults(items);
      setSearchStatus("done");
    } catch {
      setResults([]);
      setSearchStatus("done");
      setSearchError("搜索请求失败，请检查网络或稍后重试");
    }
  }

  const showSearchPanel = searchStatus !== "idle" || searchError;

  return (
    <>
      <section className="space-y-2 py-1">
        <h2 className="text-[23px] font-semibold leading-tight">你今天想解决孩子的哪个问题？</h2>
        <p className="text-sm text-[#7E8780]">从真实场景出发，用科学的方法陪伴孩子。</p>
      </section>

      <div className="mt-3 rounded-xl border border-[#CFD6C4] bg-white px-4 py-2.5">
        <div className="flex flex-nowrap items-center gap-2">
          <span className="text-[#7E8780]">🔍</span>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") void onSearch();
            }}
            className="min-w-0 flex-1 bg-transparent text-[#657166] outline-none"
            placeholder="搜关键词：拖拉、顶嘴、手机、焦虑..."
          />
          <button
            type="button"
            onClick={() => void onSearch()}
            disabled={searchStatus === "loading"}
            className="shrink-0 rounded-md bg-[#99CDD8] px-3 py-1 text-xs font-semibold text-[#657166] disabled:opacity-60"
          >
            {searchStatus === "loading" ? "搜索中…" : "搜索"}
          </button>
        </div>
      </div>

      {searchError ? (
        <p className="mt-2 text-center text-sm font-semibold text-[#b45309]">{searchError}</p>
      ) : null}

      {showSearchPanel && !searchError ? (
        <section className="mt-3 space-y-2 rounded-xl border border-[#CFD6C4] bg-white p-3">
          <h3 className="text-sm font-semibold">
            搜索结果
            {searchStatus === "loading" ? <span className="ml-2 text-xs font-normal text-[#7E8780]">加载中…</span> : null}
          </h3>
          {searchStatus === "loading" ? (
            <p className="text-sm text-[#7E8780]">正在搜索…</p>
          ) : results.length > 0 ? (
            results.map((problem) => (
              <Link
                key={problem.id}
                href={`/h5/problem/${problem.id}`}
                className="flex items-center justify-between border-b border-[#CFD6C4] py-2 text-sm"
              >
                <span>{problem.title}</span>
                <span className="text-[#99CDD8]">›</span>
              </Link>
            ))
          ) : (
            <p className="text-sm text-[#7E8780]">未找到与「{keyword.trim()}」相关的问题，可换个关键词试试。</p>
          )}
        </section>
      ) : null}

      <div className="mt-3 flex flex-wrap gap-2">
        {[
          { text: "热门问题", action: () => router.push("/h5/search/result?q=拖拉") },
          { text: "小学生专区", action: () => router.push("/h5/search/result?q=小学") },
          { text: "初中生专区", action: () => router.push("/h5/search/result?q=初中") },
          { text: "高中生专区", action: () => router.push("/h5/search/result?q=高中") },
          { text: "家长急救包", action: () => router.push("/h5/search/result?q=急救") },
          { text: "今日推荐提示词", action: () => router.push("/h5/search/result?q=提示词") },
        ].map((tag) => (
          <button key={tag.text} type="button" onClick={tag.action}>
            <Tag>{tag.text}</Tag>
          </button>
        ))}
      </div>

      <section className="mt-4 space-y-2">
        <h3 className="text-center text-2xl font-semibold">全部场景 · 15 个大类</h3>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/h5/category/${category.id}`}
            className="block rounded-xl border border-[#CFD6C4] bg-white p-3"
          >
            <p className="font-semibold">{category.name}</p>
            <p className="text-xs text-[#7E8780]">{category.description}</p>
          </Link>
        ))}
      </section>

      <div className="mt-4 pb-4 text-center">
        <Link
          href="/h5/feedback"
          className="inline-block text-base font-semibold text-[#657166] underline decoration-[#99CDD8] decoration-2 underline-offset-4"
        >
          进入用户反馈
        </Link>
      </div>
    </>
  );
}
