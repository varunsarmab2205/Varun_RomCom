import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails";
import Favorites from "../pages/Favorites";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddMovie from "../pages/AddMovie";
import EditMovie from "../pages/EditMovie";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/favorites" element={
        <ProtectedRoute><Favorites /></ProtectedRoute>
      } />
      <Route path="/add-movie" element={
        <ProtectedRoute><AddMovie /></ProtectedRoute>
      } />
      <Route path="/edit-movie/:id" element={
        <ProtectedRoute><EditMovie /></ProtectedRoute>
      } />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
