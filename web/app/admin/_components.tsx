import Link from "next/link";

const navItems = [
  { href: "/admin/account", label: "账号安全" },
  { href: "/admin/directories", label: "一级/二级目录" },
  { href: "/admin/template", label: "详情模板配置" },
  { href: "/admin/problems", label: "问题详情编辑" },
  { href: "/admin/feedback", label: "用户反馈" },
];

export function AdminShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#DAEBE3] p-4 text-[#657166]">
      <div className="rounded-xl border border-[#CFD6C4] bg-white p-4">
        <header className="flex items-center border-b border-[#CFD6C4] pb-3">
          <h1 className="text-lg font-semibold">AI亲子教育速查手册 · 运营后台</h1>
          <h2 className="flex-1 text-center text-base font-semibold">{title}</h2>
          <span className="rounded-full bg-[#FDE8D3] px-3 py-1 text-xs">管理员</span>
        </header>

        <section className="mt-4 grid grid-cols-[220px_1fr] gap-4">
          <aside className="rounded-xl border border-[#CFD6C4] bg-[#EEF5F2] p-3">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg bg-[#FDE8D3] px-3 py-2 text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
          <section className="space-y-3">{children}</section>
        </section>
      </div>
    </main>
  );
}

export function AdminTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#CFD6C4] bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#F7FAF8] text-[#7E8780]">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-3 py-2 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-t border-[#CFD6C4]">
              {row.map((cell, i) => (
                <td
                  key={`${idx}-${i}`}
                  className={`px-3 py-2 ${i === row.length - 1 ? "text-[#99CDD8]" : ""}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
