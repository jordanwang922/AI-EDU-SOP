"use client";

import { useState } from "react";

export function CopyPromptCard({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = prompt;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <article className="relative mt-2 rounded-xl border border-[#CFD6C4] bg-[#FFF8F3] p-3">
      <h3 className="text-sm font-semibold">可复制提示词</h3>
      <p className="mt-2 whitespace-pre-wrap text-sm">{prompt}</p>
      <button
        type="button"
        onClick={handleCopy}
        className="mt-3 rounded-full bg-[#F3C3B2] px-4 py-2 text-sm font-semibold active:opacity-70"
      >
        {copied ? "✓ 已复制" : "一键复制"}
      </button>
      {copied ? (
        <span className="absolute right-3 top-3 rounded bg-[#657166] px-2 py-1 text-xs text-white">
          已复制到剪贴板
        </span>
      ) : null}
    </article>
  );
}
