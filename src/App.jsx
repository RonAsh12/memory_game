import GameInfo from './components/GameInfo'
import Board from './components/Board'
import './App.css'

const sampleCards = [
  { id: 1, value: '🐶', isFlipped: true, isMatched: false },
  { id: 2, value: '🐱', isFlipped: false, isMatched: false },
  { id: 3, value: '🐱', isFlipped: false, isMatched: false },
  { id: 4, value: '🐶', isFlipped: false, isMatched: true },
  { id: 5, value: '🐭', isFlipped: false, isMatched: false },
  { id: 6, value: '🐹', isFlipped: false, isMatched: false },
  { id: 7, value: '🐭', isFlipped: false, isMatched: false },
  { id: 8, value: '🐹', isFlipped: false, isMatched: false },
]

function App() {
  return (
    <div className="app">
      <GameInfo />
      <Board cards={sampleCards} />
    </div>
  )
}

export default App
