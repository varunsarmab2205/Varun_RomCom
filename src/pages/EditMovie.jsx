import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/movies/${id}`).then((res) => setMovie(res.data)).catch(() => setError("Movie not found."));
  }, [id]);

  const handleChange = (e) => setMovie({ ...movie, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.put(`/movies/${id}`, { ...movie, rating: parseFloat(movie.rating) || 0 });
      navigate(`/movie/${id}`);
    } catch {
      setError("Failed to update movie.");
    }
  };

  if (!movie) return <div className="loading">{error || "Loading..."}</div>;

  return (
    <div className="form-page">
      <div className="form-card" style={{ maxWidth: 520 }}>
        <h1>Edit Movie</h1>
        <p className="subtitle">Update movie details</p>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit}>
          {[
            { name: "title", label: "Title" },
            { name: "hero", label: "Hero" },
            { name: "heroine", label: "Heroine" },
            { name: "director", label: "Director" },
            { name: "genre", label: "Genre" },
            { name: "year", label: "Year" },
            { name: "rating", label: "Rating" },
            { name: "image", label: "Poster URL" },
          ].map(({ name, label }) => (
            <div className="form-group" key={name}>
              <label>{label}</label>
              <input name={name} value={movie[name] || ""} onChange={handleChange} />
            </div>
          ))}
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" rows={3} value={movie.description || ""} onChange={handleChange} />
          </div>
          <button type="submit" className="btn-submit">Save Changes</button>
        </form>
        <div className="form-link"><Link to={`/movie/${id}`}>← Cancel</Link></div>
      </div>
    </div>
  );
}

export default EditMovie;
