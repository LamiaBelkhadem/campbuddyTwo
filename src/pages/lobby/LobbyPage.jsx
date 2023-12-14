import "./lobbyPage.css";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import LobbyParticipants from "../../components/lobbyParticipants/LobbyParticipants";

export default function LobbyPage() {
  const params = useParams();

  const lobbyId = params.lobbyId;
  const PF = process.env.REACT_APP_COMMON_FOLDER;

  const LobbyInfoItem = ({ icon: Icon, children }) => (
    <div className="lobby-info flex">
      <Icon />
      <p>{children}</p>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="lobby-page">
        <div className="lobby-page-container">
          <div className="lobby-header">
            <h1>Lobby Title - Details</h1>
          </div>
          <div className="lobby-details-card">
            <div className="lobby-details-container">
              <div className="lobby-image">
                <img src={`${PF}bniMtir.jpg`} alt="" />
              </div>

              <div className="lobby-details-container-right">
                <div className="header-section">
                  <div className="lobby-info">
                    <PersonIcon />
                    <p>Hosted by:</p>
                    <img
                      src={`${PF}me.png`}
                      alt=""
                      className="lobby-owner-img"
                    />
                    <p>Lamia</p>
                  </div>
                  <div className="capacity">
                    <GroupIcon />
                    <p>10/15</p>
                  </div>
                </div>

                <div className="lobby-info">
                  <LocationOnIcon />
                  <p>location</p>
                </div>
                <div className="lobby-info">
                  <LocationOnIcon />
                  <p>Status:</p>
                </div>
                <div className="lobby-info">
                  <EventIcon />
                  <p> Start Date : day/month/year</p>
                </div>
                <div className="lobby-info">
                  <EventIcon />
                  <p> End Date : day/month/year</p>
                </div>

                <div className="lobby-info">
                  <EventIcon />
                  <p>Duration : 1 day</p>
                </div>

                <div className="action-buttons">
                  <p className="days-from-now">
                    daysFromNow ? `daysFromNow days from now` : 'Invalid Date'
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
                    <p>Age group : Young Adults</p>
                  </div>

                  <div className="lobby-info">
                    <EventIcon />
                    <p>Ambiance : Family-friendly</p>
                  </div>
                </div>
                <div className="preference">
                  <div className="lobby-info">
                    <EventIcon />
                    <p>Experience : Beginner</p>
                  </div>

                  <div className="lobby-info">
                    <EventIcon />
                    <p>Gender: Any</p>
                  </div>
                </div>
                <div className="preference">
                  <div className="lobby-info">
                    <EventIcon />
                    <p>Kid-Friendly : Yes</p>
                  </div>

                  <div className="lobby-info">
                    <EventIcon />
                    <p>Pet-Friendly : Yes</p>
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
                  <p>Food and Drinks : Bring your own</p>
                </div>

                <div className="lobby-info">
                  <EventIcon />
                  <p>Transportation: Not Provided</p>
                </div>
              </div>
              <div className="preferences-details_bottom">
                <div className="lobby-info">
                  <EventIcon />
                  <p>Equipment Provided : Tent, Campfire, Knife</p>
                </div>

                <div className="lobby-info">
                  <EventIcon />
                  <p>Equipment Needed : Bring your own</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lobby-page-right">
          <div>
            <button className="join-btn">Join Trip</button>
          </div>
          <LobbyParticipants />
        </div>
      </div>
    </>
  );
}
