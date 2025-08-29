'use client'

import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

interface LoginButton {
  id: string
  name: string
  icon: ReactNode
  color: string
  description: string
  onClick: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isClosing, setIsClosing] = useState(false)
  const [hoveredProvider, setHoveredProvider] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<string | null>(null)

  // 处理关闭动画
  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      setIsLoading(null)
      setHoveredProvider(null)
      onClose()
    }, 300)
  }, [onClose])

  // 处理登录按钮点击
  const handleLogin = async (provider: string) => {
    setIsLoading(provider)
    setHoveredProvider(null)

    // 模拟登录过程
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      // TODO: 实现实际登录逻辑
      console.log(`登录提供商: ${provider}`)
    }
    catch (error) {
      console.error('登录失败:', error)
    }
    finally {
      setIsLoading(null)
    }
  }

  // 定义登录按钮配置
  const loginButtons: LoginButton[] = [
    {
      id: 'wechat',
      name: '微信扫码登录',
      icon: (
        <svg
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
        >
          <path
            d="M695.296 346.112c11.776 0 23.552 1.024 34.816 2.048-31.232-146.432-187.904-254.976-366.592-254.976-199.68 0-363.52 136.192-363.52 308.736 0 99.84 54.272 181.76 145.408 245.248l-36.352 109.056L236.032 692.736c45.568 9.216 81.92 18.432 127.488 18.432 11.264 0 22.528-0.512 33.792-1.536-7.168-24.064-11.264-49.664-11.264-76.288 0.512-158.208 136.704-287.232 309.248-287.232zM497.664 240.64c31.232 0 56.32 25.088 56.32 56.32s-25.088 56.32-56.32 56.32-56.32-25.088-56.32-56.32 25.088-56.32 56.32-56.32zM243.2 353.792c-31.232 0-56.32-25.088-56.32-56.32s25.088-56.32 56.32-56.32 56.32 25.088 56.32 56.32-25.088 56.32-56.32 56.32zM1024.512 630.784c0-145.408-145.408-263.68-308.736-263.68-173.056 0-309.248 118.272-309.248 263.68s136.192 263.68 309.248 263.68c36.352 0 72.704-9.216 109.056-18.432l99.84 54.784-27.136-90.624c72.704-54.784 126.976-127.488 126.976-209.408z m-403.456-40.96c-22.016 0-39.936-17.92-39.936-39.936s17.92-39.936 39.936-39.936 39.936 17.92 39.936 39.936-17.92 39.936-39.936 39.936z m199.68 2.56c-22.016 0-39.936-17.92-39.936-39.936s17.92-39.936 39.936-39.936 39.936 17.92 39.936 39.936-17.92 39.936-39.936 39.936z"
            fill="#69BB64"
          />
        </svg>
      ),
      color: 'stellar-green',
      description: '使用微信快速登录',
      onClick: () => handleLogin('wechat'),
    },
    {
      id: 'google',
      name: 'Google 账号登录',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
      ),
      color: 'stellar-red',
      description: '使用 Google 账号登录',
      onClick: () => handleLogin('google'),
    },
    {
      id: 'github',
      name: 'GitHub 账号登录',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      color: 'ui-text-primary',
      description: '使用 GitHub 账号登录',
      onClick: () => handleLogin('github'),
    },
  ]

  // 处理键盘和滚动事件 - 使用 React 事件处理
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen && !isClosing)
    return null

  return (
    <div
      className={`
      fixed inset-0 z-modal flex items-center justify-center p-4
      ${isClosing ? 'animate-pixel-fade-out' : 'animate-pixel-fade-in'}
    `}
    >
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-pixel-shadow/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* 登录模态框 */}
      <div
        className={`
          relative bg-ui-surface border-2 border-ui-border
          shadow-pixel-lg max-w-md w-full max-h-[90vh] overflow-y-auto
          ${isClosing ? 'animate-pixel-slide-up' : 'animate-pixel-slide-down'}
        `}
        onClick={e => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            handleClose()
          }
        }}
        tabIndex={-1}
      >
        {/* 标题栏 */}
        <div
          className="
          flex items-center justify-between p-6
          border-b-2 border-ui-border bg-space-deep
        "
        >
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-stellar-blue animate-pixel-pulse" />
            <h2 className="text-lg font-pixel-display text-ui-text-primary">
              进入 Galaxy 宇宙
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="
              cursor-pointer
              p-2 text-ui-text-muted hover:text-ui-text-primary
              hover:bg-ui-surface-hover transition-colors duration-fast
              border border-transparent hover:border-ui-border
            "
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 内容区域 */}
        <div className="p-6">
          {/* 欢迎文本 */}
          <div className="text-center mb-8">
            <div className="text-2xl font-pixel-display text-ui-text-primary mb-2">
              🌌 欢迎探索
            </div>
            <p className="text-ui-text-secondary text-sm leading-relaxed">
              选择你的登录方式，开始创建和管理你的专属星球
            </p>
            {isLoading && (
              <div className="mt-4 text-stellar-cyan text-xs">
                正在连接中...
              </div>
            )}
          </div>

          {/* 登录选项 */}
          <div className="space-y-4">
            {loginButtons.map((button) => {
              const isHovered = hoveredProvider === button.id
              const isCurrentLoading = isLoading === button.id
              const isDisabled = !!isLoading && !isCurrentLoading

              return (
                <button
                  key={button.id}
                  onMouseEnter={() =>
                    !isLoading && setHoveredProvider(button.id)}
                  onMouseLeave={() => setHoveredProvider(null)}
                  onClick={button.onClick}
                  disabled={isDisabled}
                  className={`
                    cursor-pointer
                    w-full p-4 border-2 transition-all duration-normal
                    flex items-center justify-center space-x-3
                    font-pixel text-sm bg-ui-surface
                    ${
                isDisabled
                  ? 'opacity-50 cursor-not-allowed border-ui-border'
                  : isHovered
                    ? `border-${button.color} bg-${button.color}/10 shadow-pixel-md transform translate-x-1 translate-y-1`
                    : `border-ui-border hover:border-${button.color}/50`
                }
                  `}
                >
                  <div
                    className={`
                    text-2xl transition-transform duration-fast flex items-center justify-center
                    ${isHovered && !isLoading ? 'animate-pixel-bounce' : ''}
                  `}
                  >
                    {isCurrentLoading ? '⏳' : button.icon}
                  </div>
                  <span className="text-ui-text-primary">
                    {isCurrentLoading ? '正在登录...' : button.name}
                  </span>
                </button>
              )
            })}
          </div>

          {/* 游客模式 */}
          <div className="mt-8 pt-6 border-t-2 border-ui-border">
            <button
              onMouseEnter={() => !isLoading && setHoveredProvider('guest')}
              onMouseLeave={() => setHoveredProvider(null)}
              onClick={() => handleLogin('guest')}
              disabled={!!isLoading}
              className={`
                cursor-pointer
                w-full p-3 border border-dashed transition-all duration-normal
                flex items-center justify-center space-x-2
                font-pixel text-xs bg-transparent
                ${
    isLoading
      ? 'opacity-50 cursor-not-allowed border-ui-text-muted text-ui-text-muted'
      : hoveredProvider === 'guest'
        ? 'border-stellar-cyan text-stellar-cyan bg-stellar-cyan/5'
        : 'border-ui-text-muted text-ui-text-muted hover:border-stellar-cyan/50'
    }
              `}
            >
              <div
                className={`
                text-lg transition-transform duration-fast
                ${
    hoveredProvider === 'guest' && !isLoading
      ? 'animate-pixel-pulse'
      : ''
    }
              `}
              >
                {isLoading === 'guest' ? '⏳' : '👻'}
              </div>
              <span>
                {isLoading === 'guest'
                  ? '正在进入游客模式...'
                  : '以游客身份探索'}
              </span>
            </button>
            <p className="text-ui-text-muted text-xs text-center mt-2">
              游客模式下功能有限，无法保存星球数据
            </p>
          </div>
        </div>

        {/* 底部信息 */}
        <div className="px-6 pb-6">
          <div className="text-center text-xs text-ui-text-muted space-y-1">
            <p>登录即表示你同意我们的服务条款</p>
            <p className="flex items-center justify-center space-x-1">
              <span>Powered by</span>
              <span className="text-stellar-blue">NextAuth.js</span>
              <div className="w-1 h-1 bg-stellar-blue animate-pixel-pulse" />
            </p>
          </div>
        </div>

        {/* 装饰性像素边框 */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-stellar-purple" />
        <div className="absolute top-0 right-0 w-2 h-2 bg-stellar-blue" />
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-stellar-cyan" />
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-stellar-pink" />
      </div>
    </div>
  )
}
