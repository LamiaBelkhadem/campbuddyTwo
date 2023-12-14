import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmailApi } from "../../lib/api/auth";
import "./verify-email.css";

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState(
    "Verifying your email...",
  );

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await verifyEmailApi(token);
      } catch (error) {
        console.error(error.response || error);
      }
    };

    setVerificationStatus(
      "Email successfully verified! Redirecting to home...",
    );
    setTimeout(() => navigate("/home"), 5000);

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="verify-email-container">
      <h1>{verificationStatus}</h1>
    </div>
  );
}

export default VerifyEmail;
