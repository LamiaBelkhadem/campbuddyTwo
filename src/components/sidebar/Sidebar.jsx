import "./sidebar.css"
import StarIcon from '@mui/icons-material/Star';
export default function Sidebar() {
    return (

        <div className="sidebar">
            <div className="sidebar-container">
                <div className="sidebar-wrapper">
                    <div className="title"><h3>Profile Status</h3></div>
                    <div className="profilepic-container">
                        <img src="/assets/me.png" alt="" className="sidebar-profilepic"/>
                        <div className="name">Lamia</div>
                        <div className="info">
                            <div className="info-container">
                                <div className="info-caption"> Current Rating:</div>
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

                                <div className="info-caption">
                                    Upcoming Events:
                                </div>
                                <div className="info-var"> 3</div>
                            </div>

                            <div className="info-container">

                                <div className="info-caption">
                                    Lobbies Created
                                </div>
                                <div className="info-var"> 3</div>
                            </div>

                            <div className="info-container">

                                <div className="info-caption">
                                    Lobbies Joined
                                </div>
                                <div className="info-var"> 3</div>
                            </div>

                            <div className="info-container">

                                <div className="info-caption">
                                    Adventures Completed
                                </div>
                                <div className="info-var"> 3</div>
                            </div>
                    </div>
                        <div className="progress" role="progressbar" aria-label="Animated striped example"
                             aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar progress-bar-striped progress-bar-animated"
                                 style={{width: '75%'}}></div>
                        </div>

                </div>
            </div>
        </div>
    )
}