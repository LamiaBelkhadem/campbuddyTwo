import "./rightbar.css"

export default function Rightbar(){
    const CF=process.env.REACT_APP_COMMON_FOLDER;
    return(
        <div className="rightbar">
            <div className="rightbarWrapper">
                <img className="rightbar-img" src={`${CF}campersList.png`} alt=""/>
                <h4 className="rightbar-Title">Online Campers:</h4>
                <ul className="rightbar-campersList">
                    <li className="rightbar-Camper">
                        <div className="rightbar-img-Container">
                            <img className="rightbar-profile-img" src={`${CF}person3.png`} alt=""/>
                            <span className="rightbar-Online"></span>
                        </div>
                        <span className="rightbar-Username"> John Carter</span>

                    </li>

                    <li className="rightbar-Camper">
                        <div className="rightbar-img-Container">
                            <img className="rightbar-profile-img" src={`${CF}person1.png`} alt=""/>
                            <span className="rightbar-Online"></span>
                        </div>
                        <span className="rightbar-Username"> John Carter</span>

                    </li>

                    <li className="rightbar-Camper">
                        <div className="rightbar-img-Container">
                            <img className="rightbar-profile-img" src={`${CF}person2.png`} alt=""/>
                            <span className="rightbar-Online"></span>
                        </div>
                        <span className="rightbar-Username"> John Carter</span>

                    </li>

                    <li className="rightbar-Camper">
                        <div className="rightbar-img-Container">
                            <img className="rightbar-profile-img" src={`${CF}person4.png`} alt=""/>
                            <span className="rightbar-Online"></span>
                        </div>
                        <span className="rightbar-Username"> John Carter</span>

                    </li> <li className="rightbar-Camper">
                        <div className="rightbar-img-Container">
                            <img className="rightbar-profile-img" src={`${CF}person3.png`} alt=""/>
                            <span className="rightbar-Online"></span>
                        </div>
                        <span className="rightbar-Username"> John Carter</span>

                    </li>

                    <li className="rightbar-Camper">
                        <div className="rightbar-img-Container">
                            <img className="rightbar-profile-img" src={`${CF}person1.png`} alt=""/>
                            <span className="rightbar-Online"></span>
                        </div>
                        <span className="rightbar-Username"> John Carter</span>

                    </li>

                    <li className="rightbar-Camper">
                        <div className="rightbar-img-Container">
                            <img className="rightbar-profile-img" src={`${CF}person2.png`} alt=""/>
                            <span className="rightbar-Online"></span>
                        </div>
                        <span className="rightbar-Username"> John Carter</span>

                    </li>

                    <li className="rightbar-Camper">
                        <div className="rightbar-img-Container">
                            <img className="rightbar-profile-img" src={`${CF}person4.png`} alt=""/>
                            <span className="rightbar-Online"></span>
                        </div>
                        <span className="rightbar-Username"> John Carter</span>

                    </li>

                    <li className="rightbar-Camper">
                        <div className="rightbar-img-Container">
                            <img className="rightbar-profile-img" src={`${CF}person3.png`} alt=""/>
                            <span className="rightbar-Online"></span>
                        </div>
                        <span className="rightbar-Username"> John Carter</span>

                    </li>

                    <li className="rightbar-Camper">
                        <div className="rightbar-img-Container">
                            <img className="rightbar-profile-img" src={`${CF}person1.png`} alt=""/>
                            <span className="rightbar-Online"></span>
                        </div>
                        <span className="rightbar-Username"> John Carter</span>

                    </li>

                    <li className="rightbar-Camper">
                        <div className="rightbar-img-Container">
                            <img className="rightbar-profile-img" src={`${CF}person2.png`} alt=""/>
                            <span className="rightbar-Online"></span>
                        </div>
                        <span className="rightbar-Username"> John Carter</span>

                    </li>

                    <li className="rightbar-Camper">
                        <div className="rightbar-img-Container">
                            <img className="rightbar-profile-img" src={`${CF}person4.png`} alt=""/>
                            <span className="rightbar-Online"></span>
                        </div>
                        <span className="rightbar-Username"> John Carter</span>

                    </li>

                </ul>
            </div>
        </div>
    )
}