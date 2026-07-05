import Card from './Card'
import './Board.css'

function Board({ cards, onCardClick }) {
  const columns = Math.round(Math.sqrt(cards.length))

  return (
    <div
      className="board"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          value={card.value}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          onClick={() => onCardClick(card.id)}
        />
      ))}
    </div>
  )
}

export default Board
