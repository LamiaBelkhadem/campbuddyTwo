import { Man, Woman } from "@mui/icons-material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import InterestsIcon from '@mui/icons-material/Interests';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Box, InputLabel,Input,Stack,Chip} from "@mui/material";
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
import { getImageURL } from "../../../utils/getImageURL.js";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';


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
  interests: Yup.string().min(2, "State your interests").defined(),
});

const _initialValues = {
  fname: "",
  lname: "",
  bio: "",
  age: 18,
  experience: "",
  desc: "",
  area: "",
  twitter:"",
  instagram:"",
  facebook:"",
};

function ProfileForm({ profile }) {
  const initialValues = { ..._initialValues, ...profile };
  console.log({ initialValues });
  const [selectedImage, setSelectedImage] = useState({
    picturePath: initialValues.profilePic ?? "/assets/defaultpp.jpg",
    pictureFile: null,
  });

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen } = useDisclosure();
  const { mutate: updateProfile, isLoading: isUpdatingProfile } =
    useUpdateProfile();

  useEffect(() => {

    if (user && !user.emailVerified) {
      onOpen();
    }
  }, [user]);

  const handleClose = () => {
    logout();
    navigate("/login");
  };

  const [equipment, setEquipment] = useState('');
  const [equipmentList, setEquipmentList] = useState(
    typeof initialValues.equipment === 'string' ? initialValues.equipment.split(',') : []
  );
  const handleEquipmentKeyDown = ({ key }) => {
    if (key === "Enter" && equipment.trim() !== '') {
      event.preventDefault(); // Prevent the default form submit action

      setEquipmentList(prev => [...prev, equipment]);
      setEquipment('');
    }
  };

  const [interests, setInterest] = useState('');
  const [interestList, setInterestList] = useState( typeof initialValues.interests === 'string' ? initialValues.interests.split(',') : []);

  const handleInterestKeyDown = ({ key }, setFieldValue) => {
    if (key === "Enter" && interests.trim() !== '') {
      event.preventDefault(); // Prevent the default form submit action
  
      const newInterestList = [...interestList, interests];
      setInterestList(newInterestList);
      setInterest('');
  
      // Update Formik's state
      setFieldValue('interests', newInterestList.join(','));
      console.log('Updated interests in Formik:', newInterestList.join(','));

    }
  };

  const submitHandler = async (values) => {
    console.log("valuesL", values);
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
    formData.append("equipment", equipmentList.join(','));
    formData.append("age", values.age);
    formData.append("bio", values.bio);
    formData.append("interests", interestList.join(','));
    formData.append("area", values.area);
    formData.append("experience", values.experience);
    formData.append("fname", values.fname);
    formData.append("gender", values.gender);
    formData.append("lname", values.lname);
    formData.append("twitter", values.twitter);
    formData.append("instagram", values.instagram);
    formData.append("facebook", values.facebook);

    updateProfile(formData, {
      onSuccess: () => {
        navigate("/app/");
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
            {({ errors, values, setFieldValue }) => {
    // Log the current Formik values
    console.log('Formik values:', values);
    return(
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
                    selectedImage?.picturePath
                      ? selectedImage.picturePath
                      :getImageURL(`defaultpp.jpg`)

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
                    type="number"
                    placeholder="Age"
                  />
                </div>

                <div className="input-icon">
                  <CalendarMonthIcon className="icon" />
                                  <Field as="select" name="experience" className="input-box">
                                      <option value="beginner">Beginner</option>
                                      <option value="intermediate">Intermediate</option>
                                      <option value="advanced">Advanced</option>
                                  </Field>
                                  
                </div>

                <div className="input-icon">
                  <Man className="icon" />
                  <Woman className="icon" />
                                  <Field as="select" name="gender" className="input-box">
                                      {/* The 'value' prop is controlled by Formik's state */}
                                      <option value="M">Male</option>
                                      <option value="F">Female</option>
                                  </Field>
                </div>
              </div>
              <div className="input-icon">
                <LocationOnIcon className="icon" />
                <Field
                  name="area"
                  className="input-box"
                  minLength="8"
                  type="text"
                  placeholder="Where do you live?"
                />
              </div>

              <Box sx={{ mt: 2 , mb:3}}>
        <InputLabel htmlFor="interests">Interests</InputLabel>
        <Input
          fullWidth
          name="interests"
          placeholder="Please type your interests one at a time and hit enter"
          value={interests}
          onChange={(e) => setInterest(e.target.value)}
          onKeyDown={(e) => handleInterestKeyDown(e, setFieldValue)}
          id="interests"
          sx={{
            border: '1px solid #e0e0e0', // light grey border
            backgroundColor:'#E8E8E8',
            borderRadius: '4px', // rounded corners
            padding: '10px 12px', 
            fontSize: '0.875rem', 
            '&::placeholder': {
              color: 'grey.500',
              opacity: 1,
            },
            '&:hover': {
              borderColor: 'grey.400', 
            },
            '&:focus': {
              borderColor: 'primary.main',
              boxShadow: `0 0 0 2px rgba(25, 118, 210, 0.3)`, 
            },
          }}
        />
        <Stack
          direction="row"
          flexWrap="wrap"
          columnGap={2}
          sx={{ marginTop: 1 }}
        >
          {interestList.map((item, i) => (
            <Chip label={item} key={i} />
          ))}
        </Stack>
      </Box>

              <Box sx={{ mt: 2 , mb:2}}>
        <InputLabel htmlFor="equipment">Equipment</InputLabel>
        <Input
          fullWidth
          name="equipment"
          placeholder="Please type the equipments you own one at a time and hit enter"
          value={equipment}
          onChange={(e) => setEquipment(e.target.value)}
          onKeyDown={handleEquipmentKeyDown}
          id="equipment"
          sx={{
            border: '1px solid #e0e0e0', // light grey border
            backgroundColor:'#E8E8E8',
            borderRadius: '4px', // rounded corners
            padding: '10px 12px', // some padding inside the input
            fontSize: '0.875rem', // smaller font size
            '&::placeholder': { // styles for the placeholder
              color: 'grey.500',
              opacity: 1,
            },
            '&:hover': {
              borderColor: 'grey.400', // darker border on hover
            },
            '&:focus': {
              borderColor: 'primary.main', // primary color border on focus
              boxShadow: `0 0 0 2px rgba(25, 118, 210, 0.3)`, // optional - add a subtle shadow effect on focus
            },
          }}
        />
        <Stack
          direction="row"
          flexWrap="wrap"
          columnGap={2}
          sx={{ marginTop: 1 }}
        >
          {equipmentList.map((item, i) => (
            <Chip label={item} key={i} />
          ))}
        </Stack>
      </Box>
              <div className="textarea-container">
                <Field
                  as="textarea"
                  name="desc"
                  rows="4"
                  cols="50"
                  placeholder="Describe yourself for other campers. You can mention your past experiences, favourite campsites and more..."
                />
                <div className="character-counter">
                <p
                  style={{
                    color: values.desc.length >= 500 ? "red" : "black", 
                  }}
                >
                  {values.desc.length}/500
                </p>
                </div>


              </div>

              <div className="box1">
                <div className="input-icon">
                  <TwitterIcon className="icon" />
                  <Field
                    name="twitter"
                    className="input-box"
                    type="text"
                    placeholder="Twitter"
                  />
                </div>

                <div className="input-icon">
                  <FacebookIcon className="icon" />
                  <Field
                    name="facebook"
                    className="input-box"
                    type="text"
                    placeholder="Facebook"
                  />
                </div>
                <div className="input-icon">
                  <InstagramIcon className="icon" />
                  <Field
                    name="instagram"
                    className="input-box"
                    type="text"
                    placeholder="Instagram"
                  />
                </div>
              </div>

              {JSON.stringify(errors)}

              <button
                className="update-btn submit-btn"
                type="submit"
                disabled={isUpdatingProfile}
              >
                Update Profile
              </button>
            </Form>
          );}}
        </Formik>
        <div className="skip-container">
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
