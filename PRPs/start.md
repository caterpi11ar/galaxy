# Galaxy 项目初始化 - Next.js 架构

## 项目概述
"Galaxy" - 多人在线星球互动游戏
- **技术架构**: Next.js 14+ 全栈开发
- **登录方式**: NextAuth.js（微信、GitHub、Google）
- **核心玩法**: 星球创建与绘制、互动评分系统、星球竞争机制、共享宇宙世界
- **实时机制**: 智能轮询 + SSE (Server-Sent Events)

## 第一阶段：Next.js 环境初始化

### 1. Next.js 基础环境搭建
- [x] 1.1 创建 Next.js 项目（`npx create-next-app@latest`）
- [x] 1.2 配置 TypeScript
- [ ] 1.3 配置 App Router 结构
- [x] 1.4 更新 .gitignore 文件
- [ ] 1.5 配置基础的 next.config.js

### 2. Next.js 目录结构创建
- [ ] 2.1 创建 App Router 目录结构：
  ```
  app/
    ├── api/          # API Routes (后端逻辑)
    │   ├── auth/     # 认证相关 API
    │   ├── game/     # 游戏相关 API
    │   └── ...
    ├── (game)/       # 游戏页面群组
    ├── auth/         # 认证页面
    ├── globals.css   # 全局样式
    └── layout.tsx    # 根布局
  components/         # React 组件
    ├── ui/           # 基础 UI 组件
    ├── game/         # 游戏相关组件
    └── ...
  lib/                # 工具库和配置
    ├── auth.ts       # NextAuth 配置
    ├── db.ts         # 数据库配置
    └── utils.ts      # 工具函数
  types/              # TypeScript 类型定义
    ├── game.ts       # 游戏相关类型
    ├── user.ts       # 用户相关类型
    └── ...
  games/              # 游戏逻辑模块
  public/             # 静态资源
  ```

### 3. UI 框架和样式配置
- [ ] 3.1 安装并配置 Tailwind CSS
- [ ] 3.2 安装并配置 shadcn/ui
- [ ] 3.3 创建基础的 UI 组件库
- [ ] 3.4 配置全局样式和主题
- [ ] 3.5 配置响应式设计基础

### 4. 认证系统环境搭建
- [ ] 4.1 安装并配置 NextAuth.js
- [ ] 4.2 配置 OAuth 提供商（GitHub、Google）
- [ ] 4.3 创建认证相关 API routes
- [ ] 4.4 配置会话管理
- [ ] 4.5 创建登录/登出组件

### 5. 数据库和状态管理
- [ ] 5.1 选择并配置数据库（建议 SQLite + Prisma）
- [ ] 5.2 创建数据库 schema（用户、星球、评分等）
- [ ] 5.3 配置 Prisma Client
- [ ] 5.4 创建基础的数据模型
- [ ] 5.5 配置客户端状态管理（React hooks/Context）

### 6. 实时通信架构搭建
- [ ] 6.1 创建游戏相关 API routes 结构
- [ ] 6.2 实现智能轮询机制（根据用户活跃度调整频率）
- [ ] 6.3 配置 SSE (Server-Sent Events) 基础架构
- [ ] 6.4 创建 Server Actions 基础
- [ ] 6.5 配置错误处理和日志系统
- [ ] 6.6 创建实时通信相关类型定义

### 7. 开发工具配置
- [x] 7.1 配置 ESLint（Next.js 配置）
- [x] 7.2 配置 TypeScript 严格模式
- [x] 7.3 配置 Git hooks（husky + lint-staged）
- [x] 7.4 创建开发脚本命令

### 8. Galaxy 环境验证
- [ ] 8.1 验证 Next.js 开发服务器启动
- [ ] 8.2 验证 TypeScript 编译无错误
- [ ] 8.3 验证 API routes 基础连接
- [ ] 8.4 验证智能轮询机制工作正常
- [ ] 8.5 验证 SSE 推送功能基础实现
- [ ] 8.6 验证认证系统基础功能
- [ ] 8.7 验证数据库连接和基础操作
- [ ] 8.8 验证 UI 组件库正常工作
- [ ] 8.9 验证构建和生产环境

## Galaxy 项目预期产出
✅ 完整的 Next.js 全栈环境搭建
✅ 认证系统基础架构（NextAuth.js）
✅ 数据库和数据模型设计
✅ UI 组件库和样式系统
✅ API routes 和 Server Actions 架构
✅ 智能轮询 + SSE 实时通信架构
✅ 开发工具链配置完成
✅ 所有环境验证通过

## 不包括的内容（后续阶段实现）
- ❌ 星球创建与绘制功能
- ❌ 完整的用户认证流程实现
- ❌ 星球互动评分系统
- ❌ 星球竞争和吞噬机制
- ❌ 具体的游戏 UI 界面
- ❌ 完整的游戏 API 接口实现
- ❌ 多人互动游戏逻辑

## 技术决策记录
- **架构变更**: 从 monorepo 改为 Next.js 单体应用，简化个人开发复杂度
- **实时通信**: 采用智能轮询 + SSE 混合方案，成本友好且体验良好
  - 阶段 1: 智能轮询（2-10秒动态频率）
  - 阶段 2: SSE 推送优化
- **认证方案**: 使用 NextAuth.js 统一处理多平台登录
- **数据库**: 推荐使用 Prisma + SQLite，便于开发和部署
