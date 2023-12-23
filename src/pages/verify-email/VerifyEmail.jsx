import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./verify-email.css";
import { useVerifyEmail } from "../../hooks/api/useVerifyEmail";
import { useAuth } from "../../hooks/useAuth";

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState(
    "Verifying your email..."
  );

  const { logout } = useAuth();

  const { mutate } = useVerifyEmail(token);

  const verifyEmail = async () => {
    mutate(undefined, {
      onSuccess: () => {
        console.log("Email successfully verified!");
        setVerificationStatus(
          "Email successfully verified! Redirecting to home..."
        );
      },
      onError: () => {
        console.log("Something went wrong!");
        setVerificationStatus("Something went wrong! Redirecting to home...");
        logout();
        setTimeout(() => navigate("/"), 3000);
      },
    });
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <div className="verify-email-container">
      <h1>{verificationStatus}</h1>
    </div>
  );
}

export default VerifyEmail;
