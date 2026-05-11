"use client";

import { useState } from "react";

type FeedbackItem = {
  id: string;
  source: string;
  type: string;
  rating: number;
  content: string;
  status: string;
  createdAt: string;
};

export function FeedbackList({ items: initialItems }: { items: FeedbackItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("确定要删除这条反馈吗？")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/feedback?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item.id !== id));
        if (expandedId === id) setExpandedId(null);
      } else {
        alert("删除失败");
      }
    } catch {
      alert("删除失败，请检查网络");
    }
    setDeleting(null);
  }

  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-[#CFD6C4] bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#F7FAF8] text-[#7E8780]">
          <tr>
            <th className="px-3 py-2 font-semibold">来源</th>
            <th className="px-3 py-2 font-semibold">类型</th>
            <th className="px-3 py-2 font-semibold">评分</th>
            <th className="px-3 py-2 font-semibold">反馈内容</th>
            <th className="px-3 py-2 font-semibold">时间</th>
            <th className="px-3 py-2 font-semibold">操作</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-3 py-6 text-center text-[#7E8780]">
                暂无反馈
              </td>
            </tr>
          ) : (
            items.map((f) => (
              <tr
                key={f.id}
                className={`border-t border-[#CFD6C4] cursor-pointer hover:bg-[#F7FAF8] ${expandedId === f.id ? "bg-[#F7FAF8]" : ""}`}
                onClick={() => setExpandedId(expandedId === f.id ? null : f.id)}
              >
                <td className="px-3 py-2">{f.source}</td>
                <td className="px-3 py-2">{f.type}</td>
                <td className="px-3 py-2">{"★".repeat(f.rating)}</td>
                <td className="px-3 py-2 max-w-[200px]">
                  {expandedId === f.id ? (
                    <span className="whitespace-pre-wrap break-words">{f.content}</span>
                  ) : (
                    <span className="block truncate">{f.content}</span>
                  )}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-[#7E8780]">
                  {new Date(f.createdAt).toLocaleString("zh-CN")}
                </td>
                <td className="px-3 py-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(f.id);
                    }}
                    disabled={deleting === f.id}
                    className="rounded bg-red-100 px-2 py-1 text-xs text-red-600 hover:bg-red-200 disabled:opacity-50"
                  >
                    {deleting === f.id ? "删除中..." : "删除"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
