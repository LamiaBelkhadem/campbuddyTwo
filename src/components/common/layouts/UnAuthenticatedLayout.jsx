import { Outlet } from "react-router-dom";
import Navbar from "../../landing/navbar";
import Footer from "../../common/footer";

const UnAuthenticatedLayout = () => (
  <>
    <Navbar />
    <div className="window">
      <Outlet />
    </div>
    <Footer />
  </>
);

export default UnAuthenticatedLayout;
