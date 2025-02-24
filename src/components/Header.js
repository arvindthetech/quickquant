import React, { useState } from 'react';
import {NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo1.png';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const topics = [
    { title: 'Tables', link: '/tables' },
    { title: 'Squares', link: '/squares' },
    { title: 'Cubes', link: '/cubes' },
    { title: 'Square Roots', link: '/square-roots' },
    { title: 'Cube Roots', link: '/cube-roots' },
    { title: 'Addition', link: '/addition' },
    { title: 'Subtraction', link: '/subtraction' },
    { title: 'Multiplication', link: '/multiplication' },
  ];

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

  const handleTopicClick = (link) => {
    navigate(link); // Navigate to the selected topic
    closeDropdown();
    closeMenu();
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

        <nav className={`header-nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul className="header-nav-list">
            <li className="header-nav-item">
              <NavLink
                to="/"
                className={({ isActive }) => isActive ? 'header-nav-link active' : 'header-nav-link'}
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
                style={{ display: isDropdownOpen ? 'block' : 'none' }}
              >
                {topics.map((topic, index) => (
                  <li key={index} className="header-dropdown-item">
                    <button
                      className="header-dropdown-link"
                      onClick={() => handleTopicClick(topic.link)}
                    >
                      {topic.title}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
            <li className="header-nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) => isActive ? 'header-nav-link active' : 'header-nav-link'}
                onClick={closeMenu}
              >
                About
              </NavLink>
            </li>
            <li className="header-nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) => isActive ? 'header-nav-link active' : 'header-nav-link'}
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </li>
          </ul>
          <button className="header-auth-button">
            Login/Signup
          </button>
        </nav>

        <button className="header-hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;