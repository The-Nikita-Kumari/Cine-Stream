# 🎬 Cine-Stream — Movie Explorer

A Netflix-lite movie discovery app built with **React + Vite**, powered by the [TMDB API](https://www.themoviedb.org/).  
Built as a ProDesk IT frontend internship task to demonstrate custom hooks, infinite scroll, debouncing, and optimization.

---

## ✨ Features

| Feature | Details |
|---|---|
| **Infinite Scroll** | `IntersectionObserver` watches the last rendered card; fires next-page fetch automatically |
| **Debounced Search** | `useDebounce` hook delays API calls by 500 ms — no spam on every keystroke |
| **Favorites** | Per-movie ♥ toggle; persisted in `localStorage`; dedicated `/favorites` route |
| **Modular Hooks** | `useDebounce`, `useInfiniteScroll`, `useMovies`, `useFavorites` — all composable |
| **Responsive Grid** | CSS Grid with `auto-fill` + `minmax` — adapts from mobile to 4K |

---

## 🚀 Getting Started

### 1. Clone & install

```bash
git clone <your-repo-url>
cd cine-stream
npm install
```

### 2. Add your TMDB API key

```bash
cp .env.example .env.local
```

Open `.env.local` and replace `your_tmdb_api_key_here` with your key.  
Get a free key at: <https://www.themoviedb.org/settings/api>

> **Important:** `.env.local` is in `.gitignore` and will never be committed.

### 3. Run the dev server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🗂 Project Structure

```
cine-stream/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx / .css        ← Top navigation
│   │   ├── SearchBar.jsx / .css     ← Controlled search input
│   │   ├── MovieCard.jsx / .css     ← Individual movie tile
│   │   ├── MovieGrid.jsx / .css     ← Responsive CSS Grid wrapper
│   │   └── ErrorMessage.jsx / .css  ← Error display
│   ├── hooks/
│   │   ├── useDebounce.js           ← Delays value update by N ms
│   │   ├── useInfiniteScroll.js     ← IntersectionObserver sentinel
│   │   ├── useMovies.js             ← Master data hook (fetch + pages + search)
│   │   └── useFavorites.js          ← Reactive localStorage favorites
│   ├── pages/
│   │   ├── Home.jsx / .css          ← Discover page
│   │   └── Favorites.jsx / .css     ← Saved favorites page
│   ├── styles/
│   │   └── global.css               ← Design tokens + base styles
│   ├── utils/
│   │   ├── tmdb.js                  ← API fetch helpers
│   │   └── favorites.js             ← localStorage CRUD helpers
│   ├── App.jsx                      ← Router + layout
│   └── main.jsx                     ← React entry point
├── .env.example                     ← Template — copy to .env.local
├── .gitignore                       ← Ignores node_modules, dist, .env*
├── index.html
├── package.json
└── vite.config.js
```

---

## 🧠 Concepts Demonstrated

### Custom Hook — `useDebounce`
Prevents an API call on every keystroke. Uses `setTimeout` + cleanup to delay the debounced value by 500 ms.

### Custom Hook — `useInfiniteScroll`
Uses `IntersectionObserver` on the last card in the grid. When it enters the viewport, `loadMore()` is called and the next page is appended to the existing list — no pagination buttons needed.

### Optimization
- `loading="lazy"` on every `<img>` — browser only fetches posters in/near the viewport
- `decoding="async"` — image decoding off the main thread
- Request cancellation via `cancelled` flag in `useEffect` cleanup — prevents race conditions when queries change quickly
- `useCallback` on `loadMore` and `toggle` — stable references prevent unnecessary re-renders

---

## 📦 Build for production

```bash
npm run build
npm run preview
```
## Live URL Link

Try the proper functioning here: https://cine-stream-delta.vercel.app/