import AccountDetails from "../../components/accountDetails/AccountDetails.jsx";
import CamperInfo from "../../components/camperInfo/CamperInfo.jsx";
import Footer from "../../components/common/footer/index.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import ProfileDetails from "../../components/profileDetails/ProfileDetails.jsx";
import SidebarProfil from "../../components/SidebarProfile/SidebarProfil.jsx";
import Socials from "../../components/socials/Socials.jsx";
import "./profile.css";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useGetMyProfile } from "../../hooks/api/profile/useGetMyProfile.jsx";
import LoadingPage from "../../components/common/loading/LoadingPage.jsx";

export default function Profile() {
  const { data: profile, isLoading } = useGetMyProfile();
  const { user } = useAuth();

  if (isLoading) return <LoadingPage />;

  return (
    <div className="profile">
      <Navbar />
      <div className="profile1-container">
        <div className="left-side">
          {profile && (
            <SidebarProfil
              className="sidebar"
              username={profile.username}
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
                email={user.email}
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

          <div className="center-bottom">
            {profile && (
              <CamperInfo
                gender={profile.gender}
                experience={profile.experience}
                aboutme={profile.desc}
                interests={profile.interests}
                equipment={profile.equipment}
                favourites={profile.favourites}
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
