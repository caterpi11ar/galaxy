import type { FC } from 'react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import NextAuthLoginModal from '@/components/auth/NextAuthLoginModal'
import { useNextAuth } from '@/lib/auth/nextauth-hooks'

export const GameHeader: FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { user, isAuthenticated } = useNextAuth()

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
    <header className="border-b-2 border-ui-border bg-space-deep px-4 py-2 flex-shrink-0">
      <div className="flex items-center justify-between max-w-full h-10">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="flex items-center gap-3 relative group">
            {/* 装饰性像素边框容器 */}
            <div className="relative bg-space-deep border-2 border-stellar-blue px-3 py-2 shadow-pixel-md transition-all duration-normal group-hover:border-stellar-cyan group-hover:shadow-pixel-lg">
              {/* 四角装饰点 */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-stellar-purple animate-pixel-pulse" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-stellar-blue" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-stellar-cyan" />
              <div
                className="absolute -bottom-1 -right-1 w-2 h-2 bg-stellar-pink animate-pixel-pulse"
                style={{ animationDelay: '1s' }}
              />

              {/* Logo内容 */}
              <div className="flex items-center gap-2">
                {/* 原有的 galaxy.svg 图标 */}
                <div className="bg-white p-1 rounded-sm">
                  <Image
                    src="/galaxy.svg"
                    alt="Galaxy"
                    width={24}
                    height={24}
                    className="animate-pixel-pulse"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>

                {/* 优化后的 GALAXY 文字 */}
                <div className="relative">
                  <h1 className="text-lg font-pixel-display font-bold text-transparent bg-gradient-to-r from-stellar-blue via-stellar-cyan to-stellar-blue bg-clip-text tracking-wide">
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

            {/* 版本标识 */}
            <div className="text-xs font-pixel text-stellar-cyan opacity-60">
              v1.0
            </div>
          </div>
        </div>

        {/* 导航按钮 */}
        <nav className="flex items-center gap-3">
          {isAuthenticated
            ? (
                <div className="flex items-center gap-2">
                  <div className="text-xs text-stellar-cyan">
                    👤
                    {' '}
                    {user?.name || '用户'}
                  </div>
                  <button
                    onClick={handleLogoutClick}
                    className="
                      px-3 py-1 bg-ui-surface border-2 border-ui-border
                      text-ui-text-primary text-xs font-pixel
                      hover:border-stellar-red hover:text-stellar-red
                      hover:shadow-pixel-sm
                      transition-all duration-fast
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
                    px-4 py-1 bg-stellar-blue border-2 border-stellar-blue
                    text-white text-xs font-pixel font-bold
                    hover:bg-stellar-cyan hover:border-stellar-cyan
                    hover:shadow-pixel-sm hover:animate-pixel-pulse
                    transition-all duration-fast
                    transform hover:translate-x-0.5 hover:translate-y-0.5
                  "
                >
                  登录
                </button>
              )}

          <button
            className="
            cursor-pointer
            px-3 py-1 bg-stellar-orange border-2 border-stellar-orange
            text-white text-xs font-pixel font-bold
            hover:bg-stellar-yellow hover:border-stellar-yellow
            hover:shadow-pixel-sm
            transition-all duration-fast
            transform hover:translate-x-0.5 hover:translate-y-0.5
          "
          >
            排行榜
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
