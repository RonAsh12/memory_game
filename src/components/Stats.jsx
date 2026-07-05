import { DIFFICULTIES } from '../utils/difficulty'
import { formatTime } from '../utils/time'
import './Stats.css'

function getBestForDifficulty(stats, difficultyKey) {
  const entries = stats.filter((entry) => entry.difficulty === difficultyKey)
  if (entries.length === 0) return null

  return {
    gamesPlayed: entries.length,
    bestTime: Math.min(...entries.map((entry) => entry.elapsedSeconds)),
    bestMoves: Math.min(...entries.map((entry) => entry.moves)),
  }
}

function Stats({ stats, onClear }) {
  const recentGames = [...stats].reverse().slice(0, 5)

  return (
    <div className="stats">
      <h2>סטטיסטיקות</h2>

      {stats.length === 0 ? (
        <p>עדיין לא הושלם אף משחק.</p>
      ) : (
        <>
          <table className="stats-table">
            <thead>
              <tr>
                <th>רמת קושי</th>
                <th>משחקים</th>
                <th>שיא זמן</th>
                <th>שיא מהלכים</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(DIFFICULTIES).map(([key, { label }]) => {
                const best = getBestForDifficulty(stats, key)
                return (
                  <tr key={key}>
                    <td>{label}</td>
                    <td>{best ? best.gamesPlayed : 0}</td>
                    <td>{best ? formatTime(best.bestTime) : '-'}</td>
                    <td>{best ? best.bestMoves : '-'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <h3>משחקים אחרונים</h3>
          <ul className="stats-history">
            {recentGames.map((entry, index) => (
              <li key={index}>
                {new Date(entry.date).toLocaleString('he-IL')} -{' '}
                {DIFFICULTIES[entry.difficulty]?.label ?? entry.difficulty} -{' '}
                {formatTime(entry.elapsedSeconds)} - {entry.moves} מהלכים
              </li>
            ))}
          </ul>

          <button className="clear-stats-button" onClick={onClear}>
            נקה סטטיסטיקות
          </button>
        </>
      )}
    </div>
  )
}

export default Stats
