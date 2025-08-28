export interface Planet {
  id: number
  name: string
  author: string
  x: number
  y: number
  size: number
  color: string
  likes: number
  dislikes: number
}

export interface GameState {
  zoom: number
  pan: { x: number, y: number }
  selectedPlanet: Planet | null
  isDragging: boolean
  dragStart: { x: number, y: number }
}

export interface UserState {
  isLoggedIn: boolean
  onlineCount: number
}
