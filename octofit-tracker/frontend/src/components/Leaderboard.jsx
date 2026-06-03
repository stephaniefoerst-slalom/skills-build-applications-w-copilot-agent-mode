import DataState from './DataState.jsx'
import { useApiCollection } from './useApiCollection.js'

function Leaderboard() {
  const { error, isLoading, items: leaderboard } = useApiCollection('leaderboard')

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