import React from 'react';
import './register_win.css';
import HttpsIcon from '@mui/icons-material/Https';
import EmailIcon from '@mui/icons-material/Email';
import {Person} from "@mui/icons-material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
function Register_win() {
    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="title">Sign Up</h2>
                <div className="text-input">
                    <div className="input-icon">
                        <input className="input-box" type="username" placeholder="Username" />
                        <Person className="icon"/>
                    </div>
                    <div className="input-icon">
                        <input className="input-box" type="email" placeholder="Email" />
                        <EmailIcon className="icon"/>
                    </div>
                    <div className="input-icon">
                        <input className="input-box" type="date" placeholder="Date of Birth" />
                        <CalendarMonthIcon className="icon"/>
                    </div>
                    <div className="input-icon">
                        <input className="input-box" type="password" placeholder="Password" />
                        <HttpsIcon className="icon"/>
                    </div>
                </div>

                <button className="login-btn">Sign Up</button>
                <div className="or-section">Already a  member? Sign in now!</div>
                <button className="register-btn">Sign In</button>
            </div>
        </div>
    );
}

export default Register_win;
