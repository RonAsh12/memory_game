import { CARD_VALUE_POOL } from '../utils/cards'
import './BackgroundDecoration.css'

const TILE_COUNT = 350

const tiles = Array.from(
  { length: TILE_COUNT },
  (_, index) => CARD_VALUE_POOL[index % CARD_VALUE_POOL.length],
)

function BackgroundDecoration() {
  return (
    <div className="background-decoration" aria-hidden="true">
      {tiles.map((icon, index) => (
        <span key={index} className="background-decoration-icon">
          {icon}
        </span>
      ))}
    </div>
  )
}

export default BackgroundDecoration
