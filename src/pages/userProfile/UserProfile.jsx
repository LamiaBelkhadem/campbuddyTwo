import SidebarUserProfil from "../../components/sidebarUserProfile/SidebarUserProfil.jsx";
import AccountDetails from "../../components/accountDetails/AccountDetails.jsx";
import CamperInfo from "../../components/camperInfo/CamperInfo.jsx";
import Footer from "../../components/common/footer/index.jsx";
import LoadingPage from "../../components/common/loading/LoadingPage.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import ProfileDetails from "../../components/profileDetails/ProfileDetails.jsx";
import Socials from "../../components/socials/Socials.jsx";
import { useViewProfile } from "../../hooks/api/profile/useViewProfile.jsx";
import ProfileReviews from "../../components/ProfileReview/index.jsx";

import "./userProfile.css";
import {useParams } from "react-router-dom";
export default function UserProfile() {
  const { id } = useParams();
  const { data: profile, isLoading } = useViewProfile(id);
  console.log("profile",profile);
  const me=false;
  if (isLoading) return <LoadingPage />;
console.log("fav:", profile?.favorites)
  return (
    <div className="profile">
      <Navbar />
      <div className="profile1-container">
        <div className="left-side">
          {profile && (
            <SidebarUserProfil
              className="sidebar"
              profile={profile}
              reviews={profile.reviews}
              username={profile.fname}
              lobbies={profile.lobbies}
            />
          )}
        </div>

        <div className="center">
          <div className="center-bottom">
            {profile && (
              <ProfileDetails
                fname={profile.fname}
                lname={profile.lname}
                area={profile.area}
                age={profile.age}
              />
            )}
            {profile && (
              <Socials
                facebook={profile.facebook}
                instagram={profile.instagram}
                twitter={profile.twitter}
                tiktok={profile.tiktok}
              />
            )}
          </div>

                  <div className="center-bottom" style={{ marginBottom: '20px' }}>
            {profile && (
              <CamperInfo
                gender={profile.gender}
                experience={profile.experience}
                aboutme={profile.desc}
                interests={profile.interests}
                equipment={profile.equipment}
                favourites={profile?.favorites}
                             
              />
            )}
            <AccountDetails bool={me}/>
          </div>            
          <div className="user-reviews" style={{ width:'800px', marginBotton:'30px !important', paddingBottom:'50px'}}>
            <ProfileReviews bool={me} profile={profile} style={{width:'680px', }}/>

            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
