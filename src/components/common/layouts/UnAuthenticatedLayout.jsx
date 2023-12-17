import Navbar from "../../landing/navbar";
import { Box } from "@mui/material";
import Footer from "../../common/footer";

const UnAuthenticatedLayout = ({ children }) => (
  <Box
    sx={{
      width: "100vw",
      height: "100vh",
    }}
  >
    <Navbar />
    <Box
      className="window"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </Box>
    <Footer />
  </Box>
);

export default UnAuthenticatedLayout;
