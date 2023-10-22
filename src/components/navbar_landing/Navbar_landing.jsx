import "./navbar_landing.css"
import React, { useState } from 'react';
import {Search, Person, Chat, Notifications} from "@mui/icons-material"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SettingsIcon from '@mui/icons-material/Settings';
import Diversity2TwoToneIcon from '@mui/icons-material/Diversity2TwoTone';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import Diversity3TwoToneIcon from '@mui/icons-material/Diversity3TwoTone';
import {Link} from "react-router-dom";
export default function Navbar_landing(){
    const [dropdownOpen, setDropdownOpen] = useState(false);
    return(
        <div className="navbar-container">
            <div className="navbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">CampBuddy</span>
                </Link>
            </div>
            <div className="navbarCenter">

            </div>
            <div className="navbarRight">
                    <div className="navbar-links">
                        <span className="navbar-link">How It Works</span>
                        <span className="navbar-link">Features</span>
                        <span className="navbar-link">FAQ</span>
                    </div>
                <div className="buttons">
                    <button className="register-button">REGISTER</button>
                    <button className="login-button">LOGIN</button>
                </div>
            </div>
        </div>



    );
}