import type { Planet } from '@/types/game'

interface PlanetInfoPanelProps {
  planet: Planet
  isLoggedIn: boolean
  onClose: () => void
}

export function PlanetInfoPanel({ planet, isLoggedIn, onClose }: PlanetInfoPanelProps) {
  return (
    <div className="absolute top-4 left-4 bg-ui-surface border-2 border-ui-border p-4 max-w-sm animate-pixel-slide-down">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg text-stellar-blue">{planet.name}</h3>
        <button
          onClick={onClose}
          className="text-ui-text-muted hover:text-ui-text-primary text-lg"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-ui-text-secondary">创建者:</span>
          <span className="text-ui-text-primary">{planet.author}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-ui-text-secondary">评分:</span>
          <div className="flex items-center gap-2">
            <span className="text-stellar-green">
              👍
              {planet.likes}
            </span>
            <span className="text-stellar-red">
              👎
              {planet.dislikes}
            </span>
          </div>
        </div>

        <div className="flex gap-2 mt-3">
          {isLoggedIn
            ? (
                <>
                  <button className="px-3 py-1 bg-stellar-green border-2 border-stellar-green text-white text-xs hover:bg-stellar-cyan hover:border-stellar-cyan transition-colors">
                    👍 点赞
                  </button>
                  <button className="px-3 py-1 bg-stellar-red border-2 border-stellar-red text-white text-xs hover:bg-stellar-pink hover:border-stellar-pink transition-colors">
                    👎 踩
                  </button>
                </>
              )
            : (
                <div className="text-xs text-ui-text-muted">登录后可评分</div>
              )}
        </div>
      </div>
    </div>
  )
}
