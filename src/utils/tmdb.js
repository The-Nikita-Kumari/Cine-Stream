const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3'
const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p'

if (!API_KEY) {
  console.warn(
    '[CineStream] VITE_TMDB_API_KEY is not set.\n' +
    'Copy .env.example → .env.local and add your TMDB key.\n' +
    'Get one free at: https://www.themoviedb.org/settings/api'
  )
}

/**
 * Build a full image URL from a TMDB poster path.
 * @param {string|null} path   - e.g. "/abc123.jpg"
 * @param {'w300'|'w500'|'original'} size
 */
export function getImageUrl(path, size = 'w500') {
  if (!path) return null
  return `${IMAGE_BASE}/${size}${path}`
}

/**
 * Core fetch wrapper — appends api_key and handles errors.
 */
async function tmdbFetch(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`)
  url.searchParams.set('api_key', API_KEY)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))

  const res = await fetch(url.toString())
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.status_message || `TMDB error ${res.status}`)
  }
  return res.json()
}

/**
 * Fetch popular movies — paginated.
 * @param {number} page
 */
export async function fetchPopularMovies(page = 1) {
  return tmdbFetch('/movie/popular', { page, language: 'en-US' })
}

/**
 * Search movies by query — paginated.
 * @param {string} query
 * @param {number} page
 */
export async function searchMovies(query, page = 1) {
  return tmdbFetch('/search/movie', { query, page, language: 'en-US', include_adult: false })
}
