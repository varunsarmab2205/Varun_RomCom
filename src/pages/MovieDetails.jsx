import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovieDetails, getImageUrl } from "../services/api";
import { addFavorite, removeFavorite } from "../redux/favoriteSlice";

const FALLBACK = "https://placehold.co/280x400/1e2130/8b92a8?text=No+Image";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFav = movie && favorites.some((m) => m.id === (movie.id || movie._id));

  useEffect(() => {
    fetchMovieDetails(id)
      .then((data) => { setMovie(data); setLoading(false); })
      .catch(() => { setError("Movie not found."); setLoading(false); });
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error || !movie) return <div className="loading">{error || "Movie not found."}</div>;

  const toggleFav = () => {
    if (isFav) dispatch(removeFavorite(movie.id || movie._id));
    else dispatch(addFavorite(movie));
  };

  const imgSrc = getImageUrl(movie) || FALLBACK;

  return (
    <div className="movie-details">
      <Link to="/" className="details-back">← Back to Movies</Link>

      <div className="details-layout">
        <div className="details-poster">
          <img
            src={imgSrc}
            alt={movie.title}
            onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK; }}
          />
        </div>

        <div className="details-info">
          <h1>{movie.title || movie.name}</h1>

          <div className="details-tags">
            {movie.rating && <span className="tag accent">⭐ {movie.rating}</span>}
            {movie.genre && <span className="tag">{movie.genre}</span>}
            {movie.year && <span className="tag">{movie.year}</span>}
            {movie.director && <span className="tag">🎬 {movie.director}</span>}
          </div>

          <p>{movie.description || movie.overview || movie.desc || "No description available."}</p>

          {(movie.hero || movie.heroine || movie.director) && (
            <div className="cast-row">
              {movie.hero && <div className="cast-chip">{movie.hero}<span>Hero</span></div>}
              {movie.heroine && <div className="cast-chip">{movie.heroine}<span>Heroine</span></div>}
              {movie.director && <div className="cast-chip">{movie.director}<span>Director</span></div>}
            </div>
          )}

          <button className={`btn-fav-big${isFav ? " active" : ""}`} onClick={toggleFav}>
            {isFav ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
