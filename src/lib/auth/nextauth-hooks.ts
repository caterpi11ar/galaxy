'use client'

import type { LoginState, User } from './types'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useCallback } from 'react'

/**
 * NextAuth 会话状态类型映射
 */
interface NextAuthSession {
  user?: {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    provider?: string
    providerId?: string
  }
  expires: string
}

/**
 * 将 NextAuth 用户数据转换为应用程序用户类型
 */
function mapNextAuthUser(nextAuthUser: NextAuthSession['user']): User | null {
  if (!nextAuthUser)
    return null

  return {
    id: nextAuthUser.id || 'unknown',
    name: nextAuthUser.name || 'Unknown User',
    email: nextAuthUser.email || null,
    avatar: nextAuthUser.image || null,
    wechatId: null,
    googleId: nextAuthUser.provider === 'google' ? (nextAuthUser.id || null) : null,
    githubId: nextAuthUser.provider === 'github' ? (nextAuthUser.id || null) : null,
    provider: nextAuthUser.provider || 'unknown',
    providerId: nextAuthUser.providerId || 'unknown',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

/**
 * NextAuth 集成 hook
 * 提供与现有认证系统兼容的接口
 */
export function useNextAuth() {
  const { data: session, status, update } = useSession()

  // 转换用户数据
  const user = mapNextAuthUser(session?.user)

  // 登录状态计算
  const isLoading = status === 'loading'
  const isAuthenticated = status === 'authenticated' && user !== null

  // 登录方法
  const handleSignIn = useCallback(async (providerId: string) => {
    try {
      const result = await signIn(providerId, {
        redirect: false, // 不自动重定向，让前端处理
        callbackUrl: window.location.origin, // 登录成功后的回调 URL
      })

      if (result?.error) {
        throw new Error(`登录失败: ${result.error}`)
      }

      return result
    }
    catch (error) {
      console.error('NextAuth 登录错误:', error)
      throw error
    }
  }, [])

  // 登出方法
  const handleSignOut = useCallback(async () => {
    try {
      await signOut({
        redirect: false, // 不自动重定向
        callbackUrl: window.location.origin,
      })
    }
    catch (error) {
      console.error('NextAuth 登出错误:', error)
      throw error
    }
  }, [])

  // 刷新会话
  const refreshSession = useCallback(async () => {
    try {
      await update()
    }
    catch (error) {
      console.error('刷新会话错误:', error)
      throw error
    }
  }, [update])

  return {
    // 用户状态
    user,
    isLoading,
    isAuthenticated,
    session,

    // 操作方法
    signIn: handleSignIn,
    signOut: handleSignOut,
    refreshSession,

    // 原始 NextAuth 状态（用于调试）
    _raw: {
      status,
      session,
    },
  }
}

/**
 * NextAuth 登录状态 hook
 * 用于跟踪登录过程中的状态
 */
export function useNextAuthLoginState(): LoginState {
  const { status } = useSession()

  return {
    isLoading: status === 'loading',
    error: null, // NextAuth 错误通过其他方式处理
    provider: null, // NextAuth 不直接提供当前登录的提供商信息
  }
}
