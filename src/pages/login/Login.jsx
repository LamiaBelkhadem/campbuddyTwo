import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import CircularProgress from "@mui/material/CircularProgress";
import { Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { loginSchema } from "../../lib/api/auth/validation.js";

const initialValues = {
  email: "",
  password: "",
};

export default function Login() {
  const { login, isLoggingIn } = useAuth();

  const submitHandler = (values) => {
    console.log(values);
    login({ data: values, onError: (e) => toast(e.response.data.error) });
  };

  return (
    <div className="auth-ctr">
      <div className="form-box">
        <h1 className="title">Login</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={submitHandler}
        >
          {({ errors }) => (
            <Form>
              <div className="text-input">
                <div className="input-field">
                  <div className="input-icon">
                    <EmailIcon className="icon" />
                    <Field
                      className="input-box"
                      type="email"
                      required
                      placeholder="Email"
                      name="email"
                    />
                  </div>
                  {errors.username && (
                    <div className="error">{errors.username}</div>
                  )}
                </div>
                <div className="input-field">
                  <div className="input-icon">
                    <HttpsIcon className="icon" />
                    <Field
                      className="input-box"
                      type="password"
                      required
                      placeholder="Password"
                      minLength="6"
                      name="password"
                    />
                  </div>
                  {errors.password && (
                    <div className="error">{errors.password}</div>
                  )}
                </div>
              </div>

              <button
                className="submit-btn"
                type="submit"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <CircularProgress color="inherit" size="20px" />
                ) : (
                  "Log In"
                )}
              </button>
            </Form>
          )}
        </Formik>
        <div className="or-section">Not a member? Register now!</div>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <button className="other-btn">
            {isLoggingIn ? (
              <CircularProgress color="inherit" size="20px" />
            ) : (
              "Register"
            )}
          </button>
        </Link>
      </div>
    </div>
  );
}
