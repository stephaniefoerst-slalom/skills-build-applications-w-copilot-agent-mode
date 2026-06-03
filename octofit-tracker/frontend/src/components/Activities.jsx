import { useEffect, useState } from 'react'
import DataState from './DataState.jsx'
import { apiUrl, normalizeCollection } from '../api.js'

const ENDPOINT_PATH = '/api/activities/'

function userName(activity) {
  return activity.userId?.name || activity.user?.name || 'Unknown user'
}

function Activities() {
  const [activities, setActivities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadActivities() {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(apiUrl(ENDPOINT_PATH))

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()

        if (isMounted) {
          setActivities(normalizeCollection(payload))
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

    loadActivities()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="page-eyebrow">Training log</p>
          <h1 className="h2 mb-0">Activities</h1>
        </div>
        <span className="badge text-bg-primary">{activities.length} records</span>
      </div>

      <div className="data-card">
        <DataState error={error} isLoading={isLoading} resource="activities" />
        {!isLoading && !error && activities.length === 0 && (
          <div className="empty-state">No activities found.</div>
        )}
        {!isLoading && !error && activities.length > 0 && (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Activity</th>
                  <th>User</th>
                  <th>Duration</th>
                  <th>Points</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity._id || activity.id}>
                    <td className="fw-semibold">{activity.type}</td>
                    <td>{userName(activity)}</td>
                    <td>{activity.durationMinutes} min</td>
                    <td>{activity.points}</td>
                    <td>{new Date(activity.completedAt).toLocaleDateString()}</td>
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

export default Activities