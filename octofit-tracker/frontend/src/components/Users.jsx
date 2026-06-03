import DataState from './DataState.jsx'
import { useApiCollection } from './useApiCollection.js'

function Users() {
  const { error, isLoading, items: users } = useApiCollection('users')

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