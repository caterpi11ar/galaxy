'use client'

interface ZoomControlsProps {
  zoomIn: () => void
  zoomOut: () => void
  resetViewport: () => void
}

/**
 * 缩放控制按钮组件
 * 提供放大、缩小和重置视图的操作按钮
 * 针对移动端优化：增大按钮尺寸，改善触控体验
 */
export function ZoomControls({ zoomIn, zoomOut, resetViewport }: ZoomControlsProps) {
  return (
    <div className="
      absolute bottom-4 right-4 flex flex-col gap-2
      pixel-sm:bottom-6 pixel-sm:right-6
    "
    >
      <button
        onClick={zoomIn}
        className="
          w-10 h-10 pixel-sm:w-8 pixel-sm:h-8
          bg-ui-surface border-2 border-ui-border
          text-ui-text-primary hover:bg-ui-surface-hover
          font-pixel text-lg pixel-sm:text-sm
          transition-all duration-fast
          touch-manipulation select-none
          active:scale-95 active:bg-stellar-blue active:text-white
          hover:border-stellar-blue hover:shadow-pixel-sm
          flex items-center justify-center
        "
        aria-label="放大"
      >
        +
      </button>
      <button
        onClick={resetViewport}
        className="
          w-10 h-10 pixel-sm:w-8 pixel-sm:h-8
          bg-ui-surface border-2 border-ui-border
          text-ui-text-primary hover:bg-ui-surface-hover
          font-pixel text-sm pixel-sm:text-xs
          transition-all duration-fast
          touch-manipulation select-none
          active:scale-95 active:bg-stellar-cyan active:text-white
          hover:border-stellar-cyan hover:shadow-pixel-sm
          flex items-center justify-center
        "
        title="重置视图"
        aria-label="重置视图"
      >
        ⌂
      </button>
      <button
        onClick={zoomOut}
        className="
          w-10 h-10 pixel-sm:w-8 pixel-sm:h-8
          bg-ui-surface border-2 border-ui-border
          text-ui-text-primary hover:bg-ui-surface-hover
          font-pixel text-lg pixel-sm:text-sm
          transition-all duration-fast
          touch-manipulation select-none
          active:scale-95 active:bg-stellar-orange active:text-white
          hover:border-stellar-orange hover:shadow-pixel-sm
          flex items-center justify-center
        "
        aria-label="缩小"
      >
        -
      </button>
    </div>
  )
}
