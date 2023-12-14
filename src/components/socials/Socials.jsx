import "./socials.css";
import EditIcon from "@mui/icons-material/Edit";

export default function Socials({ instagram, facebook, tiktok, twitter }) {
  return (
    <div className="socials">
      <div className="socials-container">
        <div className="details-heading">
          <h3>Social Media</h3>
        </div>

        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="rows">
                <div className="col-sm-3">
                  <div className="social">
                    <a
                      className="btn btn-primary"
                      style={{ backgroundColor: "#1877F2", color: "white" }}
                      href="YOUR_FACEBOOK_LINK_HERE"
                      role="button"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </div>
                </div>
                <div className="cols-sm-9">
                  <p className="text-muted mb-0">{facebook}</p>
                </div>
              </div>
              <hr />
              <div className="rows">
                <div className="col-sm-3">
                  <div className="social">
                    <a
                      className="btn btn-primary"
                      style={{ backgroundColor: "#C13584" }}
                      href="YOUR_INSTAGRAM_LINK_HERE"
                      role="button"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
                <div className="cols-sm-9">
                  <p className="text-muted mb-0">{twitter}</p>
                </div>
              </div>
              <hr />
              <div className="rows">
                <div className="col-sm-3">
                  <div className="social">
                    <a
                      className="btn btn-primary"
                      style={{ backgroundColor: "#000000" }}
                      href="YOUR_TIKTOK_LINK_HERE"
                      role="button"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-tiktok"></i>
                    </a>
                  </div>
                </div>
                <div className="cols-sm-9">
                  <p className="text-muted mb-0">{twitter}</p>
                </div>
              </div>
              <hr />
              <div className="rows">
                <div className="col-sm-3">
                  <div className="social">
                    <a
                      className="btn btn-primary"
                      style={{ backgroundColor: "#1DA1F2" }}
                      href="YOUR_TWITTER_LINK_HERE"
                      role="button"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                  </div>
                </div>
                <div className="cols-sm-9">
                  <p className="text-muted mb-0">{twitter}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
