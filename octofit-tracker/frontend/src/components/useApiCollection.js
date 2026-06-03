import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export function useApiCollection(component) {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadItems() {
      try {
        setIsLoading(true)
        setError('')
        const collection = await fetchCollection(component)

        if (isMounted) {
          setItems(collection)
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

    loadItems()

    return () => {
      isMounted = false
    }
  }, [component])

  return { error, isLoading, items }
}