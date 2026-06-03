import { useEffect, useState } from 'react'
import DataState from './DataState.jsx'
import { apiUrl, normalizeCollection } from '../api.js'

const ENDPOINT_PATH = '/api/leaderboard/'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadLeaderboard() {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(apiUrl(ENDPOINT_PATH))

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()

        if (isMounted) {
          setLeaderboard(normalizeCollection(payload))
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadLeaderboard()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="page-eyebrow">Competition</p>
          <h1 className="h2 mb-0">Leaderboard</h1>
        </div>
        <span className="badge text-bg-primary">{leaderboard.length} records</span>
      </div>

      <div className="data-card">
        <DataState error={error} isLoading={isLoading} resource="leaderboard" />
        {!isLoading && !error && leaderboard.length === 0 && (
          <div className="empty-state">No leaderboard entries found.</div>
        )}
        {!isLoading && !error && leaderboard.length > 0 && (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry) => (
                  <tr key={entry._id || entry.id}>
                    <td className="fw-semibold">#{entry.rank}</td>
                    <td>{entry.userId?.name || entry.user?.name || 'Unknown user'}</td>
                    <td>{entry.userId?.email || entry.user?.email || 'Unavailable'}</td>
                    <td>{entry.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

export default Leaderboard