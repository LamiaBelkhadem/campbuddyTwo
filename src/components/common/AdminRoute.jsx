import { Fragment } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const AdminRoute = ({ children }) => {
  console.log("Heeere");
  const { user } = useAuth();

  if (user.role !== "ADMIN") return <Navigate to={"/app"} />;

  return <Fragment>{children}</Fragment>;
};

export default AdminRoute;
