import { Fragment } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LoadingPage from "./loading/LoadingPage";

const PrivateRoute = ({ children }) => {
  const { user, isLoggingIn } = useAuth();
  if (isLoggingIn) {
    return <LoadingPage />;
  }
  if (!user) {
    return <Navigate to={`/`} />;
  } else {
    return <Fragment>{children}</Fragment>;
  }
};

export default PrivateRoute;