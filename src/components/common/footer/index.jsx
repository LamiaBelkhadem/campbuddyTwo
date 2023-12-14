import React from "react";
import "./footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-section">
        <h4>About</h4>
        <p>
          CampBuddy is a platform dedicated to bringing camping enthusiasts
          together. Discover exciting new locations, join camping trips, and
          make lasting memories.
        </p>
      </div>
      <div className="footer-section">
        <h4>Contact</h4>
        <p>Email: support@campbuddy.com</p>
        <p>Phone: +123-456-7890</p>
      </div>
      <div className="footer-section">
        <h4>Follow Us</h4>
        <p>
          <a href="#" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>{" "}
          |
          <a href="#" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>{" "}
          |
          <a href="#" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </p>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CampBuddy. All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
