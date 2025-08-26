# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Galaxy is an innovative multiplayer online interactive mini-game where players draw, manage, and compete for their own planets in a shared universe. The game uses real-time interactive mechanisms to allow players to experience regional-level competition and cooperation between planets.

### Authentication Methods
- WeChat QR code + Google + GitHub login
- Next.js built-in authentication with NextAuth.js

## Commands

### Development Commands
```bash
# Start Next.js development server
npm run dev
# or
yarn dev
# or
pnpm dev

# Build production version
npm run build
# or
yarn build
# or
pnpm build

# Start production server
npm run start
# or
yarn start
# or
pnpm start
```

### Code Quality Commands
```bash
# Lint and fix code
npm run lint
# or
pnpm lint

# Type check
npm run type-check
# or
pnpm type-check
```

## Architecture

### Next.js Full-Stack Structure
This is a modern Next.js 14+ application with the App Router:

- `app/` - Main application routes and layouts (App Router)
- `app/api/` - API routes for backend functionality
- `components/` - Reusable React components
- `lib/` - Shared utilities and configurations
- `public/` - Static assets
- `types/` - TypeScript type definitions
- `games/` - Game logic modules

### Key Technologies
- **Framework**: Next.js 14+ (App Router)
- **Frontend**: React 19, TypeScript
- **Backend**: Next.js API Routes
- **Database**: 待定 (建议 Prisma + PostgreSQL 或 SQLite)
- **Authentication**: NextAuth.js
- **Styling**: 待定 (建议 Tailwind CSS)
- **实时通信**: 智能轮询 + SSE (Server-Sent Events)

### Development Workflow
- Single repository with full-stack development
- API routes handle backend logic and database operations
- Server Actions for seamless client-server interactions
- 实时功能通过智能轮询 + SSE 混合方案实现
- Games implemented as separate modules in `/games` directory

### Code Quality Rules
1. Avoid code duplication - extract common types and components
2. Keep components focused - use hooks and component composition
3. Follow React best practices - proper Context usage, state management
4. Use TypeScript strictly - leverage type safety throughout
5. Utilize Server Actions for data mutations
6. Implement proper error boundaries and loading states

### Testing Strategy
- Use built-in Next.js testing capabilities
- Verify builds work with `npm run build`
- Validate types with type-check commands
- Test API routes independently

## Next.js Specific Patterns

### File-based Routing
- Use App Router for all new development
- API routes in `app/api/` directory
- Server Components by default, Client Components when needed

### Data Fetching
- Server Components for data fetching
- Server Actions for mutations
- Client-side state management with React hooks

### Web-First 开发重点
- 专注于 Web 平台的 Next.js 开发
- 响应式设计支持不同屏幕尺寸
- 使用 Next.js 中间件处理路由逻辑

## Important Notes
- This is a gaming platform built with Next.js full-stack architecture
- Authentication uses NextAuth.js with WeChat and Google providers
- Games are developed as modules within the single Next.js application
- Focus on leveraging Next.js features for optimal performance

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

## Communication Principles

### Basic Communication Standards

- **Language Requirements**: Develop design theories in English, but always present final solutions in Chinese.
- **Expression Style**: Professional, precise, and user-centric. If there are any design issues, you will clearly identify them and identify potential improvements.
