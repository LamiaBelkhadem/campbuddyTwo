import Home from "./pages/home/Home"
import Landing from "./pages/landing/Landing";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import {HdrOn} from "@mui/icons-material";
import Loginp from "./pages/Login/Loginp";
function App() {
  return(
      <Router>
        <Routes>
          <Route path="/home/:username" element={<Home/>}/>
          <Route path="/" element={<Landing/>}/>
          <Route path="/login" element={<Loginp/>}/>
          <Route path="/register/" element={<Register/>}/>


        </Routes>


      </Router>
  )


}

export default App;
