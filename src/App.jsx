import { Box, Container } from "@mui/material";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CampsiteCreate,
  CampsiteEdit,
} from "./components/CampsiteEdit/index.jsx";
import AdminRoute from "./components/common/AdminRoute.jsx";
import IsProfileSet from "./components/common/IsProfileSet";
import PrivateRoute from "./components/common/PrivateRoute";
import PublicRoute from "./components/common/PublicRoute";
import AuthenticatedLayout from "./components/common/layouts/AuthenticatedLayout.jsx";
import UnAuthenticatedLayout from "./components/common/layouts/UnauthenticatedLayout";
import { AuthProvider } from "./contexts/AuthProvider";
import NotFoundPage from "./pages/404.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Campsites from "./pages/campsites/Campsites";
import Home from "./pages/home/Home";
import Landing from "./pages/landing/Landing";
import LobbyPage from "./pages/lobby/LobbyPage";
import Login from "./pages/login/Login";
import CreateLobby from "./pages/new-lobby/CreateLobby";
import ProfileForm from "./pages/profile-form/ProfileEdit.jsx";
import Profile from "./pages/profile/Profile.jsx";
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
              element={
                <UnAuthenticatedLayout>
                  <Outlet />
                </UnAuthenticatedLayout>
              }
              path={"/"}
            >
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
            <Route
              path="/app"
              element={
                <PrivateRoute>
                  <Outlet />
                </PrivateRoute>
              }
            >
              <Route
                element={
                  <IsProfileSet>
                    <Home />
                  </IsProfileSet>
                }
                index
              />
              <Route
                path="lobby/view/:id"
                element={
                  <IsProfileSet>
                    <LobbyPage />
                  </IsProfileSet>
                }
              />
              <Route
                path="lobby/create"
                element={
                  <IsProfileSet>
                    <CreateLobby />
                  </IsProfileSet>
                }
              />
              <Route path="my-profile/edit" element={<ProfileForm />} />
              <Route
                path="my-profile"
                element={
                  <IsProfileSet>
                    <Profile />
                  </IsProfileSet>
                }
              />
              <Route path="campsites" element={<Campsites />} />
              <Route
                path={"admin"}
                element={
                  <AdminRoute>
                    <Outlet />
                  </AdminRoute>
                }
              >
                <Route element={<Dashboard />} index />
                <Route
                  element={
                    <AuthenticatedLayout sidebar={false}>
                      <Box sx={{ height: 50 }} />
                      <Container fluid maxWidth="xl">
                        <Outlet />
                      </Container>
                    </AuthenticatedLayout>
                  }
                >
                  <Route element={<CampsiteCreate />} path={"campsite/new"} />
                  <Route
                    element={<CampsiteEdit />}
                    path={"campsite/edit/:id"}
                  />
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
