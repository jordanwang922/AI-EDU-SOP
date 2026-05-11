import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { email, currentPassword, newPassword } = await req.json();
  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ ok: false, message: "账号不存在" }, { status: 404 });

  const ok = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!ok) return NextResponse.json({ ok: false, message: "当前密码错误" }, { status: 401 });

  const hash = await bcrypt.hash(newPassword, 10);
  await prisma.adminUser.update({
    where: { email },
    data: { passwordHash: hash },
  });
  return NextResponse.json({ ok: true });
}
