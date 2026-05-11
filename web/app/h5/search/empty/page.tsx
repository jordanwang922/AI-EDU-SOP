import { H5Shell } from "../../_components";

export default function SearchEmptyPage() {
  return (
    <H5Shell title="搜索结果" showBack backHref="/h5/search">
      <div className="pt-8 text-center">
        <h2 className="text-xl font-semibold">没有找到「xxx」</h2>
        <p className="mt-2 text-sm text-[#7E8780]">换个关键词，或返回首页从分类进入</p>
      </div>
    </H5Shell>
  );
}
