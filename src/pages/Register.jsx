import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/register", { email, password });
      navigate("/login");
    } catch (err) {
      // Fallback: save to /users
      try {
        const check = await api.get(`/users?email=${encodeURIComponent(email)}`);
        if (Array.isArray(check.data) && check.data.length > 0) {
          setError("An account with this email already exists."); setLoading(false); return;
        }
        await api.post("/users", { email, password });
        navigate("/login");
      } catch {
        setError("Registration failed. Please try again.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h1>Create account</h1>
        <p className="subtitle">Join CineVault to save your favorites</p>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Choose a password" value={password}
              onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </div>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
        <div className="form-link">Already have an account? <Link to="/login">Sign in</Link></div>
      </div>
    </div>
  );
}

export default Register;
