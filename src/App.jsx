import { useEffect, useState } from 'react'
import GameInfo from './components/GameInfo'
import Board from './components/Board'
import DifficultySelector from './components/DifficultySelector'
import { createCards } from './utils/cards'
import { getPairCount } from './utils/difficulty'
import { useTimer } from './hooks/useTimer'
import './App.css'

const MISMATCH_DELAY_MS = 800

function App() {
  const [difficulty, setDifficulty] = useState(null)
  const [cards, setCards] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const [moves, setMoves] = useState(0)
  const [isComparing, setIsComparing] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const { elapsedSeconds, start, stop, reset } = useTimer()

  const isGameWon = cards.length > 0 && cards.every((card) => card.isMatched)

  useEffect(() => {
    if (isGameWon) stop()
  }, [isGameWon, stop])

  function resetGameState() {
    setSelectedIds([])
    setMoves(0)
    setIsComparing(false)
    setHasStarted(false)
    reset()
  }

  function handleSelectDifficulty(difficultyKey) {
    setDifficulty(difficultyKey)
    setCards(createCards(getPairCount(difficultyKey)))
    resetGameState()
  }

  function handleNewGame() {
    setCards(createCards(getPairCount(difficulty)))
    resetGameState()
  }

  function handleChangeDifficulty() {
    setDifficulty(null)
    setCards([])
    resetGameState()
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

  if (!difficulty) {
    return (
      <div className="app">
        <DifficultySelector onSelect={handleSelectDifficulty} />
      </div>
    )
  }

  return (
    <div className="app">
      <GameInfo moves={moves} elapsedSeconds={elapsedSeconds} />
      {isGameWon && (
        <p className="win-message">🎉 ניצחת! מצאת את כל הזוגות ב-{moves} מהלכים.</p>
      )}
      <Board cards={cards} onCardClick={handleCardClick} />
      <div className="game-actions">
        <button className="new-game-button" onClick={handleNewGame}>
          התחל משחק חדש
        </button>
        <button className="change-difficulty-button" onClick={handleChangeDifficulty}>
          רמת קושי חדשה
        </button>
      </div>
    </div>
  )
}

export default App
