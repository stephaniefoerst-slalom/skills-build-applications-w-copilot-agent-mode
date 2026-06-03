function DataState({ error, isLoading, resource }) {
  if (isLoading) {
    return <div className="empty-state">Loading {resource}...</div>
  }

  if (error) {
    return (
      <div className="alert alert-danger m-3" role="alert">
        {error}
      </div>
    )
  }

  return null
}

export default DataState