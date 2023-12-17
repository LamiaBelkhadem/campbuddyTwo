import AdjustIcon from "@mui/icons-material/Adjust";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import DateRangeIcon from "@mui/icons-material/DateRange";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import Diversity2TwoToneIcon from "@mui/icons-material/Diversity2TwoTone";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PetsIcon from "@mui/icons-material/Pets";
import TitleIcon from "@mui/icons-material/Title";
import WcIcon from "@mui/icons-material/Wc";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextareaAutosize,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/common/footer";
import Navbar from "../../components/navbar/Navbar";
import "./create-lobby.css";
import { useGetAllCampsites } from "../../hooks/api/campsites/useGetAllCampsites.jsx";
import AppModal from "../../components/common/Modal/index.jsx";
import useDisclosure from "../../hooks/useDisclosure.jsx";
import { useCreateLobby } from "../../hooks/api/lobbies/useCreateLobby.jsx";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { createLobbySchema } from "../../lib/api/lobbies/validation.js";
import { equipmentList } from "../../lib/constants.js";

const initialValues = {
  name: "",
  start: "",
  end: "",
  time: "",
  maximumParticipants: 5,
  campsite: "asdfasdf",
  desc: "",
  age: "Adults",
  experience: "",
  gender: "All",
  kids: false,
  pets: false,
  ambiance: "",
  food: "",
  transport: "",
  equipmentNeeded: [],
  equipmentProvided: [],
};

