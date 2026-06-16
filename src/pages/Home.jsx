import { useEffect, useState } from "react";
import { fetchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");

  useEffect(() => {
    fetchMovies()
      .then((data) => { setMovies(data); setLoading(false); })
      .catch((err) => {
        console.error(err);
        setError("Could not load movies from backend.");
        setLoading(false);
      });
  }, []);

  const genres = ["All", ...new Set(movies.map((m) => m.genre).filter(Boolean))];

  const filtered = movies.filter((m) => {
    const q = search.toLowerCase();
    const matchSearch =
      (m.title || "").toLowerCase().includes(q) ||
      (m.hero || "").toLowerCase().includes(q) ||
      (m.heroine || "").toLowerCase().includes(q);
    const matchGenre = genre === "All" || m.genre === genre;
    return matchSearch && matchGenre;
  });

  if (loading) return <div className="loading">Loading movies...</div>;

  return (
    <div className="home">
      <div className="home-header">
        <h1>🎬 Rom Com</h1>
        <p>Discover Varun's Fav Telugu Rom-Com</p>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title or actor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          {genres.map((g) => <option key={g}>{g}</option>)}
        </select>
      </div>

      {error && (
        <p style={{ color: "var(--accent)", textAlign: "center", marginBottom: 20 }}>
          ⚠️ {error}
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="icon">🔍</div>
          <h2>No movies found</h2>
          <p>Try a different search term or genre</p>
        </div>
      ) : (
        <div className="movie-grid">
          {filtered.map((movie) => (
            <MovieCard key={movie.id || movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
