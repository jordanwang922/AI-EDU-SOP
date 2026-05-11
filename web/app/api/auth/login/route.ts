import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { ADMIN_SESSION_KEY } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ ok: false, message: "账号不存在" }, { status: 401 });
  }
  const matched = await bcrypt.compare(password, user.passwordHash);
  if (!matched) {
    return NextResponse.json({ ok: false, message: "密码错误" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_KEY, "ok", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  return res;
}
