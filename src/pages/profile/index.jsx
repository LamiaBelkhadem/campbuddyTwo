import { useParams } from "react-router-dom";
import SidebarProfil from "../../components/SidebarProfile/SidebarProfil.jsx";
import AccountDetails from "../../components/accountDetails/AccountDetails.jsx";
import CamperInfo from "../../components/camperInfo/CamperInfo.jsx";
import Footer from "../../components/common/footer/index.jsx";
import LoadingPage from "../../components/common/loading/LoadingPage.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import ProfileDetails from "../../components/profileDetails/ProfileDetails.jsx";
import Socials from "../../components/socials/Socials.jsx";
import { useViewProfile } from "../../hooks/api/profile/useViewProfile.jsx";
import ProfileReviews from "../../components/ProfileReview/index.jsx";

export default function MyProfile() {
  const { id } = useParams();
  const { data: profile, isLoading } = useViewProfile(id);
  if (isLoading) return <LoadingPage />;

  return (
    <div className="profile">
      <Navbar />
      <div className="profile1-container">
        <div className="left-side">
          {profile && (
            <SidebarProfil
              profile={profile}
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
      <ProfileReviews profile={profile} />
      <Footer />
    </div>
  );
}
