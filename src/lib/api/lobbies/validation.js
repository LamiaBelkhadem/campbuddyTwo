import * as Yup from "yup";

export const createLobbySchema = Yup.object().shape({
  name: Yup.string().required("Lobby Title is required"),
  start: Yup.string().required("Start Date is required"),
  end: Yup.string().required("End Date is required"),
  time: Yup.string().required("Time is required"),
  maximumParticipants: Yup.number().required(
    "Maximum number of participants is required",
  ),
  campsite: Yup.string().required("Campsite is required"),
  desc: Yup.string().required("Description is required"),
  age: Yup.string().required("Age Group is required"),
  experience: Yup.string().required("Experience is required"),
  gender: Yup.string().required(),
  kids: Yup.bool().required(),
  pets: Yup.bool().required(),
  ambiance: Yup.string().required("Ambiance is required"),
  food: Yup.bool().required(),
  transport: Yup.bool().required(),
  equipmentNeeded: Yup.array().of(Yup.string()),
  equipmentProvided: Yup.array().of(Yup.string()),
});
