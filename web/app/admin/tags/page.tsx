import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

/** 标签在各问题的「搜索关键词」中维护，不再单独开列表页。 */
export default function TagsPageRedirect() {
  redirect("/admin/problems");
}
