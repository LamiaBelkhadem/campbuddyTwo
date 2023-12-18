import EditIcon from "@mui/icons-material/Edit";
import "./profileDetails.css";

export default function ProfileDetails({ fname, lname, area, age }) {
  return (
    <div className="profile-details">
      <div className="camper-details">
        <div className="details-heading">
          <h3>Camper Details</h3>
          <div className="icon-wrapper">
            <EditIcon className="edit-icon" />
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Full Name</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">
                    {fname} {lname}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Age</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{age}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Area</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{area}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
