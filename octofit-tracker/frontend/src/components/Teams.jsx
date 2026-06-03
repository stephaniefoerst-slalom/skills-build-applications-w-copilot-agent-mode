import { useEffect, useState } from 'react'
import DataState from './DataState.jsx'
import { apiUrl, normalizeCollection } from '../api.js'

const ENDPOINT_PATH = '/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadTeams() {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(apiUrl(ENDPOINT_PATH))

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()

        if (isMounted) {
          setTeams(normalizeCollection(payload))
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

    loadTeams()

    return () => {
      isMounted = false
    }
  }, [])

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