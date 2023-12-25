import "./accountDetails.css";
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import JoinFullIcon from '@mui/icons-material/JoinFull';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import EditIcon from '@mui/icons-material/Edit';
export default function AccountDetails() {
  const { user } = useAuth();

    return (

    <div className="account-details" style={{textDecoration: 'none !important'}}>
            <Link to={`/app/created/lobbies/${user._id}`} className="create-btn-container" style={{textDecoration: 'none !important'}}>
            <Button sx={{width:290, height:60, ml:2, mb:2, mt:-1, backgroundColor:'#ff6a85', color:'white'}}variant="outlined" startIcon={<AddCircleOutlineIcon sx={{color:'white !important'}} />}>
                Created Lobbies
            </Button>
            </Link>

            <Link to={`/app/joined/lobbies/${user._id}`} className="create-btn-container" style={{textDecoration: 'none !important'}}>
            <Button sx={{width:290, height:60, ml:2, mb:2, mt:-1, backgroundColor:'#ff6a85', color:'white'}}variant="outlined" startIcon={<JoinFullIcon sx={{color:'white !important'}} />}>
                Joined Lobbies
            </Button>
            </Link>

            <Link to={"/app/lobby/create"} className="create-btn-container" style={{textDecoration: 'none !important'}}>
            <Button style={{textDecoration: 'none !important'}} sx={{width:290, height:60, ml:2, mb:2, mt:-1, backgroundColor:'#AD5D5D' , color:'white', fontStyle:'none !important'}}variant="outlined" startIcon={<AddIcon sx={{color:'white !important'}} />}>
                Create a Lobby
            </Button>
            </Link>

            <Link to={"/app/my-profile/edit"} className="create-btn-container" style={{textDecoration: 'none !important'}}>
            <Button style={{textDecoration: 'none !important'}} sx={{width:290, height:60, ml:2, mb:2, mt:-1, backgroundColor:'#AD5D5D' , color:'white', fontStyle:'none !important'}}variant="outlined" startIcon={<EditIcon sx={{color:'white !important'}} />}>
                Edit Profile
            </Button>
            </Link>
      
    </div>
  );
}
