'use client'

interface ZoomControlsProps {
  zoomIn: () => void
  zoomOut: () => void
  resetViewport: () => void
}

/**
 * 缩放控制按钮组件
 * 提供放大、缩小和重置视图的操作按钮
 */
export function ZoomControls({ zoomIn, zoomOut, resetViewport }: ZoomControlsProps) {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2">
      <button
        onClick={zoomIn}
        className="w-8 h-8 bg-ui-surface border border-ui-border text-ui-text-primary hover:bg-ui-surface-hover font-pixel text-sm transition-colors"
      >
        +
      </button>
      <button
        onClick={resetViewport}
        className="w-8 h-8 bg-ui-surface border border-ui-border text-ui-text-primary hover:bg-ui-surface-hover font-pixel text-xs transition-colors"
        title="重置视图"
      >
        ⌂
      </button>
      <button
        onClick={zoomOut}
        className="w-8 h-8 bg-ui-surface border border-ui-border text-ui-text-primary hover:bg-ui-surface-hover font-pixel text-sm transition-colors"
      >
        -
      </button>
    </div>
  )
}
