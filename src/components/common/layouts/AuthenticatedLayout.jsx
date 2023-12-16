import Navbar from "../../navbar/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../../sidebar/Sidebar";

const AuthenticatedLayout = (sidebar) => {
  return (
    <>
      <Navbar />
      <div className="window">
        {sidebar && <Sidebar />}
        <Outlet />
      </div>
    </>
  );
};

export default AuthenticatedLayout;
