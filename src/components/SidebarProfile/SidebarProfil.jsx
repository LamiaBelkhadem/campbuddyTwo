import StarIcon from "@mui/icons-material/Star";
import { getImageURL } from "../../../utils/getImageURL.js";
import { useGetLobbiesByOwner } from "../../hooks/api/lobbies/useGetLobbiesByOwner.jsx";
import { useGetLobbiesByParticipants } from "../../hooks/api/lobbies/useGetLobbiesByParticipants.jsx";
import "./sidebarProfil.css";

const SidebarProfil = ({ profile }) => {
  const { data: getCreatedLobbies, isPending } = useGetLobbiesByOwner(
    profile.user
  );
  const { data: getJoinedLobbies, isLoading } = useGetLobbiesByParticipants(
    profile.user
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for consistent date comparison

  const completedLobbiesCount = getJoinedLobbies
    ? getJoinedLobbies.filter((lobby) => {
        const endDate = new Date(lobby.end);
        return endDate < today; // Check if the end date is before today
      }).length
    : 0;
  const upcomingLobbiesCount = getJoinedLobbies
    ? getJoinedLobbies.filter((lobby) => {
        const startDate = new Date(lobby.start);
        return startDate > today; // Check if the end date is before today
      }).length
    : 0;

  console.log("Number of completed lobbies:", completedLobbiesCount);

  return (
    <div className="profile-sidebar">
      <div className="sidebar-container">
        <div className="sidebar-wrapper">
          <div className="profilepic">
            <img
              src={
                profile && profile.profilePic
                  ? getImageURL(profile.profilePic)
                  : getImageURL(`defaultpp.jpg`)
              }
              alt=""
              className="pic"
            />
          </div>
          <div className="title">
            <h3>{profile.user.username}</h3>
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
              <div className="info-var"> {upcomingLobbiesCount}</div>
            </div>

            <div className="info-container">
              <div className="info-caption">Lobbies Created</div>
              <div className="info-var">{getCreatedLobbies?.length}</div>
            </div>

            <div className="info-container">
              <div className="info-caption">Lobbies Joined</div>
              <div className="info-var"> {getJoinedLobbies?.length}</div>
            </div>

            <div className="info-container">
              <div className="info-caption">Adventures Completed</div>
              <div className="info-var">{completedLobbiesCount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarProfil;
