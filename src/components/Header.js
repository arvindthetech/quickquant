import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo1.png";
import "./Header.css";

const Header = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <img src={logo} alt="App Logo" className="header-logo" />
          <div>
            <h1 className="header-app-name">QuickQuant</h1>
            <p className="header-tagline">Solve Fast. Score Big.</p>
          </div>
        </div>

        <nav className={`header-nav-menu ${isMenuOpen ? "open" : ""}`}>
          <ul className="header-nav-list">
            <li className="header-nav-item">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "header-nav-link active" : "header-nav-link")}
              end
              onClick={closeMenu}
            >
              Home
            </NavLink>
            </li>
            <li
              className="header-nav-item"
              onMouseEnter={toggleDropdown}
              onMouseLeave={closeDropdown}
            >
              <span
                className="header-nav-link"
                tabIndex="0"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                Topics
              </span>
              <ul
                className="header-dropdown-menu"
                style={{ display: isDropdownOpen ? "block" : "none" }}
              >
                <li className="header-dropdown-item">
                  <Link to="/tables" className="header-dropdown-link" onClick={closeMenu}>
                    Tables
                  </Link>
                </li>
                <li className="header-dropdown-item">
                  <Link to="/squares" className="header-dropdown-link" onClick={closeMenu}>
                    Squares
                  </Link>
                </li>
                <li className="header-dropdown-item">
                  <Link to="/cubes" className="header-dropdown-link" onClick={closeMenu}>
                    Cubes
                  </Link>
                </li>
                <li className="header-dropdown-item">
                  <Link to="/square-roots" className="header-dropdown-link" onClick={closeMenu}>
                    Square Roots
                  </Link>
                </li>
                <li className="header-dropdown-item">
                  <Link to="/cube-roots" className="header-dropdown-link" onClick={closeMenu}>
                    Cube Roots
                  </Link>
                </li>
                <li className="header-dropdown-item">
                  <Link to="/addition" className="header-dropdown-link" onClick={closeMenu}>
                    Addition
                  </Link>
                </li>
                <li className="header-dropdown-item">
                  <Link to="/subtraction" className="header-dropdown-link" onClick={closeMenu}>
                    Subtraction
                  </Link>
                </li>
                <li className="header-dropdown-item">
                  <Link to="/multiplication" className="header-dropdown-link" onClick={closeMenu}>
                    Multiplication
                  </Link>
                </li>
              </ul>
            </li>
            <li className="header-nav-item">
              <NavLink to="/about" className="header-nav-link" activeClassName="active" exact onClick={closeMenu}>
                About
              </NavLink>
            </li>
            <li className="header-nav-item">
              <NavLink to="/contact" className="header-nav-link" activeClassName="active" exact onClick={closeMenu}>
                Contact
              </NavLink>
            </li>
          </ul>
          {/* Display user name and logout button if logged in */}
          {user ? (
            <div className="header-user">
              <span className="header-username">{user.name}</span>
              <button className="header-auth-button" onClick={onLogout}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/auth" className="header-auth-button">
              Login/Signup
            </Link>
          )}
        </nav>

        <button className="header-hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;