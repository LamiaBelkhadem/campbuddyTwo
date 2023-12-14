import SidebarCampsite from "../../components/sidebarCampsite/SidebarCampsite";
import Navbar from "../../components/navbar/Navbar";
import "./campsites.css";
export default function Campsites() {
  return (
    <div className="campsite-page">
      <Navbar />
      <div className="campsites-container">
        <SidebarCampsite />
      </div>
    </div>
  );
}
