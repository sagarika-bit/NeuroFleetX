import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css";

export default function Login() {
  const { login } = useAuth();

  const [mode, setMode] = useState("login"); // "login" or "register"

  // LOGIN STATES
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // REGISTER STATES
  const [name, setName] = useState("");
  const [role, setRole] = useState("Admin");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  // -----------------------------------------
  // LOGIN SUBMIT
  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      await login(loginEmail, loginPassword);
    } catch (err) {
      setError("Invalid email or password");
    }
  }

  // -----------------------------------------
  // REGISTER SUBMIT (Backend not connected yet)
  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    if (regPassword !== confirmPassword) {
      return setError("Passwords do not match");
    }

    // Add your registration API here later
    alert("Registration successful (demo only)");
  }

  return (
    <div className="login-page">
      <h1 className="brand-title">NEUROFLEET X</h1>
      <br></br>

      <p className="login-tagline">
        Intelligent traffic management. <br />
        Reduce congestion, optimize routes, and manage fleets efficiently.
      </p>

      {/* LOGIN BOX */}
      <div className="login-box">
        {/* Tabs */}
        <div className="login-tabs">
          <button
            type="button"
            className={`tab ${mode === "login" ? "active" : ""}`}
            onClick={() => setMode("login")}
          >
            Login
          </button>

          <button
            type="button"
            className={`tab ${mode === "register" ? "active" : ""}`}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        {/* ERROR BOX */}
        {error && <div className="error-msg">{error}</div>}

        {/* -------------------------------------------------- */}
        {/* LOGIN FORM */}
        {/* -------------------------------------------------- */}
        {mode === "login" && (
          <form onSubmit={handleLogin}>
            <label className="login-label">Email</label>
            <input
              type="email"
              className="login-input"
              placeholder="you@example.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />

            <label className="login-label">Password</label>
            <input
              type="password"
              className="login-input"
              placeholder="********"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />

            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
        )}

        {/* -------------------------------------------------- */}
        {/* REGISTER FORM */}
        {/* -------------------------------------------------- */}
        {mode === "register" && (
          <form onSubmit={handleRegister}>
            <label className="login-label">Name</label>
            <input
              type="text"
              className="login-input"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label className="login-label">Role</label>
            <select
              className="login-input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Admin</option>
              <option>Manager</option>
              <option>Customer</option>
            </select>

            <label className="login-label">Email</label>
            <input
              type="email"
              className="login-input"
              placeholder="you@example.com"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              required
            />

            <label className="login-label">Password</label>
            <input
              type="password"
              className="login-input"
              placeholder="********"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              required
            />

            <label className="login-label">Confirm Password</label>
            <input
              type="password"
              className="login-input"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button className="login-btn" type="submit">
              Register
            </button>
          </form>
        )}
      </div>
      {/* EXTRA FEATURES AT BOTTOM */}
      <div className="login-extra">
        {/* Switch to Register */}
        <p className="extra-link">
          New here?{" "}
          <span onClick={() => setMode("register")}>Create an account →</span>
        </p>

        {/* Version info */}
        <p className="version-line">NeuroFleetX • v1.0.0</p>
      </div>

      <p className="login-footer">Travel safe and fast with Sagarika.</p>
      {/* ABOUT US SECTION */}
      <div className="about-section">
        <h2>About NeuroFleetX</h2>
        <p>
          NeuroFleetX is an AI-powered fleet management platform designed to
          reduce congestion, optimize vehicle routes, and ensure smarter, safer
          transportation. Our mission is to transform mobility through
          intelligent automation and real-time analytics.
        </p>

        <div className="about-features">
          <div className="feature-box">
            <h3>🚗 Smart Fleet Tracking</h3>
            <p>Monitor vehicles in real-time with advanced telemetry.</p>
          </div>

          <div className="feature-box">
            <h3>📡 AI Route Optimization</h3>
            <p>Reduce travel time and fuel costs with smart routing.</p>
          </div>

          <div className="feature-box">
            <h3>🔐 Secure & Reliable</h3>
            <p>Enterprise-grade authentication and data protection.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
