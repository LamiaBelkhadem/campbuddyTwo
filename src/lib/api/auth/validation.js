import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  passwordCon: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match",
  ),
  dob: Yup.string()
    .required("Date of Birth is required")
    .matches(
      /^[0-9]{4}\/[0-9]{2}\/[0-9]{2}$/,
      "Date of Birth must be in YYYY-MM-DD format",
    ),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
