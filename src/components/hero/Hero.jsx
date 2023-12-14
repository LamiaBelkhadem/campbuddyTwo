import "./hero.css";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-section">
        <div className="left-section">
          <div className="main-header">
            <h1>
              Connect and Camp Together: Find Your Perfect Camping Buddies with
              CampBuddy!
            </h1>
            <p>
              CampBuddy is your ultimate platform for unforgettable group
              camping experiences, connecting you with fellow enthusiasts and
              the great outdoors.
            </p>
          </div>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <button className="cta-button">Start Now</button>
          </Link>
        </div>
        <div className="info-boxes">{}</div>

        <div className="main-image">
          <img src="assets/tent.png" alt="Main Visual" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
