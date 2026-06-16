# CineVault - Movie Project (Fixed)

## How to Run

### 1. Install dependencies
```bash
npm install
```

### 2. Run both servers together
```bash
npm start
```
This runs:
- **json-server** on `http://localhost:3001` (your movie/user data)
- **Vite dev server** on `http://localhost:5173` (the React app)

Or run them separately in two terminals:
```bash
# Terminal 1
npm run server

# Terminal 2
npm run dev
```

---

## What was fixed

| Issue | Fix |
|---|---|
| API pointed to dead Render backend | Now uses local `json-server` on `db.json` |
| No search or filter | Search by title/actor + filter by genre added |
| MovieDetails showed almost nothing | Full poster, cast, director, rating, description |
| No "Add to Favorites" button | Heart button on every MovieCard and Details page |
| Favorites page had no remove button | Remove button added |
| Navbar missing Login/Logout/Register | Fully dynamic based on auth state |
| Login only had email field, no real auth | Now authenticates against `db.json /users` |
| Register was fake (no persistence) | Saves to `db.json /users` via POST |
| Auth lost on page refresh | Persisted to `sessionStorage` |
| `AddMovie`/`EditMovie` routes missing | Registered in AppRoutes, protected |
| Ugly inline styles everywhere | Full dark-themed CSS design system |
| App.css had leftover Vite template code | Cleared |

## Pages
- `/` — Home: movie grid with search + genre filter
- `/movie/:id` — Movie details with full cast info
- `/favorites` — Saved favorites (protected, login required)
- `/login` — Real login against json-server users
- `/register` — Register (saves to db.json)
- `/add-movie` — Add new movie (protected)
- `/edit-movie/:id` — Edit a movie (protected)
