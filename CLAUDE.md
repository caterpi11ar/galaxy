# CLAUDE.md

此文件为 Claude Code 在此代码仓库中工作时提供指导。

## 项目概述

Galaxy 是一个创新的多人在线互动小游戏，玩家可以绘制、管理自己的星球，并在共享宇宙中竞争。游戏使用实时互动机制，让玩家体验星球之间的区域级竞争与合作。

## 参考项目
- https://github.com/Innei/Shiro

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

# 安装核心依赖
pnpm add @use-gesture/react framer-motion zustand @tanstack/react-query
pnpm add react-hook-form @hookform/resolvers zod
pnpm add clsx tailwind-merge date-fns lodash-es react-hot-toast

# 安装开发依赖
pnpm add -D @types/lodash-es
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
- **数据库**: Prisma + PostgreSQL (生产) / SQLite (开发)
- **认证**: NextAuth.js
- **样式**: Tailwind CSS + Headless UI
- **实时通信**: 智能轮询 + SSE (Server-Sent Events)
- **状态管理**: Zustand
- **交互处理**: @use-gesture/react (跨平台手势支持)
- **动画**: Framer Motion
- **表单验证**: React Hook Form + Zod

### 开发工作流
- 单仓库全栈开发
- API 路由处理后端逻辑和数据库操作
- Server Actions 实现无缝客户端-服务器交互
- 实时功能通过智能轮询 + SSE 混合方案实现
- 游戏作为 `/games` 目录中的独立模块实现

### 代码质量规则
1. **优先使用成熟第三方库** - 避免重复造轮子，选择经过验证的开源解决方案
2. **跨平台交互一致性** - 所有交互事件必须同时考虑 PC 和移动端，使用 @use-gesture/react 统一处理
3. **严格 TypeScript 类型安全** - 充分利用类型系统，使用 Zod 进行运行时验证
4. **组件单一职责** - 使用成熟的 hooks 库和组件组合模式
5. **无障碍优先设计** - 使用 Radix UI、Headless UI 等支持 ARIA 的组件库
6. **性能优化** - 利用 React Query 缓存、Framer Motion 优化动画、Immer 处理状态
7. **错误处理和边界** - 实现完整的错误边界和加载状态管理
8. **避免自定义实现** - 表单用 React Hook Form，日期用 date-fns，工具函数用 lodash-es

### 测试策略
- 使用内置的 Next.js 测试功能
- 使用 `pnpm type-check` 验证构建工作
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

## 跨平台交互设计

### 手势和交互兼容性
**核心库**: `@use-gesture/react` - 统一处理触摸、鼠标、键盘交互

**支持的交互类型**:
- **拖拽** (useDrag): 星球移动、画布平移
- **缩放** (usePinch): 画布缩放、星球详情查看
- **滑动** (useSwipeable): 页面切换、菜单操作
- **长按** (useLongPress): 右键菜单、详细操作
- **滚动** (useScroll): 列表浏览、内容滚动

### 响应式交互策略
```typescript
// PC 和移动端统一手势处理示例
const bind = useGesture({
  onDrag: ({ offset: [x, y], down }) => {
    // PC: 鼠标拖拽, 移动: 手指拖拽
    setPlanetPosition({ x, y })
  },
  onPinch: ({ scale, origin }) => {
    // PC: Ctrl+滚轮, 移动: 双指缩放
    setZoom(scale)
  },
  onWheel: ({ delta: [, dy] }) => {
    // PC 专用: 鼠标滚轮处理
    if (!isMobile)
      setScrollY(prev => prev + dy)
  }
})
```

### 设备特定优化
- **PC端**: 支持快捷键、右键菜单、精确鼠标操作
- **移动端**: 触觉反馈、手势导航、屏幕自适应
- **通用**: 键盘无障碍支持、语音辅助兼容

## 推荐第三方库生态

### UI 组件库
- **Radix UI**: 高质量无障碍组件库
- **React Aria**: Adobe 的无障碍组件库
- **Shadcn UI**: 高质量组件库

### 动画和过渡
- **React Transition Group**: 组件进出过渡
- **Lottie React**: 复杂动画播放

### 数据管理
- **Zustand**: 轻量级状态管理
- **React Query/TanStack Query**: 服务器状态管理
- **Immer**: 不可变状态更新

### 表单和验证
- **React Hook Form**: 高性能表单库
- **Zod**: TypeScript 优先的模式验证
- **Yup**: 对象模式验证

### 工具库
- **date-fns**: 现代化日期处理
- **lodash-es**: 实用工具函数（ES 模块版本）
- **clsx**: 条件类名处理
- **React Hot Toast**: 轻量级通知组件

### 图形和画布
- pixi.js + react-pixi

### 开发工具
- **Storybook**: 组件开发和文档
- **React Developer Tools**: 调试工具
- **Lighthouse**: 性能和可访问性审计

## 项目开发进展

### 当前完成功能

#### 认证系统 ✅
- **位置**: `src/lib/auth/`
- **状态**: 已完成核心架构和集成
- **组件**:
  - `store.ts` - Zustand 认证状态管理
  - `providers/` - 登录提供商实现
    - `base.ts` - 基础登录提供商抽象类
    - `guest.ts` - 游客模式登录
    - `github.ts` - GitHub OAuth 登录
    - `google.ts` - Google OAuth 登录
  - `types.ts` - 认证相关类型定义
  - `index.ts` - 统一导出接口

#### UI 组件系统 ✅
- **位置**: `src/components/`
- **状态**: 基础组件和认证组件已完成
- **组件**:
  - `auth/LoginModal.tsx` - 登录弹窗组件
  - `game/GameHeader.tsx` - 游戏头部组件（已集成认证）
  - `ui/` - 基础 UI 组件库

#### 设计系统 ✅
- **位置**: `src/styles/` 和 Tailwind 配置
- **状态**: 完整的像素风格设计系统
- **特性**:
  - 太空主题色彩系统
  - 像素化动画效果
  - 响应式布局支持
  - 无障碍设计原则

### 最近完成的任务

#### GameHeader 组件认证集成 (2025-08-29)
- ✅ 集成 `useAuth` hook 到 GameHeader 组件
- ✅ 实现登录/登出按钮状态切换
- ✅ 添加登录弹窗控制逻辑
- ✅ 显示用户信息（姓名、状态）
- ✅ 通过 TypeScript 类型检查
- ✅ 通过 ESLint 代码规范检查

### 技术架构特点

#### 认证架构设计
- **模式**: 提供商模式 + Zustand 状态管理
- **扩展性**: 支持多种登录方式（游客、GitHub、Google）
- **类型安全**: 完整的 TypeScript 类型定义
- **状态持久化**: Zustand persist 中间件
- **错误处理**: 统一的错误格式化和处理

#### 组件设计原则
- **职责分离**: 认证逻辑与 UI 组件分离
- **可复用性**: hooks 和组件高度可复用
- **无障碍性**: 遵循 ARIA 标准
- **响应式**: 适配多种设备尺寸

### 下一步开发计划

#### 待开发功能
1. **游戏核心逻辑**
   - 星球绘制系统
   - 多人实时交互
   - 宇宙画布管理

2. **后端 API**
   - NextAuth.js 配置
   - 数据库模型设计
   - API 路由实现

3. **实时通信**
   - 智能轮询机制
   - SSE 事件推送
   - 数据同步策略

## 沟通原则

### 基本沟通标准

- **语言要求**: 用英语开发设计理论，但始终用中文展示最终解决方案。
- **表达风格**: 专业、精确、以用户为中心。如果有任何设计问题，您将明确识别它们并指出潜在的改进方案。
