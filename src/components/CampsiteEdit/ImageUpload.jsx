import {
  Box,
  Grid,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Delete } from "@mui/icons-material";
import { getImageURL } from "../../../utils/getImageURL.js";

export const ImageUpload = ({
  images,
  mainImg,
  setMainImg,
  setImages,
  onUpload,
}) => {
  const theme = useTheme();

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = await onUpload(acceptedFiles[0]);

    setMainImg(file);

    const remainingImages = acceptedFiles.slice(1);
    const files = [];
    for (const image of remainingImages) {
      const file = await onUpload(image);
      files.push(file);
      setImages(files);
    }
  }, []);

  const handleRemoveMainImage = () => {
    setMainImg(null);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const setAsMainImg = (img) => {
    setImages(images.filter((i) => i !== img).concat(mainImg));
    setMainImg(img);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box
      style={{
        marginTop: theme.spacing(2),
        width: "100%",
      }}
    >
      <Grid container spacing={3} sx={{ minHeight: 400 }}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Upload Images
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Paper
            {...getRootProps({
              style: {
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: theme.spacing(3),
                borderWidth: 2,
                borderRadius: 2,
                borderColor: theme.palette.divider,
                borderStyle: "dashed",
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.secondary,
                outline: "none",
                transition: "border .24s ease-in-out",
              },
            })}
            elevation={isDragActive ? 3 : 1}
          >
            <input {...getInputProps()} />
            <Typography variant="body2" color="textSecondary">
              Drag and drop an image here or click to select files.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={5}>
          {mainImg && (
            <Box sx={{ height: 400, overflow: "hidden" }}>
            <Typography variant="h6" gutterBottom>
            Main Campsite Image:
          </Typography>
              <img
                src={mainImg}
                alt="Main"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems:"center",
                  justifyContent:"center",
                  width: "100%",
                }}
              />
              <IconButton color="secondary" onClick={handleRemoveMainImage}>
                <Delete />
              </IconButton>
            </Box>
          )}
        </Grid>

        <Grid
          item
          xs={7}
          style={{
            marginTop: theme.spacing(2),
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          {images.length > 0 &&
            images.map((img, index) => (
              <div
                key={index}
                onClick={() => setAsMainImg(img)}
                style={{
                  cursor: "pointer",
                }}
              >
                <img
                  height={200}
                  src={img}
                  alt={`Image ${index}`}
                  style={{
                    marginTop: theme.spacing(2),
                    display: "flex",
                    flexWrap: "wrap",
                    borderColor: "black",
                    borderWidth: 2,
                    borderStyle: "solid",
                  }}
                />
                <IconButton
                  color="secondary"
                  onClick={() => handleRemoveImage(index)}
                >
                  <Delete />
                </IconButton>
              </div>
            ))}
        </Grid>
      </Grid>
    </Box>
  );
};
