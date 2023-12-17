import Navbar from "../../navbar/Navbar";
import Sidebar from "../../sidebar/Sidebar";
import { Box } from "@mui/material";

const AuthenticatedLayout = ({ sidebar = true, children }) => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Navbar />
      <div className="window">
        {sidebar && <Sidebar />}
        {children}
      </div>
    </Box>
  );
};

export default AuthenticatedLayout;
