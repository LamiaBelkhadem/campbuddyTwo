import "./navbar.css"
import React, { useState } from 'react';
import {Search, Person, Chat, Notifications} from "@mui/icons-material"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SettingsIcon from '@mui/icons-material/Settings';
import Diversity2TwoToneIcon from '@mui/icons-material/Diversity2TwoTone';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import Diversity3TwoToneIcon from '@mui/icons-material/Diversity3TwoTone';
import {Link} from "react-router-dom";
export default function Navbar(){
    const [dropdownOpen, setDropdownOpen] = useState(false);
    return(
        <div className="navbar-container">
            <div className="navbarLeft">
                <Link to="/home/:username" style={{textDecoration:"none"}}>
                <span className="logo">CampBuddy</span>
                </Link>
            </div>
            <div className="navbarCenter">
                <div className="searchbar">
                <Search className="search-icon"/>
                    <input type="text" className="search-input" placeholder="Search Lobbies, Campers, etc."/>
                </div>
            </div>
            <div className="navbarRight">
                <div className="navbar-links">
                    <span className="navbar-link">Homepage</span>
                    <span className="navbar-link">Lobbies</span>
                    <span className="navbar-link">Campsites</span>
                </div>
                <div className="navbar-icons">
                    <div className="navbar-icon-item">
                    <Person className="personIcon"/>
                    <span className="navbar-icon-Badge">1</span>
                    </div>

                    <div className="navbar-icon-item">
                        <Chat className="chatIcon"/>
                        <span className="navbar-icon-Badge">2</span>
                    </div>
                    <div className="navbar-icon-item">
                        <Notifications className="notifsIcon"/>
                        <span className="navbar-icon-Badge">3</span>
                    </div>
                </div>
                <div className="profile-option" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <img src="/assets/me.png" alt="" className="navbar-profilepic"/>
                    <div className="profile-name">Lamia Bel Khadem</div>
                    {dropdownOpen && (
                        <div className="dropdown">
                            <div className="dropdown-option">
                                <div className="dropdown-option-icon">
                                    <Diversity2TwoToneIcon/>
                                </div>
                                My Lobbies
                            </div>
                            <div className="dropdown-option">
                                <div className="dropdown-option-icon"><PersonTwoToneIcon/>
                                </div>
                                My Profile
                            </div>
                            <div className="dropdown-option">
                                <div className="dropdown-option-icon">
                                    <Diversity3TwoToneIcon/>
                                </div>
                                My Friends
                            </div>
                            <div className="dropdown-option">
                                <div className="dropdown-option-icon"><SettingsIcon/>
                                </div>
                                My Settings
                            </div>
                        </div>
                    )}
                            <ArrowDropDownIcon className="dropdown-icon"/>
                </div>
           </div>
        </div>



    );
}