/* import React, { useState } from "react";
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
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "https://quickquant-backend.onrender.com/api/auth/login"
      : "https://quickquant-backend.onrender.com/api/auth/signup";

    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await axios.post(url, payload);
      const { token } = response.data;

      onAuthSuccess(token);
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

export default Auth; */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react"; // For show/hide password toggle
import { GoogleLogin } from "@react-oauth/google"; // For Google social login
import { toast, ToastContainer } from "react-toastify"; // For success/error messages
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS
import "./Auth.css";

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [education, setEducation] = useState("");
  const [targetExam, setTargetExam] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();

  // Toggle between login and signup modes
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setEducation("");
    setTargetExam("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!isLogin && !agreeToTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    setLoading(true);
    setError("");

    const url = isLogin
      ? "https://quickquant-backend.onrender.com/api/auth/login"
      : "https://quickquant-backend.onrender.com/api/auth/signup";

    const payload = isLogin
      ? { email, password, rememberMe }
      : { name, email, password, education, targetExam, rememberMe };

    try {
      const response = await axios.post(url, payload);
      const { token } = response.data;

      onAuthSuccess(token);
      toast.success(isLogin ? "Login successful!" : "Signup successful!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Send the credential to your backend for verification
      const response = await axios.post(
        "https://quickquant-backend.onrender.com/api/auth/google",
        { credential: credentialResponse.credential }
      );
      const { token } = response.data;

      onAuthSuccess(token);
      toast.success("Google login successful!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Google login failed");
      toast.error(err.response?.data?.message || "Google login failed");
    }
  };

  // Handle Google login failure
  const handleGoogleFailure = () => {
    toast.error("Google login failed. Please try again.");
  };

  // Handle guest mode
  const handleGuestMode = () => {
    navigate("/");
    toast.info("You are in guest mode. Some features may be limited.");
  };

  return (
    <div className="auth-container">
      <ToastContainer />
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
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          {!isLogin && (
            <div className="two-inputs">
              <div className="input-group">
                <label>Education</label>
                <input
                  type="text"
                  placeholder="e.g., B.Sc, BA, B.Tech"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Target Exam</label>
                <input
                  type="text"
                  placeholder="e.g., SSC, Banking, Railways"
                  value={targetExam}
                  onChange={(e) => setTargetExam(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {!isLogin && (
            <div className="terms-checkbox">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                required
              />
              <label>I agree to the terms and conditions</label>
            </div>
          )}

          <div className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label>Remember me</label>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Loading..." : isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <div className="social-login">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />
        </div>

        <p className="auth-toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={toggleAuthMode} className="toggle-button">
            {isLogin ? "Signup" : "Login"}
          </button>
        </p>

        {isLogin && (
          <button
            className="forgot-password"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </button>
        )}

        <button className="guest-mode-button" onClick={handleGuestMode}>
          Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default Auth;
