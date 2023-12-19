import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./sidebar.css";
import { getImageURL } from "../../../utils/getImageURL.js";
import { useGetLobbiesByOwner } from "../../hooks/api/lobbies/useGetLobbiesByOwner.jsx";
import { useGetLobbiesByParticipants } from "../../hooks/api/lobbies/useGetLobbiesByParticipants.jsx";

export default function Sidebar() {
  const { user } = useAuth();
  const lobbies_created = 0;
    const { data: getCreatedLobbies, isPending } = useGetLobbiesByOwner(user._id);
    const { data: getJoinedLobbies, isLoading } = useGetLobbiesByParticipants(user._id);
    console.log(getJoinedLobbies?.length)
    console.log(getCreatedLobbies?.length)

    

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for consistent date comparison

    const completedLobbiesCount = getJoinedLobbies
        ?  getJoinedLobbies.filter(lobby => {
            const endDate = new Date(lobby.end);
            return endDate < today; // Check if the end date is before today
        }).length
        : 0;

    console.log("Number of completed lobbies:", completedLobbiesCount);

    const upcomingLobbiesCount = getJoinedLobbies
        ? getJoinedLobbies.filter(lobby => {
            const startDate = new Date(lobby.start);
            return startDate > today; // Check if the end date is before today
        }).length
        : 0;

    console.log("Number of upcoming lobbies:", upcomingLobbiesCount);

  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-wrapper">
          <div className="title-profile-status">
            <h3>Profile Status</h3>
          </div>
          <div className="profilepic-container">
            <Link to={`/app/my-profile`}>
              <img
                src={
                  user?.profile?.profilePic
                    ? getImageURL(user.profile.profilePic)
                    : `defaultpp.jpg`
                }
                alt=""
                className="sidebar-profilepic"
              />
            </Link>
                      <div className="profile-username">{user?.username}
                      </div>
            <div className="info">
              <div className="info-container">
                <div className="info-caption"> Rating:</div>
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
                          <div className="info-var"> {upcomingLobbiesCount}</div>
            </div>

            <div className="info-container">
              <div className="info-caption">Lobbies Created</div>
                          <div className="info-var">{getCreatedLobbies?.length} </div>
            </div>

            <div className="info-container">
              <div className="info-caption">Lobbies Joined</div>
                          <div className="info-var">{getJoinedLobbies?.length}  </div>
            </div>

            <div className="info-container">
              <div className="info-caption">Adventures Completed</div>
                          <div className="info-var"> {completedLobbiesCount}</div>
            </div>
          </div>
          <div
            className="progress"
            role="progressbar"
            aria-label="Animated striped example"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              style={{ width: "75%" }}
            ></div>
          </div>

          <Link to={"/app/lobby/create"} className="create-btn-container">
            <button className="create-lobby-btn">
              <i className="fa fa-plus"></i> Create a Lobby
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
