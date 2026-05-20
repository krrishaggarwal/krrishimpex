import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import logo from "../assets/imgs/logo.png";
import "../styles/NavBar.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="logo">
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
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/certifications">Certifications</Link></li>
            <li><Link to="/infrastructure">Infrastructure</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
