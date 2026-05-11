"use client";

import { FormEvent, useEffect, useState } from "react";

export function FeedbackForm() {
  const [toast, setToast] = useState<string | null>(null);
  const [inlineMsg, setInlineMsg] = useState<string | null>(null);
  const [rating, setRating] = useState(4);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 5500);
    return () => window.clearTimeout(t);
  }, [toast]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setSubmitting(true);
    setInlineMsg(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const content = String(fd.get("content") ?? "").trim();
    if (!content) {
      setInlineMsg("请先填写反馈内容");
      setSubmitting(false);
      return;
    }

    const origin =
      typeof window !== "undefined" && window.location?.origin ? window.location.origin : "";

    let ok = false;
    try {
      const res = await fetch(`${origin}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          source: "H5",
          type: "内容建议",
          content,
          rating,
        }),
      });
      ok = res.ok;
    } catch {
      ok = false;
    }

    if (ok) {
      form.reset();
      setRating(4);
      const msg = "反馈成功，感谢你的反馈！";
      setToast(msg);
      setInlineMsg(msg);
      try {
        window.alert(msg);
      } catch {
        /* 内置浏览器可能禁用 alert */
      }
    } else {
      const err = "提交失败，请下滑使用「兼容提交」重试";
      setToast(err);
      setInlineMsg(err);
    }
    setSubmitting(false);
  }

  return (
    <>
      {inlineMsg ? (
        <div
          role="status"
          className="mb-2 rounded-lg border border-[#99CDD8] bg-[#E8F6FA] px-3 py-2 text-center text-sm font-semibold text-[#657166]"
        >
          {inlineMsg}
        </div>
      ) : null}

      <p className="text-xs text-[#7E8780]">你的建议会帮助我们持续优化内容质量。</p>

      <form
        onSubmit={(e) => void onSubmit(e)}
        className="relative z-[1] mt-3 space-y-3 rounded-xl border border-[#CFD6C4] bg-white p-3"
        autoComplete="off"
      >
        <h3 className="text-base font-semibold">请填写你的反馈</h3>
        <label className="block space-y-1">
          <textarea
            name="content"
            className="w-full rounded-lg border border-[#CFD6C4] px-3 py-2"
            rows={8}
            placeholder="例如：希望增加初中生“不愿沟通”场景模板..."
            required
          />
        </label>

        <fieldset className="border-0 p-0">
          <legend className="mb-1 shrink-0 text-sm font-semibold">体验评分：</legend>
          <div className="flex flex-nowrap items-center gap-1">
            <div className="flex flex-nowrap items-center" role="radiogroup" aria-label="体验评分">
              {[1, 2, 3, 4, 5].map((n) => {
                const active = n <= rating;
                return (
                  <label
                    key={n}
                    htmlFor={`rating-${n}`}
                    className="relative inline-flex min-h-[48px] min-w-[48px] cursor-pointer touch-manipulation select-none flex-col items-center justify-center [-webkit-tap-highlight-color:transparent]"
                    onClick={() => setRating(n)}
                  >
                    <input
                      id={`rating-${n}`}
                      type="radio"
                      name="rating-ui"
                      className="peer sr-only"
                      checked={rating === n}
                      onChange={() => setRating(n)}
                    />
                    <span
                      className={`text-[28px] leading-none peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#99CDD8] ${active ? "text-[#F3C3B2]" : "text-[#CFD6C4]"}`}
                      aria-hidden
                    >
                      ★
                    </span>
                  </label>
                );
              })}
            </div>
            <span className="ml-auto shrink-0 text-sm text-[#7E8780]">{rating} 分</span>
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={submitting}
          className="relative z-[2] w-full rounded-lg bg-[#F3C3B2] px-4 py-3 text-sm font-semibold touch-manipulation [-webkit-tap-highlight-color:transparent]"
        >
          {submitting ? "提交中..." : "提交反馈"}
        </button>
      </form>


      {toast ? (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-[9999] max-w-[min(92vw,360px)] -translate-x-1/2 rounded-xl border border-[#CFD6C4] bg-[#FDE8D3] px-4 py-3 text-center text-sm font-semibold text-[#657166] shadow-xl"
        >
          {toast}
        </div>
      ) : null}
    </>
  );
}
