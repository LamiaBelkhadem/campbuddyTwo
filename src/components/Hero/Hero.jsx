import "./hero.css"
function Hero() {
    return (
        <div className="hero-container">
            <div className="hero-section">
                <div className="left-section">
                    <div className="main-header">
                        <h1>Connect and Camp Together: Find Your Perfect Camping Buddies with CampBuddy!</h1>
                        <p>CampBuddy is your ultimate platform for unforgettable group camping experiences, connecting you with fellow enthusiasts and the great outdoors.</p>
                    </div>
                    <button className="cta-button">START NOW</button>
                </div>
                <div className="info-boxes">
                    {}

                </div>

                <div className="main-image">
                    <img src="assets/tent.png" alt="Main Visual" />
                </div>
            </div>
        </div>
    );
}

export default Hero;
