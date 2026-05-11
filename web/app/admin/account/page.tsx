"use client";

import { FormEvent, useState } from "react";
import { AdminShell } from "../_components";
export const dynamic = "force-dynamic";

export default function AccountPage() {
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@ai-sop.cn",
        currentPassword: fd.get("currentPassword"),
        newPassword: fd.get("newPassword"),
      }),
    });
    setMessage(res.ok ? "密码已更新" : "更新失败，请检查当前密码");
  }

  return (
    <AdminShell title="账号安全">
      <div className="rounded-xl border border-[#CFD6C4] bg-white p-4">
        <h3 className="text-base font-semibold">修改密码</h3>
        <form className="mt-3 space-y-3" onSubmit={onSubmit}>
          <label className="block space-y-1">
            <span className="text-sm font-semibold">当前密码</span>
            <input
              type="password"
              name="currentPassword"
              className="w-full rounded-lg border border-[#CFD6C4] px-3 py-2"
              placeholder="请输入"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-semibold">新密码</span>
            <input
              type="password"
              name="newPassword"
              className="w-full rounded-lg border border-[#CFD6C4] px-3 py-2"
              placeholder="请输入"
            />
          </label>
          <button className="rounded-lg bg-[#F3C3B2] px-4 py-2 text-sm font-semibold">
            保存密码
          </button>
          {message ? <p className="text-sm text-[#7E8780]">{message}</p> : null}
        </form>
      </div>
    </AdminShell>
  );
}
