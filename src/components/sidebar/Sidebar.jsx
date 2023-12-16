import StarIcon from "@mui/icons-material/Star";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import "./sidebar.css";
import {getImageURL} from "../../../utils/getImageURL.js";

export default function Sidebar() {
    const {user} = useAuth();
    const lobbies_created = user.lobbies.length;

    return (
        <div className="sidebar">
            <div className="sidebar-container">
                <div className="sidebar-wrapper">
                    <div className="title">
                        <h3>Profile Status</h3>
                    </div>
                    <div className="profilepic-container">
                        <Link to={`/app/my-profile`}>
                            <img
                                src={user?.profile?.profilePic ? getImageURL(user.profile.profilePic) : `defaultpp.jpg`}
                                alt=""
                                className="sidebar-profilepic"
                            />
                        </Link>
                        <div className="name">{user?.username}</div>
                        <div className="info">
                            <div className="info-container">
                                <div className="info-caption"> Rating:</div>
                                <div className="stars-container">
                                    <StarIcon className="stars"/>
                                    <StarIcon className="stars"/>
                                    <StarIcon className="stars"/>
                                    <StarIcon className="stars"/>
                                    <StarIcon className="stars"/>
                                </div>
                            </div>
                        </div>

                        <div className="info-container">
                            <div className="info-caption">Upcoming Events:</div>
                            <div className="info-var"> 3</div>
                        </div>

                        <div className="info-container">
                            <div className="info-caption">Lobbies Created</div>
                            <div className="info-var"> {lobbies_created}</div>
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
                            style={{width: "75%"}}
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
