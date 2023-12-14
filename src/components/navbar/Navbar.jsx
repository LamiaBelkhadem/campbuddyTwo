import { Search } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Diversity2TwoToneIcon from "@mui/icons-material/Diversity2TwoTone";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./navbar.css";

export default function Navbar() {
  const { user } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user from local storage
    localStorage.removeItem("user");

    // Dispatch a logout action
    dispatch({ type: "LOGOUT" });
    console.log("user logged out");
    navigate("/login");
  };

  return (
    <div className="navbar-container">
      <div className="navbarLeft">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <span className="logo">CampBuddy</span>
        </Link>
      </div>
      <div className="navbarCenter">
        <div className="searchbar">
          <Search className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search Lobbies, Campers, etc."
          />
        </div>
      </div>
      <div className="navbarRight">
        <div className="navbar-links">
          <Link to="/home" style={{ textDecoration: "none" }}>
            <span className="navbar-link">Homepage</span>
          </Link>

          <Link to="/home" style={{ textDecoration: "none" }}>
            <span className="navbar-link">Lobbies</span>
          </Link>

          <Link to="/campsites" style={{ textDecoration: "none" }}>
            <span className="navbar-link">Campsites</span>
          </Link>
        </div>

        <div
          className="profile-option"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img
            src={user?.profilepic ? user.profilepic : `defaultpp.jpg`}
            alt=""
            className="navbar-profilepic"
          />
          <div className="profile-name">{user?.username}</div>
          {dropdownOpen && (
            <div className="dropdown">
              <Link to="/home" style={{ textDecoration: "none" }}>
                <div className="dropdown-option">
                  <div className="dropdown-option-icon">
                    <Diversity2TwoToneIcon />
                  </div>
                  My Lobbies
                </div>
              </Link>
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <div className="dropdown-option">
                  <div className="dropdown-option-icon">
                    <PersonTwoToneIcon />
                  </div>
                  My Profile
                </div>
              </Link>
              <div className="dropdown-option">
                <div className="dropdown-option-icon">
                  <SettingsIcon />
                </div>
                My Settings
              </div>
              <div className="dropdown-option" onClick={handleLogout}>
                <div className="dropdown-option-icon">
                  <LogoutIcon />
                </div>
                Log Out
              </div>
            </div>
          )}
          <ArrowDropDownIcon className="dropdown-icon" />
        </div>
      </div>
    </div>
  );
}
