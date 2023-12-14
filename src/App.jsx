import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/common/PrivateRoute";
import PublicRoute from "./components/common/PublicRoute";
import UnAuthenticatedLayout from "./components/common/layouts/UnauthenticatedLayout";
import { AuthProvider } from "./contexts/AuthProvider";
import Profile from "./pages/Profile/Profile";
import Campsites from "./pages/campsites/Campsites";
import Home from "./pages/home/Home";
import Landing from "./pages/landing/Landing";
import LobbyPage from "./pages/lobby/LobbyPage";
import Login from "./pages/login/Login";
import CreateLobby from "./pages/new-lobby/CreateLobby";
import RegisterProfile from "./pages/new-profile/NewProfile";
import Register from "./pages/register/Register";
import VerifyEmail from "./pages/verify-email/VerifyEmail";

function App() {
  return (
    <>
      <ToastContainer position={toast.POSITION.TOP_CENTER} />
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/app"
              element={
                <PrivateRoute>
                  <Outlet />
                </PrivateRoute>
              }
            >
              <Route element={<Home />} index />
              <Route path="lobby/:id" element={<LobbyPage />} />
              <Route path="createLobby" element={<CreateLobby />} />
              <Route path="profile/new" element={<RegisterProfile />} />
              <Route path="profile" element={<Profile />} />
              <Route path="campsites" element={<Campsites />} />
            </Route>
            <Route path="/" element={<UnAuthenticatedLayout />}>
              <Route
                index
                element={
                  <PublicRoute>
                    <Landing />
                  </PublicRoute>
                }
              />
              <Route
                path="login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />
              <Route path="verify/:token" element={<VerifyEmail />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
