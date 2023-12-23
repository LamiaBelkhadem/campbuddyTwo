import { Check } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  FormControlLabel,
  Input,
  InputLabel,
  Radio,
  RadioGroup,
  Stack,
  TextareaAutosize,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getImageURL } from "../../../utils/getImageURL.js";
import { useUploadCampsiteImage } from "../../hooks/api/campsites/useUploadCampsiteImage.jsx";
import { campsiteSchema } from "../../lib/api/campsites/validation.js";
import { ImageUpload } from "./ImageUpload.jsx";

const initialValues = {
  name: "",
  description: "",
  category: "",
  security: true,
  desc: "",
  images: [],
  amenities: [],
  location: "",
};

export const CampsiteForm = ({ campsite, mutate, isLoading }) => {
  const [mainImg, setMainImg] = useState(campsite?.mainImg ?? "bnimtir.jpg");
  const [images, setImages] = useState(
    campsite?.images ?? initialValues.images
  );
  const navigate = useNavigate();
  const [amenity, setAmenity] = useState("");
  const { mutateAsync: uploadImage, isPending } = useUploadCampsiteImage();

  const onUpload = async (uploadedFile) => {
    const formdata = new FormData();
    formdata.append("file", uploadedFile);

    const { file } = await uploadImage(formdata);
    return file;
  };

  const onSubmit = (values) => {
    console.log(values);
    mutate(
      {
        ...values,
        images,
        mainImg,
      },
      {
        onSuccess: () => {
          toast.success("Operation was  successful");
          setTimeout(() => {
            navigate("/app/admin");
          }, 2000);
        },
        onError: (error) => {
          toast.error(error.response.data.error);
        },
      }
    );
  };

  return (
    <div
      className="campsite-form"
      style={{
        backgroundColor: "#e8e8e8",
        borderRadius: "5px",
        height: "1350px",
        margin: 100,
        padding: "50px",
      }}
    >
      <Formik
        initialValues={{
          ...initialValues,
          campsite,
        }}
        validationSchema={campsiteSchema}
        onSubmit={onSubmit}
      >
        {({ errors, values, setFieldValue }) => (
          <Form style={{}}>
            <ImageUpload
              mainImg={getImageURL(mainImg)}
              setImages={setImages}
              images={images.map((i) => getImageURL(i))}
              setMainImg={setMainImg}
              onUpload={onUpload}
            />
            <Stack direction="row" columnGap={8} mt={7}>
              <Box mb={4} sx={{ flex: 1 }}>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Field
                  as={Input}
                  fullWidth
                  name={"name"}
                  label={"Name"}
                  id={"name"}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <InputLabel htmlFor="location">Location</InputLabel>
                <Field
                  as={Input}
                  fullWidth
                  name={"location"}
                  label={"Location"}
                  id={"location"}
                />
              </Box>
            </Stack>
            <Box>
              <InputLabel htmlFor="desc">Description</InputLabel>
              <Field
                as={TextareaAutosize}
                name={"desc"}
                label={"Description"}
                minRows={6}
              />
            </Box>

            <RadioGroup row={true} name="security">
              <FormControlLabel
                control={<Radio />}
                value={true}
                label={"Safe"}
              />
              <FormControlLabel
                id="female-only"
                control={<Radio />}
                value={false}
                label={"Not safe"}
              />
            </RadioGroup>

            <Box sx={{ mt: 5 }}>
              <InputLabel htmlFor="category">Category</InputLabel>
              <Field
                as={Input}
                fullWidth
                name={"category"}
                label={"Category"}
                id={"category"}
              />
            </Box>

            <Box sx={{ mt: 5 }}>
              <InputLabel htmlFor="amenities">Amenities</InputLabel>
              <Field
                as={Input}
                fullWidth
                name={"amenities"}
                label={"Amenities"}
                value={amenity}
                onChange={({ target }) => setAmenity(target.value)}
                onKeyDown={({ key }) => {
                  if (key === "Enter" && (amenity != "" || amenity !== "\n")) {
                    setFieldValue(
                      "amenities",
                      values.amenities.concat(amenity)
                    );
                    setAmenity("");
                  }
                }}
                id={"amenities"}
              />
              <Stack
                direction="row"
                flexWrap={"wrap"}
                columnGap={2}
                sx={{ marginTop: 3 }}
              >
                {values.amenities.map((a, i) => (
                  <Chip label={a} key={i} />
                ))}
              </Stack>
            </Box>

            <Box
              sx={{
                textAlign: "center",
                mt: 5,
                backgroundColor: "#ff6a85",
                height: "40px",
                marginBottom: "50px",
              }}
            >
              <Button
                type="submit"
                startIcon={<Check />}
                disabled={isLoading}
                sx={{ color: "white !important", fontSize: "15px" }}
              >
                Create Campsite
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
};
