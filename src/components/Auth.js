import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Signup
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Signup"}</h2>

        <form className="auth-form">
          {!isLogin && (
            <div className="input-group">
              <label>Name</label>
              <input type="text" placeholder="Enter your name" required />
            </div>
          )}

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
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
