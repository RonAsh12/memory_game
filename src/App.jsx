import { useEffect, useState } from 'react'
import GameInfo from './components/GameInfo'
import Board from './components/Board'
import { createCards } from './utils/cards'
import { useTimer } from './hooks/useTimer'
import './App.css'

const MISMATCH_DELAY_MS = 800

function App() {
  const [cards, setCards] = useState(createCards)
  const [selectedIds, setSelectedIds] = useState([])
  const [moves, setMoves] = useState(0)
  const [isComparing, setIsComparing] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const { elapsedSeconds, start, stop, reset } = useTimer()

  const isGameWon = cards.every((card) => card.isMatched)

  useEffect(() => {
    if (isGameWon) stop()
  }, [isGameWon, stop])

  function handleNewGame() {
    setCards(createCards())
    setSelectedIds([])
    setMoves(0)
    setIsComparing(false)
    setHasStarted(false)
    reset()
  }

  function handleCardClick(id) {
    if (isComparing || isGameWon) return

    const clickedCard = cards.find((card) => card.id === id)
    if (clickedCard.isFlipped || clickedCard.isMatched) return

    if (!hasStarted) {
      setHasStarted(true)
      start()
    }

    const flippedCards = cards.map((card) =>
      card.id === id ? { ...card, isFlipped: true } : card,
    )
    setCards(flippedCards)

    const nextSelectedIds = [...selectedIds, id]
    if (nextSelectedIds.length < 2) {
      setSelectedIds(nextSelectedIds)
      return
    }

    setMoves((previousMoves) => previousMoves + 1)
    setIsComparing(true)

    const [firstId, secondId] = nextSelectedIds
    const firstCard = flippedCards.find((card) => card.id === firstId)
    const secondCard = flippedCards.find((card) => card.id === secondId)
    const isMatch = firstCard.value === secondCard.value

    setTimeout(() => {
      setCards((previousCards) =>
        previousCards.map((card) => {
          if (card.id !== firstId && card.id !== secondId) return card
          return isMatch ? { ...card, isMatched: true } : { ...card, isFlipped: false }
        }),
      )
      setSelectedIds([])
      setIsComparing(false)
    }, MISMATCH_DELAY_MS)
  }

  return (
    <div className="app">
      <GameInfo moves={moves} elapsedSeconds={elapsedSeconds} />
      {isGameWon && (
        <p className="win-message">🎉 ניצחת! מצאת את כל הזוגות ב-{moves} מהלכים.</p>
      )}
      <Board cards={cards} onCardClick={handleCardClick} />
      <button className="new-game-button" onClick={handleNewGame}>
        התחל משחק חדש
      </button>
    </div>
  )
}

export default App
