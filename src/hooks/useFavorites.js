import { useState, useCallback } from 'react'
import { getFavorites, toggleFavorite, isFavorite } from '../utils/favorites.js'

/**
 * useFavorites — reactive wrapper around the localStorage favorites helpers.
 *
 * Returns a Set of favorited IDs for O(1) lookups, plus a toggle action.
 * Because localStorage doesn't fire events within the same tab, we manage
 * the state ourselves and keep it in sync on every toggle.
 */
export function useFavorites() {
  // Store a Set of favorited movie IDs for instant "is this favorited?" checks
  const [favIds, setFavIds] = useState(() => new Set(getFavorites().map((m) => m.id)))

  const toggle = useCallback((movie) => {
    const nowFavorited = toggleFavorite(movie)
    setFavIds((prev) => {
      const next = new Set(prev)
      nowFavorited ? next.add(movie.id) : next.delete(movie.id)
      return next
    })
    return nowFavorited
  }, [])

  const check = useCallback((id) => favIds.has(id), [favIds])

  return { favIds, toggle, check }
}
