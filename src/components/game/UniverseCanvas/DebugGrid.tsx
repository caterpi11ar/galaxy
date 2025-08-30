'use client'

import type { ViewportState } from '@/types/game'
import { Rect } from 'react-konva'

interface DebugGridProps {
  width: number
  height: number
  viewport: ViewportState
}

/**
 * 调试网格组件
 * 显示网格辅助线，帮助开发和调试
 */
export function DebugGrid({ width, height, viewport }: DebugGridProps) {
  if (viewport.scale < 0.3) {
    return null
  }

  const gridLines = []
  const gridSize = 100
  const startX = Math.floor(-viewport.x / viewport.scale / gridSize) * gridSize
  const startY = Math.floor(-viewport.y / viewport.scale / gridSize) * gridSize
  const endX = startX + Math.ceil(width / viewport.scale / gridSize) * gridSize + gridSize
  const endY = startY + Math.ceil(height / viewport.scale / gridSize) * gridSize + gridSize

  // 垂直线
  for (let x = startX; x <= endX; x += gridSize) {
    gridLines.push(
      <Rect
        key={`grid-v-${x}`}
        x={x}
        y={startY}
        width={1 / viewport.scale}
        height={endY - startY}
        fill="rgba(255,255,255,0.1)"
      />,
    )
  }

  // 水平线
  for (let y = startY; y <= endY; y += gridSize) {
    gridLines.push(
      <Rect
        key={`grid-h-${y}`}
        x={startX}
        y={y}
        width={endX - startX}
        height={1 / viewport.scale}
        fill="rgba(255,255,255,0.1)"
      />,
    )
  }

  return <>{gridLines}</>
}
