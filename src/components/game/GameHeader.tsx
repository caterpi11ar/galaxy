import Image from 'next/image'

interface GameHeaderProps {
  isLoggedIn: boolean
  onToggleLogin: () => void
}

export function GameHeader({ isLoggedIn, onToggleLogin }: GameHeaderProps) {
  return (
    <header className="border-b-2 border-ui-border bg-space-deep px-4 py-2 flex-shrink-0">
      <div className="flex items-center justify-between max-w-full h-10">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white p-1 rounded-md">
            <Image
              src="/galaxy.svg"
              alt="Galaxy"
              width={24}
              height={24}
              className="animate-pixel-pulse"
              style={{ imageRendering: 'pixelated' }}
            />
            <h1 className="text-lg font-pixel-display text-stellar-blue">
              GALAXY
            </h1>
          </div>
        </div>

        {/* 导航按钮 */}
        <nav className="flex items-center gap-2">
          {isLoggedIn
            ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={onToggleLogin}
                    className="px-2 py-1 bg-ui-surface border-2 border-ui-border text-ui-text-primary text-xs hover:border-stellar-purple transition-colors"
                  >
                    退出
                  </button>
                </div>
              )
            : (
                <button
                  onClick={onToggleLogin}
                  className="px-2 py-1 bg-ui-surface border-2 border-ui-border text-ui-text-primary text-xs hover:border-stellar-purple transition-colors"
                >
                  登录
                </button>
              )}

          <button className="px-2 py-1 bg-stellar-orange border-2 border-stellar-orange text-white text-xs hover:bg-stellar-yellow hover:border-stellar-yellow transition-colors">
            排行榜
          </button>
        </nav>
      </div>
    </header>
  )
}
