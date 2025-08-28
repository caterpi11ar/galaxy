'use client'

import { GameControls } from '@/components/game/GameControls'
import { GameHeader } from '@/components/game/GameHeader'
import { OnlineStatus } from '@/components/game/OnlineStatus'
import { PlanetInfoPanel } from '@/components/game/PlanetInfoPanel'
import { UniverseCanvas } from '@/components/game/UniverseCanvas'
import { useUniverseGame } from '@/hooks/useUniverseGame'
import { mockPlanets } from '@/lib/mock-data'

export default function UniverseView() {
  const {
    zoom,
    pan,
    selectedPlanet,
    isDragging,
    isLoggedIn,
    onlineCount,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleCanvasClick,
    handleZoomIn,
    handleZoomOut,
    handleResetView,
    handleWheel,
    setSelectedPlanet,
    setIsLoggedIn,
  } = useUniverseGame(mockPlanets)

  return (
    <div className="min-h-screen bg-space-void text-ui-text-primary font-pixel flex flex-col">
      <GameHeader
        isLoggedIn={isLoggedIn}
        onToggleLogin={() => setIsLoggedIn(!isLoggedIn)}
      />

      <main className="flex-1 relative overflow-hidden">
        <UniverseCanvas
          zoom={zoom}
          pan={pan}
          selectedPlanet={selectedPlanet}
          planets={mockPlanets}
          isDragging={isDragging}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={handleCanvasClick}
          onWheel={handleWheel}
        />

        {selectedPlanet && (
          <PlanetInfoPanel
            planet={selectedPlanet}
            isLoggedIn={isLoggedIn}
            onClose={() => setSelectedPlanet(null)}
          />
        )}

        <OnlineStatus onlineCount={onlineCount} />
      </main>

      <GameControls
        zoom={zoom}
        pan={pan}
        isLoggedIn={isLoggedIn}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetView={handleResetView}
      />
    </div>
  )
}
