import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Fragment } from "react";

const IsProfileSet = ({ children }) => {
  const { user } = useAuth();

  console.log(user);
  if (!user.profile) return <Navigate to="/app/my-profile/edit" />;

  return <Fragment>{children}</Fragment>;
};

export default IsProfileSet;
