import EditIcon from "@mui/icons-material/Edit";
import "./camperInfo.css";

export default function CamperInfo({
  gender,
  experience,
  aboutme,
  interests,
  equipment,
  favourites,
}) {
  return (
    <div className="camperInfo">
      <div className="camper-info-container">
        <div className="details-heading">
          <h3>Camper Information</h3>
          <div className="icon-wrapper">
            <EditIcon className="edit-icon" />
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Gender</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{gender}</p>
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">About me</p>
                </div>
                <div className="col-sm-9">
                  <span className="text-muted mb-0">{aboutme}</span>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Interests/Hobbies</p>
                </div>
                <div className="col-sm-9">
                  {interests.map((tag, index) => (
                    <span key={index} className="interests-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Experience Level</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{experience}</p>
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Equipment/Gear</p>
                </div>
                {equipment.map((e) => (
                  <div className="col-sm-9" key={e}>
                    <p className="badge rounded-pill text-bg-secondary">{e}</p>
                  </div>
                ))}
              </div>
              <hr />

              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Favourites</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{favourites}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
