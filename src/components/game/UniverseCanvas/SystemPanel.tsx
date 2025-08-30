'use client'

import type { ViewportState } from '@/types/game'
import type { Planet } from '@/types/planet'

interface SystemPanelProps {
  viewport: ViewportState
  planets: Planet[]
  selectedPlanet: string | null
  getSelectedPlanet: () => Planet | null
}

/**
 * 系统信息面板组件
 * 显示当前系统状态，包括缩放、视图位置等信息
 */
export function SystemPanel({
  viewport,
  planets,
  selectedPlanet,
  getSelectedPlanet,
}: SystemPanelProps) {
  return (
    <div className="absolute top-4 left-4 bg-ui-surface/90 backdrop-blur-sm p-3 rounded-lg border border-ui-border shadow-lg text-xs font-pixel text-ui-text-secondary min-w-32">
      <div className="text-ui-text-primary font-bold mb-2 text-center border-b border-ui-border/30 pb-1">
        系统状态
      </div>
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-ui-text-muted">缩放</span>
          <span className="text-ui-text-primary font-mono">
            {viewport.scale.toFixed(2)}
            x
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-ui-text-muted">视图</span>
          <span className="text-ui-text-primary font-mono text-[10px]">
            (
            {Math.round(viewport.x)}
            ,
            {' '}
            {Math.round(viewport.y)}
            )
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-ui-text-muted">星球</span>
          <span className="text-ui-text-primary font-bold">
            {planets.length}
          </span>
        </div>
        {selectedPlanet && (
          <div className="flex justify-between items-center pt-1 border-t border-ui-border/20">
            <span className="text-ui-text-muted">选中</span>
            <span className="text-ui-accent text-[10px] max-w-20 truncate">
              {getSelectedPlanet()?.name}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
