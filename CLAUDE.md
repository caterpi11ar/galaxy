# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is "Duo" - a multi-platform application designed for web, mobile app, and mini-program deployment.

### Authentication Methods
- WeChat QR code login (app + WeChat mini-program + web)
- Google + github login (web only)

## Commands

### Development Commands
```bash
# Start development server
pnpm dev

# Start only web development server
pnpm --filter web dev

# Start only server development
pnpm --filter server dev

# Build production version
pnpm build
```

### Code Quality Commands
```bash
# Lint and fix code
pnpm lint:fix

# Type check
pnpm typecheck
```

## Architecture

### Monorepo Structure
This is a pnpm workspace with multiple applications and packages:

- `apps/web/` - Main frontend React application (Vite + TypeScript + React 19)
- `apps/server/` - Application for server APIs
- `packages/core` - Shared packages
- `packages/*` - Games packages
  - `packages/game-1/` - Game 1
  - `packages/game-2/` - Game 2
  - `packages/game-3/` - Game 3

### Key Technologies
- **Frontend**: React 19, TypeScript, Vite
- **Backend**: Server APIs
- **Build Tools**: pnpm workspaces
- **Authentication**: WeChat QR code, Google OAuth

### Development Workflow
- Web app runs on development server with hot reload
- Server provides APIs and backend functionality
- Games are packaged as separate modules for modular development

### Code Quality Rules
1. Avoid code duplication - extract common types and components
2. Keep components focused - use hooks and component composition
3. Follow React best practices - proper Context usage, state management
4. Use TypeScript strictly - leverage type safety throughout

### Testing Strategy
- Check README.md and package.json scripts for test commands
- Verify builds work with `pnpm build`
- Validate types with type-check commands

## Cursor Rules Integration

### Code Quality Standards
- Avoid code duplication - extract common types and components when used multiple times
- Keep components focused - use hooks and component splitting for large logic blocks
- Master React philosophy - proper Context usage, component composition, state management to prevent re-renders

### Multi-Platform Considerations
- Design components to work across web, app, and mini-program environments
- Consider platform-specific authentication flows
- Ensure games are modular and platform-agnostic

## Important Notes
- This is a gaming platform with multi-platform support
- Authentication is primarily WeChat-based with Google as web fallback
- Games are developed as separate packages for modularity
- Focus on cross-platform compatibility

## Communication Principles

### Basic Communication Standards

- **Language Requirements**: Develop design theories in English, but always present final solutions in Chinese.
- **Expression Style**: Professional, precise, and user-centric. If there are any design issues, you will clearly identify them and identify potential improvements.
