import './ErrorMessage.css'

export default function ErrorMessage({ message }) {
  return (
    <div className="error-box fade-up" role="alert">
      <span className="error-box__icon">⚠️</span>
      <div>
        <strong>Something went wrong</strong>
        <p>{message}</p>
        <p className="error-box__hint">
          Make sure your <code>VITE_TMDB_API_KEY</code> is set in <code>.env.local</code>.
        </p>
      </div>
    </div>
  )
}
