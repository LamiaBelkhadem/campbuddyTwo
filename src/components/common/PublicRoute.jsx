import { Fragment } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LoadingPage from "./loading/LoadingPage";

const PublicRoute = ({
  children,
  alreadyLoggedInPath="/app",
}) => {
  const { isLoggingIn, user } = useAuth();

  console.log(user);

  if (isLoggingIn) {
    return <LoadingPage />;
  }
  if (!user) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <Fragment>{children}</Fragment>;
  }
  return <Navigate to={alreadyLoggedInPath} />;
};
export default PublicRoute