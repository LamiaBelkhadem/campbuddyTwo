import React, {useContext, useEffect, useRef, useState} from 'react';
import './register_win.css';
import HttpsIcon from '@mui/icons-material/Https';
import EmailIcon from '@mui/icons-material/Email';
import {Person} from "@mui/icons-material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import axios from "axios";
import {useNavigate} from "react-router";
import {login} from "../../apis"
import {ContextAuth} from "../../context/ContextAuth";
import {Link} from "react-router-dom";
import Modal from 'bootstrap/js/dist/modal';
function Register_win() {
    const email = useRef();
    const password = useRef();
    const dob = useRef(null);
    const username = useRef();
    const passwordCon = useRef();
    const navigate = useNavigate();
    const {user,isFetching, err, dispatch}=useContext(ContextAuth);
    const modalRef = useRef(null); // Ref for the modal element
    const [bootstrapModal, setBootstrapModal] = useState(null);

    useEffect(() => {
        setBootstrapModal(new Modal(modalRef.current));
    }, []);

    const handleClose = () => {
        bootstrapModal.hide();
        navigate("/login");
    };

    function handleFocus(e) {
        if (e.target.value === '' || e.target.value === 'Date of Birth') {
            e.target.type = 'date';
            e.target.value = '';
        }
    }

    function handleBlur(e) {
        if (e.target.value === '') {
            e.target.type = 'text';
            e.target.value = 'Date of Birth';
        }
    }

    function handleChange(e) {
        if (e.target.value !== '') {
            e.target.type = 'text';
        }
    }  // Empty array ensures this runs once when component is mounted



    const registerHandler = async (e) => {
        e.preventDefault();
        if (passwordCon.current.value !== password.current.value) {
            password.current.setCustomValidity("Passwords should match!");
        } else {
            password.current.setCustomValidity("");
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,

            }
            try {
                await axios.post("http://localhost:8080/api/auth/register", user);
                bootstrapModal.show(); // Show modal on successful registration
            } catch (err) {
                console.log(err, "this is an error")
            }
        }

    }

    return (
        <div className="register-win-container">
            <div className="register-box">
                <form onSubmit={registerHandler}>
                    <h2 className="title">Sign Up</h2>
                    <div className="desc">Please enter the information below to start</div>
                    <div className="text-input">

                        <div className="input-icon">
                            <input className="input-box" required type="username" placeholder="Username"
                                   ref={username}/>
                            <Person className="icon"/>
                        </div>
                        <div className="input-icon">
                            <input className="input-box" required type="email" placeholder="Email" ref={email}/>
                            <EmailIcon className="icon"/>
                        </div>
                        <div className="input-icon">
                            <input
                                ref={dob}
                                className="input-box"
                                type="text"
                                placeholder="Date of Birth"
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                id="dob-input"
                                required
                            />

                            <CalendarMonthIcon className="icon"/>
                        </div>
                        <div className="input-icon">
                            <input className="input-box" minLength="8" type="password" placeholder="Password"
                                   ref={password}/>
                            <HttpsIcon className="icon"/>
                        </div>
                        <div className="input-icon">
                            <input className="input-box" minLength="8" required type="password"
                                   placeholder="Confirm Password" ref={passwordCon}/>
                            <HttpsIcon className="icon"/>
                        </div>
                    </div>

                    <button className="login-btn" type="submit">Sign Up</button>
                </form>
                <div className="or-section">Already a member? Sign in now!</div>
                <Link to="/login" style={{textDecoration:"none"}}>
                <button className="register-btn">Sign In</button>
                </Link>
            </div>
            <div className="modal fade" ref={modalRef} tabIndex="-1" id="verificationModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Email Verification</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            Please check your email to verify your account.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Okay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register_win;
