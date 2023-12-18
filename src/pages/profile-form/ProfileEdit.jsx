import Footer from "../../components/common/footer";
import ProfileForm from "../../components/createProfileForm";
import Navbar from "../../components/navbar/Navbar";
import { useGetMyProfile } from "../../hooks/api/profile/useGetMyProfile.jsx";
import AppSkeleton from "../../components/common/loading/Skeleton.jsx";
import { getImageURL } from "../../../utils/getImageURL.js";

export default function ProfileEdit() {
  const { data: profile, isLoading } = useGetMyProfile();
  return (
    <>
      <Navbar />
      <div className="window">
        {isLoading ? (
          <AppSkeleton />
        ) : (
          <ProfileForm
            profile={{
              ...profile,

              profilePic: profile
                ? getImageURL(profile.profilePic)
                : "defaultpp.jpg",
            }}
          />
        )}
      </div>
      <Footer />
    </>
  );
}
