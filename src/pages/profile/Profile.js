import Navbar from "../../components/navbar/Navbar"
import "./profile.css"
import Footer from "../../components/Footer/Footer";
import SidebarProfil from "../../components/sidebar_profil/SidebarProfil.jsx"
import ProfileDetails from "../../components/profileDetails/ProfileDetails";
import AccountDetails from "../../components/accountDetails/AccountDetails";
import CamperInfo from "../../components/camperInfo/CamperInfo";
import Socials from "../../components/socials/Socials";

import {useState, useEffect, useContext} from "react";
import axios from "axios";
import {ContextAuth} from "../../context/ContextAuth";
import {useParams} from "react-router-dom";

export default function Profile(){
    const [profile, setProfile] = useState(null);
    const {user} = useContext(ContextAuth);


    useEffect(()=>{
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/users?username=${user.username}`);
                setProfile(res.data); // Assuming the data you need is in res.data
                console.log(res);
            } catch (error) {
                console.error("Error fetching profile:", error);
                // Handle the error appropriately
            }
        };
        fetchProfile();
    },[]);
    return (
        <div className="profile">
            <Navbar/>
            <div className="profile1-container">
                <div className="left-side">
                    { profile &&
                    <SidebarProfil className="sidebar"
                                   username={profile.username}
                                   lobbies={profile.lobbies}
                    />
                        }
                </div>


                <div className="center">
                    <div className="center-bottom">
                        {profile &&
                            <ProfileDetails
                            fname={profile.fname}
                            lname={profile.lname}
                            area={profile.area}
                            age={profile.age}
                            email={profile.email}/>
                        }
                        {profile &&
                            <Socials
                            facebook={profile.facebook}
                            instagram={profile.instagram}
                            twitter={profile.twitter}
                            tiktok={profile.tiktok}/>
                        }

                    </div>

                    <div className="center-bottom">
                        {profile &&
                        <CamperInfo
                        key={profile._id}
                        gender={profile.gender}
                        experience={profile.experience}
                        aboutme={profile.desc}
                        interests={profile.interests}
                        equipment={profile.equipment}
                        favourites={profile.favourites}
                        />
                        }
                        <AccountDetails/>
                    </div>

                    </div>
             </div>
            <Footer/>
        </div>);
}