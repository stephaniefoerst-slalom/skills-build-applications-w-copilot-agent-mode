import DataState from './DataState.jsx'
import { useApiCollection } from './useApiCollection.js'

function Workouts() {
  const { error, isLoading, items: workouts } = useApiCollection('workouts')

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