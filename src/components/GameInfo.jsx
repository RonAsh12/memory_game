import './GameInfo.css'

function GameInfo() {
  return (
    <div className="game-info">
      <h1>Card Memory Game</h1>
      <div className="game-info-stats">
        <span className="game-info-item">⏱ 00:00</span>
        <span className="game-info-item">מהלכים: 0</span>
      </div>
    </div>
  )
}

export default GameInfo
