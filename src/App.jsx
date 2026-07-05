import { useEffect, useState } from 'react'
import GameInfo from './components/GameInfo'
import Board from './components/Board'
import DifficultySelector from './components/DifficultySelector'
import DeckTypeSelector from './components/DeckTypeSelector'
import Stats from './components/Stats'
import BackgroundDecoration from './components/BackgroundDecoration'
import WinConfetti from './components/WinConfetti'
import { createCards, buildCardsFromValues } from './utils/cards'
import { getPairCount } from './utils/difficulty'
import { DEFAULT_DECK_TYPE } from './utils/deckTypes'
import { fetchFlagValues } from './utils/flagsApi'
import { useTimer } from './hooks/useTimer'
import { getStats, saveGameResult, clearStats } from './utils/stats'
import './App.css'

const MISMATCH_DELAY_MS = 800
const FLAGS_FALLBACK_MESSAGE =
  'לא ניתן היה לטעון את חפיסת דגלי המדינות. הופעלה חפיסה רגילה במקום.'

async function loadDeck(difficultyKey, deckType) {
  const pairCount = getPairCount(difficultyKey)

  if (deckType !== 'flags') {
    return { cards: createCards(pairCount), error: null }
  }

  try {
    const flagValues = await fetchFlagValues(pairCount)
    return { cards: buildCardsFromValues(flagValues), error: null }
  } catch {
    return { cards: createCards(pairCount), error: FLAGS_FALLBACK_MESSAGE }
  }
}

function App() {
  const [difficulty, setDifficulty] = useState(null)
  const [cards, setCards] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const [moves, setMoves] = useState(0)
  const [isComparing, setIsComparing] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [hasSavedResult, setHasSavedResult] = useState(false)
  const [stats, setStats] = useState(() => getStats())
  const [deckType, setDeckType] = useState(DEFAULT_DECK_TYPE)
  const [isLoadingDeck, setIsLoadingDeck] = useState(false)
  const [deckError, setDeckError] = useState(null)
  const { elapsedSeconds, start, stop, reset } = useTimer()

  const isGameWon = cards.length > 0 && cards.every((card) => card.isMatched)

  useEffect(() => {
    if (!isGameWon) return
    stop()
    if (hasSavedResult) return

    setStats(
      saveGameResult({
        difficulty,
        moves,
        elapsedSeconds,
        date: new Date().toISOString(),
      }),
    )
    setHasSavedResult(true)
  }, [isGameWon, stop, hasSavedResult, difficulty, moves, elapsedSeconds])

  function resetGameState() {
    setSelectedIds([])
    setMoves(0)
    setIsComparing(false)
    setHasStarted(false)
    setHasSavedResult(false)
    reset()
  }

  function handleClearStats() {
    clearStats()
    setStats([])
  }

  async function handleSelectDifficulty(difficultyKey) {
    setDifficulty(difficultyKey)
    setIsLoadingDeck(true)
    setDeckError(null)
    const { cards: newCards, error } = await loadDeck(difficultyKey, deckType)
    setCards(newCards)
    setDeckError(error)
    setIsLoadingDeck(false)
    resetGameState()
  }

  async function handleNewGame() {
    setIsLoadingDeck(true)
    setDeckError(null)
    const { cards: newCards, error } = await loadDeck(difficulty, deckType)
    setCards(newCards)
    setDeckError(error)
    setIsLoadingDeck(false)
    resetGameState()
  }

  function handleChangeDifficulty() {
    setDifficulty(null)
    setCards([])
    setDeckError(null)
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
      <>
        <BackgroundDecoration />
        <div className="app">
          <DifficultySelector onSelect={handleSelectDifficulty} />
          <DeckTypeSelector selectedDeckType={deckType} onSelect={setDeckType} />
          <Stats stats={stats} onClear={handleClearStats} />
        </div>
      </>
    )
  }

  return (
    <>
      <BackgroundDecoration />
      <div className="app">
        <GameInfo moves={moves} elapsedSeconds={elapsedSeconds} />
        {deckError && <p className="deck-error-message">{deckError}</p>}
        {isLoadingDeck ? (
          <p className="deck-loading-message">טוען חפיסת קלפים...</p>
        ) : (
          <>
            {isGameWon && (
              <>
                <WinConfetti />
                <p className="win-message">🎉 ניצחת! מצאת את כל הזוגות ב-{moves} מהלכים.</p>
              </>
            )}
            <Board cards={cards} onCardClick={handleCardClick} />
          </>
        )}
        <div className="game-actions">
          <button className="new-game-button" onClick={handleNewGame} disabled={isLoadingDeck}>
            התחל משחק חדש
          </button>
          <button
            className="change-difficulty-button"
            onClick={handleChangeDifficulty}
            disabled={isLoadingDeck}
          >
            רמת קושי חדשה
          </button>
        </div>
        <Stats stats={stats} onClear={handleClearStats} />
      </div>
    </>
  )
}

export default App
