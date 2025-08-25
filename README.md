# Duo

## 希望适配 web端、app、小程序

## 登陆方式：微信扫码登陆 （app+微信小程序+web） + web google 登陆

### Monorepo Structure
This is a pnpm workspace with multiple applications and packages:

- `apps/web/` - Main frontend React application (Vite + TypeScript + React 19)
- `apps/server/` - application for server APIs
- `packages/core` - Shared packages
- `packages/*` - games packages
  - `packages/game-1/` - game-1
  - `packages/game-2/` - game-2
  - `packages/game-3/` - game-3

