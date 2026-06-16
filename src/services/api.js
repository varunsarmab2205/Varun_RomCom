import axios from "axios";

const BACKEND = "https://moviebackend-negq.onrender.com";

const api = axios.create({
  baseURL: BACKEND,
});

// Resolve image from whatever field the backend sends
export const getImageUrl = (movie) => {
  const raw =
    movie.image ||
    movie.poster ||
    movie.poster_path ||
    movie.img ||
    movie.cover ||
    movie.thumbnail ||
    movie.photo ||
    null;

  if (!raw) return null;

  // Already a full URL
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;

  // TMDB relative path
  if (raw.startsWith("/")) return `https://image.tmdb.org/t/p/w500${raw}`;

  // Relative path served from backend
  return `${BACKEND}/${raw}`;
};

export const fetchMovies = async () => {
  const res = await api.get("/movies");
  // Handle both { movies: [...] } and plain array
  return Array.isArray(res.data) ? res.data : res.data.movies || [];
};

export const fetchMovieDetails = async (id) => {
  const res = await api.get(`/movies/${id}`);
  return res.data;
};

export default api;
