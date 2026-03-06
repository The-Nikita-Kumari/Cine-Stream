import { useState } from 'react'
import SearchBar from '../components/SearchBar.jsx'
import MovieGrid from '../components/MovieGrid.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { useMovies } from '../hooks/useMovies.js'
import { useFavorites } from '../hooks/useFavorites.js'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll.js'
import './Home.css'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  // Core data hook — handles fetch, debounce (500ms), pagination
  const { movies, isLoading, error, hasMore, loadMore, mode } = useMovies(searchQuery)

  // Favorites — reactive Set of IDs + toggle action
  const { favIds, toggle } = useFavorites()

  // Infinite scroll — attach to last card; fires loadMore when visible
  const sentinelRef = useInfiniteScroll(hasMore, isLoading, loadMore)

  // Is the user actively typing (raw !== debounced)?
  const isTyping = searchQuery.trim() !== '' && mode === 'popular' && searchQuery.trim().length > 0

  return (
    <div className="home">
      <div className="container">

        {/* ── Hero ── */}
        <header className="home__hero fade-up">
          <div className="home__hero-eyebrow">
            <span>▶</span> Powered by TMDB
          </div>
          <h1 className="home__hero-title">
            Find Your<br /><span className="highlight">Next Film</span>
          </h1>
          <p className="home__hero-sub">
            Browse thousands of movies. Save your favourites. Never run out of things to watch.
          </p>
          <div className="home__search-wrapper">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          {/* Debounce visual hint */}
          <div className={`home__debounce-hint${searchQuery ? ' active' : ''}`}>
            <span className="dot" />
            {searchQuery
              ? 'Waiting 500 ms after you stop typing before searching…'
              : 'Search is debounced — no wasted API calls'}
          </div>
        </header>

        {/* ── Mode label ── */}
        <p className="home__mode">
          {mode === 'search'
            ? <>Results for <span className="query">"{searchQuery}"</span></>
            : 'Showing popular movies'}
        </p>

        {/* ── Section header ── */}
        <div className="home__section-header">
          <h2 className="home__section-title">
            {mode === 'search' ? 'Search Results' : 'Popular Now'}
          </h2>
          {movies.length > 0 && (
            <span className="home__section-count">{movies.length} loaded</span>
          )}
        </div>

        {/* ── Error ── */}
        {error && <ErrorMessage message={error} />}

        {/* ── Initial spinner ── */}
        {isLoading && movies.length === 0 && <div className="spinner" />}

        {/* ── Grid ── */}
        {movies.length > 0 && (
          <MovieGrid
            movies={movies}
            favIds={favIds}
            onToggleFav={toggle}
            sentinelRef={sentinelRef}
          />
        )}

        {/* ── Empty state ── */}
        {!isLoading && !error && movies.length === 0 && searchQuery && (
          <div className="home__empty fade-up">
            <div className="icon">🎬</div>
            <h3>No movies found</h3>
            <p>Try a different search term</p>
          </div>
        )}

        {/* ── Loading more (subsequent pages) ── */}
        {isLoading && movies.length > 0 && (
          <div className="home__loading-more">
            <div className="spinner" />
            <span>Loading more movies…</span>
          </div>
        )}

        {/* ── End of results ── */}
        {!hasMore && !isLoading && movies.length > 0 && (
          <p className="home__end">— End of results —</p>
        )}

      </div>
    </div>
  )
}
