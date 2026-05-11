/** H5 多为数据库驱动页面，避免子路由被静态预渲染成旧逻辑 */
export const dynamic = "force-dynamic";

export default function H5Layout({ children }: { children: React.ReactNode }) {
  return children;
}
