import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

export const useAuth = () => {
  const data = useContext(AuthContext);
  if (!data) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return data;
};

export default useAuth;
