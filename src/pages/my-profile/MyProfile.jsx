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
import ProfileReviews from "../../components/ProfileReview/index.jsx";
export default function MyProfile() {
  const { data: profile, isLoading } = useGetMyProfile();
const me=true;
  if (isLoading) return <LoadingPage />;
console.log("fav:", profile?.favorites)
console.log(profile, "reviews 1")
  return (
    <div className="profile">
      <Navbar />
      <div className="profile1-container">
        <div className="left-side">
          {profile && (
            <SidebarProfil
              className="sidebar"
              username={profile.fname + " " + profile.lname}
              rate={profile.rate}
              reviews={profile.reviews}
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
            <AccountDetails bool={me} />
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
