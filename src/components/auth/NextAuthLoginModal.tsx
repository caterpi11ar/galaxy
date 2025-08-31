'use client'

import type { ReactNode } from 'react'
import { Github, X } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

interface NextAuthLoginModalProps {
  isOpen: boolean
  onClose: () => void
}

interface LoginButton {
  id: string
  name: string
  icon: ReactNode
  color: string
  description: string
  enabled: boolean
  onClick: () => void
}

export default function NextAuthLoginModal({ isOpen, onClose }: NextAuthLoginModalProps) {
  const [isClosing, setIsClosing] = useState(false)
  const [hoveredProvider, setHoveredProvider] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // 处理关闭动画
  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      setHoveredProvider(null)
      setError(null)
      onClose()
    }, 300)
  }, [onClose])

  // 处理登录
  const handleLogin = useCallback(async (providerId: string) => {
    setIsLoading(true)
    setLoadingProvider(providerId)
    setError(null)
    setHoveredProvider(null)

    try {
      const result = await signIn(providerId, {
        redirect: false,
        callbackUrl: window.location.origin,
      })

      if (result?.error) {
        setError(`${providerId === 'github' ? 'GitHub' : 'Google'} 登录失败: ${result.error}`)
      }
      else if (result?.ok) {
        // 登录成功，关闭弹窗
        handleClose()
      }
    }
    catch (error) {
      console.error(`登录失败 [${providerId}]:`, error)
      setError('登录过程中发生错误，请重试')
    }
    finally {
      setIsLoading(false)
      setLoadingProvider(null)
    }
  }, [handleClose])

  // 登录按钮配置
  const loginButtons: LoginButton[] = [
    {
      id: 'github',
      name: 'GitHub 账号登录',
      icon: <Github className="w-5 h-5" />,
      color: 'ui-text-secondary',
      description: '使用 GitHub 账号登录',
      enabled: true,
      onClick: () => handleLogin('github'),
    },
    {
      id: 'google',
      name: 'Google 账号登录',
      icon: <div className="w-5 h-5 bg-stellar-red rounded-full flex items-center justify-center text-white text-xs font-bold">G</div>,
      color: 'stellar-red',
      description: '使用 Google 账号登录',
      enabled: false, // 暂时禁用，等待 OAuth 配置
      onClick: () => handleLogin('google'),
    },
  ]

  // 处理键盘和滚动事件
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
      style={{ zIndex: 50 }}
    >
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-pixel-shadow/80 backdrop-blur-sm touch-manipulation"
        onClick={handleClose}
      />

      {/* 登录模态框 */}
      <div
        className={`
          relative bg-ui-surface border-2 border-ui-border
          shadow-pixel-lg 
          max-w-md w-full max-h-[90vh] overflow-y-auto
          mx-4 pixel-sm:mx-0
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
          flex items-center justify-between p-4 pixel-sm:p-6
          border-b-2 border-ui-border bg-space-deep
        "
        >
          <div className="flex items-center space-x-2 pixel-sm:space-x-3">
            <div className="bg-white p-1 rounded-sm">
              <Image
                src="/galaxy.svg"
                alt="Galaxy"
                width={16}
                height={16}
                className="animate-pixel-pulse"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
            <h2 className="text-base pixel-sm:text-lg font-pixel-display text-ui-text-primary">
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
              touch-manipulation
              min-w-[40px] min-h-[40px] flex items-center justify-center
            "
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 内容区域 */}
        <div className="p-4 pixel-sm:p-6">
          {/* 欢迎文本 */}
          <div className="text-center mb-6 pixel-sm:mb-8">
            <div className="flex items-center justify-center space-x-2 pixel-sm:space-x-3 mb-2">
              <div className="bg-white p-1 rounded-sm">
                <Image
                  src="/galaxy.svg"
                  alt="Galaxy"
                  width={20}
                  height={20}
                  className="animate-pixel-pulse"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              <div className="text-xl pixel-sm:text-2xl font-pixel-display text-ui-text-primary">
                欢迎探索
              </div>
            </div>
            <p className="text-ui-text-secondary text-sm leading-relaxed">
              选择你的登录方式，开始创建和管理你的专属星球
            </p>
            {isLoading && (
              <div className="mt-4 text-stellar-cyan text-xs">
                正在连接中...
              </div>
            )}
            {error && (
              <div className="mt-4 text-stellar-red text-xs bg-stellar-red/10 p-2 rounded border border-stellar-red/20">
                {error}
              </div>
            )}
          </div>

          {/* 登录选项 */}
          <div className="space-y-3 pixel-sm:space-y-4">
            {loginButtons.map((button) => {
              const isHovered = hoveredProvider === button.id
              const isCurrentLoading = loadingProvider === button.id
              const isDisabled = isLoading && !isCurrentLoading

              // 根据按钮类型设置样式，但使用固定类名而不是动态拼接
              const getButtonStyles = () => {
                if (isDisabled) {
                  return 'opacity-50 cursor-not-allowed border-ui-border'
                }

                if (button.id === 'github') {
                  return isHovered
                    ? 'border-ui-text-secondary bg-ui-text-secondary/10 shadow-pixel-md transform translate-x-1 translate-y-1'
                    : 'border-ui-border hover:border-ui-text-secondary/50'
                }

                // 为未来的 Google 按钮预留
                if (button.id === 'google') {
                  return isHovered
                    ? 'border-stellar-red bg-stellar-red/10 shadow-pixel-md transform translate-x-1 translate-y-1'
                    : 'border-ui-border hover:border-stellar-red/50'
                }

                return 'border-ui-border'
              }

              return (
                <button
                  key={button.id}
                  onMouseEnter={() =>
                    !isLoading && setHoveredProvider(button.id)}
                  onMouseLeave={() => setHoveredProvider(null)}
                  onClick={button.onClick}
                  disabled={isDisabled || !button.enabled}
                  className={`
                    cursor-pointer
                    w-full p-3 pixel-sm:p-4 border-2 transition-all duration-normal
                    flex items-center justify-center space-x-2 pixel-sm:space-x-3
                    font-pixel text-sm bg-ui-surface
                    touch-manipulation
                    active:scale-98
                    min-h-[48px] pixel-sm:min-h-[56px]
                    ${getButtonStyles()}
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
        </div>

        {/* 底部信息 */}
        <div className="px-4 pb-4 pixel-sm:px-6 pixel-sm:pb-6">
          <div className="text-center text-xs text-ui-text-muted space-y-1">
            <p>登录即表示你同意我们的服务条款</p>
            <div className="flex items-center justify-center space-x-1">
              <span>Powered by</span>
              <span className="text-stellar-blue">NextAuth.js</span>
              <div className="w-1 h-1 bg-stellar-blue animate-pixel-pulse" />
            </div>
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
