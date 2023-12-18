import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./verify-email.css";
import { useVerifyEmail } from "../../hooks/api/useVerifyEmail";
import { useAuth } from "../../hooks/useAuth";

function VerifyEmail() {
  const { token } = useParams();

  console.log(token);
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState(
    "Verifying your email...",
  );

  const { logout } = useAuth();

  const { data, isLoading, error } = useVerifyEmail(token);

  useEffect(() => {
    if (data && !isLoading) {
      setVerificationStatus(
        "Email successfully verified! Redirecting to home...",
      );
      setTimeout(() => navigate("/"), 5000);
    } else if (!isLoading && error) {
      setVerificationStatus("Something went wrong! Redirecting to home...");
      logout();
      setTimeout(() => navigate("/"), 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading]);

  return (
    <div className="verify-email-container">
      <h1>{verificationStatus}</h1>
    </div>
  );
}

export default VerifyEmail;
