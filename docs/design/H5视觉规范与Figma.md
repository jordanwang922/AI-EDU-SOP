# H5 视觉规范与 Figma

> 用于 1.0 家长端移动端 Web 的配色与字体层级对齐；开发时可对照本文与 Figma Variables。  
> **完整风格叙事、潘通/母婴趋势引用与色板 rationale 见 [`design.md`](./design.md)**（主文档）。

## Figma 文件（独立新项目）

本项目的界面规范放在 **新建的独立 Figma 文件**（未挂载在历史项目上），可在浏览器中打开协作与改版：

- **文件链接**：https://www.figma.com/design/Y3NfI9sPVwnH2QTmrlbPUo  
- **文件名称**：`AI亲子教育SOP · H5设计规范 v1`  
- **说明**：当前文件默认在账号 **Drafts** 下；若需归入团队「项目」文件夹，可在 Figma 侧移动到指定 Project（不影响链接中的 `file_key`）。

文件中已包含：

- **Variables 集合 `AI-SOP · Foundations`**：语义色、间距、圆角（供开发与 Figma 双向对齐）。
- **页面 `📐 Foundations · AI-SOP H5`**：封面说明、色板示意、字体层级参考。

## 语义色 Token（与 Variables 一致）

> 下表与 `design.md` 完全一致；若冲突以 **`design.md` 修订日期更新者**为准。

| Token | 用途 | Hex |
| --- | --- | --- |
| `color/text/primary` | 主标题、正文 | `#3D3835` |
| `color/text/secondary` | 次级说明 | `#7A7269` |
| `color/text/tertiary` | 辅助 | `#A89F94` |
| `color/bg/page` | 页面背景（燕麦米白） | `#FAF7F4` |
| `color/bg/elevated` | 卡片 / 浮层 | `#FFFFFF` |
| `color/border/subtle` | 分割线、描边 | `#E8E4DF` |
| `color/brand/primary` | 主按钮、链接（鼠尾草绿） | `#8FAE9D` |
| `color/brand/primary-pressed` | 主按钮按下 | `#6F927F` |
| `color/action/cta` | **强操作（复制提示词等）**（雾粉） | `#E5989B` |
| `color/action/cta-pressed` | CTA 按下 | `#CF7F84` |
| `color/semantic/success` | 成功 | `#89B89A` |
| `color/semantic/warning` | 警告 | `#D4A574` |
| `color/semantic/error` | 错误 | `#D48989` |

**基调**：**小清新、妈妈向** — 暖灰字 + 鼠尾草绿主色 + 雾粉强调；点缀可选 `#B8C5E0`（雾紫，小面积）。参见 `design.md` 第 2～3 节趋势说明。

## 间距与圆角 Token

| Token | 值 (px) | 用途 |
| --- | ---: | --- |
| `space/1` … `space/8` | 4, 8, 12, 16, 20, 24, 32 | 间距、内边距 |
| `radius/sm` / `md` / `lg` / `full` | 8, 12, 16, 999 | 卡片、按钮、胶囊 |

## 字体层级（移动端建议）

开发侧 H5 可使用系统字体栈（`-apple-system, BlinkMacSystemFont, …`），层级对应：

| 用途 | 建议字号 | 字重 |
| --- | ---: | --- |
| 导航标题 | 22 | Semibold |
| 卡片标题 | 17 | Semibold |
| 正文 | 15 | Regular |
| 次要说明 | 13 | Regular |
| 标签 / 元信息 | 12 | Medium |

具体组件（首页大类宫格、列表、详情、复制条）在后续迭代中可在同一 Figma 文件追加 **Page：Screens**。

## 修订记录

| 版本 | 日期 | 说明 |
| --- | --- | --- |
| 0.2 | 2026-05-10 | 对齐 `design.md` 小清新色板；旧 Sky+橙方案废止 |
| 0.1 | 2026-05-10 | 初版：独立 Figma 文件、Token 表与 Figma 画布示意 |
