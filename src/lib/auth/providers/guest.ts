import type { ReactNode } from 'react'
import type { AuthResult, LoginProviderConfig, User } from '../types'
import { BaseLoginProvider } from './base'

/**
 * 游客模式登录提供商
 */
export class GuestLoginProvider extends BaseLoginProvider {
  constructor() {
    const config: LoginProviderConfig = {
      id: 'guest',
      name: '以游客身份探索',
      icon: '👻' as ReactNode,
      color: 'stellar-cyan',
      description: '游客模式下功能有限，无法保存星球数据',
      enabled: true,
    }
    super(config)
  }

  async authenticate(): Promise<AuthResult> {
    try {
      // 模拟游客登录过程
      await new Promise(resolve => setTimeout(resolve, 1000))

      // 生成临时游客信息
      const guestId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const profile: User = {
        id: guestId,
        name: `游客_${guestId.slice(-6)}`,
        email: null,
        avatar: null,
        wechatId: null,
        googleId: null,
        githubId: null,
        isGuest: true,
        provider: 'guest',
        providerId: guestId,
      }

      return {
        success: true,
        user: profile,
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
    // 游客模式不需要从外部获取信息，直接返回基础信息
    const guestId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    return {
      id: guestId,
      name: `游客_${guestId.slice(-6)}`,
      email: null,
      avatar: null,
      wechatId: null,
      googleId: null,
      githubId: null,
      isGuest: true,
      provider: 'guest',
      providerId: guestId,
    }
  }

  async signOut(): Promise<void> {
    // 游客模式登出只需要清理本地状态
    // 实际清理工作由状态管理器负责
  }

  formatError(_error: any): string {
    return '进入游客模式失败，请稍后重试'
  }

  // 游客模式特有的限制检查
  isFeatureEnabled(feature: string): boolean {
    // 游客模式下的功能限制
    const restrictedFeatures = [
      'save_planet',
      'share_planet',
      'comment',
      'rate_planet',
      'create_account',
    ]

    return !restrictedFeatures.includes(feature)
  }
}
