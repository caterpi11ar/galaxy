'use client'

import type { Planet } from '@/types/planet'
import { calculatePlanetRating } from '@/types/game'

interface PlanetInfoPanelProps {
  selectedPlanet: string | null
  getSelectedPlanet: () => Planet | null
}

/**
 * 星球信息面板组件
 * 显示选中星球的详细信息，包括热度、坐标、大小等
 */
export function PlanetInfoPanel({ selectedPlanet, getSelectedPlanet }: PlanetInfoPanelProps) {
  if (!selectedPlanet) {
    return null
  }

  const planet = getSelectedPlanet()
  if (!planet) {
    return null
  }

  // 从标准 Planet 数据计算显示属性
  const rating = calculatePlanetRating(planet.likes, planet.dislikes)
  const color = `hsl(${(planet.createdBy * 137) % 360}, 70%, 60%)` // 基于创建者生成颜色

  return (
    <div className="absolute top-4 right-4 bg-ui-surface/95 backdrop-blur-sm p-4 rounded-lg border border-ui-border shadow-xl text-xs font-pixel min-w-48 max-w-64">
      {/* 星球标题 */}
      <div className="flex items-center gap-2 mb-3 border-b border-ui-border/30 pb-2">
        <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: color }} />
        <div className="font-bold text-ui-text-primary text-sm">{planet.name}</div>
      </div>

      {/* 星球详细信息 */}
      <div className="space-y-2 text-ui-text-secondary">
        {/* 热度显示 */}
        {rating > 0 && (
          <div className="bg-ui-surface-hover/30 rounded px-3 py-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-ui-text-muted text-[10px]">星球热度</span>
              <span className="text-ui-text-primary font-bold">{rating}</span>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              <div className="flex items-center gap-1">
                <span className="text-green-400">👍</span>
                <span className="text-ui-text-primary">{planet.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-red-400">👎</span>
                <span className="text-ui-text-primary">{planet.dislikes}</span>
              </div>
            </div>
          </div>
        )}

        {/* 基础信息网格 */}
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="bg-ui-surface-hover/20 rounded px-2 py-1">
            <div className="text-ui-text-muted mb-1">坐标</div>
            <div className="text-ui-text-primary font-mono text-[9px]">
              (
              {Math.round(planet.x)}
              ,
              {' '}
              {Math.round(planet.y)}
              )
            </div>
          </div>
          <div className="bg-ui-surface-hover/20 rounded px-2 py-1">
            <div className="text-ui-text-muted mb-1">大小</div>
            <div className="text-ui-text-primary">
              {planet.size}
            </div>
          </div>
        </div>

        {/* 创建者信息 */}
        <div className="bg-ui-surface-hover/20 rounded px-2 py-1">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-ui-text-muted">创建者</span>
            <span className="text-ui-text-primary">
              User
              {planet.createdBy}
            </span>
          </div>
        </div>

        {/* 创建时间 */}
        <div className="bg-ui-surface-hover/20 rounded px-2 py-1">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-ui-text-muted">创建时间</span>
            <span className="text-ui-text-primary text-[9px]">
              {new Date(planet.createdTime).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* 底部分割线和操作提示 */}
        <div className="border-t border-ui-border/30 pt-2 mt-3">
          <div className="text-ui-text-muted text-[10px] text-center">
            点击其他区域取消选择
          </div>
        </div>
      </div>
    </div>
  )
}
