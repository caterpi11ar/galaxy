import type { ReactNode } from 'react'
import type { AuthResult, LoginProviderConfig, User } from '../types'
import { BaseLoginProvider } from './base'

/**
 * 微信登录提供商
 */
export class WeChatLoginProvider extends BaseLoginProvider {
  constructor() {
    const config: LoginProviderConfig = {
      id: 'wechat',
      name: '微信扫码登录',
      icon: '💬' as ReactNode, // 微信图标使用 emoji 临时替代
      color: 'stellar-green',
      description: '使用微信快速登录',
      enabled: true,
    }
    super(config)
  }

  async authenticate(): Promise<AuthResult> {
    try {
      // 使用 NextAuth 的 signIn 方法
      const { signIn } = await import('next-auth/react')
      const result = await signIn('wechat', {
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
        error: '微信登录失败，请重试',
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
      id: session.user.id,
      name: session.user.name || '微信用户',
      email: session.user.email || null,
      avatar: session.user.image || null,
      wechatId: session.user.id,
      googleId: null,
      githubId: null,
      isGuest: false,
      provider: 'wechat',
      providerId: session.user.id,
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
          return '微信授权失败，请重试'
        case 'OAuthCallback':
          return '微信回调处理失败'
        case 'OAuthCreateAccount':
          return '创建微信账户失败'
        case 'EmailCreateAccount':
          return '邮箱关联失败'
        case 'Callback':
          return '微信登录回调错误'
        default:
          return '微信登录失败，请稍后重试'
      }
    }

    return super.formatError(error)
  }
}
