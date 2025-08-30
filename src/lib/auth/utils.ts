import type { User } from './types'
import { AuthError } from './types'

/**
 * 验证用户是否为游客
 */
export function isGuestUser(user: User | null): boolean {
  return user?.id?.startsWith('guest_') || false
}

/**
 * 获取用户显示名称
 */
export function getUserDisplayName(user: User | null): string {
  if (!user)
    return '未登录'

  if (isGuestUser(user)) {
    return user.name || '游客'
  }

  return user.name || '用户'
}

/**
 * 获取用户头像URL
 */
export function getUserAvatar(user: User | null): string | null {
  if (!user)
    return null

  // 如果是游客，返回默认头像
  if (isGuestUser(user)) {
    return '/images/guest-avatar.png' // 或者返回 null 使用默认头像
  }

  return user.avatar || null
}

/**
 * 检查用户是否有特定权限
 */
export function hasPermission(user: User | null, permission: string): boolean {
  if (!user)
    return false

  // 游客用户权限限制
  if (isGuestUser(user)) {
    const guestPermissions = [
      'view_planets',
      'explore_universe',
      'basic_interaction',
    ]
    return guestPermissions.includes(permission)
  }

  // 正式用户拥有所有基础权限
  return true
}

/**
 * 格式化认证错误信息
 */
export function formatAuthError(error: unknown): string {
  if (error instanceof AuthError) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  return '登录过程中发生未知错误'
}

/**
 * 生成安全的重定向 URL
 */
export function getSafeRedirectUrl(url?: string): string {
  // 默认重定向到首页
  const defaultUrl = '/'

  if (!url)
    return defaultUrl

  try {
    const parsed = new URL(url, window.location.origin)

    // 只允许同域名的重定向
    if (parsed.origin === window.location.origin) {
      return parsed.pathname + parsed.search
    }
  }
  catch {
    // URL 解析失败，使用默认值
  }

  return defaultUrl
}

/**
 * 本地存储工具
 */
export const storage = {
  get: (key: string): any => {
    if (typeof window === 'undefined')
      return null

    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    }
    catch {
      return null
    }
  },

  set: (key: string, value: any): void => {
    if (typeof window === 'undefined')
      return

    try {
      localStorage.setItem(key, JSON.stringify(value))
    }
    catch {
      // 存储失败时忽略错误
    }
  },

  remove: (key: string): void => {
    if (typeof window === 'undefined')
      return

    try {
      localStorage.removeItem(key)
    }
    catch {
      // 移除失败时忽略错误
    }
  },
}

/**
 * 防抖函数 - 用于防止快速重复点击登录按钮
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): ((...args: Parameters<T>) => void) {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout)
      clearTimeout(timeout)

    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}
