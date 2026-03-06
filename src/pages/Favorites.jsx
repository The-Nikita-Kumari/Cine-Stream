import { useState } from 'react'
import { Link } from 'react-router-dom'
import MovieGrid from '../components/MovieGrid.jsx'
import { useFavorites } from '../hooks/useFavorites.js'
import { getFavorites } from '../utils/favorites.js'
import './Favorites.css'

export default function Favorites() {
  // We need the full movie objects, not just the ID set.
  // Read them from localStorage on mount; re-read after every toggle.
  const [movies, setMovies] = useState(() => getFavorites())
  const { favIds, toggle } = useFavorites()

  function handleToggle(movie) {
    toggle(movie)
    // Refresh the list from localStorage so the card disappears immediately
    setMovies(getFavorites())
  }

  function handleClearAll() {
    if (window.confirm('Remove all favorites?')) {
      localStorage.removeItem('cinestream_favorites')
      setMovies([])
    }
  }

  return (
    <div className="favorites">
      <div className="container">
        <header className="favorites__header fade-up">
          <h1 className="favorites__title">♥ My Favorites</h1>
          {movies.length > 0 && (
            <span className="favorites__count">{movies.length} saved</span>
          )}
        </header>

        {movies.length === 0 ? (
          <div className="favorites__empty fade-up">
            <div className="icon">🎬</div>
            <h2>No favorites yet</h2>
            <p>Tap the heart on any movie to save it here.</p>
            <Link to="/" className="favorites__cta">
              ▶ Browse Movies
            </Link>
          </div>
        ) : (
          <>
            <div className="favorites__actions">
              <button className="favorites__clear" onClick={handleClearAll} type="button">
                Clear all
              </button>
            </div>
            <MovieGrid
              movies={movies}
              favIds={favIds}
              onToggleFav={handleToggle}
              sentinelRef={null}
            />
          </>
        )}
      </div>
    </div>
  )
}
