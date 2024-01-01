import Footer from "../../components/common/footer/index.jsx";
import Lobby from "../../components/Lobbies/Lobby";
import { useGetLobbiesByParticipants } from "../../hooks/api/lobbies/useGetLobbiesByParticipants.jsx";
import { useAuth } from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import LoadingPage from "../../components/common/loading/LoadingPage.jsx";
import Navbar from "../../components/landing/navbar/index.jsx";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
export default function joinedLobbies() {
	
	return (
        <div className="how-it-works">
        <div className="content">
            <h1 style={{ textAlign: "center", marginTop: "70px" }}>How It Works</h1>
            <div style={{ display: "flex", alignItems: "justify", justifyContent: "center" }}>
                <div>  
                    <ol style={{ 
                        width: "40vw", 
                        backgroundColor: "lightGrey", 
                        borderRadius: "5px", 
                        marginTop: "20px", 
                        padding: "10px", 
                        listStyleType: "none" 
                    }}>
                        <li style={{ marginBottom: "35px" }}><RadioButtonCheckedIcon sx={{fontSize:"15px"}}/><b> Sign Up & Log In:</b> Create your account and log in to access all features.</li>
                        <li style={{ marginBottom: "35px" }}><RadioButtonCheckedIcon sx={{fontSize:"15px"}}/><b> Create Your Profile:</b> Fill in your details like name, age, camping experience, and interests.</li>
                        <li style={{ marginBottom: "35px" }}><RadioButtonCheckedIcon sx={{fontSize:"15px"}}/><b> Browse Lobbies:</b> Explore various lobbies based on your interests and preferences.</li>
                        <li style={{ marginBottom: "35px" }}><RadioButtonCheckedIcon sx={{fontSize:"15px"}}/><b> Join a Lobby:</b> Find a lobby that matches your camping style and join the group.</li>
                        <li style={{ marginBottom: "35px" }}><RadioButtonCheckedIcon sx={{fontSize:"15px"}}/><b> Plan Your Trip:</b> Collaborate with fellow campers in the lobby to plan your trip.</li>
                        <li style={{ marginBottom: "35px" }}><RadioButtonCheckedIcon sx={{fontSize:"15px"}}/><b> Enjoy Camping:</b> Meet up and enjoy your camping adventure with new friends!</li>
                    </ol>
                </div>
            </div>  
        </div>
    </div>
    
	);
}