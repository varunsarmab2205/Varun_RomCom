import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Try backend login endpoint first
      const res = await api.post("/login", { email, password });
      const user = res.data?.user || res.data;
      dispatch(login({ email: user.email || email, id: user.id || user._id }));
      navigate("/");
    } catch (err) {
      // Fallback: check users list
      try {
        const res = await api.get(`/users?email=${encodeURIComponent(email)}`);
        const users = Array.isArray(res.data) ? res.data : [];
        if (users.length === 0) { setError("No account found with this email."); setLoading(false); return; }
        const user = users[0];
        if (user.password !== password) { setError("Incorrect password."); setLoading(false); return; }
        dispatch(login({ email: user.email, id: user.id || user._id }));
        navigate("/");
      } catch {
        setError("Login failed. Please check your credentials.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h1>Welcome back</h1>
        <p className="subtitle">Sign in to access your favorites</p>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={password}
              onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="form-link">Don't have an account? <Link to="/register">Register</Link></div>
      </div>
    </div>
  );
}

export default Login;
