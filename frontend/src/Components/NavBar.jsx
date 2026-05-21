import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import logo from "../assets/imgs/logo.png";
import "../styles/NavBar.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header>
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="logo" onClick={handleLinkClick}>
            <img src={logo} alt="Krrish Ecoware Industries logo" />
          </Link>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <TiThMenu size={28} />
          </button>

          <ul className={`nav-links ${isOpen ? "active" : ""}`}>
            <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
            <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
            <li><Link to="/products" onClick={handleLinkClick}>Products</Link></li>
            <li><Link to="/certifications" onClick={handleLinkClick}>Certifications</Link></li>
            <li><Link to="/infrastructure" onClick={handleLinkClick}>Infrastructure</Link></li>
            <li><Link to="/contact" onClick={handleLinkClick}>Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;