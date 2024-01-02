import React from "react";
import { CarouselProvider, Slide, Slider, ButtonBack, ButtonNext } from "pure-react-carousel";
import { IconButton } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { getImageURL } from "../../../utils/getImageURL.js";

const CampsitePictureCarousel = ({ imgs }) => {
  console.log("images", imgs)
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={125}
      totalSlides={imgs.length}
    >
      <Slider>
        {imgs.map((img, index) => (
          <Slide key={index} index={index}>
            <img src={getImageURL(img)} alt={`Campsite ${index + 1}`} style={{ width: '100%', objectFit: 'cover', maxHeight: '100px' }} />
          </Slide>
        ))}
      </Slider>
      <ButtonBack>
        <IconButton>
          <NavigateBefore />
        </IconButton>
      </ButtonBack>
      <ButtonNext>
        <IconButton>
          <NavigateNext />
        </IconButton>
      </ButtonNext>
    </CarouselProvider>
  );
};

export default CampsitePictureCarousel;
