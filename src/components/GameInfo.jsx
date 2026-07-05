import { formatTime } from '../utils/time'
import './GameInfo.css'

function GameInfo({ moves, elapsedSeconds }) {
  return (
    <div className="game-info">
      <h1>Card Memory Game</h1>
      <div className="game-info-stats">
        <span className="game-info-item">⏱ {formatTime(elapsedSeconds)}</span>
        <span className="game-info-item">מהלכים: {moves}</span>
      </div>
    </div>
  )
}

export default GameInfo
