import { NavLink } from 'react-router-dom'
import { getFavorites } from '../utils/favorites.js'
import './Navbar.css'

export default function Navbar() {
  // We read from localStorage directly; Favorites page re-renders when opened.
  const favCount = getFavorites().length

  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__logo">
          <span className="navbar__logo-icon">▶</span>
          <span className="navbar__logo-text">Cine<span>Stream</span></span>
        </NavLink>

        <div className="navbar__links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
          >
            Discover
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
          >
            <span className="navbar__fav-badge">
              ♥ Favorites
              {favCount > 0 && <span className="count">{favCount}</span>}
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
