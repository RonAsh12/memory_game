export const DIFFICULTIES = {
  easy: { label: 'קל', boardSize: 4 },
  medium: { label: 'בינוני', boardSize: 6 },
  hard: { label: 'קשה', boardSize: 8 },
}

export function getPairCount(difficultyKey) {
  const { boardSize } = DIFFICULTIES[difficultyKey]
  return (boardSize * boardSize) / 2
}
