import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFavorite } from "../redux/favoriteSlice";
import { getImageUrl } from "../services/api";

const FALLBACK = "https://placehold.co/200x300/1e2130/8b92a8?text=No+Image";

function Favorites() {
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  return (
    <div className="favorites-page">
      <h1>❤️ My Favorites</h1>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <div className="icon">🎬</div>
          <h2>No favorites yet</h2>
          <p>Browse movies and add them to your list</p>
          <br />
          <Link to="/">Explore Movies</Link>
        </div>
      ) : (
        <div className="movie-grid">
          {favorites.map((movie) => (
            <div className="movie-card" key={movie.id || movie._id}>
              <img
                src={getImageUrl(movie) || FALLBACK}
                alt={movie.title}
                onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK; }}
              />
              <div className="card-body">
                <h3>{movie.title}</h3>
                <div className="card-meta">
                  <span className="badge">{movie.genre}</span>
                  <span className="rating">⭐ {movie.rating}</span>
                </div>
                <div className="card-actions">
                  <Link to={`/movie/${movie.id || movie._id}`} className="btn-primary">Details</Link>
                  <button
                    className="btn-fav active"
                    onClick={() => dispatch(removeFavorite(movie.id || movie._id))}
                    title="Remove from favorites"
                  >❤️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
