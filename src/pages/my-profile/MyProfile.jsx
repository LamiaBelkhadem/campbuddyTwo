import SidebarProfil from "../../components/SidebarProfile/SidebarProfil.jsx";
import AccountDetails from "../../components/accountDetails/AccountDetails.jsx";
import CamperInfo from "../../components/camperInfo/CamperInfo.jsx";
import Footer from "../../components/common/footer/index.jsx";
import LoadingPage from "../../components/common/loading/LoadingPage.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import ProfileDetails from "../../components/profileDetails/ProfileDetails.jsx";
import Socials from "../../components/socials/Socials.jsx";
import { useGetMyProfile } from "../../hooks/api/profile/useGetMyProfile.jsx";
import "./my-profile.css";

export default function MyProfile() {
  const { data: profile, isLoading } = useGetMyProfile();

  if (isLoading) return <LoadingPage />;
console.log("fav:", profile?.favorites)
  return (
    <div className="profile">
      <Navbar />
      <div className="profile1-container">
        <div className="left-side">
          {profile && (
            <SidebarProfil
              className="sidebar"
              username={profile.fname + " " + profile.lname}
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
            <AccountDetails />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
