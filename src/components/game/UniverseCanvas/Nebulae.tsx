'use client'

import type { ViewportState } from '@/types/game'
import { Circle } from 'react-konva'

interface NebulaeProps {
  width: number
  height: number
  viewport: ViewportState
}

/**
 * 星云效果组件
 * 渲染深空背景的星云和尘埃效果
 */
export function Nebulae({ width, height, viewport }: NebulaeProps) {
  const nebulae = []
  const nebulaCount = 3

  for (let i = 0; i < nebulaCount; i++) {
    const x = (i * 1249) % (width * 4) - width
    const y = (i * 1847) % (height * 4) - height
    const size = 200 + (i * 127 % 100)
    const hue = (i * 137) % 360

    // 视差效果 (比星星更远)
    const parallaxFactor = 0.1
    const parallaxX = x - viewport.x * parallaxFactor
    const parallaxY = y - viewport.y * parallaxFactor

    // 颜色渐变
    const color1 = `hsla(${hue}, 70%, 60%, 0.1)`
    const color2 = `hsla(${(hue + 30) % 360}, 80%, 70%, 0.05)`
    const color3 = `hsla(${(hue + 60) % 360}, 60%, 50%, 0.02)`

    nebulae.push(
      <Circle
        key={`nebula-${i}`}
        x={parallaxX}
        y={parallaxY}
        radius={size}
        fillRadialGradientStartPoint={{ x: 0, y: 0 }}
        fillRadialGradientEndPoint={{ x: 0, y: 0 }}
        fillRadialGradientStartRadius={0}
        fillRadialGradientEndRadius={size}
        fillRadialGradientColorStops={[
          0,
          color1,
          0.4,
          color2,
          0.8,
          color3,
          1,
          'transparent',
        ]}
      />,
    )
  }

  return <>{nebulae}</>
}
