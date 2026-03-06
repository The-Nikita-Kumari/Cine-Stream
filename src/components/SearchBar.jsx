import './SearchBar.css'

/**
 * SearchBar — controlled input component.
 * The actual debouncing happens in useMovies via useDebounce,
 * so this component is intentionally "dumb" — it just lifts value up.
 */
export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">🔍</span>
      <input
        className="search-bar__input"
        type="search"
        placeholder="Search movies, genres, actors…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search movies"
        autoComplete="off"
        spellCheck="false"
      />
      {value && (
        <button
          className="search-bar__clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  )
}
