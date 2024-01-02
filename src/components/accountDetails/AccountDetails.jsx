import "./accountDetails.css";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import JoinFullIcon from "@mui/icons-material/JoinFull";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import EditIcon from '@mui/icons-material/Edit';
import { Fragment } from "react";
export default function AccountDetails(bool) {
  const { user } = useAuth();
console.log(bool.bool, "meee");
    return (

    <div className="account-details" style={{textDecoration: 'none !important'}}>
        <Link to={`/app/lobby/created/${user._id}`} className="create-btn-container"
				  style={{ textDecoration: "none !important" }}>
				<Button
					sx={{ width: 290, height: 60, ml: 2, mb: 2, mt: -1, backgroundColor: "#ff6a85", color: "white",  '&:hover': {backgroundColor: "#a33c4f", color:"white !important" }}}
					variant="outlined" startIcon={<AddCircleOutlineIcon sx={{ color: "white !important" }} />}>
					Created Lobbies
				</Button>
			</Link>
            <Link to={`/app/lobby/joined/${user._id}`} className="create-btn-container"
				  style={{ textDecoration: "none !important" }}>
				<Button
					sx={{ width: 290, height: 60, ml: 2, mb: 2, mt: -1, backgroundColor: "#ff6a85", color: "white" ,  '&:hover': {backgroundColor: "#a33c4f", color:"white !important" }}}
					variant="outlined" startIcon={<JoinFullIcon sx={{ color: "white !important" }} />}>
					Joined Lobbies
				</Button>
			</Link>

{bool.bool && (
  <Fragment>
    <Link to={"/app/lobby/create"} className="create-btn-container" style={{ textDecoration: 'none' }}>
      <Button sx={{ width: 290, height: 60, ml: 2, mb: 2, mt: -1, backgroundColor: '#AD5D5D', color: 'white' ,  '&:hover': {backgroundColor: "#764141", color:"white !important" } }} variant="outlined" startIcon={<AddIcon sx={{ color: "white !important" }} />}>
        Create a Lobby
      </Button>
    </Link>

    <Link to={"/app/my-profile/edit"} className="create-btn-container" style={{ textDecoration: 'none' }}>
      <Button sx={{ width: 290, height: 60, ml: 2, mb: 2, mt: -1, backgroundColor: '#AD5D5D', color: 'white !important'  ,  '&:hover': {backgroundColor: "#764141", color:"white !important" }}} variant="outlined" startIcon={<EditIcon sx={{ color: "white !important" }}/>}>
        Edit Profile
      </Button>
    </Link>
  </Fragment>
)}

           
      
    </div>
  );
}
