import { NextResponse } from "next/server";
import { ADMIN_SESSION_KEY } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_KEY, "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  return res;
}
