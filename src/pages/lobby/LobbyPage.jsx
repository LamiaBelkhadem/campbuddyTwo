import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import { useParams } from "react-router-dom";
import { getImageURL } from "../../../utils/getImageURL.js";
import LoadingPage from "../../components/common/loading/LoadingPage.jsx";
import LobbyParticipants from "../../components/lobbyParticipants/LobbyParticipants";
import Navbar from "../../components/navbar/Navbar";
import { useGetOneLobby } from "../../hooks/api/lobbies/useGetOneLobby.jsx";
import { useJoinLobby } from "../../hooks/api/lobbies/useJoinLobby.jsx";
import { useLeaveLobby } from "../../hooks/api/lobbies/useLeaveLobby.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import "./lobbyPage.css";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddIcon from "@mui/icons-material/Add";

const getEventDate = (date) => {
  const eventDate = new Date(date);
  const year = eventDate.getFullYear();
  const month = eventDate.getMonth() + 1; // Because months are 0-indexed
  const day = eventDate.getDate();
  const today = new Date();
  const daysFromNow = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
  return { eventDate, untilEvent: `${day}/${month}/${year}`, daysFromNow };
};

export default function LobbyPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { data: lobby, isLoading } = useGetOneLobby(id);
  const { mutate: joinLobby, isPending: isJoining } = useJoinLobby(id);
  const { mutate: leaveLobby, isPending: isLeaving } = useLeaveLobby(id);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Navbar />
      <div className="lobby-page">
        <div className="lobby-page-container">
          <div className="lobby-header">
            <h1>Lobby {lobby.name} - Details</h1>
          </div>
          <div className="lobby-details-card">
            <div className="lobby-details-container">
              <div className="lobby-image">
                <img src={getImageURL(lobby.campsite.mainImg)} alt="" />
              </div>

              <div className="lobby-details-container-right">
                <div className="header-section">
                  <div className="lobby-info">
                    <PersonIcon />
                    <p>Hosted by:</p>
                    <img
                      src={getImageURL(lobby.owner.profile.profilePic)}
                      alt=""
                      className="lobby-owner-img"
                    />
                    <p>{lobby.owner.username}</p>
                  </div>
                  <div className="capacity">
                    <GroupIcon />
                    <p>10/15</p>
                  </div>
                </div>

                <div className="lobby-info">
                  <LocationOnIcon />
                  <p>{lobby.campsite.location}</p>
                </div>
                <div className="lobby-info">
                  <LocationOnIcon />
                  <p>Status:</p>
                </div>
                <div className="lobby-info">
                  <EventIcon />
                  <p> Start Date : {lobby.start}</p>
                </div>
                <div className="lobby-info">
                  <EventIcon />
                  <p> End Date : {lobby.end}</p>
                </div>

                <div className="action-buttons">
                  <p className="days-from-now">
                    {getEventDate(lobby.start).daysFromNow +
                      ` daysFromNow days from now`}
                  </p>
                </div>
              </div>
            </div>
            <div className="lobby-preferences">
              <div className="preferences-header">
                <h1> Lobby Preferences:</h1>
              </div>

              <div className="preferences-details">
                <div className="preference">
                  <div className="lobby-info">
                    <EventIcon />
                    <p>Age group : {lobby.age}</p>
                  </div>

                  <div className="lobby-info">
                    <EventIcon />
                    <p>Ambiance : {lobby.ambiance}</p>
                  </div>
                </div>
                <div className="preference">
                  <div className="lobby-info">
                    <EventIcon />
                    <p>Experience : {lobby.experience}</p>
                  </div>

                  <div className="lobby-info">
                    <EventIcon />
                    <p>Gender: {lobby.gender}</p>
                  </div>
                </div>
                <div className="preference">
                  <div className="lobby-info">
                    <EventIcon />
                    <p>Kid-Friendly : {lobby.kids ? "Yes" : "No"}</p>
                  </div>

                  <div className="lobby-info">
                    <EventIcon />
                    <p>Pet-Friendly : {lobby.pet ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lobby-preferences">
              <div className="preferences-header">
                <h1> Lobby Details:</h1>
              </div>

              <div className="preferences-details">
                <div className="lobby-info">
                  <EventIcon />
                  <p>
                    Food and Drinks :{" "}
                    {lobby.food ? "Included" : "Bring your own"}
                  </p>
                </div>

                <div className="lobby-info">
                  <EventIcon />
                  <p>
                    Transportation:{" "}
                    {lobby.transport ? "Provided" : "Not Provided"}
                  </p>
                </div>
              </div>
              <div className="preferences-details_bottom">
                <div className="lobby-info">
                  <EventIcon />
                  <p>
                    Equipment Provided : {lobby.equipmentProvided.join(", ")}
                  </p>
                </div>

                <div className="lobby-info">
                  <EventIcon />
                  <p>Equipment Needed : {lobby.equipmentNeeded.join(", ")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lobby-page-right">
          <div>
            {!lobby.joined.find((u) => u._id === user._id) ? (
              <button
                className="join-btn"
                disabled={isJoining}
                onClick={() => joinLobby()}
              >
                <AddIcon className="leave-icon" />
                Join Trip
              </button>
            ) : (
              <button
                className="leave-btn"
                disabled={isLeaving}
                onClick={() => leaveLobby()}
              >
                <ExitToAppIcon className="leave-icon" />
                Leave Trip
              </button>
            )}
          </div>
          <LobbyParticipants participants={lobby.joined} host={lobby.owner} />
        </div>
      </div>
    </>
  );
}
