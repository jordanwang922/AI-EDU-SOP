"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: fd.get("email"),
        password: fd.get("password"),
      }),
    });
    if (!res.ok) {
      const data = await res.json();
      setMessage(data.message ?? "登录失败");
      return;
    }
    router.push("/admin/account");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#DAEBE3] p-6 text-[#657166]">
      <section className="w-full max-w-md rounded-2xl border border-[#CFD6C4] bg-white p-6">
        <h1 className="text-2xl font-semibold">运营后台登录</h1>
        <p className="mt-1 text-sm text-[#7E8780]">登录后可维护目录、模板、标签和反馈。</p>
        <form className="mt-4 space-y-3" onSubmit={onSubmit}>
          <input
            name="email"
            className="w-full rounded-lg border border-[#CFD6C4] px-3 py-2"
            placeholder="账号：admin@ai-sop.cn"
            defaultValue="admin@ai-sop.cn"
          />
          <input
            name="password"
            className="w-full rounded-lg border border-[#CFD6C4] px-3 py-2"
            placeholder="密码：••••••••"
            type="password"
            defaultValue="Admin@123456"
          />
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="submit"
              className="rounded-lg bg-[#99CDD8] px-3 py-2 text-center text-sm font-semibold"
            >
              登录
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/account")}
              className="rounded-lg bg-[#FDE8D3] px-3 py-2 text-center text-sm font-semibold"
            >
              修改密码
            </button>
          </div>
          {message ? <p className="text-sm text-red-500">{message}</p> : null}
        </form>
      </section>
    </main>
  );
}
