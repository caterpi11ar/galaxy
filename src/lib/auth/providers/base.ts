import type { ReactNode } from 'react'
import type { AuthResult, LoginProviderConfig, User } from '../types'

/**
 * 登录提供商抽象基类
 * 所有具体的登录提供商都必须继承此类并实现抽象方法
 */
export abstract class BaseLoginProvider {
  protected _config: LoginProviderConfig

  constructor(config: LoginProviderConfig) {
    this._config = config
  }

  // 获取提供商配置
  get config(): LoginProviderConfig {
    return this._config
  }

  get id(): string {
    return this._config.id
  }

  get name(): string {
    return this._config.name
  }

  get icon(): ReactNode {
    return this._config.icon
  }

  get color(): string {
    return this._config.color
  }

  get description(): string {
    return this._config.description
  }

  get enabled(): boolean {
    return this._config.enabled
  }

  // 抽象方法 - 必须由子类实现

  /**
   * 执行登录认证
   * @returns Promise<AuthResult> 认证结果
   */
  abstract authenticate(): Promise<AuthResult>

  /**
   * 获取用户配置文件信息
   * @param token 认证令牌（如果需要）
   * @returns Promise<User> 用户信息
   */
  abstract getProfile(token?: string): Promise<User>

  /**
   * 登出操作
   * @returns Promise<void>
   */
  abstract signOut(): Promise<void>

  // 可选的钩子方法 - 子类可以重写

  /**
   * 登录前的准备工作
   * @returns Promise<void>
   */
  async beforeAuthenticate(): Promise<void> {
    // 默认空实现
  }

  /**
   * 登录成功后的处理
   * @param _result 认证结果
   * @returns Promise<void>
   */
  async afterAuthenticate(_result: AuthResult): Promise<void> {
    // 默认空实现
  }

  /**
   * 验证提供商是否可用
   * @returns boolean
   */
  isAvailable(): boolean {
    return this.enabled
  }

  /**
   * 获取错误信息的本地化版本
   * @param error 错误信息
   * @returns string
   */
  formatError(error: any): string {
    if (error?.message) {
      return error.message
    }
    return `${this.name} 登录失败，请稍后重试`
  }
}

/**
 * 登录提供商管理器
 * 负责管理和协调所有登录提供商
 */
export class LoginProviderManager {
  private providers = new Map<string, BaseLoginProvider>()

  /**
   * 注册登录提供商
   * @param provider 登录提供商实例
   */
  register(provider: BaseLoginProvider): void {
    this.providers.set(provider.id, provider)
  }

  /**
   * 获取登录提供商
   * @param id 提供商ID
   * @returns BaseLoginProvider | undefined
   */
  get(id: string): BaseLoginProvider | undefined {
    return this.providers.get(id)
  }

  /**
   * 获取所有可用的登录提供商
   * @returns BaseLoginProvider[]
   */
  getAvailable(): BaseLoginProvider[] {
    return Array.from(this.providers.values()).filter(provider => provider.isAvailable())
  }

  /**
   * 获取所有登录提供商配置
   * @returns LoginProviderConfig[]
   */
  getConfigs(): LoginProviderConfig[] {
    return this.getAvailable().map(provider => provider.config)
  }

  /**
   * 执行登录
   * @param providerId 提供商ID
   * @returns Promise<AuthResult>
   */
  async login(providerId: string): Promise<AuthResult> {
    const provider = this.get(providerId)

    if (!provider) {
      return {
        success: false,
        error: `未找到登录提供商: ${providerId}`,
      }
    }

    if (!provider.isAvailable()) {
      return {
        success: false,
        error: `${provider.name} 登录服务暂时不可用`,
      }
    }

    try {
      await provider.beforeAuthenticate()
      const result = await provider.authenticate()
      await provider.afterAuthenticate(result)
      return result
    }
    catch (error) {
      return {
        success: false,
        error: provider.formatError(error),
      }
    }
  }
}

// 全局登录提供商管理器实例
export const loginProviderManager = new LoginProviderManager()
