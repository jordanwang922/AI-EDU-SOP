import { prisma } from "@/lib/prisma";
import H5HomeClient from "./home-client";
export const dynamic = "force-dynamic";

export default async function H5HomePage() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <main className="mx-auto min-h-screen w-full max-w-[390px] bg-[#DAEBE3] px-4 py-2 text-[#657166]">
      <H5HomeClient categories={categories} />
    </main>
  );
}
