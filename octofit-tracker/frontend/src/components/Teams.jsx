import DataState from './DataState.jsx'
import { useApiCollection } from './useApiCollection.js'

function Teams() {
  const { error, isLoading, items: teams } = useApiCollection('teams')

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="page-eyebrow">Groups</p>
          <h1 className="h2 mb-0">Teams</h1>
        </div>
        <span className="badge text-bg-primary">{teams.length} records</span>
      </div>

      <div className="data-card">
        <DataState error={error} isLoading={isLoading} resource="teams" />
        {!isLoading && !error && teams.length === 0 && (
          <div className="empty-state">No teams found.</div>
        )}
        {!isLoading && !error && teams.length > 0 && (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Team</th>
                  <th>Coach</th>
                  <th>Members</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team._id || team.id || team.name}>
                    <td className="fw-semibold">{team.name}</td>
                    <td>{team.coach || 'Unassigned'}</td>
                    <td>{team.members?.map((member) => member.name).join(', ') || 'No members'}</td>
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

export default Teams