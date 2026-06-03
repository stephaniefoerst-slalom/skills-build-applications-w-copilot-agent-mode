import { useEffect, useState } from 'react'
import DataState from './DataState.jsx'
import { apiUrl, normalizeCollection } from '../api.js'

const ENDPOINT_PATH = '/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadWorkouts() {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(apiUrl(ENDPOINT_PATH))

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()

        if (isMounted) {
          setWorkouts(normalizeCollection(payload))
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

    loadWorkouts()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="page-eyebrow">Suggestions</p>
          <h1 className="h2 mb-0">Workouts</h1>
        </div>
        <span className="badge text-bg-primary">{workouts.length} records</span>
      </div>

      <div className="row g-3">
        <DataState error={error} isLoading={isLoading} resource="workouts" />
        {!isLoading && !error && workouts.length === 0 && (
          <div className="col-12">
            <div className="data-card empty-state">No workouts found.</div>
          </div>
        )}
        {!isLoading && !error && workouts.map((workout) => (
          <div className="col-12 col-md-6 col-xl-4" key={workout._id || workout.id || workout.title}>
            <article className="data-card h-100 p-3">
              <div className="d-flex justify-content-between gap-2 mb-2">
                <h2 className="h5 mb-0">{workout.title}</h2>
                <span className="badge text-bg-success text-capitalize">{workout.difficulty}</span>
              </div>
              <p className="text-secondary mb-3">{workout.description}</p>
              <span className="fw-semibold">{workout.durationMinutes} minutes</span>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Workouts