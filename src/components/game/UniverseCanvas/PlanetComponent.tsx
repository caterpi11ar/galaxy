'use client'

import type { Planet } from '@/types/planet'
import { Circle, Text } from 'react-konva'
import { calculatePlanetRating, generatePlanetColor } from '@/types/game'

interface PlanetComponentProps {
  planet: Planet
  selectedPlanet: string | null
  hoveredPlanet: string | null
  viewportScale: number
  animationTime: number
}

/**
 * 单个星球组件
 * 包含星球主体、高光效果、名称和评分显示
 */
export function PlanetComponent({
  planet,
  selectedPlanet,
  hoveredPlanet,
  viewportScale,
  animationTime,
}: PlanetComponentProps) {
  const isSelected = selectedPlanet === planet.id
  const isHovered = hoveredPlanet === planet.id
  const scale = viewportScale

  // 从标准 Planet 数据派生显示属性
  const color = generatePlanetColor(planet.id)
  const rating = calculatePlanetRating(planet.likes, planet.dislikes)

  return (
    <>
      {/* 星球主体 */}
      <Circle
        x={planet.x}
        y={planet.y}
        radius={planet.size * (isHovered ? 1.1 : 1)}
        fill={color}
        strokeWidth={isSelected ? 2 / scale : isHovered ? 1 / scale : 0}
        stroke={isSelected ? '#ffffff' : isHovered ? '#ffd700' : ''}
        shadowColor={isHovered ? '#ffd700' : 'rgba(0,0,0,0.5)'}
        shadowBlur={isHovered ? 15 / scale : 10 / scale}
        shadowOffset={{ x: 2 / scale, y: 2 / scale }}
        opacity={isHovered ? 0.9 : 1}
      />

      {/* 星球高光 */}
      <Circle
        x={planet.x - planet.size * 0.3}
        y={planet.y - planet.size * 0.3}
        radius={planet.size * 0.2}
        fill="rgba(255,255,255,0.3)"
      />

      {/* 选中状态的脉冲边框 */}
      {isSelected && (
        <Circle
          x={planet.x}
          y={planet.y}
          radius={planet.size + 5}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={1 / scale}
          dash={[5 / scale, 5 / scale]}
        />
      )}

      {/* 悬停状态的光环效果 */}
      {isHovered && !isSelected && (
        <Circle
          x={planet.x}
          y={planet.y}
          radius={planet.size + 8}
          stroke="rgba(255,215,0,0.4)"
          strokeWidth={2 / scale}
          opacity={0.7 + Math.sin(animationTime * 0.003) * 0.3}
        />
      )}

      {/* 星球名称 - 只在缩放足够大时显示 */}
      {scale > 0.5 && (
        <Text
          x={planet.x}
          y={planet.y + planet.size + 15 / scale}
          text={planet.name}
          fontSize={12 / scale}
          fontFamily="monospace"
          fill="#ffffff"
          align="center"
          offsetX={50} // 居中对齐
          shadowColor="rgba(0,0,0,0.8)"
          shadowBlur={3}
          shadowOffset={{ x: 1, y: 1 }}
        />
      )}

      {/* 星球评分 */}
      {scale > 0.8 && rating > 0 && (
        <Text
          x={planet.x}
          y={planet.y + planet.size + 30 / scale}
          text={`★ ${rating}`}
          fontSize={10 / scale}
          fontFamily="monospace"
          fill="#ffd700"
          align="center"
          offsetX={30} // 居中对齐
        />
      )}
    </>
  )
}