export default function CreateLobby() {
  const { isOpen, onClose } = useDisclosure();
  const { data: campsites, isLoading } = useGetAllCampsites();
  const { mutate: createLobby, isPending } = useCreateLobby();
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate("/app");
  };

  const handleSubmit = async (values) => {
    createLobby(values, {
      onError: () => {
        toast.error("Error creating lobby");
      },
      onSuccess: () => {
        toast.success("Lobby created successfully");
        navigate("/app");
      },
    });
  };

  return (
    <div className="create-lobby-page">
      <Navbar />
      <div className="create-lobby-container">
        <div className="create-lobby-box">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={createLobbySchema}
          >
            {({ values, errors }) => (
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Stack>
                  <h2 className="title1">
                    <Diversity2TwoToneIcon className="create-lobby-icon" />
                    Create a New Lobby
                  </h2>
                  <div className="username1"></div>
                  <div className="desc">
                    Create your lobby and add your preferences.
                  </div>
                  <h5>Lobby Details:</h5>

                  <Field
                    as={Input}
                    InputProps={{
                      startAdornment: <TitleIcon className="icon" />,
                    }}
                    name={"name"}
                    className="input-lobby-box"
                    type="text"
                    placeholder="Lobby Title"
                  />
                  <Stack
                    direction={"row"}
                    sx={{
                      width: "100%",
                      justifyContent: "space-between",
                      columnGap: "10px",
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <InputLabel htmlFor={"start"}>Start date</InputLabel>
                      <Field
                        sx={{ width: "100%" }}
                        as={Input}
                        InputProps={{
                          startAdornment: <DateRangeIcon className="icon" />,
                        }}
                        className="input-lobby-box"
                        name={"start"}
                        type="date"
                        placeholder="Start Date"
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <InputLabel htmlFor={"end"}>Time</InputLabel>
                      <Field
                        InputProps={{
                          startAdornment: <DateRangeIcon className="icon" />,
                        }}
                        sx={{ width: "100%" }}
                        as={Input}
                        name={"time"}
                        className="input-lobby-box"
                        type="time"
                        placeholder="Time"
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <InputLabel htmlFor={"end"}>End Date</InputLabel>
                      <Field
                        sx={{ width: "100%" }}
                        InputProps={{
                          startAdornment: <DateRangeIcon className="icon" />,
                        }}
                        as={Input}
                        name={"end"}
                        className="input-lobby-box"
                        type="date"
                        placeholder="End Date"
                      />
                    </Box>
                  </Stack>
                </Stack>

                <InputLabel htmlFor={"campsite"}>
                  Number of participants
                </InputLabel>
                <Field
                  InputProps={{
                    startAdornment: <PeopleAltIcon className="icon" />,
                  }}
                  as={Input}
                  type="number"
                  placeholder="Maximum number of Participants"
                  name={"maximumParticipants"}
                />
                <Box sx={{ width: "100%", height: "30px" }} />
                <InputLabel htmlFor={"campsite"}>Select campsites</InputLabel>
                <Field
                  as={Select}
                  sx={{ height: 40 }}
                  InputProps={{
                    startAdornment: <LocationOnIcon className="icon" />,
                  }}
                  label={"Select Campsite"}
                  name={"campsite"}
                  defaultValue={""}
                >
                  <MenuItem value="" disabled>
                    Campsite
                  </MenuItem>
                  {campsites?.map((campsite) => (
                    <MenuItem key={campsite.id} value={campsite.id}>
                      {campsite.name}
                    </MenuItem>
                  ))}
                </Field>
                <div className="textarea-container">
                  <Field
                    as={TextareaAutosize}
                    sx={{ minHeight: "300px", width: "100%" }}
                    minRows={4}
                    name={"desc"}
                    className="input-lobby-box"
                    placeholder="Describe the camping trip. You can describe the campsite, suggest activities or share the weather forecast of the trip days."
                  />
                </div>
                <div className="separator-container">
                  <div className="separator" />
                </div>
                <h5>Lobby Preferences:</h5>

                <Box sx={{ width: "100%" }}>
                  <InputLabel htmlFor={"age"}>Select Age Group</InputLabel>
                  <Field
                    InputProps={{
                      startAdornment: <AdjustIcon className="icon" />,
                    }}
                    as={Select}
                    name={"age"}
                    defaultValue={""}
                    sx={{ height: 40, width: "100%" }}
                    label={"Select Age Group"}
                  >
                    <MenuItem value="Young Adults">Young Adults</MenuItem>
                    <MenuItem value="Adults">Adults</MenuItem>
                    <MenuItem value="Seniors">Seniors</MenuItem>
                    <MenuItem value="All">All</MenuItem>
                  </Field>
                </Box>
                <Box sx={{ width: "100%", height: "30px" }} />
                <Box sx={{ width: "100%" }}>
                  <InputLabel htmlFor={"experience"}>
                    Select required experience
                  </InputLabel>
                  <Field
                    sx={{ height: 40, width: "100%" }}
                    InputProps={{
                      startAdornment: <AdjustIcon className="icon" />,
                    }}
                    as={Select}
                    className="input-lobby-box"
                    defaultValue={""}
                    name={"experience"}
                    label={"Select required experience"}
                  >
                    <MenuItem value="Beginner">Beginner</MenuItem>
                    <MenuItem value="Intermediate">Intermediate</MenuItem>
                    <MenuItem value="Advanced">Advanced</MenuItem>
                  </Field>
                </Box>
                <div className="input-lobby-icon">
                  <WcIcon className="icon" />
                  <div className="input-lobby-box-radio">
                    <div className="input-label">Gender:</div>
                    <Field as={RadioGroup} row={true} name="gender">
                      <FormControlLabel
                        control={<Radio />}
                        value={"Male-Only"}
                        label={"Male only"}
                      />
                      <FormControlLabel
                        id="female-only"
                        control={<Radio />}
                        value="Female-Only"
                        label={"Female only"}
                      />
                      <FormControlLabel
                        id="all"
                        control={<Radio />}
                        value="All"
                        label={"All"}
                      />
                    </Field>
                  </div>
                </div>

                <div className="input-lobby-icon">
                  <ChildCareIcon className="icon" />
                  <div className="input-lobby-box-radio">
                    <div className="input-label">Kid-Friendly:</div>
                    <Field as={RadioGroup} name={"kids"} row={true}>
                      <FormControlLabel
                        control={<Radio />}
                        label={"Yes"}
                        value={true}
                      />
                      <FormControlLabel
                        control={<Radio />}
                        label={"No"}
                        value={false}
                      />
                    </Field>
                  </div>
                </div>
                <div className="input-lobby-icon">
                  <PetsIcon className="icon" />
                  <div className="input-lobby-box-radio">
                    <div className="input-label">Pet-Friendly:</div>
                    <Field row={true} as={RadioGroup} name="pets">
                      <FormControlLabel
                        control={<Radio />}
                        label={"Yes"}
                        value={true}
                      />
                      <FormControlLabel
                        control={<Radio />}
                        label={"No"}
                        value={false}
                      />
                    </Field>
                  </div>
                </div>
                <Box sx={{ width: "100%" }} alignContent={"flex-start"}>
                  <InputLabel htmlFor={"ambiance"} textAlign={"left"}>
                    Select Ambiance
                  </InputLabel>
                  <Field
                    InputProps={{
                      startAdornment: <AdjustIcon className="icon" />,
                    }}
                    name={"ambiance"}
                    as={Select}
                    className="input-lobby-box"
                    label={"Select Ambiance"}
                    defaultValue={""}
                    sx={{ height: 40, width: "100%" }}
                  >
                    <MenuItem value="relaxed">Relaxed</MenuItem>
                    <MenuItem value="adventurous">Adventurous</MenuItem>
                    <MenuItem value="family-friendly">Family-Friendly</MenuItem>
                    <MenuItem value="party">Party</MenuItem>
                    <MenuItem value="quiet">Quiet</MenuItem>
                    <MenuItem value="nature-immersive">
                      Nature-Immersive
                    </MenuItem>
                    <MenuItem value="luxurious">Luxurious</MenuItem>
                    <MenuItem value="rustic">Rustic</MenuItem>
                    <MenuItem value="spiritual">Spiritual</MenuItem>
                  </Field>
                </Box>
                <div className="separator-container">
                  <div className="separator" />
                </div>
                <h5>Lobby Requirements:</h5>
                <div className="input-lobby-icon">
                  <FastfoodIcon className="icon" />
                  <div className="input-lobby-box-radio">
                    <div className="input-label">Food and Drinks:</div>
                    <Field row={true} as={RadioGroup} name="food">
                      <FormControlLabel
                        control={<Radio />}
                        label={"Required"}
                        value={true}
                      />
                      <FormControlLabel
                        control={<Radio />}
                        label={"Provided"}
                        value={false}
                      />
                    </Field>
                  </div>
                </div>

                <div className="input-lobby-icon">
                  <DirectionsBusIcon className="icon" />
                  <div className="input-lobby-box-radio">
                    <div className="input-label">Transportation:</div>
                    <Field
                      row={true}
                      as={RadioGroup}
                      id="transport-not-provided"
                      name="transport"
                    >
                      <FormControlLabel
                        control={<Radio />}
                        label={"Not provided"}
                        value={false}
                      />
                      <FormControlLabel
                        control={<Radio />}
                        label={"Provided"}
                        value={true}
                      />
                    </Field>
                  </div>
                </div>

                <Stack
                  className="equipments"
                  sx={{ width: "100%", columnGap: 20 }}
                  direction="row"
                >
                  <FormControl sx={{ m: 1, width: "100%" }}>
                    <InputLabel id="equipment-needed">
                      Equipment needed
                    </InputLabel>
                    <Field
                      as={Select}
                      id="equipment-needed"
                      multiple
                      name={"equipmentNeeded"}
                      input={<OutlinedInput label="Equipement" />}
                      renderValue={(selected) => selected.join(", ")}
                      // MenuProps={MenuProps}
                    >
                      {equipmentList.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox
                            checked={values.equipmentNeeded.indexOf(name) > -1}
                          />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>

                  <FormControl sx={{ m: 1, width: "100%" }}>
                    <InputLabel id="equipment-provided">
                      Equipment provided
                    </InputLabel>
                    <Field
                      as={Select}
                      id={"equipment-provided"}
                      name={"equipmentProvided"}
                      multiple
                      input={<OutlinedInput label="Equipement" />}
                      renderValue={(selected) => selected.join(", ")}
                      // MenuProps={MenuProps}
                    >
                      {equipmentList.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox
                            checked={
                              values.equipmentProvided.indexOf(name) > -1
                            }
                          />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </Stack>

                {JSON.stringify(errors)}
                <button className="submit-lobby-btn" type="submit">
                  Create Lobby
                </button>
              </Form>
            )}
          </Formik>
          <div className="or-section">Changed your Mind?</div>
          <div className="skip-container">
            <button className="skip-btn">Cancel</button>
          </div>
        </div>
        <AppModal
          title={"Lobby Created!"}
          body={
            "You have successfully created a new lobby. Other campers can now see it and request to join."
          }
          isOpen={isOpen}
          onClose={handleClose}
        />
      </div>
      <Footer />
    </div>
  );
}
