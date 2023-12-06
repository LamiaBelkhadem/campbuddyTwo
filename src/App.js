import Home from "./pages/home/Home"
import Landing from "./pages/landing/Landing";
import Register from "./pages/register/Register";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import Loginp from "./pages/Login/Loginp";
import Profile from "./pages/profile/Profile";
import {useContext} from "react";
import {ContextAuth} from "./context/ContextAuth";
import RegisterProfile from "./pages/registerProfile/RegisterProfile";
import Campsites from "./pages/campsites/Campsites";
import VerifyEmail from "./pages/verifyEmail/VerifyEmail";
import LobbyPage from "./pages/LobbyPage/LobbyPage";
import CreateLobby from "./pages/createLobby/CreateLobby";

function App() {
    const {user} = useContext(ContextAuth)

    if(user===null){
        console.log("no user")
    }else{
        console.log(user);
    }
    const getHomeRoute = () => {
        if (!user) return <Navigate to="/" />;
        if (!user.profile) return <Navigate to="/register/profile" />;
        return <Home />;
    };

    return (
        <Router>
            <Routes>
                <Route path="/home" element={getHomeRoute()}/>
                <Route path="/" element={user ? <Navigate to="/home"/> : <Landing/>}/>
                <Route path="/login" element={user ? <Navigate to="/home"/> : <Loginp/>}/>
                <Route path="/register" element={user ? <Navigate to="/home"/> : <Register/>}/>
                <Route path="/register/profile" element={<RegisterProfile/>}/>
                <Route path="/profile" element={user ? <Profile/> : <Navigate to="/"/>}/>
                <Route path="/campsites" element={user? <Campsites/> :<Navigate to="/"/>}/>
                <Route path="/verify/:token" element={<VerifyEmail />} />
                <Route path="/lobby/:id" element={<LobbyPage/>}  />
                <Route path="/createLobby" element={<CreateLobby/>}  />
            </Routes>
        </Router>
    )


}

export default App;
