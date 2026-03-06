import MovieCard from './MovieCard.jsx'
import './MovieGrid.css'

/**
 * MovieGrid — renders the responsive CSS grid of MovieCards.
 *
 * The last card receives the sentinelRef from useInfiniteScroll
 * so the IntersectionObserver can detect when to fetch the next page.
 */
export default function MovieGrid({ movies, favIds, onToggleFav, sentinelRef }) {
  return (
    <div className="movie-grid">
      {movies.map((movie, idx) => {
        const isLast = idx === movies.length - 1
        return (
          <MovieCard
            key={`${movie.id}-${idx}`}
            movie={movie}
            isFav={favIds.has(movie.id)}
            onToggleFav={onToggleFav}
            innerRef={isLast ? sentinelRef : null}
          />
        )
      })}
    </div>
  )
}
