import { useEffect, useState } from 'react'
import DataState from './DataState.jsx'
import { apiUrl, normalizeCollection } from '../api.js'

const ENDPOINT_PATH = '/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadUsers() {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(apiUrl(ENDPOINT_PATH))

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()

        if (isMounted) {
          setUsers(normalizeCollection(payload))
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

    loadUsers()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="page-eyebrow">Directory</p>
          <h1 className="h2 mb-0">Users</h1>
        </div>
        <span className="badge text-bg-primary">{users.length} records</span>
      </div>

      <div className="data-card">
        <DataState error={error} isLoading={isLoading} resource="users" />
        {!isLoading && !error && users.length === 0 && (
          <div className="empty-state">No users found.</div>
        )}
        {!isLoading && !error && users.length > 0 && (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id || user.id || user.email}>
                    <td className="fw-semibold">{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.team || 'Unassigned'}</td>
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

export default Users