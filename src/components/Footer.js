import React from 'react';
import logo from '../assets/logo1.png';
import { Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* First Section: Logo, Name, Tagline, Copyright */}
        <div className="footer-section">
          <div className="footer-logo">
            <img src={logo} alt="App Logo" className="header-logo" />
            <div className="footer-logo-text">QuickQuant</div>
          </div>
          <p>Solve Fast. Score Big.</p>
          <p>&copy; 2025 QuickQuant. All rights reserved.</p>
          <p>
            <a href="/privacy-policy">Privacy Policy</a> |{' '}
            <a href="/terms-of-service">Terms of Service</a>
          </p>
        </div>

        {/* Second Section: Topics Links */}
        <div className="footer-section">
          <h3>Topics</h3>
          <a href="/quickquant/addition">Addition</a>
          <a href="/quickquant/subtraction">Subtraction</a>
          <a href="/quickquant/multiplication">Multiplication</a>
          <a href="/quickquant/tables">Tables</a>
          <a href="/quickquant/squares">Squares</a>
          <a href="/quickquant/cubes">Cubes</a>
          <a href="/quickquant/square-roots">Square Roots</a>
          <a href="/quickquant/cube-roots">Cube Roots</a>
        </div>

        {/* Third Section: Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <a href="/quickquant/">Home</a>
          <a href="/quickquant/about">About</a>
          <a href="/quickquant/contact">Contact</a>
        </div>
      </div> 

      {/* Fourth Section: Contact and Social Media Links */}
      <div className="footer-bottom">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center' }}>
            <Phone size={20} />
            <span>+91 1234567890</span>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
            <Mail size={20} />
            <span>support@quickquant.com</span>
          </div>
          <div className="footer-social">
            <a href="https://facebook.com" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;