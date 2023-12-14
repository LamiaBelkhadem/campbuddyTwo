import { Person } from "@mui/icons-material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import { Modal } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { updateUser } from "../../lib/api/user";
import "./registerProfileWin.css";

function RegisterProfileWin() {
  const bio = useRef();
  const age = useRef();
  const experience = useRef(null);
  const Area = useRef();
  const equipment = useRef();
  const desc = useRef();
  const interests = useRef();
  const navigate = useNavigate();

  const { user } = useAuth();

  const [text, setText] = useState("");

  const [profilePic, setProfilePic] = useState("me.png");
  const modalRef = useRef(null); // Ref for the modal element
  const [bootstrapModal, setBootstrapModal] = useState(null);

  useEffect(() => {
    // Check if modalRef.current is not null before trying to create a new Modal instance
    if (modalRef.current) {
      const bsModal = new Modal(modalRef.current);
      setBootstrapModal(bsModal);
    }
  }, []);

  useEffect(() => {
    // Only try to show the modal if both the user object and bootstrapModal are set
    if (user && !user.emailVerified && bootstrapModal) {
      bootstrapModal.show();
    }
  }, [user, bootstrapModal]);
  const handleClose = () => {
    bootstrapModal.hide();
    localStorage.removeItem("user");

    // Dispatch a logout action
    dispatch({ type: "LOGOUT" });
    console.log("user logged out");
    navigate("/login");
  };
  const profileHandler = async (e) => {
    try {
      e.preventDefault();

      await updateUser(user._id, {
        area: Area.current.value,
        profilepic: profilePic,
        desc: desc.current.value,
        age: age.current.value,
        experience: experience.current.value,
        interests: interests.current.value,
        bio: bio.current.value,
        profile: true,
      });
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  const [selectedImage, setSelectedImage] = useState("/assets/defaultpp.jpg");

  const handleImageChange = async (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        console.log(e.target.result);
      };

      reader.readAsDataURL(e.target.files[0]);
      console.log(e.target.files[0]);

      // Create a FormData object and append the file to it
      const formData = new FormData();
      formData.append("file", e.target.files[0]);

      try {
        const response = await axios.post(
          "http://localhost:8080/api/upload",
          formData,
        );
        console.log("inside if");
        const fileName = e.target.files[0].name;

        console.log(PF);
        setProfilePic(PF + fileName);
      } catch (err) {
        console.error("Error uploading image:", err);
      }
    }
  };

  function handleTextareaChangeBio(e) {
    const newValue = e.target.value;
    if (newValue.length <= 500) {
      setText(newValue);
    }
  }

  function handleTextareaChangeDesc(e) {
    const newValue = e.target.value;
    if (newValue.length <= 500) {
      setText(newValue);
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-box">
        <form onSubmit={profileHandler}>
          <h2 className="title1">Let's set up your profile!</h2>
          <div
            className="profile-pic-container"
            onClick={() => document.getElementById("profile-pic-input").click()}
          >
            <img
              className="profile-pic"
              src={selectedImage ? selectedImage : "/assets/defaultpp.jpg"}
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
            Share information about you so that fellow campers can get to know
            you!
          </div>
          <div className="input-icon">
            <Person className="icon" />
            <input
              className="input-box"
              type="text"
              placeholder="Bio"
              ref={bio}
            />
          </div>
          <div className="box1">
            <div className="input-icon">
              <Person className="icon" />
              <input
                className="input-box"
                type="age"
                placeholder="Age"
                ref={age}
              />
            </div>

            <div className="input-icon">
              <CalendarMonthIcon className="icon" />
              <select className="input-box" ref={experience}>
                <option value="" disabled selected>
                  Experience
                </option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          <div className="input-icon">
            <HttpsIcon className="icon" />
            <input
              className="input-box"
              minLength="8"
              type="text"
              ref={Area}
              placeholder="Where do you live?"
            />
          </div>
          <div className="input-icon">
            <Person className="icon" />
            <input
              className="input-box"
              type="text"
              ref={interests}
              placeholder="Interests"
            />
          </div>
          <div className="input-icon">
            <EmailIcon className="icon" />
            <select className="input-box" ref={equipment}>
              <option value="" disabled selected>
                Equipment
              </option>
              <option value="tent">Tent</option>
              <option value="backpack">Backpack</option>
              <option value="campstove">Camp Stove</option>
            </select>
          </div>

          <div className="textarea-container">
            <textarea
              value={text}
              onChange={handleTextareaChangeDesc}
              rows="4"
              cols="50"
              ref={desc}
              placeholder="Describe yourself for other campers. You can mention your past experiences, favourite campsites and more..."
            ></textarea>
            <p style={{ color: text.length >= 500 ? "red" : "black" }}>
              {text.length}/500
            </p>
          </div>
          <button className="update-btn" type="submit">
            Create Profile
          </button>
        </form>
        <div className="or-section">Set up your profile later?</div>
        <div className="skip-container">
          <button className="skip-btn">Skip for now</button>
        </div>
      </div>
      <Modal
        className="modal fade"
        tabIndex="-1"
        id="verificationModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Email Verification</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              Your email is not verified. Please check your email to verify your
              account.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default RegisterProfileWin;
