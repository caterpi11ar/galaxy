import type { FC } from 'react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import NextAuthLoginModal from '@/components/auth/NextAuthLoginModal'
import { useNextAuth } from '@/lib/auth/nextauth-hooks'

export const GameHeader: FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { user, isAuthenticated } = useNextAuth()

  // 获取显示的用户名
  const displayName = user?.name || user?.email?.split('@')[0] || '用户'

  const handleLoginClick = () => {
    setIsLoginModalOpen(true)
  }

  const handleLogoutClick = async () => {
    await signOut({ redirect: false })
  }

  const handleCloseModal = () => {
    setIsLoginModalOpen(false)
  }

  return (
    <header className="w-full border-b-2 border-ui-border bg-space-deep px-4 py-2 flex-shrink-0">
      <div className="flex items-center justify-between w-full h-10 pixel-sm:h-12">
        {/* Logo */}
        <div className="flex items-center gap-2 pixel-sm:gap-3 cursor-pointer min-w-0">
          <div className="flex items-center gap-2 pixel-sm:gap-3 relative group">
            {/* 装饰性像素边框容器 */}
            <div className="relative bg-space-deep border-2 border-stellar-blue px-2 py-1 pixel-sm:px-3 pixel-sm:py-2 shadow-pixel-md transition-all duration-normal group-hover:border-stellar-cyan group-hover:shadow-pixel-lg">
              {/* 四角装饰点 */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-stellar-purple animate-pixel-pulse" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-stellar-blue" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-stellar-cyan" />
              <div
                className="absolute -bottom-1 -right-1 w-2 h-2 bg-stellar-pink animate-pixel-pulse"
                style={{ animationDelay: '1s' }}
              />

              {/* Logo内容 */}
              <div className="flex items-center gap-1 pixel-sm:gap-2">
                {/* 原有的 galaxy.svg 图标 */}
                <div className="bg-white p-1 rounded-sm">
                  <Image
                    src="/galaxy.svg"
                    alt="Galaxy"
                    width={20}
                    height={20}
                    className="pixel-sm:w-6 pixel-sm:h-6 animate-pixel-pulse"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>

                {/* 优化后的 GALAXY 文字 - 移动端缩小 */}
                <div className="relative hidden pixel-sm:block">
                  <h1 className="text-base pixel-sm:text-lg font-pixel-display font-bold text-transparent bg-gradient-to-r from-stellar-blue via-stellar-cyan to-stellar-blue bg-clip-text tracking-wide">
                    GALAXY
                  </h1>
                  {/* 文字装饰线 */}
                  <div className="absolute -bottom-0.5 left-0 w-full h-px bg-gradient-to-r from-transparent via-stellar-cyan to-transparent animate-pulse" />
                  {/* 闪烁星点 */}
                  <div
                    className="absolute -top-1 right-1 w-1 h-1 bg-stellar-yellow animate-ping"
                    style={{ animationDelay: '2s' }}
                  />
                </div>
              </div>

              {/* 悬停效果光晕 */}
              <div className="absolute inset-0 bg-gradient-to-r from-stellar-blue/5 to-stellar-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-normal pointer-events-none" />
            </div>

            {/* 版本标识 - 移动端隐藏 */}
            <div className="hidden pixel-sm:block text-xs font-pixel text-stellar-cyan opacity-60">
              v1.0
            </div>
          </div>
        </div>

        {/* 导航按钮 */}
        <nav className="flex items-center gap-2 pixel-sm:gap-3 flex-shrink-0">
          {isAuthenticated
            ? (
                <div className="flex items-center gap-1 pixel-sm:gap-2">
                  <div className="text-xs text-stellar-cyan flex items-center gap-1">
                    <span>👤</span>
                    <span className="truncate max-w-16 pixel-sm:max-w-24 pixel-md:max-w-none" title={displayName}>
                      {displayName}
                    </span>
                  </div>
                  <button
                    onClick={handleLogoutClick}
                    className="
                      px-2 py-1 pixel-sm:px-3 pixel-sm:py-1
                      bg-ui-surface border-2 border-ui-border
                      text-ui-text-primary text-xs font-pixel
                      hover:border-stellar-red hover:text-stellar-red
                      hover:shadow-pixel-sm
                      transition-all duration-fast
                      touch-manipulation
                      min-w-0
                    "
                  >
                    退出
                  </button>
                </div>
              )
            : (
                <button
                  onClick={handleLoginClick}
                  className="
                    cursor-pointer
                    px-3 py-1 pixel-sm:px-4 pixel-sm:py-1
                    bg-stellar-blue border-2 border-stellar-blue
                    text-white text-xs font-pixel font-bold
                    hover:bg-stellar-cyan hover:border-stellar-cyan
                    hover:shadow-pixel-sm hover:animate-pixel-pulse
                    transition-all duration-fast
                    transform hover:translate-x-0.5 hover:translate-y-0.5
                    touch-manipulation
                    active:scale-95
                  "
                >
                  登录
                </button>
              )}

          <button
            className="
            cursor-pointer
            px-2 py-1 pixel-sm:px-3 pixel-sm:py-1
            bg-stellar-orange border-2 border-stellar-orange
            text-white text-xs font-pixel font-bold
            hover:bg-stellar-yellow hover:border-stellar-yellow
            hover:shadow-pixel-sm
            transition-all duration-fast
            transform hover:translate-x-0.5 hover:translate-y-0.5
            touch-manipulation
            active:scale-95
          "
          >
            <span className="hidden pixel-sm:inline">排行榜</span>
            <span className="pixel-sm:hidden">🏆</span>
          </button>
        </nav>
      </div>

      {/* 登录弹窗 */}
      <NextAuthLoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseModal}
      />
    </header>
  )
}
