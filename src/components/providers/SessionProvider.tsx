'use client'

import type { PropsWithChildren } from 'react'
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'

interface SessionProviderProps extends PropsWithChildren {
  // 可选的会话初始化数据
  session?: any
}

/**
 * NextAuth 会话提供者包装器
 * 为整个应用程序提供认证会话上下文
 */
export function SessionProvider({ children, session }: SessionProviderProps) {
  return (
    <NextAuthSessionProvider
      session={session}
      // 启用基础会话管理功能
      refetchInterval={5 * 60} // 5分钟自动刷新会话
      refetchOnWindowFocus={true} // 窗口重新获得焦点时刷新
    >
      {children}
    </NextAuthSessionProvider>
  )
}
