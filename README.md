# Galaxy - 多人在线星球互动游戏

## 项目概述

Galaxy 是一款创新的多人在线互动像素风格小游戏，玩家在一个共享的宇宙中绘制、管理和竞争自己的星球。游戏采用实时互动机制，让玩家体验星球间的区域级竞争与协作。

## 技术架构

### 🛠️ 技术栈
- **框架**: Next.js 15.5.0 (App Router)
- **前端**: React 19 + TypeScript 5
- **后端**: Next.js API Routes
- **样式**: Tailwind CSS 4
- **代码质量**: ESLint + TypeScript 严格模式
- **状态管理**: React Hooks (计划升级到 Zustand)
- **认证**: 计划集成 NextAuth.js
- **数据库**: 计划集成 Prisma + PostgreSQL/SQLite
- **实时通信**: 计划集成 Socket.IO
- **部署**: Vercel (推荐)

### 📁 项目结构
```
# 项目目录结构
.
├── PRPs/                       # 项目相关文档目录
│   ├── start.md                # 项目启动说明文档
│   └── ui-design.md            # UI设计文档
├── src/                        # 源代码主目录
│   ├── app/                    # Next.js App Router 目录
│   │   ├── api/                # API 路由目录
│   │   │   └── auth/           # 认证相关API
│   │   │       └── [...nextauth]/ # NextAuth 动态路由
│   │   │           └── route.ts # NextAuth 路由处理文件
│   │   ├── globals.css         # 全局样式文件
│   │   ├── layout.tsx          # 应用全局布局组件
│   │   └── page.tsx            # 应用首页组件
│   ├── components/             # React 组件目录
│   │   ├── auth/               # 认证相关组件
│   │   │   └── NextAuthLoginModal.tsx # 登录模态框组件
│   │   ├── game/               # 游戏相关组件
│   │   │   ├── UniverseCanvas/ # 宇宙画布组件目录
│   │   │   │   ├── ClientOnlyCanvas.tsx # 客户端专有画布组件
│   │   │   │   ├── DebugGrid.tsx        # 调试网格组件
│   │   │   │   ├── Nebulae.tsx          # 星云组件
│   │   │   │   ├── PlanetComponent.tsx  # 行星组件
│   │   │   │   ├── PlanetInfoPanel.tsx  # 行星信息面板组件
│   │   │   │   ├── StarField.tsx        # 星空组件
│   │   │   │   ├── SystemPanel.tsx      # 系统面板组件
│   │   │   │   ├── UniverseCanvas.tsx   # 宇宙画布主组件
│   │   │   │   ├── UniverseLoadingScreen.tsx # 宇宙加载屏幕组件
│   │   │   │   ├── ZoomControls.tsx     # 缩放控制组件
│   │   │   │   └── index.ts             # 组件导出索引文件
│   │   │   └── GameHeader.tsx           # 游戏头部组件
│   │   └── providers/                   # React Context Providers
│   │       └── SessionProvider.tsx      # 会话状态提供者组件
│   ├── hooks/                           # 自定义 React Hooks 目录
│   │   ├── useGestures.ts               # 手势操作相关Hook
│   │   ├── useUniverseCanvas.ts         # 宇宙画布相关Hook
│   │   └── useUniverseGame.ts           # 游戏主逻辑Hook
│   ├── lib/                             # 项目核心库和工具函数
│   │   ├── auth/                        # 认证系统相关逻辑
│   │   │   ├── providers/               # 认证提供商
│   │   │   │   ├── base.ts              # 基础认证提供商
│   │   │   │   ├── github.ts            # GitHub认证提供商
│   │   │   │   ├── google.ts            # Google认证提供商
│   │   │   │   ├── guest.ts             # 游客认证提供商
│   │   │   │   ├── index.ts             # 认证提供商索引文件
│   │   │   │   └── wechat.ts            # 微信认证提供商
│   │   │   ├── config.ts                # 认证配置文件
│   │   │   ├── index.ts                 # 认证模块索引文件
│   │   │   ├── next-auth.d.ts           # NextAuth 类型定义文件
│   │   │   ├── nextauth-hooks.ts        # NextAuth 相关Hooks
│   │   │   ├── store.ts                 # 认证状态存储
│   │   │   ├── types.ts                 # 认证相关类型定义
│   │   │   └── utils.ts                 # 认证工具函数
│   │   ├── env.ts                       # 环境变量处理工具
│   │   └── mock-data.ts                 # 模拟数据文件
│   └── types/                           # TypeScript 类型定义目录
│       ├── account/                     # 账户相关类型
│       │   ├── README.md                # 账户类型说明文档
│       │   └── index.ts                 # 账户类型索引文件
│       ├── game/                        # 游戏相关类型
│       │   └── index.ts                 # 游戏类型索引文件
│       └── planet/                      # 行星相关类型
│           ├── README.md                # 行星类型说明文档
│           └── index.ts                 # 行星类型索引文件
├── .npmrc                               # npm 配置文件
├── CLAUDE.md                            # Claude 相关文档
├── README.md                            # 项目说明文档
├── Tree.md                              # 项目目录结构说明（当前文件）
├── eslint.config.mjs                    # ESLint 配置文件
├── next.config.ts                       # Next.js 配置文件
├── package.json                         # 项目依赖和脚本配置文件
├── pnpm-lock.yaml                       # pnpm 依赖锁定文件
├── postcss.config.mjs                   # PostCSS 配置文件
├── tailwind.config.ts                   # Tailwind CSS 配置文件
└── tsconfig.json                        # TypeScript 配置文件
```

