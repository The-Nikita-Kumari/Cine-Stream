import { useState, useRef } from 'react'
import { getImageUrl } from '../utils/tmdb.js'
import './MovieCard.css'

/**
 * MovieCard — displays poster, title, year, rating, and a favourite toggle.
 *
 * Props:
 *  - movie       {object}   TMDB movie object
 *  - isFav       {boolean}  Is this movie currently in favorites?
 *  - onToggleFav {Function} Called with (movie) when heart is clicked
 *  - innerRef    {ref}      Forwarded to the root element (used for IntersectionObserver sentinel)
 */
export default function MovieCard({ movie, isFav, onToggleFav, innerRef }) {
  const [popping, setPopping] = useState(false)
  const timeoutRef = useRef(null)

  const posterUrl = getImageUrl(movie.poster_path, 'w500')
  const year = movie.release_date?.slice(0, 4) ?? '—'
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'

  function handleFavClick(e) {
    e.stopPropagation()
    // Trigger pop animation
    setPopping(true)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setPopping(false), 400)
    onToggleFav(movie)
  }

  return (
    <article className="movie-card fade-up" ref={innerRef}>
      <div className="movie-card__poster">
        {posterUrl ? (
          <img
            className="movie-card__img"
            src={posterUrl}
            alt={`${movie.title} poster`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="movie-card__no-poster">
            <span className="icon">🎬</span>
            <span>No Poster</span>
          </div>
        )}

        {/* Overview overlay on hover */}
        {movie.overview && (
          <div className="movie-card__overlay" aria-hidden="true">
            <p className="movie-card__overview">{movie.overview}</p>
          </div>
        )}

        {/* Favourite button */}
        <button
          className={`movie-card__fav${isFav ? ' favorited' : ''}${popping ? ' pop' : ''}`}
          onClick={handleFavClick}
          aria-label={isFav ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
          type="button"
        >
          {isFav ? '♥' : '♡'}
        </button>
      </div>

      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.title}</h3>
        <div className="movie-card__meta">
          <span className="movie-card__year">{year}</span>
          <span className="movie-card__rating">
            <span className="star">★</span>
            {rating}
          </span>
        </div>
      </div>
    </article>
  )
}
