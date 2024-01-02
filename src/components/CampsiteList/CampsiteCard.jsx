import { Link } from "react-router-dom";
import { getImageURL } from "../../../utils/getImageURL.js";
import CampsitePictureCarousel from "./CampsitePictureCarousel.jsx";
import { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

const CampsiteCard = ({ campsite }) => {
  const {
    _id,
    name,
    location,
    mainImg,
    desc,
    category,
    security,
    images,
    amenities,
  } = campsite;




const [currentSlide, setCurrentSlide] = useState(0);

const nextSlide = () => {
  setCurrentSlide((prev) => (prev + 1) % images.length);
};

const prevSlide = () => {
  setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
};
  return (
    <Box m={2}>
      <Card sx={{width:"1000px"}}>
       
 <div className="carousel">
          <div className="carousel-slides">
            {images.map((image, index) => (
              <div
                className={index === currentSlide ? "slide active" : "slide"}
                key={index}
              >
                <img
                  src={getImageURL(image)}
                  alt=""
                />
              </div>
            ))}
          </div>
          <button className="carousel-control prev" onClick={prevSlide}>
            &#10094;
          </button>
          <button className="carousel-control next" onClick={nextSlide}>
            &#10095;
          </button>
        </div>        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {name}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {location}
          </Typography>
          <Typography variant="body1" color="text.secondary" style={{width:"60vw", marginTop:"20px", marginBottom:"20px", textAlign:"justify"}}>
            {desc}
          </Typography>
          <div style={{display:"table-row"}}>
          <Chip label={`Category: ${category}`} variant="outlined" style={{marginRight:"20px"}} />
          <Chip label={`Security: ${security ? "Yes" : "No"}`} style={{marginRight:"20px"}} variant="outlined" />
          <Chip label={`Amenities: ${amenities}`} variant="outlined"style={{marginRight:"120px"}} />

          <Button
            component={Link}
            sx={ {marginRight:"60px !important"}}
            to={`/campsite/${_id}`}
            variant="contained"
            color="primary"
            startIcon={<InfoIcon sx={{color:"white !important", marginRight:"20px"}} />}
          >
            Edit
          </Button>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CampsiteCard;
