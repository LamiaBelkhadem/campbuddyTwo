import "./lobbyParticipants.css";
import { Link } from "react-router-dom";
import { getImageURL } from "../../../utils/getImageURL";
import { Stack } from "@mui/material";
import { useGetLobbiesByParticipants } from "../../hooks/api/lobbies/useGetLobbiesByParticipants.jsx";

export default function LobbyParticipants({ participants, host }) {
  const { data: getJoinedLobbies } = useGetLobbiesByParticipants(host._id);
  const memberSince = new Date(host?.profile.createdAt).toLocaleDateString();

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
          <Link to={`/app/profile/view/${host.profile._id}`}>
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
          <Stack justifyContent="center" alignItems="center">
            <Link
              to={`/app/profile/${host.profile._id}`}
              style={{
                textAlign: "center",
                width: "fit-content",
              }}
              className="host-name"
            >{host.username}</Link>
          </Stack>
          <div className="host-details">
            <div className="detail-header">Rating:</div>
            <div className="detail-text">{host.profile.rating}</div>
          </div>
          <div className="host-details">
            <div className="detail-header">Member since: </div>
            <div className="detail-text">{memberSince}</div>
          </div>
          <div className="host-details">
            <div className="detail-header">Experience:</div>
            <div className="detail-text">{host.profile.experience}</div>
          </div>
          <div className="host-details">
            <div className="detail-header">Trips Completed:</div>
            <div className="detail-text">{completedLobbiesCount}</div>
          </div>

          <Link to={`/app/profile/${host.profile._id}`} className="more-details">
            <div >More Details</div>
          </Link>
        </div>
      </div>
      <div className="participants-container">
        <div className="participants-header">
          <h1>
            Participants (
            {participants.length > 0 ? participants.length - 1 : 0})
          </h1>
        </div>
        <div
          className="joined-participants"
          style={{ overflow: "hidden", paddingLeft: 7 }}
        >
          <ul className="participants-list">
            {participants
              .filter((c) => c._id !== host._id)
              .map((camper) => (
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
