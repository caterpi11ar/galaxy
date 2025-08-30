import { loginProviderManager } from './base'
import { GitHubLoginProvider } from './github'
import { GoogleLoginProvider } from './google'
import { GuestLoginProvider } from './guest'
import { WeChatLoginProvider } from './wechat'

// 导出所有登录提供商类
export {
  GitHubLoginProvider,
  GoogleLoginProvider,
  GuestLoginProvider,
  WeChatLoginProvider,
}

// 导出基类和管理器
export { BaseLoginProvider, loginProviderManager } from './base'

// 创建并注册所有登录提供商实例
export function initializeLoginProviders() {
  const providers = [
    new WeChatLoginProvider(),
    new GoogleLoginProvider(),
    new GitHubLoginProvider(),
    new GuestLoginProvider(),
  ]

  // 注册到管理器
  providers.forEach((provider) => {
    loginProviderManager.register(provider)
  })

  return providers
}

// 自动初始化
if (typeof window !== 'undefined') {
  initializeLoginProviders()
}
