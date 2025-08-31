'use client'

import { useGesture } from '@use-gesture/react'
import { useCallback } from 'react'

interface UseGesturesOptions {
  onDrag?: (state: { offset: [number, number], down: boolean, velocity: [number, number], first: boolean }) => void
  onPinch?: (state: { scale: number, origin: [number, number] }) => void
  onWheel?: (state: { delta: [number, number] }) => void
  onLongPress?: () => void
  disabled?: boolean
  sensitivity?: number // 拖拽灵敏度系数，默认1.0
}

/**
 * 统一的跨平台手势处理 Hook
 * 支持 PC 和移动端的拖拽、缩放、滚轮、长按等操作
 */
export function useGestures({
  onDrag,
  onPinch,
  onWheel,
  onLongPress,
  disabled = false,
  sensitivity = 1.0,
}: UseGesturesOptions) {
  // 长按处理
  const handleLongPress = useCallback(() => {
    if (onLongPress && !disabled) {
      onLongPress()
    }
  }, [onLongPress, disabled])

  // 配置 @use-gesture/react
  const bind = useGesture(
    {
      // 拖拽处理 (PC: 鼠标拖拽, 移动: 手指拖拽)
      onDrag: ({ offset, down, event, velocity, first }) => {
        if (disabled || !onDrag)
          return

        event?.preventDefault()
        // 应用灵敏度系数
        const adjustedOffset: [number, number] = [
          offset[0] * sensitivity,
          offset[1] * sensitivity,
        ]
        onDrag({ offset: adjustedOffset, down, velocity, first })
      },

      // 缩放处理 (PC: Ctrl+滚轮, 移动: 双指缩放)
      onPinch: ({ offset, origin, event }) => {
        if (disabled || !onPinch)
          return

        event?.preventDefault()
        // 使用 offset[0] 作为 scale 值
        onPinch({ scale: Math.max(0.1, Math.min(5, offset[0])), origin })
      },

      // 滚轮处理 (PC 专用)
      onWheel: ({ delta, event }) => {
        if (disabled || !onWheel)
          return

        // 只在非移动设备上处理滚轮
        if (!('ontouchstart' in window)) {
          event?.preventDefault()
          onWheel({ delta })
        }
      },

      // 长按处理 (移动端右键菜单替代)
      onPointerDown: () => {
        if (disabled || !onLongPress)
          return

        // 移动端长按检测
        if ('ontouchstart' in window) {
          const longPressTimer = setTimeout(() => {
            handleLongPress()
          }, 500) // 500ms 长按触发

          const cleanup = () => {
            clearTimeout(longPressTimer)
            document.removeEventListener('pointerup', cleanup)
            document.removeEventListener('pointermove', cleanup)
          }

          document.addEventListener('pointerup', cleanup)
          document.addEventListener('pointermove', cleanup)
        }
      },
    },
    {
      // 手势配置选项
      drag: {
        from: () => [0, 0], // 从当前位置开始拖拽
        threshold: 8, // 增加拖拽阈值，减少意外触发
        filterTaps: true, // 过滤点击事件
        pointer: { touch: true }, // 启用触摸支持
      },
      pinch: {
        scaleBounds: { min: 0.1, max: 5 }, // 缩放范围
        rubberband: true, // 橡皮筋效果
      },
      wheel: {
        preventDefault: true,
      },
    },
  )

  return bind
}

/**
 * 检测当前设备类型
 */
export function useDeviceType() {
  const isMobile = typeof window !== 'undefined' && 'ontouchstart' in window
  const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth <= 1024
  const isDesktop = typeof window !== 'undefined' && window.innerWidth > 1024

  return {
    isMobile,
    isTablet,
    isDesktop,
    hasTouch: isMobile || isTablet,
  }
}
