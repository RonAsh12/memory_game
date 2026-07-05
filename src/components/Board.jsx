import Card from './Card'
import './Board.css'

function Board({ cards }) {
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
        />
      ))}
    </div>
  )
}

export default Board
