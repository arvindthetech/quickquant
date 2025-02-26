import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin ? "/api/auth/login" : "/api/auth/signup";
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await axios.post("https://quickquant-backend.onrender.com/api/auth/signup", payload);
      const { token } = response.data;

      // Call the onAuthSuccess function
      onAuthSuccess(token);

      // Redirect to home page
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Signup"}</h2>

        {error && <p className="error-message">{error}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-button">
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <p className="auth-toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={toggleAuthMode} className="toggle-button">
            {isLogin ? "Signup" : "Login"}
          </button>
        </p>

        <button className="back-button" onClick={() => navigate("/")}>
          ⬅ Back to Home
        </button>
      </div>
    </div>
  );
};

export default Auth;
