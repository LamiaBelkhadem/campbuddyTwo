import React, {useContext, useRef} from 'react';
import './login.css';
import HttpsIcon from '@mui/icons-material/Https';
import EmailIcon from '@mui/icons-material/Email';
import CircularProgress from '@mui/material/CircularProgress';
import {login} from "../../apis"
import {ContextAuth} from "../../context/ContextAuth";
import {Link} from "react-router-dom";
function Login() {
    const email = useRef();
    const password = useRef();
    const {user,isFetching, err, dispatch}=useContext(ContextAuth);
    const loginHandler = (e) => {

        e.preventDefault();
        login(
            { email: email.current.value, password: password.current.value },
            dispatch
        );    }
    console.log(user)
    return (
        <div className="login-container">
            <div className="login-box" onSubmit={loginHandler}>
                <form onSubmit={loginHandler}>
                    <h2 className="title">Sign In</h2>
                    <div className="text-input">
                        <div className="input-icon">
                            <input className="input-box" type="email" required placeholder="Email" ref={email}/>
                            <EmailIcon className="icon"/>
                        </div>
                        <div className="input-icon">
                            <input className="input-box" type="password" required placeholder="Password" minLength="6"
                                   ref={password}/>
                            <HttpsIcon className="icon"/>
                        </div>
                    </div>
                    <div className="remember-container">
                        <input className="checkbox" type="checkbox" id="remember"/>
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    <button className="login-btn" type="submit" disabled={isFetching}> {isFetching? <CircularProgress color="inherit" size="20px" /> : "Log In"}</button>
                </form>
                <div className="or-section">Not a member? Sign Up now!</div>
                <Link to="/register" style={{textDecoration:"none"}}>
                <button className="register-btn"> {isFetching? <CircularProgress color="inherit" size="20px" /> : "Sign Up"} </button>
                </Link>
                </div>

        </div>
    );
}

export default Login;
