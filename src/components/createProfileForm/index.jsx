import { Man, Woman } from "@mui/icons-material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import Person from "@mui/icons-material/Person";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useUpdateProfile } from "../../hooks/api/profile/useUpdateProfile";
import useAuth from "../../hooks/useAuth";
import useDisclosure from "../../hooks/useDisclosure";
import AppModal from "../common/Modal";
import "./create-profile.css";

const createProfileSchema = Yup.object().shape({
  gender: Yup.string(),
  lname: Yup.string().min(2, "Last name is required"),
  fname: Yup.string().min(2, "First name is required"),
  bio: Yup.string()
    .min(2, "Too Short!")
    .max(500, "Too Long!")
    .required("Bio is required so people get to know you better"),
  age: Yup.number()
    .min(1, "Too Short!")
    .max(100, "Too Long!")
    .required("Age is required"),
  experience: Yup.string()
    .min(2, "Too Short!")
    .max(500, "Too Long!")
    .required("Experience is required"),
  desc: Yup.string().min(2, "Too Short!").max(500, "Too Long!"),
  area: Yup.string().min(2, "Too Short!").max(500, "Too Long!"),
  equipment: Yup.string().min(2, "Choose the equipments you have").defined(),
  interests: Yup.string().min(2, "Too Short!").max(500, "Too Long!"),
});

const _initialValues = {
  fname: "",
  lname: "",
  bio: "",
  age: 18,
  experience: "",
  desc: "",
  area: "",
  interests: "",
  equipment: "",
};

function ProfileForm({ initialValues = _initialValues }) {
  const [selectedImage, setSelectedImage] = useState({
    picturePath: initialValues.profilePic ?? "/assets/defaultpp.jpg",
    pictureFile: null,
  });

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate: updateProfile, isLoading: isUpdatingProfile } =
    useUpdateProfile();

  useEffect(() => {
    // Only try to show the modal if both the profile object and bootstrapModal are set
    if (user && !user.emailVerified) {
      onOpen();
    }
  }, [user]);

  const handleClose = () => {
    onClose();
    logout();
    navigate("/login");
  };

  const submitHandler = async (values) => {
    console.log("Here", { selectedImage });
    if (!selectedImage) {
      console.log("here");
      toast.error("Please set your profile picture");
      return;
    }

    const formData = new FormData();
    if (selectedImage.pictureFile) {
      formData.append("file", selectedImage.pictureFile, {
        contentType: "image/jpeg",
        name: "image",
        filename: "profile-pic.jpg",
      });
    }

    formData.append("desc", values.desc);
    formData.append("equipment", values.equipment);
    formData.append("age", values.age);
    formData.append("bio", values.bio);
    formData.append("interests", values.interests);
    formData.append("area", values.area);
    formData.append("experience", values.experience);
    formData.append("fname", values.fname);
    formData.append("gender", values.gender);
    formData.append("lname", values.lname);

    updateProfile(formData, {
      onSuccess: () => {
        navigate("/app/my-profile");
      },
      onError: (error) => {
        toast.error(error.response.data.error);
      },
    });
  };

  const handleImageChange = async (e) => {
    if (e.target.files[0]) {
      setSelectedImage({
        pictureFile: e.target.files[0],
        picturePath: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2 className="title1">Let's set up your profile!</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={createProfileSchema}
          onSubmit={submitHandler}
        >
          {({ errors, values }) => (
            <Form>
              <div
                className="profile-pic-container"
                onClick={() =>
                  document.getElementById("profile-pic-input").click()
                }
              >
                <img
                  className="profile-pic"
                  src={
                    selectedImage.picturePath
                      ? selectedImage.picturePath
                      : "/assets/defaultpp.jpg"
                  }
                  alt=""
                />
                <input
                  type="file"
                  id="profile-pic-input"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <div className="overlay-text">Add a photo</div>
              </div>
              <div className="username1"></div>
              <div className="desc">
                Share information about you so that fellow campers can get to
                know you!
              </div>
              <div className="input-icon">
                <Person className="icon" />
                <Field
                  className="input-box"
                  name="bio"
                  type="text"
                  placeholder="Bio"
                />
              </div>

              <div className="box1">
                <div className="input-icon">
                  <Field
                    name="fname"
                    className="input-box"
                    type="text"
                    placeholder="First name"
                  />
                </div>

                <div className="input-icon">
                  <Field
                    name="lname"
                    className="input-box"
                    type="text"
                    placeholder="Last name"
                  />
                </div>
              </div>
              <div className="box1">
                <div className="input-icon">
                  <Person className="icon" />
                  <Field
                    name="age"
                    className="input-box"
                    type="age"
                    placeholder="Age"
                  />
                </div>

                <div className="input-icon">
                  <CalendarMonthIcon className="icon" />
                  <Field as="select" name="experience" className="input-box">
                    <option value="" disabled defaultValue="beginner">
                      Experience
                    </option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </Field>
                </div>

                <div className="input-icon">
                  <Man className="icon" />
                  <Woman className="icon" />
                  <Field as="select" name="gender" className="input-box">
                    <option value="" disabled defaultValue="Not specified">
                      Gender
                    </option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </Field>
                </div>
              </div>
              <div className="input-icon">
                <HttpsIcon className="icon" />
                <Field
                  name="area"
                  className="input-box"
                  minLength="8"
                  type="text"
                  placeholder="Where do you live?"
                />
              </div>
              <div className="input-icon">
                <Person className="icon" />
                <Field
                  name="interests"
                  className="input-box"
                  type="text"
                  placeholder="Interests"
                />
              </div>
              <div className="input-icon">
                <EmailIcon className="icon" />
                <Field
                  as="select"
                  name="equipment"
                  className="input-box"
                  selected="backpack"
                >
                  <option value="" disabled>
                    Equipment
                  </option>
                  <option value="tent">Tent</option>
                  <option value="backpack">Backpack</option>
                  <option value="campstove">Camp Stove</option>
                </Field>
              </div>

              <div className="textarea-container">
                <Field
                  as="textarea"
                  name="desc"
                  rows="4"
                  cols="50"
                  placeholder="Describe yourself for other campers. You can mention your past experiences, favourite campsites and more..."
                />
                <p
                  style={{
                    color: values.desc.length >= 500 ? "red" : "black",
                  }}
                >
                  {values.desc.length}/500
                </p>
              </div>
              {JSON.stringify({ errors })}
              <button
                className="update-btn submit-btn"
                type="submit"
                disabled={isUpdatingProfile}
              >
                Edit Profile
              </button>
            </Form>
          )}
        </Formik>
        <div className="or-section">Set up your profile later?</div>
        <div className="skip-container">
          <button className="skip-btn">Skip for now</button>
        </div>
      </div>
      <AppModal
        onClose={handleClose}
        isOpen={isOpen}
        body="Your email is not verified. Please check your email to verify your account."
        title="Email Verification"
      />
    </div>
  );
}

export default ProfileForm;
