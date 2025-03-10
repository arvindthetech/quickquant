import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo1.png";
import male1 from "../assets/avatar/male1.png"; // Default avatar
import "./Header.css";

const Header = ({ user, searchQuery, setSearchQuery, suggestions }) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const searchBarRef = useRef(null);

  // Toggle search bar on mobile
  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  // Close search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode", !isDarkMode);
    localStorage.setItem("darkMode", !isDarkMode);
  };

  // Handle search input change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle suggestion click
  const handleSuggestionClick = () => {
    setIsSearchExpanded(false); // Close the search bar
    setSearchQuery(""); // Clear the search query
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo, Name, and Tagline (Clickable) */}
        <Link to="/" className="header-brand">
          <img src={logo} alt="App Logo" className="header-logo" />
          <div>
            <h1 className="header-app-name">QuickQuant</h1>
            <p className="header-tagline">Solve Fast. Score Big.</p>
          </div>
        </Link>

        {/* Right Section: Search Bar, Dark Mode Toggle, User Authentication */}
        <div className="header-right-section">
          {/* Search Bar */}
          <div
            className={`search-bar ${isSearchExpanded ? "expanded" : ""}`}
            ref={searchBarRef}
          >
            <input
              type="text"
              placeholder="Search for Tables, Squares, Alphabet Series..."
              className="search-input"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={toggleSearch} />
            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <div className="suggestions-dropdown">
                {suggestions.map((suggestion, index) => (
                  <Link
                    key={index}
                    to={suggestion.link}
                    className="suggestion-item"
                    onClick={handleSuggestionClick}
                  >
                    {suggestion.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button className="dark-mode-toggle" onClick={toggleDarkMode}>
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
          </button>

          {/* User Authentication */}
          <div className="header-user-section">
            {user ? (
              <Link to="/profile" className="header-profile-link">
                <img
                  src={user.icon || male1}
                  alt="Profile Icon"
                  className="header-profile-icon"
                />
              </Link>
            ) : (
              <Link to="/auth" className="header-auth-button">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;