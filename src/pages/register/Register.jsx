import { Person } from "@mui/icons-material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import AppModal from "../../components/common/Modal";
import useDisclosure from "../../hooks/useDisclosure";
import { register } from "../../lib/api/auth";

const registerSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  passwordCon: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  dob: Yup.string()
    .required("Date of Birth is required")
    .matches(
      /^[0-9]{4}\/[0-9]{2}\/[0-9]{2}$/,
      "Date of Birth must be in YYYY-MM-DD format"
    ),
});

const initialValues = {
  username: "",
  email: "",
  password: "",
  passwordCon: "",
  dob: "",
};

export default function Register() {
  const navigate = useNavigate();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const onCloseHandler = () => {
    onClose();
    navigate("/login");
  };

  const registerHandler = async (values, options) => {
    console.log({ values, options });
    try {
      await register(values);
      onOpen(); // Show modal on successful registration
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  return (
    <div className="auth-ctr">
      <div className="form-box">
        <h2 className="title">Sign Up</h2>
        <div className="desc">Please enter the information below to start</div>
        <Formik
          initialValues={initialValues}
          validateOnChange={true}
          validationSchema={registerSchema}
          onSubmit={registerHandler}
        >
          {({ errors, isSubmitting }) => (
            <Form>
              <div className="text-input">
                <div className="input-field">
                  <div className="input-icon">
                    <Person className="icon" />
                    <Field name="username" placeholder="cool username" />
                  </div>
                  {errors.username && (
                    <div className="error">{errors.username}</div>
                  )}
                </div>
                <div className="input-field">
                  <div className="input-icon">
                    <EmailIcon className="icon" />
                    <Field name="email" placeholder="johndoe@email.com" />
                  </div>
                  {errors.email && <div className="error">{errors.email}</div>}
                </div>
                <div className="input-field">
                  <div className="input-icon">
                    <CalendarMonthIcon className="icon" />
                    <Field
                      name="dob"
                      className="input-box"
                      placeholder="Date of Birth YYYY/MM/DD"
                      id="dob-input"
                    />
                  </div>
                  {errors.dob && <div className="error">{errors.dob}</div>}
                </div>
                <div className="input-field">
                  <div className="input-icon">
                    <HttpsIcon className="icon" />
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                  {errors.password && (
                    <div className="error">{errors.password}</div>
                  )}
                </div>
                <div className="input-field">
                  <div className="input-icon">
                    <HttpsIcon className="icon" />
                    <Field
                      name="passwordCon"
                      type="password"
                      placeholder="Confirm password"
                    />
                  </div>
                  {errors.passwordCon && (
                    <div className="error">{errors.passwordCon}</div>
                  )}
                </div>
              </div>

              <button
                className="submit-btn"
                type="submit"
                disabled={isSubmitting}
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
        <div className="or-section">Already a member? Sign in now!</div>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <button className="other-btn">Sign In</button>
        </Link>
      </div>
      <AppModal
        isOpen={isOpen}
        onClose={onCloseHandler}
        body="Please check your email to verify your account."
        title="Email verification"
      />
    </div>
  );
}
