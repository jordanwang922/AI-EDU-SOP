import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#DAEBE3] px-6 py-10 text-[#657166]">
      <div className="mx-auto max-w-3xl rounded-2xl border border-[#CFD6C4] bg-white p-8">
        <h1 className="text-3xl font-semibold">AI亲子教育速查手册</h1>
        <p className="mt-3 text-sm text-[#7E8780]">
          当前包含家长端 H5 与运营后台低保真可开发页面。
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link className="entry-btn" href="/h5">
            进入家长端 H5
          </Link>
          <Link className="entry-btn" href="/admin/login">
            进入运营后台
          </Link>
        </div>
      </div>
    </main>
  );
}
