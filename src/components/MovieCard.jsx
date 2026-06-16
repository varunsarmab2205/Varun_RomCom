import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/favoriteSlice";
import { getImageUrl } from "../services/api";

const FALLBACK = "https://placehold.co/200x300/1e2130/8b92a8?text=No+Image";

function MovieCard({ movie }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFav = favorites.some((m) => m.id === movie.id);

  const toggleFav = (e) => {
    e.preventDefault();
    if (isFav) dispatch(removeFavorite(movie.id));
    else dispatch(addFavorite(movie));
  };

  const imgSrc = getImageUrl(movie) || FALLBACK;

  return (
    <div className="movie-card">
      <img
        src={imgSrc}
        alt={movie.title}
        onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK; }}
      />
      <div className="card-body">
        <h3>{movie.title || movie.name || "Untitled"}</h3>
        <div className="card-meta">
          <span className="badge">{movie.genre}</span>
          <span className="rating">⭐ {movie.rating}</span>
          <span className="badge">{movie.year}</span>
        </div>
        <div className="card-actions">
          <Link to={`/movie/${movie.id || movie._id}`} className="btn-primary">Details</Link>
          <button
            className={`btn-fav${isFav ? " active" : ""}`}
            onClick={toggleFav}
            title={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            {isFav ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
