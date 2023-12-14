import { useEffect, useState } from "react";
import "./sidebarCampsite.css";
import CampsiteDetails from "../campsiteDetails/CampsiteDetails";

export default function SidebarCampsite() {
  const [campsites, setCampsites] = useState([]);
  const [activeOption, setActiveOption] = useState(null);

  useEffect(() => {
    fetchCampsites();
  }, []);

  const fetchCampsites = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/campsites");
      const data = await response.json();
      setCampsites(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching campsites:", error);
      // Handle the error according to your needs
    }
  };
  const handleOptionClick = (option) => {
    setActiveOption(activeOption === option ? null : option);
  };
  const activeCampsiteDetails = campsites.find(
    (campsite) => campsite._id === activeOption
  );

  return (
    <div className="sidebar-campsite-page">
      <div className="wrapper">
        <nav id="sidebar">
          <div className="sidebar-header">
            <h4>Tunisian Campsites</h4>
          </div>

          <ul className="list-unstyled components">
            {campsites.map((campsite) => (
              <li
                key={campsite._id}
                className={`campsite-option ${
                  activeOption === campsite._id ? "active" : ""
                }`}
                onClick={() => handleOptionClick(campsite._id)}
              >
                <div className="option-img-wrapper">
                  <img
                    src={campsite.mainImg}
                    alt={campsite.name}
                    className="option-img"
                  />
                </div>
                <div className="campsite-info">
                  <a href="#">{campsite.name}</a>
                  <p>{campsite.location}</p>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {activeCampsiteDetails && (
        <CampsiteDetails details={activeCampsiteDetails} />
      )}
    </div>
  );
}
