const CARD_VALUES = ['🐶', '🐱', '🐭', '🐹']

export function shuffleCards(cards) {
  const shuffled = [...cards]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function createCards() {
  const cards = CARD_VALUES.flatMap((value, index) => [
    { id: index * 2, value, isFlipped: false, isMatched: false },
    { id: index * 2 + 1, value, isFlipped: false, isMatched: false },
  ])
  return shuffleCards(cards)
}
