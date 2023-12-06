import "./lobbyParticipants.css"
import React from "react";

export default function LobbyParticipants() {
    const PF = process.env.REACT_APP_COMMON_FOLDER;


    return (
        <>
            <div className="participants-container">
                <div className="host-header">
                    <h1>Host</h1>
                </div>
                <div className="host-details-card">

                    <img src={`${PF}me.png`} alt="" className="host-img"/>
                    <div className="host-name">Lamia Bel Khadem</div>
                    <div className="host-details">
                        <div className="detail-header">
                            Rating:
                        </div>
                        <div className="detail-text">

                        </div>
                    </div>
                    <div className="host-details">
                        <div className="detail-header">
                            Member since:
                        </div>
                        <div className="detail-text">

                        </div>
                    </div>
                    <div className="host-details">
                        <div className="detail-header">
                            Experience:
                        </div>
                        <div className="detail-text">

                        </div>
                    </div>
                    <div className="host-details">
                        <div className="detail-header">
                            Trips Completed:
                        </div>
                        <div className="detail-text">

                        </div>
                    </div>

                    <div className="more-details">
                        More Details
                    </div>

                </div>  </div>
                <div className="participants-container">
                    <div className="participants-header">
                        <h1>Participants (10)</h1>
                    </div>
                    <div className="joined-participants">
                        <ul className="participants-list">
                            <li className="rightbar-Camper">
                                <div className="participants-img-Container">
                                    <img className="participants-img" src={`${PF}person1.png`} alt=""/>
                                </div>
                                <span className="participants-name"> John Carter</span>

                            </li> <li className="rightbar-Camper">
                                <div className="participants-img-Container">
                                    <img className="participants-img" src={`${PF}person1.png`} alt=""/>
                                </div>
                                <span className="participants-name"> John Carter</span>

                            </li> <li className="rightbar-Camper">
                                <div className="participants-img-Container">
                                    <img className="participants-img" src={`${PF}person1.png`} alt=""/>
                                </div>
                                <span className="participants-name"> John Carter</span>

                            </li> <li className="rightbar-Camper">
                                <div className="participants-img-Container">
                                    <img className="participants-img" src={`${PF}person1.png`} alt=""/>
                                </div>
                                <span className="participants-name"> John Carter</span>

                            </li> <li className="rightbar-Camper">
                                <div className="participants-img-Container">
                                    <img className="participants-img" src={`${PF}person1.png`} alt=""/>
                                </div>
                                <span className="participants-name"> John Carter</span>

                            </li>
                        </ul>
                    </div>
                </div>

        </>
    )
}