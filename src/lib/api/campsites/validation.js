import * as Yup from "yup";

export const campsiteSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  location: Yup.string().required("Location is required"),
  category: Yup.string().required("Category is required"),
  desc: Yup.string().required("Description is required"),
  // amenities: Yup.array().of(Yup.string()).required("Amenities are required"),
  amenities: Yup.string(),
  security: Yup.boolean().required("Security is required"),
});
