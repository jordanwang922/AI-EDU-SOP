import { H5Shell } from "../_components";
import { FeedbackForm } from "./feedback-form";

export const dynamic = "force-dynamic";

export default async function FeedbackPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; err?: string }>;
}) {
  const sp = await searchParams;

  return (
    <H5Shell title="用户反馈" showBack backHref="/h5">
      {sp.sent === "1" ? (
        <div
          role="status"
          className="mb-3 rounded-xl border border-[#99CDD8] bg-[#E8F6FA] px-4 py-3 text-center text-sm font-semibold text-[#657166]"
        >
          ✓ 反馈已提交，感谢你的参与！
        </div>
      ) : null}
      {sp.err === "empty" ? (
        <div className="mb-3 rounded-xl border border-[#F3C3B2] bg-[#FDE8D3] px-4 py-3 text-center text-sm font-semibold text-[#657166]">
          请先填写反馈内容再提交。
        </div>
      ) : null}
      <FeedbackForm />
    </H5Shell>
  );
}
