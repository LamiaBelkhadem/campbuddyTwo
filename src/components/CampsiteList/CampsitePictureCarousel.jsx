import React from "react";
import { CarouselProvider, Slide, Slider } from "pure-react-carousel";
import { IconButton } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";

const CampsitePictureCarousel = ({ imgs }) => {
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={125}
      totalSlides={3}
    >
      <Slider>
        {imgs.map((img, index) => (
          <Slide key={index} index={index}>
            <img src={img} alt={`Campsite ${index + 1}`} />
          </Slide>
        ))}
      </Slider>
      <IconButton>
        <NavigateBefore />
      </IconButton>
      <IconButton>
        <NavigateNext />
      </IconButton>
    </CarouselProvider>
  );
};

export default CampsitePictureCarousel;
