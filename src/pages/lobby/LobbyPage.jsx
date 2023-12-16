import "./lobbyPage.css";
import Navbar from "../../components/navbar/Navbar";
import {useParams} from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import LobbyParticipants from "../../components/lobbyParticipants/LobbyParticipants";
import {useGetOneLobby} from "../../hooks/api/lobbies/useGetOneLobby.jsx";
import LoadingPage from "../../components/common/loading/LoadingPage.jsx";
import {getImageURL} from "../../../utils/getImageURL.js";

export default function LobbyPage() {
    const {lobbyId} = useParams();
    const {data: lobby, isLoading} = useGetOneLobby(lobbyId);

    if (isLoading) {
        return <LoadingPage/>
    }

    return (
        <>
            <Navbar/>
            <div className="lobby-page">
                <div className="lobby-page-container">
                    <div className="lobby-header">
                        <h1>Lobby {lobby.name} - Details</h1>
                    </div>
                    <div className="lobby-details-card">
                        <div className="lobby-details-container">
                            <div className="lobby-image">
                                <img src={getImageURL("bnimtir.png")} alt=""/>
                            </div>

                            <div className="lobby-details-container-right">
                                <div className="header-section">
                                    <div className="lobby-info">
                                        <PersonIcon/>
                                        <p>Hosted by:</p>
                                        <img
                                            src={getImageURL(lobby.user.profile.profilePic)}
                                            alt=""
                                            className="lobby-owner-img"
                                        />
                                        <p>{lobby.owner.username}</p>
                                    </div>
                                    <div className="capacity">
                                        <GroupIcon/>
                                        <p>10/15</p>
                                    </div>
                                </div>

                                <div className="lobby-info">
                                    <LocationOnIcon/>
                                    <p>{lobby.campsite}</p>
                                </div>
                                <div className="lobby-info">
                                    <LocationOnIcon/>
                                    <p>Status:</p>
                                </div>
                                <div className="lobby-info">
                                    <EventIcon/>
                                    <p> Start Date : {lobby.start}</p>
                                </div>
                                <div className="lobby-info">
                                    <EventIcon/>
                                    <p> End Date : {lobby.end}</p>
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
                                        <EventIcon/>
                                        <p>Age group : {lobby.age}</p>
                                    </div>

                                    <div className="lobby-info">
                                        <EventIcon/>
                                        <p>Ambiance : {lobby.ambiance}</p>
                                    </div>
                                </div>
                                <div className="preference">
                                    <div className="lobby-info">
                                        <EventIcon/>
                                        <p>Experience : {lobby.experience}</p>
                                    </div>

                                    <div className="lobby-info">
                                        <EventIcon/>
                                        <p>Gender: {lobby.gender}</p>
                                    </div>
                                </div>
                                <div className="preference">
                                    <div className="lobby-info">
                                        <EventIcon/>
                                        <p>Kid-Friendly : {lobby.kids ? "Yes" : "No"}</p>
                                    </div>

                                    <div className="lobby-info">
                                        <EventIcon/>
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
                                    <EventIcon/>
                                    <p>Food and Drinks : {lobby.food ? "Included" : "Bring your own"}</p>
                                </div>

                                <div className="lobby-info">
                                    <EventIcon/>
                                    <p>Transportation: {lobby.transport ? "Provided" : "Not Provided"}</p>
                                </div>
                            </div>
                            <div className="preferences-details_bottom">
                                <div className="lobby-info">
                                    <EventIcon/>
                                    <p>Equipment Provided : {lobby.equipmentProvided.join(", ")}</p>
                                </div>

                                <div className="lobby-info">
                                    <EventIcon/>
                                    <p>Equipment Needed : {lobby.equipmentNeeded.join(", ")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lobby-page-right">
                    <div>
                        <button className="join-btn">Join Trip</button>
                    </div>
                    <LobbyParticipants/>
                </div>
            </div>
        </>
    );
}
