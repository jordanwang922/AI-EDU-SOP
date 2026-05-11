import { H5Shell } from "../../_components";

export default function CopySuccessPage() {
  return (
    <H5Shell title="复制成功提示" showBack backHref="/h5">
      <div className="rounded-xl border border-[#CFD6C4] bg-white p-4 text-center">
        <p className="text-sm text-[#7E8780]">方案详情（示意）</p>
        <p className="mt-3 text-lg font-semibold">已复制提示词</p>
      </div>
    </H5Shell>
  );
}
