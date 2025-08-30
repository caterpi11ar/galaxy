// 游戏相关类型，直接使用标准 Planet 类型

import type { Planet } from '../planet'

/**
 * 视口状态接口
 * 描述画布的缩放和位置状态
 */
export interface ViewportState {
  /** X轴偏移 */
  x: number
  /** Y轴偏移 */
  y: number
  /** 缩放比例 */
  scale: number
}

/**
 * 宇宙画布状态接口
 * 描述画布组件的完整状态
 */
export interface UniverseCanvasState {
  /** 视口状态 */
  viewport: ViewportState
  /** 星球列表 */
  planets: Planet[]
  /** 选中的星球ID */
  selectedPlanet: string | null
  /** 是否正在拖拽 */
  isDragging: boolean
  /** 是否加载中 */
  isLoading: boolean
}

/**
 * 根据星球ID生成一致的颜色
 * @param planetId 星球ID
 */
export function generatePlanetColor(planetId: string): string {
  // 预定义的星球颜色模板
  const colors = [
    '#ff6b6b', // 红色
    '#4ecdc4', // 青色
    '#45b7d1', // 蓝色
    '#f7b801', // 黄色
    '#6c5ce7', // 紫色
    '#fd79a8', // 粉色
    '#00b894', // 绿色
    '#e17055', // 橙色
  ]

  // 基于ID生成一致的索引
  let hash = 0
  for (let i = 0; i < planetId.length; i++) {
    hash = ((hash << 5) - hash + planetId.charCodeAt(i)) & 0xFFFFFFFF
  }

  return colors[Math.abs(hash) % colors.length] || '#ff6b6b' // 默认颜色
}

/**
 * 计算星球热度评分
 * @param likes 点赞数
 * @param dislikes 不喜欢数
 */
export function calculatePlanetRating(likes: number, dislikes: number): number {
  if (likes === 0 && dislikes === 0)
    return 0
  return Math.round((likes / (likes + dislikes)) * 100)
}
