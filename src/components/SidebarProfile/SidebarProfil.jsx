import StarIcon from "@mui/icons-material/Star";
import "./sidebarProfil.css";
import useAuth from "../../hooks/useAuth";

const SidebarProfil = ({ username, lobbies }) => {
  const lobbies_created = lobbies.length;
  const { user } = useAuth();

  console.log(user.profilepic);
  return (
    <div className="profile-sidebar">
      <div className="sidebar-container">
        <div className="sidebar-wrapper">
          <div className="profilepic">
            <img
              src={user.profilepic || "/assets/defaultpp.jpg"}
              alt=""
              className="pic"
            />
          </div>
          <div className="title">
            <h3>{username}</h3>
          </div>
          <div className="profilepic-container">
            <div className="info">
              <div className="info-container">
                <div className="info-caption"> Current Rating:</div>
                <div className="stars-container">
                  <StarIcon className="stars" />
                  <StarIcon className="stars" />
                  <StarIcon className="stars" />
                  <StarIcon className="stars" />
                  <StarIcon className="stars" />
                </div>
              </div>
            </div>

            <div className="info-container">
              <div className="info-caption">Upcoming Events:</div>
              <div className="info-var"> 3</div>
            </div>

            <div className="info-container">
              <div className="info-caption">Lobbies Created</div>
              <div className="info-var">{lobbies_created}</div>
            </div>

            <div className="info-container">
              <div className="info-caption">Lobbies Joined</div>
              <div className="info-var"> 3</div>
            </div>

            <div className="info-container">
              <div className="info-caption">Adventures Completed</div>
              <div className="info-var"> 3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarProfil;
