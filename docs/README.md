# 文档索引（AI 亲子教育 SOP 系统）

本目录集中存放产品说明、设计、架构及协作规范。**请勿把运行时代码或密钥放在 `docs/` 下。**

## 产品与需求

| 文档 | 说明 |
| --- | --- |
| [prd/AI亲子教育SOP系统_完整问题树_H5后台设计_V1.1.md](./prd/AI亲子教育SOP系统_完整问题树_H5后台设计_V1.1.md) | 原始 PRD：问题树、H5 信息架构、后台模块、字段建议、版本路线图 |

## 设计与架构

| 文档 | 说明 |
| --- | --- |
| [design/产品设计说明书.md](./design/产品设计说明书.md) | 目标用户、核心流程、**1.0 边界（无登录、后台 AI）**、演进路径 |
| [design/design.md](./design/design.md) | **设计风格主文档**：小清新妈妈向、潘通/pastel 参考、完整 Hex Token |
| [design/H5视觉规范与Figma.md](./design/H5视觉规范与Figma.md) | **Figma 链接**、颜色 / 间距 Token、字体层级（色值与 design.md 对齐） |
| [design/Figma-家长端页面示意.md](./design/Figma-家长端页面示意.md) | **家长端 + 后台全链路线框**在 Figma 中的分页与 Frame 清单 |
| [architecture/技术架构说明书.md](./architecture/技术架构说明书.md) | 前后端分离、**1.0 实施范围**、豆包封装、一键生成词条接口 |
| [architecture/数据模型与扩展性.md](./architecture/数据模型与扩展性.md) | PostgreSQL 表级预留、**AI 生成作业表**、家长用户表占位 |

## 协作与维护

| 文档 | 说明 |
| --- | --- |
| [meta/文档维护规范.md](./meta/文档维护规范.md) | 开发日志 / 交接日志填写规则、超过 500 行归档办法 |
| [development/开发日志.md](./development/开发日志.md) | 每次开发结束由当前执行的 AI 追加记录 |
| [development/交接日志.md](./development/交接日志.md) | 跨工具（Cursor / Codex / Antigravity 等）接手必读 |

## 后续可扩展文档（占位）

以下目录或文件可在迭代中按需新增，名称仅作建议：

- `api/`：OpenAPI 或接口约定草案  
- `ops/`：部署、环境变量清单（不含密钥值）、监控与备份  
- `security/`：权限模型、内容审核、AI 生成安全边界  
- `analytics/`：埋点字典、核心指标定义  

在根目录 `README.md`（项目说明）创建后，可从该处链回本索引。
