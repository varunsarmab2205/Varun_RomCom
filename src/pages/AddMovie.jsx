import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function AddMovie() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: "", hero: "", heroine: "", director: "",
    genre: "", rating: "", year: "", image: "", description: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => setMovie({ ...movie, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const payload = { ...movie, rating: parseFloat(movie.rating) || 0, id: Date.now() };
      await api.post("/movies", payload);
      navigate("/");
    } catch {
      setError("Failed to add movie. Make sure json-server is running.");
    }
  };

  return (
    <div className="form-page">
      <div className="form-card" style={{ maxWidth: 520 }}>
        <h1>Add Movie</h1>
        <p className="subtitle">Add a new movie to the collection</p>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit}>
          {[
            { name: "title", label: "Title", placeholder: "Movie title" },
            { name: "hero", label: "Hero", placeholder: "Lead actor" },
            { name: "heroine", label: "Heroine", placeholder: "Lead actress" },
            { name: "director", label: "Director", placeholder: "Director name" },
            { name: "genre", label: "Genre", placeholder: "e.g. Romantic Comedy" },
            { name: "year", label: "Year", placeholder: "e.g. 2024" },
            { name: "rating", label: "Rating", placeholder: "0.0 – 10.0" },
            { name: "image", label: "Poster URL", placeholder: "https://..." },
          ].map(({ name, label, placeholder }) => (
            <div className="form-group" key={name}>
              <label>{label}</label>
              <input name={name} placeholder={placeholder} value={movie[name]} onChange={handleChange} />
            </div>
          ))}
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" rows={3} placeholder="Short description..." value={movie.description} onChange={handleChange} />
          </div>
          <button type="submit" className="btn-submit">Add Movie</button>
        </form>
        <div className="form-link"><Link to="/">← Cancel</Link></div>
      </div>
    </div>
  );
}

export default AddMovie;
