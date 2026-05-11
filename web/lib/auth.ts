import { cookies } from "next/headers";

export const ADMIN_SESSION_KEY = "admin_session";

export async function isAdminAuthenticated() {
  const jar = await cookies();
  return jar.get(ADMIN_SESSION_KEY)?.value === "ok";
}
