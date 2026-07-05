import './Card.css'

function Card({ value, isFlipped, isMatched }) {
  return (
    <div className={`card ${isFlipped || isMatched ? 'is-flipped' : ''} ${isMatched ? 'is-matched' : ''}`}>
      <div className="card-face card-face-back">?</div>
      <div className="card-face card-face-front">{value}</div>
    </div>
  )
}

export default Card
