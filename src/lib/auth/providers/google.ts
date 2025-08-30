import type { ReactNode } from 'react'
import type { AuthResult, LoginProviderConfig, User } from '../types'
import { BaseLoginProvider } from './base'

/**
 * Google 登录提供商
 */
export class GoogleLoginProvider extends BaseLoginProvider {
  constructor() {
    const config: LoginProviderConfig = {
      id: 'google',
      name: 'Google 账号登录',
      icon: 'G' as ReactNode, // Google 图标使用字母临时替代
      color: 'stellar-red',
      description: '使用 Google 账号登录',
      enabled: true,
    }
    super(config)
  }

  async authenticate(): Promise<AuthResult> {
    try {
      // 使用 NextAuth 的 signIn 方法
      const { signIn } = await import('next-auth/react')
      const result = await signIn('google', {
        redirect: false,
        callbackUrl: '/',
      })

      if (result?.error) {
        return {
          success: false,
          error: this.formatError(result.error),
        }
      }

      if (result?.ok) {
        // 获取用户信息
        const profile = await this.getProfile()
        return {
          success: true,
          user: profile,
        }
      }

      return {
        success: false,
        error: 'Google 登录失败，请重试',
      }
    }
    catch (error) {
      return {
        success: false,
        error: this.formatError(error),
      }
    }
  }

  async getProfile(_token?: string): Promise<User> {
    // 从 NextAuth session 获取用户信息
    const { getSession } = await import('next-auth/react')
    const session = await getSession()

    if (!session?.user) {
      throw new Error('无法获取用户信息')
    }

    return {
      id: session.user.id || 'google-unknown',
      name: session.user.name || 'Google 用户',
      email: session.user.email || null,
      avatar: session.user.image || null,
      wechatId: null,
      googleId: session.user.id || 'google-unknown',
      githubId: null,
      provider: 'google',
      providerId: session.user.id || 'google-unknown',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }

  async signOut(): Promise<void> {
    const { signOut } = await import('next-auth/react')
    await signOut({ redirect: false })
  }

  formatError(error: any): string {
    if (typeof error === 'string') {
      switch (error) {
        case 'OAuthSignin':
          return 'Google 授权失败，请重试'
        case 'OAuthCallback':
          return 'Google 回调处理失败'
        case 'OAuthCreateAccount':
          return '创建 Google 账户失败'
        case 'EmailCreateAccount':
          return '邮箱关联失败'
        case 'Callback':
          return 'Google 登录回调错误'
        case 'AccessDenied':
          return '您拒绝了 Google 授权'
        default:
          return 'Google 登录失败，请稍后重试'
      }
    }

    return super.formatError(error)
  }
}
