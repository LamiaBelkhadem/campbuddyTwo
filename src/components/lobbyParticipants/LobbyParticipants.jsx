import "./lobbyParticipants.css";
import { Link } from "react-router-dom";
import { getImageURL } from "../../../utils/getImageURL";
import { useGetLobbiesByParticipants } from "../../hooks/api/lobbies/useGetLobbiesByParticipants.jsx";

export default function LobbyParticipants({ participants, host }) {
  const { data: getJoinedLobbies } = useGetLobbiesByParticipants(host._id);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for consistent date comparison
  const completedLobbiesCount = getJoinedLobbies
    ? getJoinedLobbies.filter((lobby) => {
        const endDate = new Date(lobby.end);
        return endDate < today; // Check if the end date is before today
      }).length
    : 0;

  console.log("Number of completed lobbies:", completedLobbiesCount);

  return (
    <>
      <div className="participants-container">
        <div className="host-header">
          <h1>Host</h1>
        </div>
        <div className="host-details-card">
          <Link to={`/app/profile/${host.profile._id}`}>
            <img
              src={
                host?.profile?.profilePic
                  ? getImageURL(host.profile.profilePic)
                  : `defaultpp.jpg`
              }
              alt=""
              className="host-img"
            />
          </Link>
          <div className="host-name">{`${host.profile.fname}  ${host.profile.lname}`}</div>
          <div className="host-details">
            <div className="detail-header">Rating:</div>
            <div className="detail-text">{host.profile.rating}</div>
          </div>
          <div className="host-details">
            <div className="detail-header">Member since:</div>
            <div className="detail-text"></div>
          </div>
          <div className="host-details">
            <div className="detail-header">Experience:</div>
            <div className="detail-text">{host.profile.experience}</div>
          </div>
          <div className="host-details">
            <div className="detail-header">Trips Completed:</div>
            <div className="detail-text">{completedLobbiesCount}</div>
          </div>

          <Link to={`/app/profile/${host.profile._id}`}>
            <div className="more-details">More Details</div>
          </Link>
        </div>
      </div>
      <div className="participants-container">
        <div className="participants-header">
          <h1>Participants ({participants.length})</h1>
        </div>
        <div className="joined-participants">
          <ul className="participants-list">
            {participants.map((camper) => (
              <li className="rightbar-Camper" key={camper._id}>
                <div className="participants-img-Container">
                  <img
                    className="participants-img"
                    src={getImageURL(camper.profile.profilePic)}
                    alt=""
                  />
                </div>
                <span className="participants-name">{`${camper.profile.fname} ${camper.profile.lname}`}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
