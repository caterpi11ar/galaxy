'use client'

import type { AuthState, User } from './types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { loginProviderManager } from './providers/base'

interface AuthStore extends AuthState {
  // 内部状态更新方法
  setUser: (user: User | null) => void
  setLoading: (provider: string | null, loading: boolean) => void
  setError: (error: string | null) => void
}

// 创建认证状态存储
export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        // 初始状态
        user: null,
        isAuthenticated: false,
        isInitialized: false,
        loginState: {
          provider: null,
          isLoading: false,
          error: null,
        },

        // 内部状态更新方法
        setUser: (user) => {
          set({
            user,
            isAuthenticated: !!user,
          })
        },

        setLoading: (provider, loading) => {
          set(state => ({
            ...state,
            loginState: {
              ...state.loginState,
              provider: loading ? provider : null,
              isLoading: loading,
            },
          }))
        },

        setError: (error) => {
          set(state => ({
            ...state,
            loginState: {
              ...state.loginState,
              error,
            },
          }))
        },

        // 公共方法
        async initialize() {
          try {
            // 检查是否有持久化的会话
            if (typeof window !== 'undefined') {
              const { getSession } = await import('next-auth/react')
              const session = await getSession()

              if (session?.user) {
                get().setUser({
                  id: session.user.id,
                  name: session.user.name || '',
                  email: session.user.email || null,
                  avatar: session.user.image || null,
                  wechatId: null,
                  googleId: null,
                  githubId: null,
                  isGuest: false,
                  provider: 'unknown', // TODO: 从 session 中获取
                  providerId: session.user.id,
                })
              }
            }
          }
          catch (error) {
            console.error('初始化认证状态失败:', error)
          }
          finally {
            set(state => ({
              ...state,
              isInitialized: true,
            }))
          }
        },

        async login(providerId: string) {
          const { setLoading, setError, setUser } = get()

          try {
            setError(null)
            setLoading(providerId, true)

            // 使用登录提供商管理器执行登录
            const result = await loginProviderManager.login(providerId)

            if (result.success && result.user) {
              // 登录成功，直接使用返回的 User 对象
              setUser(result.user)
              setError(null)
            }
            else {
              setError(result.error || '登录失败')
            }
          }
          catch (error) {
            const errorMessage = error instanceof Error
              ? error.message
              : '登录过程中发生未知错误'
            setError(errorMessage)
            console.error(`${providerId} 登录失败:`, error)
          }
          finally {
            setLoading(null, false)
          }
        },

        async logout() {
          try {
            // 执行 NextAuth 登出
            if (typeof window !== 'undefined') {
              const { signOut } = await import('next-auth/react')
              await signOut({ redirect: false })
            }

            // 清理本地状态
            get().setUser(null)
            get().setError(null)
          }
          catch (error) {
            console.error('登出失败:', error)
            get().setError('登出失败')
          }
        },

        clearError() {
          get().setError(null)
        },
      }),
      {
        name: 'galaxy-auth-storage',
        partialize: state => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      },
    ),
    {
      name: 'galaxy-auth-store',
    },
  ),
)

// 便捷的 hooks
export function useAuth() {
  const {
    user,
    isAuthenticated,
    isInitialized,
    loginState,
    login,
    logout,
    clearError,
    initialize,
  } = useAuthStore()

  return {
    user,
    isAuthenticated,
    isInitialized,
    loginState,
    login,
    logout,
    clearError,
    initialize,
  }
}

export function useLoginState() {
  const { loginState, clearError } = useAuthStore()
  return {
    ...loginState,
    clearError,
  }
}
