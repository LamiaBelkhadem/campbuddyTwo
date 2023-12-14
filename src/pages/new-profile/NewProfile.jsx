import Footer from "../../components/common/footer";
import NewProfile from "../../components/registerProfileWin/RegisterProfileWin";
import Navbar from "../../components/navbar/Navbar";

export default function RegisterProfile() {
  return (
    <>
      <Navbar />
      <div className="window">
        <NewProfile />
      </div>

      <Footer />
    </>
  );
}
