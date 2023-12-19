import { useEffect, useState } from "react";
import { getImageURL } from "../../../utils/getImageURL.js";
import { useGetAllCampsites } from "../../hooks/api/campsites/useGetAllCampsites.jsx";
import CampsiteDetails from "../campsiteDetails/CampsiteDetails.jsx";
import AppSkeleton from "../common/loading/Skeleton.jsx";
import "./campsite-view.css";

export default function SidebarCampsite() {
  const [activeOption, setActiveOption] = useState(null);

  const { data: campsites, isLoading } = useGetAllCampsites();

  const handleOptionClick = (option) => {
    setActiveOption(activeOption === option ? null : option);
  };
  const activeCampsiteDetails = () =>
    campsites.find((campsite) => campsite._id === activeOption);

  useEffect(() => {
    if (!isLoading && campsites && campsites.length > 0) {
      setActiveOption(campsites[0]._id);
    }
  }, [campsites, isLoading]);

    console.log(campsites)
  if (isLoading) return <AppSkeleton />;

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
                    src={getImageURL(campsite.mainImg)}
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
      {activeCampsiteDetails() && (
        <CampsiteDetails campsite={activeCampsiteDetails()} />
      )}
    </div>
  );
}
