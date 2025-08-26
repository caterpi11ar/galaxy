# CLAUDE.md

此文件为 Claude Code 在此代码仓库中工作时提供指导。

## 项目概述

Galaxy 是一个创新的多人在线互动小游戏，玩家可以绘制、管理自己的星球，并在共享宇宙中竞争。游戏使用实时互动机制，让玩家体验星球之间的区域级竞争与合作。

### 认证方式
- 微信二维码 + Google + GitHub 登录
- 使用 NextAuth.js 的 Next.js 内置认证

## 命令

### 开发命令
```bash
# 启动 Next.js 开发服务器
# 或
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

### 代码质量命令
```bash
# 检查和修复代码
pnpm lint

# 类型检查
pnpm type-check
```

## 架构

### Next.js 全栈结构
这是一个使用 App Router 的现代 Next.js 14+ 应用程序：

- `app/` - 主应用程序路由和布局（App Router）
- `app/api/` - 后端功能的 API 路由
- `components/` - 可重用的 React 组件
- `lib/` - 共享工具和配置
- `public/` - 静态资源
- `types/` - TypeScript 类型定义
- `games/` - 游戏逻辑模块

### 核心技术
- **框架**: Next.js 14+ (App Router)
- **前端**: React 19, TypeScript
- **后端**: Next.js API Routes
- **数据库**: 待定 (建议 Prisma + PostgreSQL 或 SQLite)
- **认证**: NextAuth.js
- **样式**: 待定 (建议 Tailwind CSS)
- **实时通信**: 智能轮询 + SSE (Server-Sent Events)

### 开发工作流
- 单仓库全栈开发
- API 路由处理后端逻辑和数据库操作
- Server Actions 实现无缝客户端-服务器交互
- 实时功能通过智能轮询 + SSE 混合方案实现
- 游戏作为 `/games` 目录中的独立模块实现

### 代码质量规则
1. 避免代码重复 - 提取通用类型和组件
2. 保持组件专注 - 使用 hooks 和组件组合
3. 遵循 React 最佳实践 - 正确使用 Context 和状态管理
4. 严格使用 TypeScript - 充分利用整个应用的类型安全
5. 利用 Server Actions 进行数据变更
6. 实现适当的错误边界和加载状态

### 测试策略
- 使用内置的 Next.js 测试功能
- 使用 `npm run build` 验证构建工作
- 使用类型检查命令验证类型
- 独立测试 API 路由

## Next.js 特定模式

### 基于文件的路由
- 所有新开发使用 App Router
- API 路由放在 `app/api/` 目录中
- 默认使用 Server Components，需要时使用 Client Components

### 数据获取
- Server Components 用于数据获取
- Server Actions 用于数据变更
- 使用 React hooks 进行客户端状态管理

### Web 优先开发重点
- 专注于 Web 平台的 Next.js 开发
- 响应式设计支持不同屏幕尺寸
- 使用 Next.js 中间件处理路由逻辑

## 重要说明
- 这是一个基于 Next.js 全栈架构构建的游戏平台
- 认证使用 NextAuth.js 配合微信和 Google 提供商
- 游戏作为单个 Next.js 应用程序内的模块开发
- 专注于利用 Next.js 功能实现最佳性能

## 实时通信架构设计

### 分阶段实时通信方案
**阶段 1: 智能轮询 (MVP)**
- 根据用户活跃度动态调整轮询频率
- 绘制模式: 2秒, 浏览模式: 5秒, 空闲模式: 10秒
- 使用 React hooks 实现客户端轮询管理

**阶段 2: SSE 推送优化**
- Server-Sent Events 用于服务器主动推送重要事件
- 轮询作为后备机制确保数据一致性
- 适合星球状态更新、评分变化等事件

### 成本优化策略
- 避免持久连接成本，友好支持 Serverless 部署
- 智能缓存减少重复数据传输
- 数据差异化更新，只传输变化部分

## 沟通原则

### 基本沟通标准

- **语言要求**: 用英语开发设计理论，但始终用中文展示最终解决方案。
- **表达风格**: 专业、精确、以用户为中心。如果有任何设计问题，您将明确识别它们并指出潜在的改进方案。
