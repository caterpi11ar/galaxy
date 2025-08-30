'use client'

import type { ViewportState } from '@/types/game'
import { useCallback } from 'react'
import { Circle } from 'react-konva'

interface StarFieldProps {
  width: number
  height: number
  viewport: ViewportState
  animationTime: number
}

interface StarType {
  color: string
  temperature: string
  size: number
  twinkleIntensity: number
  twinkleSpeed: number
}

/**
 * 星空背景组件
 * 渲染真实的多样化星空效果
 */
export function StarField({ width, height, viewport, animationTime }: StarFieldProps) {
  // 星星类型定义
  const getStarType = useCallback((index: number): StarType => {
    const seed = index * 0.618033988749 // 黄金比例，确保随机但稳定
    const type = (seed % 1)

    if (type < 0.50) {
      // 50% 微小背景星星 (填充空白)
      return {
        color: '#ffffff',
        temperature: 'dim',
        size: 0.5 + (seed * 1.3 % 1) * 0.5, // 0.5-1px
        twinkleIntensity: 0.2 + (seed * 2.1 % 1) * 0.3, // 0.2-0.5
        twinkleSpeed: 4 + (seed * 3.7 % 1) * 6, // 4-10秒周期
      }
    }
    else if (type < 0.75) {
      // 25% 普通白色恒星 (类太阳恒星)
      return {
        color: '#ffffff',
        temperature: 'normal',
        size: 1 + (seed * 1.5 % 1) * 0.5, // 1-1.5px
        twinkleIntensity: 0.3 + (seed * 2.7 % 1) * 0.4, // 0.3-0.7
        twinkleSpeed: 2 + (seed * 3.1 % 1) * 3, // 2-5秒周期
      }
    }
    else if (type < 0.88) {
      // 13% 蓝色恒星 (热星)
      return {
        color: '#87ceeb',
        temperature: 'hot',
        size: 1.2 + (seed * 1.1 % 1) * 0.8, // 1.2-2px
        twinkleIntensity: 0.4 + (seed * 2.3 % 1) * 0.5, // 0.4-0.9
        twinkleSpeed: 1.5 + (seed * 2.7 % 1) * 2, // 1.5-3.5秒周期
      }
    }
    else if (type < 0.97) {
      // 9% 红色恒星 (冷星)
      return {
        color: '#ffc0cb',
        temperature: 'cool',
        size: 0.8 + (seed * 1.9 % 1) * 0.7, // 0.8-1.5px
        twinkleIntensity: 0.5 + (seed * 1.6 % 1) * 0.4, // 0.5-0.9
        twinkleSpeed: 3 + (seed * 2.3 % 1) * 4, // 3-7秒周期
      }
    }
    else {
      // 3% 黄色恒星 (巨星)
      return {
        color: '#ffd700',
        temperature: 'giant',
        size: 1.5 + (seed * 1.7 % 1) * 1, // 1.5-2.5px
        twinkleIntensity: 0.5 + (seed * 1.4 % 1) * 0.4, // 0.5-0.9
        twinkleSpeed: 1 + (seed * 1.8 % 1) * 2, // 1-3秒周期
      }
    }
  }, [])

  // 星空背景组件
  const stars = []
  const starCount = 800 // 大幅增加星星数量

  for (let i = 0; i < starCount; i++) {
    // 使用更复杂的哈希函数避免规律性
    const hash1 = ((i * 1664525 + 1013904223) ^ (i << 13)) >>> 0
    const hash2 = ((i * 214013 + 2531011) ^ (i << 7)) >>> 0
    const hash3 = ((i * 16807) ^ (i << 3)) >>> 0

    // 二次哈希增加随机性
    const seed1 = ((hash1 * 2654435761) ^ (hash1 >>> 16)) >>> 0
    const seed2 = ((hash2 * 2246822507) ^ (hash2 >>> 12)) >>> 0
    const seed3 = ((hash3 * 3266489917) ^ (hash3 >>> 8)) >>> 0

    // 归一化到 [0, 1]
    const rand1 = (seed1 / 4294967296)
    const rand2 = (seed2 / 4294967296)

    // 分布到更大范围，增加密度
    const x = rand1 * width * 4 - width * 1
    const y = rand2 * height * 4 - height * 1

    const starType = getStarType(i)

    // 基础亮度使用第三个随机种子
    const rand3 = seed3 / 4294967296
    const baseBrightness = 0.3 + rand3 * 0.7

    // 闪烁效果计算
    const twinklePhase = (animationTime / starType.twinkleSpeed + i * 0.1) % 1
    const twinkleMultiplier = 1 + Math.sin(twinklePhase * Math.PI * 2) * starType.twinkleIntensity
    const currentBrightness = Math.min(1, baseBrightness * twinkleMultiplier)

    // 视差效果（根据星星亮度调整深度）
    const parallaxFactor = 0.15 + baseBrightness * 0.25
    const parallaxX = x - viewport.x * parallaxFactor
    const parallaxY = y - viewport.y * parallaxFactor

    // 只渲染在视口范围内的星星（性能优化）
    const margin = 200
    if (parallaxX < -margin || parallaxX > width + margin
      || parallaxY < -margin || parallaxY > height + margin) {
      continue
    }

    stars.push(
      <Circle
        key={`star-${i}`}
        x={parallaxX}
        y={parallaxY}
        radius={starType.size}
        fill={starType.color}
        opacity={currentBrightness}
        shadowColor={starType.color}
        shadowBlur={starType.temperature === 'giant'
          ? 3
          : starType.temperature === 'hot' ? 2 : 0}
        shadowOpacity={currentBrightness * 0.3}
      />,
    )

    // 为较大的星星添加光晕效果
    if (starType.size > 1.8 && currentBrightness > 0.6) {
      stars.push(
        <Circle
          key={`star-glow-${i}`}
          x={parallaxX}
          y={parallaxY}
          radius={starType.size * 2.5}
          fill={starType.color}
          opacity={currentBrightness * 0.1}
        />,
      )
    }
  }

  return <>{stars}</>
}
