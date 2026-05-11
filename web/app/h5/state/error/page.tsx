import { H5Shell } from "../../_components";

export default function ErrorStatePage() {
  return (
    <H5Shell title="网络异常" showBack backHref="/h5">
      <h2 className="text-lg font-semibold">网络不太好</h2>
      <p className="mt-2 text-sm text-[#7E8780]">请稍后再试，或检查网络连接</p>
      <button className="mt-4 rounded-lg bg-[#F3C3B2] px-4 py-2 text-sm font-semibold">
        重试
      </button>
    </H5Shell>
  );
}
