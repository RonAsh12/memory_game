import { DECK_TYPES } from '../utils/deckTypes'
import './DeckTypeSelector.css'

function DeckTypeSelector({ selectedDeckType, onSelect }) {
  return (
    <div className="deck-type-selector">
      <p>בחר/י סוג חפיסה</p>
      <div className="deck-type-options">
        {Object.entries(DECK_TYPES).map(([key, { label }]) => (
          <button
            key={key}
            className={key === selectedDeckType ? 'is-selected' : ''}
            onClick={() => onSelect(key)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default DeckTypeSelector
