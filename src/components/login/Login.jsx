import React from 'react';
import './login.css';
import HttpsIcon from '@mui/icons-material/Https';
import EmailIcon from '@mui/icons-material/Email';
function Login() {
    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="title">Sign In</h2>
                <div className="text-input">
                    <div className="input-icon">
                        <input className="input-box" type="email" placeholder="Email" />
                        <EmailIcon className="icon"/>
                    </div>
                    <div className="input-icon">
                        <input className="input-box" type="password" placeholder="Password" />
                        <HttpsIcon className="icon"/>
                    </div>
                </div>
                <div className="remember-container">
                    <input className="checkbox" type="checkbox"  id="remember" />
                    <label htmlFor="remember">Remember me</label>
                </div>
                <button className="login-btn">LOGIN</button>
                <div className="or-section">Not a  member? Sign Up now!</div>
                <button className="register-btn">Sign Up</button>
            </div>
        </div>
    );
}

export default Login;
