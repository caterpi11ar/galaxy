# 项目初始化

## 项目概述
"Duo" - 多平台应用（web端、app、小程序）
- 登录方式：微信扫码登录 + Google登录（web端）
- 游戏平台，包含3个游戏包

## 第一阶段：环境初始化（仅搭建环境，不开发功能）

### 1. 基础环境搭建
- [ ] 1.1 创建根目录 package.json（pnpm workspace 配置）
- [ ] 1.2 安装 pnpm（如未安装）
- [ ] 1.3 创建 pnpm-workspace.yaml 配置文件
- [ ] 1.4 创建基础的 .gitignore 文件
- [ ] 1.5 创建 .npmrc 配置文件

### 2. Monorepo 目录结构创建
- [ ] 2.1 创建 `apps/` 目录
- [ ] 2.2 创建 `packages/` 目录
- [ ] 2.3 创建目录结构：
  ```
  apps/
    ├── web/          # React 19 + Vite + TypeScript
    └── server/       # 后端 API 服务
  packages/
    ├── core/         # 共享核心包
    ├── game-1/       # 游戏1包
    ├── game-2/       # 游戏2包
    └── game-3/       # 游戏3包
  ```

### 3. Web 应用环境搭建
- [ ] 3.1 初始化 `apps/web` - Vite + React 19 + TypeScript
- [ ] 3.2 配置 Tailwind CSS
- [ ] 3.3 安装并配置 shadcn/ui
- [ ] 3.4 安装 React Router
- [ ] 3.5 安装 TanStack Query (react-query)
- [ ] 3.6 创建基础的 Vite 配置文件

### 4. Server 应用环境搭建
- [ ] 4.1 初始化 `apps/server` 基础结构
- [ ] 4.2 配置 TypeScript
- [ ] 4.3 创建基础的服务器配置

### 5. 共享包环境搭建
- [ ] 5.1 初始化 `packages/core` - 共享类型和工具
- [ ] 5.2 初始化游戏包目录结构（game-1, game-2, game-3）
- [ ] 5.3 配置包间依赖关系

### 6. 开发工具配置
- [ ] 6.1 配置 ESLint（已存在，无需更新）
- [ ] 6.2 配置 Prettier
- [ ] 6.3 配置 TypeScript 根配置
- [ ] 6.4 配置 Git hooks（husky + lint-staged）
- [ ] 6.5 创建开发脚本命令

### 7. 验证环境
- [ ] 7.1 验证 pnpm 安装和 workspace 配置
- [ ] 7.2 验证各包可以正常安装依赖
- [ ] 7.3 验证 TypeScript 编译
- [ ] 7.4 验证 Web 应用可以启动
- [ ] 7.5 验证 Server 应用可以启动
- [ ] 7.6 验证 lint 和 format 命令正常工作

## 预期产出
✅ 完整的 monorepo 环境搭建
✅ 各应用和包的基础骨架
✅ 开发工具链配置完成
✅ 所有环境验证通过

## 不包括的内容（后续阶段）
- ❌ 具体业务功能开发
- ❌ 登录功能实现
- ❌ 游戏逻辑开发
- ❌ UI 组件开发
- ❌ API 接口实现