import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo1.png';
import './Header.css'; // Import the scoped CSS file

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For topics dropdown

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Left Side: Logo, App Name, and Tagline */}
        <div className="header-brand">
          <img src={logo} alt="App Logo" className="header-logo" />
          <div>
            <h1 className="header-app-name">QuickQuant</h1>
            <p className="header-tagline">Solve Fast. Score Big.</p>
          </div>
        </div>

        {/* Right Side: Navigation Menu and Login/Signup */}
        <nav className={`header-nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul className="header-nav-list">
            <li className="header-nav-item">
              <Link to="/" className="header-nav-link">Home</Link>
            </li>
            <li className="header-nav-item" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
              <span className="header-nav-link">Topics</span>
              <ul className="header-dropdown-menu" style={{ display: isDropdownOpen ? 'block' : 'none' }}>
                <li className="header-dropdown-item">
                  <Link to="/tables" className="header-dropdown-link">Tables</Link>
                </li>
                <li className="header-dropdown-item">
                  <Link to="/squares" className="header-dropdown-link">Squares</Link>
                </li>
                <li className="header-dropdown-item">
                  <Link to="/cubes" className="header-dropdown-link">Cubes</Link>
                </li>
                <li className="header-dropdown-item">
                  <Link to="/square-roots" className="header-dropdown-link">Square Roots</Link>
                </li>
                <li className="header-dropdown-item">
                  <Link to="/cube-roots" className="header-dropdown-link">Cube Roots</Link>
                </li>
                <li className="header-dropdown-item">
                  <Link to="/addition" className="header-dropdown-link">Addition</Link>
                </li>
                <li className="header-dropdown-item">
                  <Link to="/subtraction" className="header-dropdown-link">Subtraction</Link>
                </li>
                <li className="header-dropdown-item">
                  <Link to="/multiplication" className="header-dropdown-link">Multiplication</Link>
                </li>
              </ul>
            </li>
            <li className="header-nav-item">
              <Link to="/about" className="header-nav-link">About</Link>
            </li>
            <li className="header-nav-item">
              <Link to="/contact" className="header-nav-link">Contact</Link>
            </li>
          </ul>
          {/* Login/Signup Button inside the hamburger menu */}
          <button className="header-auth-button">
            Login/Signup
          </button>
        </nav>

        {/* Hamburger Menu for Mobile */}
        <button className="header-hamburger" onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;