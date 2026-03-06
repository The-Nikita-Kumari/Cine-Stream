import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchPopularMovies, searchMovies } from '../utils/tmdb.js'
import { useDebounce } from './useDebounce.js'

/**
 * useMovies — master data hook that wires together:
 *   1. Popular movies fetch (initial state)
 *   2. Search with 500ms debounce
 *   3. Infinite scroll (accumulates pages into one flat array)
 *
 * @param {string} searchQuery - Raw value from the search input
 * @returns {{ movies, isLoading, error, hasMore, loadMore, mode }}
 */
export function useMovies(searchQuery) {
  const debouncedQuery = useDebounce(searchQuery, 500)

  const [movies, setMovies]     = useState([])
  const [page, setPage]         = useState(1)
  const [totalPages, setTotal]  = useState(1)
  const [isLoading, setLoading] = useState(false)
  const [error, setError]       = useState(null)

  // Track whether we're in search or browse mode
  const mode = debouncedQuery.trim() ? 'search' : 'popular'

  // Keep a ref to the current mode so the fetch effect can check it
  const modeRef = useRef(mode)
  modeRef.current = mode

  // ── Reset whenever the query (or lack of it) changes ──────────────────────
  useEffect(() => {
    setMovies([])
    setPage(1)
    setTotal(1)
    setError(null)
  }, [debouncedQuery])

  // ── Fetch a page ───────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data =
          modeRef.current === 'search'
            ? await searchMovies(debouncedQuery, page)
            : await fetchPopularMovies(page)

        if (cancelled) return

        setTotal(data.total_pages)
        setMovies((prev) =>
          page === 1 ? data.results : [...prev, ...data.results]
        )
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [debouncedQuery, page])

  // Exposed callback — called by useInfiniteScroll sentinel
  const loadMore = useCallback(() => {
    setPage((p) => p + 1)
  }, [])

  const hasMore = page < totalPages

  return { movies, isLoading, error, hasMore, loadMore, mode }
}
