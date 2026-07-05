import { readFromStorage, writeToStorage, removeFromStorage } from './storage'

const STATS_STORAGE_KEY = 'memory-game-stats'

export function getStats() {
  return readFromStorage(STATS_STORAGE_KEY, [])
}

export function saveGameResult(result) {
  const updatedStats = [...getStats(), result]
  writeToStorage(STATS_STORAGE_KEY, updatedStats)
  return updatedStats
}

export function clearStats() {
  removeFromStorage(STATS_STORAGE_KEY)
}
