"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LABELS: Record<string, string> = {
  l1_saved: "一级目录已保存",
  l1_created: "一级目录已新增",
  l1_deleted: "一级目录已删除",
  l2_saved: "二级问题已保存",
  l2_added: "二级问题已新增",
  l2_deleted: "二级问题已删除",
};

export function ToastBanner({
  code,
  selectedId,
}: {
  code: string | undefined;
  selectedId: string;
}) {
  const router = useRouter();
  const text = code ? LABELS[code] ?? decodeURIComponent(code) : null;

  useEffect(() => {
    if (!code) return;
    const t = window.setTimeout(() => {
      const qs =
        selectedId.length > 0 ? `?selected=${encodeURIComponent(selectedId)}` : "";
      router.replace(`/admin/directories${qs}`, { scroll: false });
    }, 3200);
    return () => window.clearTimeout(t);
  }, [code, router, selectedId]);

  if (!text) return null;

  return (
    <div
      role="status"
      className="rounded-xl border border-[#99CDD8] bg-[#E8F6FA] px-4 py-3 text-center text-sm font-semibold text-[#657166] shadow-sm"
    >
      {text}
    </div>
  );
}
