import Link from "next/link";

export function H5Shell({
  title,
  children,
  showBack = false,
  backHref = "/h5",
}: {
  title: string;
  children: React.ReactNode;
  showBack?: boolean;
  backHref?: string;
}) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[390px] bg-[#DAEBE3] px-4 py-2 text-[#657166]">
      <header className="flex items-center py-2">
        <div className="w-16">
          {showBack ? (
            <Link href={backHref} className="text-[#99CDD8]">
              ← 返回
            </Link>
          ) : null}
        </div>
        <h1 className="flex-1 text-center text-lg font-semibold">{title}</h1>
        <div className="w-16" />
      </header>
      {children}
    </main>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[#FDE8D3] px-3 py-1 text-xs">{children}</span>
  );
}
