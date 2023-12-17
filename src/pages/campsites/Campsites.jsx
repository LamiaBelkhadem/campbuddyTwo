import CampsiteView from "../../components/CampsiteView";
import Navbar from "../../components/navbar/Navbar";
import "./campsites.css";
export default function Campsites() {
  return (
    <div className="campsite-page">
      <Navbar />
      <div className="campsites-container">
        <CampsiteView />
      </div>
    </div>
  );
}
