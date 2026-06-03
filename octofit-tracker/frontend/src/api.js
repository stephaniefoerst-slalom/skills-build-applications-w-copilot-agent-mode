const API_PORT = 8000
const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-${API_PORT}.app.github.dev`
  : `http://localhost:${API_PORT}`

export const isUsingLocalApi = !codespaceName

export function apiUrl(path) {
  return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function normalizeCollection(response) {
  if (Array.isArray(response)) {
    return response
  }

  if (Array.isArray(response?.results)) {
    return response.results
  }

  if (Array.isArray(response?.items)) {
    return response.items
  }

  if (Array.isArray(response?.data)) {
    return response.data
  }

  return []
}

export async function fetchCollection(component) {
  const response = await fetch(apiUrl(`/api/${component}/`))

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return normalizeCollection(await response.json())
}