import type { ReactNode } from 'react'
import type { Account } from '@/types/account'

// 用户信息接口 - 基于现有的 Account 类型
export interface User extends Account {
  provider: string // 当前登录的提供商
  providerId: string // 在该提供商中的 ID
}

// 认证结果
export interface AuthResult {
  success: boolean
  user?: User
  error?: string
  redirectUrl?: string
}

// 登录状态
export interface LoginState {
  provider: string | null
  isLoading: boolean
  error: string | null
}

// 认证存储状态
export interface AuthState {
  // 用户状态
  user: User | null
  isAuthenticated: boolean
  isInitialized: boolean

  // 登录状态
  loginState: LoginState

  // 方法
  login: (providerId: string) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
  initialize: () => Promise<void>
}

// 登录提供商配置
export interface LoginProviderConfig {
  id: string
  name: string
  icon: ReactNode
  color: string
  description: string
  enabled: boolean
}

// 错误类型
export class AuthError extends Error {
  constructor(message: string, public provider?: string, public code?: string) {
    super(message)
    this.name = 'AuthError'
  }
}
