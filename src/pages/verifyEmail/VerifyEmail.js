import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './verifyEmail.css';
import {login} from "../../apis"
import {ContextAuth} from "../../context/ContextAuth";

function VerifyEmail() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [verificationStatus, setVerificationStatus] = useState('Verifying your email...');
    const {dispatch}=useContext(ContextAuth);
    let email, password;
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/auth/verify/${token}`);
                console.log(response.data);
                email=response.data.user.email;
               password=response.data.user.password;
                console.log(email,password);

            } catch (error) {
                console.error(error.response || error);
            }
        };

        login(
            { email: email, password: password },
            dispatch
        );

        setVerificationStatus('Email successfully verified! Redirecting to home...');
        setTimeout(() => navigate('/home'), 5000);

        verifyEmail();
    }, [token, navigate]);

    return (
        <div className="verify-email-container">
            <h1>{verificationStatus}</h1>
        </div>
    );
}

export default VerifyEmail;
