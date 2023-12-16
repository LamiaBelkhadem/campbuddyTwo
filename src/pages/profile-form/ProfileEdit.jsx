import Footer from "../../components/common/footer";
import ProfileForm from "../../components/createProfileForm";
import Navbar from "../../components/navbar/Navbar";
import { useGetMyProfile } from "../../hooks/api/profile/useGetMyProfile.jsx";
import MySkeleton from "../../components/common/loading/Skeleton.jsx";
import { getImageURL } from "../../../utils/getImageURL.js";

export default function ProfileEdit() {
  const { data, isLoading } = useGetMyProfile();

  console.log(data, isLoading);
  return (
    <>
      <Navbar />
      <div className="window">
        {isLoading ? (
          <MySkeleton />
        ) : (
          <ProfileForm
            initialValues={{
              ...data.profile,
              profilePic: getImageURL(data.profile.profilePic),
            }}
          />
        )}
      </div>
      <Footer />
    </>
  );
}