```

### 🚀 快速开始

#### 环境要求
- Node.js >= 18.0.0
- npm/yarn/pnpm

#### 安装与运行
```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 类型检查
pnpm type-check

# 代码检查和修复
pnpm lint
pnpm lint:fix

# 构建生产版本
pnpm build && pnpm start
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 🏗️ 架构特性

#### 模块化设计
- **组件拆分**: 将单一页面拆分为多个可复用的游戏组件
- **TypeScript 类型安全**: 完整的类型定义和严格的类型检查
- **自定义 Hooks**: 封装游戏逻辑，提高代码复用性
- **Barrel Exports**: 统一的模块导出，简化 import 路径

#### 开发体验
- **路径映射**: 支持 `@/` 别名，简化模块引用
- **严格的 ESLint 规则**: 确保代码质量和一致性
- **TypeScript 严格模式**: 启用所有严格检查选项
- **热重载**: 开发时实时更新，提升开发效率

#### 项目规划
项目采用文档驱动开发，所有规划文档存放在 `PRPs/` 目录：
- **start.md**: Next.js 环境初始化任务清单
- **ui-design.md**: 像素风格 UI 开发任务清单
- **architecture-refactor.md**: 参考 Shiro 项目的架构重构计划

#### 实时通信架构
Galaxy 采用分阶段的实时通信方案：

**阶段 1 - 智能轮询 (当前)**：
- 绘制模式：2秒轮询频率
- 浏览模式：5秒轮询频率
- 空闲模式：10秒轮询频率

**阶段 2 - SSE 优化**：
- 服务器主动推送重要事件
- 轮询作为备份机制
- 成本友好的实时体验

## 核心玩法

### 🪐 星球创建与绘制
- **个性化星球设计**：玩家可以自由绘制星球的外观、地形和特色
- **多种星球类型**：支持不同类型的星球（岩石星球、气态巨行星、海洋星球等）
- **自定义装饰**：添加建筑物、植被、特殊地标等元素

### 🌟 互动评分系统
- **点赞/踩机制**：玩家可以对自己喜欢的星球点赞，对不喜欢的星球踩
- **实时评分**：星球评分实时更新，影响星球在宇宙中的影响力
- **评分权重**：不同玩家的评分权重可能不同（基于活跃度、历史表现等）

### ⚔️ 星球竞争机制
- **每日吞噬战**：每天结束后，高分星球会吞噬周围低分星球

### 🌍 共享宇宙世界
- **实时同步**：所有玩家共享同一个宇宙世界
- **动态地图**：宇宙地图实时更新，显示星球分布和势力范围
- **历史记录**：记录星球的发展历程和重要事件

## 技术特性

### 🔐 认证系统
- **微信登录**：通过 NextAuth.js 支持微信扫码快速登录
- **GitHub登录**：开发者友好的GitHub OAuth登录
- **Google登录**：国际化用户支持，通过 NextAuth.js 集成
- **游客模式**：无需注册即可体验基础功能

### 🚀 实时互动
- **智能轮询**：根据用户活跃度动态调整更新频率
- **SSE 推送**：Server-Sent Events 主动推送重要游戏事件
- **Server Actions**：无缝的客户端-服务端交互

### 📱 响应式设计
- **多设备支持**：支持桌面、平板、手机等多种设备
- **渐进式Web应用**：可考虑PWA特性提升用户体验

## 游戏机制详解

### 星球评分算法

### 吞噬机制
- **触发条件**：每日结算时，评分差距超过阈值的相邻星球
- **吞噬效果**：高分星球吸收低分星球的资源和影响力
- **保护机制**：新创建的星球有一定时间的保护期

### Phase 1: MVP版本
- [ ] 基础用户系统（三方登录）
- [ ] 星球创建和绘制功能
- [ ] 基础评分系统 点赞/踩 权重
- [ ] 简单的吞噬机制
- [ ] 基础UI界面

### Phase 2: 核心功能
- [ ] 实时互动系统
- [ ] 完整的评分算法
- [ ] 星球竞争机制
- [ ] 用户排行榜
- [ ] 移动端适配

### Phase 3: 优化扩展
- [ ] 性能优化
- [ ] 安全加固
- [ ] 国际化支持
- [ ] 第三方集成
- [ ] 商业化功能

## 联系方式

- **项目地址**：[GitHub Repository]
- **问题反馈**：[Issues]
- **功能建议**：[Discussions]

---

*Galaxy - 在虚拟宇宙中创造属于你的星球传奇*
