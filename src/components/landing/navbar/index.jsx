import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">CampBuddy</span>
        </Link>
      </div>
      <div className="navbarCenter"></div>
      <div className="navbarRight">
        <div className="navbar-links">
        <Link to="/how" style={{ textDecoration: "none" }}>
          <span className="navbar-link">How It Works</span>
          </Link>
          <Link to="/features" style={{ textDecoration: "none" }}>
          <span className="navbar-link">Features</span>
          </Link>
        </div>
        <div className="buttons">
          <Link to="/register" style={{ textDecoration: "none" }}>
            <button className="register-button">Register</button>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button className="login-button">Login</button>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
