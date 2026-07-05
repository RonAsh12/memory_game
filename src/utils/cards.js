import { shuffleArray } from './shuffle'

export const CARD_VALUE_POOL = [
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼',
  '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔',
  '🐧', '🐦', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗',
  '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜',
]

export function buildCardsFromValues(values) {
  const cards = values.flatMap((value, index) => [
    { id: index * 2, value, isFlipped: false, isMatched: false },
    { id: index * 2 + 1, value, isFlipped: false, isMatched: false },
  ])
  return shuffleArray(cards)
}

export function createCards(pairCount = 4) {
  const values = CARD_VALUE_POOL.slice(0, pairCount)
  return buildCardsFromValues(values)
}
