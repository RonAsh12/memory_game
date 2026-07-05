import { DIFFICULTIES } from '../utils/difficulty'
import './DifficultySelector.css'

function DifficultySelector({ onSelect }) {
  return (
    <div className="difficulty-selector">
      <h1>Card Memory Game</h1>
      <p>בחר/י רמת קושי כדי להתחיל</p>
      <div className="difficulty-options">
        {Object.entries(DIFFICULTIES).map(([key, { label, boardSize }]) => (
          <button key={key} onClick={() => onSelect(key)}>
            {label} ({boardSize}×{boardSize})
          </button>
        ))}
      </div>
    </div>
  )
}

export default DifficultySelector
