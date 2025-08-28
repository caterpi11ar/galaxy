import type { Planet } from '@/types/game'

// 模拟星球数据
export const mockPlanets: Planet[] = [
  { id: 1, name: '火星殖民地', author: 'SpaceExplorer', x: 150, y: 200, size: 24, color: '#f44336', likes: 42, dislikes: 3 },
  { id: 2, name: '蓝色海洋', author: 'DeepSea', x: 300, y: 150, size: 32, color: '#2979ff', likes: 38, dislikes: 1 },
  { id: 3, name: '原谅星球', author: 'TreeLover', x: 450, y: 300, size: 199, color: '#4caf50', likes: 56, dislikes: 2 },
  { id: 4, name: '紫色星云', author: 'CosmicArt', x: 200, y: 350, size: 36, color: '#533483', likes: 29, dislikes: 5 },
  { id: 5, name: '金色沙丘', author: 'DesertKing', x: 380, y: 100, size: 20, color: '#ffeb3b', likes: 33, dislikes: 2 },
  { id: 6, name: '冰晶世界', author: 'FrozenRealm', x: 100, y: 120, size: 26, color: '#00bcd4', likes: 47, dislikes: 1 },
]
