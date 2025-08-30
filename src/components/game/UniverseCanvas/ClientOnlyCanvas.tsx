'use client'

import dynamic from 'next/dynamic'
import { UniverseLoadingScreen } from './UniverseLoadingScreen'

// 动态导入 UniverseCanvas，禁用 SSR
const UniverseCanvas = dynamic(
  () => import('./UniverseCanvas').then(mod => ({ default: mod.UniverseCanvas })),
  {
    ssr: false,
    loading: () => <UniverseLoadingScreen />,
  },
)

interface ClientOnlyCanvasProps {
  width?: number
  height?: number
  className?: string
}

export function ClientOnlyCanvas(props: ClientOnlyCanvasProps) {
  return <UniverseCanvas {...props} />
}
