import { H5Shell } from "../../_components";

export default function LoadingStatePage() {
  return (
    <H5Shell title="加载中" showBack backHref="/h5">
      <p className="text-sm text-[#7E8780]">加载中…</p>
      <div className="mt-3 space-y-2">
        <div className="h-4 rounded bg-[#CFD6C4]/50" />
        <div className="h-4 rounded bg-[#CFD6C4]/50" />
        <div className="h-4 rounded bg-[#CFD6C4]/50" />
      </div>
    </H5Shell>
  );
}
