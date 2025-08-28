interface GameControlsProps {
  zoom: number
  pan: { x: number, y: number }
  isLoggedIn: boolean
  onZoomIn: () => void
  onZoomOut: () => void
  onResetView: () => void
}

export function GameControls({
  zoom,
  pan,
  isLoggedIn,
  onZoomIn,
  onZoomOut,
  onResetView,
}: GameControlsProps) {
  return (
    <footer className="border-t-2 border-ui-border bg-space-deep px-4 py-2 flex-shrink-0">
      <div className="flex items-center justify-between max-w-full h-10">
        {/* 缩放控制 */}
        <div className="flex items-center gap-1">
          <button
            onClick={onZoomOut}
            className="px-2 py-1 bg-ui-surface border-2 border-ui-border text-ui-text-primary hover:border-stellar-blue transition-colors text-xs"
            title="缩小"
          >
            🔍-
          </button>

          <div className="px-2 py-1 bg-space-medium border border-ui-border text-ui-text-secondary text-xs min-w-12 text-center">
            {Math.round(zoom * 100)}
            %
          </div>

          <button
            onClick={onZoomIn}
            className="px-2 py-1 bg-ui-surface border-2 border-ui-border text-ui-text-primary hover:border-stellar-blue transition-colors text-xs"
            title="放大"
          >
            🔍+
          </button>

          <button
            onClick={onResetView}
            className="px-2 py-1 bg-ui-surface border-2 border-ui-border text-ui-text-primary hover:border-stellar-purple transition-colors text-xs"
          >
            重置
          </button>
        </div>

        {/* 中央操作区 */}
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 bg-stellar-green border-2 border-stellar-green text-white hover:bg-stellar-cyan hover:border-stellar-cyan transition-colors text-xs">
            🎨 创建星球
          </button>

          {isLoggedIn && (
            <button className="px-2 py-1 bg-stellar-purple border-2 border-stellar-purple text-white hover:bg-stellar-blue hover:border-stellar-blue transition-colors text-xs">
              🌍 我的星球
            </button>
          )}
        </div>

        {/* 位置信息 */}
        <div className="text-xs text-ui-text-muted hidden sm:block w-40 text-right">
          位置: (
          {Math.round(-pan.x)}
          ,
          {' '}
          {Math.round(-pan.y)}
          )
        </div>
      </div>
    </footer>
  )
}
