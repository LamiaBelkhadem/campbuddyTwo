import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchBar from "./Searchbar.jsx";
import Diversity2TwoToneIcon from "@mui/icons-material/Diversity2TwoTone";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getImageURL } from "../../../utils/getImageURL.js";
import { useAuth } from "../../hooks/useAuth";
import "./navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="navbar-container">
      <div className="navbarLeft">
        <Link to="/app" style={{ textDecoration: "none" }}>
          <span className="logo">CampBuddy</span>
        </Link>
      </div>

      <SearchBar />
      <div className="navbarRight">
        <div className="navbar-links">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="navbar-link">Homepage</span>
          </Link>

          <Link to="/app" style={{ textDecoration: "none" }}>
            <span className="navbar-link">Lobbies</span>
          </Link>

          <Link to="/app/campsites" style={{ textDecoration: "none" }}>
            <span className="navbar-link">Campsites</span>
          </Link>
        </div>

        <div
          className="profile-option"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img
            src={
              user.profile && user.profile.profilePic
                ? getImageURL(user.profile.profilePic)
                : getImageURL(`defaultpp.jpg`)
            }
            alt=""
            className="navbar-profilepic"
          />
          <div className="profile-name">{user?.username}</div>
          {dropdownOpen && (
            <div className="dropdown">
              <Link to="/app" style={{ textDecoration: "none" }}>
                <div className="dropdown-option">
                  <div className="dropdown-option-icon">
                    <Diversity2TwoToneIcon />
                  </div>
                  My Lobbies
                </div>
              </Link>
              <Link to="/app/my-profile" style={{ textDecoration: "none" }}>
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
              <div className="dropdown-option" onClick={logout}>
                <div className="dropdown-option-icon">
                  <LogoutIcon />
                </div>
                Log Out
              </div>
            </div>
          )}
          <ArrowDropDownIcon
            className="dropdown-icon"
            style={{ color: "white !important" }}
          />
        </div>
      </div>
    </div>
  );
}
