'use client'

import type { ViewportState } from '@/types/game'
import type { Planet } from '@/types/planet'
// 移除未使用的导入 - 工具函数在组件中使用
import { useCallback, useRef, useState } from 'react'

/**
 * 宇宙画布状态管理 Hook
 * 管理视口、星球数据、交互状态等
 */
export function useUniverseCanvas() {
  const stageRef = useRef<HTMLDivElement>(null) // 改为 div 引用，适配 Konva Stage
  const lastPointerPos = useRef({ x: 0, y: 0 })

  // 视口状态
  const [viewport, setViewport] = useState<ViewportState>({
    x: 0,
    y: 0,
    scale: 1,
  })

  // 星球数据 - 使用标准 Planet 类型
  const [planets, setPlanets] = useState<Planet[]>([
    {
      id: '1',
      name: 'Mars Alpha',
      createdBy: 1,
      createdTime: '2024-01-01T00:00:00Z',
      x: 100,
      y: 100,
      size: 30,
      imageUrl: '',
      likes: 85,
      dislikes: 15,
      isLiked: false,
      isDisliked: false,
    },
    {
      id: '2',
      name: 'Ocean Beta',
      createdBy: 2,
      createdTime: '2024-01-02T00:00:00Z',
      x: 300,
      y: 200,
      size: 25,
      imageUrl: '',
      likes: 92,
      dislikes: 8,
      isLiked: false,
      isDisliked: false,
    },
    {
      id: '3',
      name: 'Ice Gamma',
      createdBy: 1,
      createdTime: '2024-01-03T00:00:00Z',
      x: 500,
      y: 150,
      size: 35,
      imageUrl: '',
      likes: 78,
      dislikes: 22,
      isLiked: false,
      isDisliked: false,
    },
    {
      id: '4',
      name: 'Desert Delta',
      createdBy: 3,
      createdTime: '2024-01-04T00:00:00Z',
      x: 200,
      y: 350,
      size: 28,
      imageUrl: '',
      likes: 67,
      dislikes: 33,
      isLiked: false,
      isDisliked: false,
    },
    {
      id: '5',
      name: 'Mystic Epsilon',
      createdBy: 2,
      createdTime: '2024-01-05T00:00:00Z',
      x: 450,
      y: 320,
      size: 32,
      imageUrl: '',
      likes: 89,
      dislikes: 11,
      isLiked: false,
      isDisliked: false,
    },
  ])

  // 交互状态
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // 坐标转换函数 - 适配 Konva Stage
  const screenToWorld = useCallback((screenX: number, screenY: number) => {
    const stage = stageRef.current
    if (!stage)
      return { x: screenX, y: screenY }

    const rect = stage.getBoundingClientRect()
    const x = (screenX - rect.left - viewport.x) / viewport.scale
    const y = (screenY - rect.top - viewport.y) / viewport.scale
    return { x, y }
  }, [viewport])

  const worldToScreen = useCallback((worldX: number, worldY: number) => {
    return {
      x: worldX * viewport.scale + viewport.x,
      y: worldY * viewport.scale + viewport.y,
    }
  }, [viewport])

  // 检测点击的星球
  const getPlanetAtPoint = useCallback((worldX: number, worldY: number): Planet | null => {
    for (const planet of planets) {
      const distance = Math.sqrt(
        (worldX - planet.x) ** 2 + (worldY - planet.y) ** 2,
      )
      if (distance <= planet.size) {
        return planet
      }
    }
    return null
  }, [planets])

  // 视口操作
  const zoomIn = useCallback(() => {
    setViewport(prev => ({ ...prev, scale: Math.min(5, prev.scale * 1.2) }))
  }, [])

  const zoomOut = useCallback(() => {
    setViewport(prev => ({ ...prev, scale: Math.max(0.1, prev.scale / 1.2) }))
  }, [])

  const resetViewport = useCallback(() => {
    setViewport({ x: 0, y: 0, scale: 1 })
  }, [])

  const centerOnPlanet = useCallback((planetId: string) => {
    const planet = planets.find(p => p.id === planetId)
    if (!planet || !stageRef.current)
      return

    const stage = stageRef.current
    const rect = stage.getBoundingClientRect()
    const centerX = rect.width / 2 - planet.x * viewport.scale
    const centerY = rect.height / 2 - planet.y * viewport.scale

    setViewport(prev => ({
      ...prev,
      x: centerX,
      y: centerY,
    }))
  }, [planets, viewport.scale])

  // 星球操作
  const addPlanet = useCallback((planet: Omit<Planet, 'id'>) => {
    const newPlanet: Planet = {
      ...planet,
      id: `planet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }
    setPlanets(prev => [...prev, newPlanet])
    return newPlanet.id
  }, [])

  const removePlanet = useCallback((planetId: string) => {
    setPlanets(prev => prev.filter(p => p.id !== planetId))
    if (selectedPlanet === planetId) {
      setSelectedPlanet(null)
    }
  }, [selectedPlanet])

  const updatePlanet = useCallback((planetId: string, updates: Partial<Planet>) => {
    setPlanets(prev => prev.map(p =>
      p.id === planetId ? { ...p, ...updates } : p,
    ))
  }, [])

  // 指针事件处理器 - 适配 Konva
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault()

    const worldPos = screenToWorld(e.clientX, e.clientY)
    const clickedPlanet = getPlanetAtPoint(worldPos.x, worldPos.y)

    if (clickedPlanet) {
      setSelectedPlanet(clickedPlanet.id)
    }
    else {
      setSelectedPlanet(null)
      setIsDragging(true)
      lastPointerPos.current = { x: e.clientX, y: e.clientY }
    }
  }, [screenToWorld, getPlanetAtPoint])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging)
      return

    e.preventDefault()

    const deltaX = e.clientX - lastPointerPos.current.x
    const deltaY = e.clientY - lastPointerPos.current.y

    setViewport(prev => ({
      ...prev,
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }))

    lastPointerPos.current = { x: e.clientX, y: e.clientY }
  }, [isDragging])

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()

    const stage = stageRef.current
    if (!stage)
      return

    const rect = stage.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const worldPos = screenToWorld(e.clientX, e.clientY)

    const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1
    const newScale = Math.max(0.1, Math.min(5, viewport.scale * scaleFactor))

    const newX = mouseX - worldPos.x * newScale
    const newY = mouseY - worldPos.y * newScale

    setViewport({
      x: newX,
      y: newY,
      scale: newScale,
    })
  }, [viewport, screenToWorld])

  // 获取选中的星球信息
  const getSelectedPlanet = useCallback((): Planet | null => {
    if (!selectedPlanet)
      return null
    return planets.find(p => p.id === selectedPlanet) || null
  }, [selectedPlanet, planets])

  return {
    // Refs
    stageRef,

    // 状态
    viewport,
    planets,
    selectedPlanet,
    isDragging,
    isLoading,

    // 状态设置器
    setViewport,
    setPlanets,
    setSelectedPlanet,
    setIsDragging,
    setIsLoading,

    // 坐标转换
    screenToWorld,
    worldToScreen,
    getPlanetAtPoint,

    // 视口操作
    zoomIn,
    zoomOut,
    resetViewport,
    centerOnPlanet,

    // 星球操作
    addPlanet,
    removePlanet,
    updatePlanet,
    getSelectedPlanet,

    // 事件处理器
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleWheel,
  }
}
