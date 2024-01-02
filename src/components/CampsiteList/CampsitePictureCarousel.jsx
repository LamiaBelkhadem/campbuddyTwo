import React, { useState } from "react";
import { CarouselProvider, Slide, Slider } from "pure-react-carousel";
import { IconButton } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { getImageURL } from "../../../utils/getImageURL";

const CampsitePictureCarousel = ({ imgs }) => {
  console.log(getImageURL(imgs[0]), { imgs });
  const [index, setIndex] = useState(0);
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={125}
      totalSlides={imgs.length}
      currentSlide={index}
      isPlaying
      style={{  height: 500, background: "black !important" }}
    >
      <Slider style={{height:"100%",width:"100%"}}>
        {imgs.map((img, index) => (
          <Slide key={img} index={index}>
            <img style={{ width:"100%",  }} src={getImageURL(img)} alt={`Campsite ${index + 1}`} />
          </Slide>
        ))}
      </Slider>
      <IconButton
        onClick={() => {
          setIndex(index + imgs.length - 1) % imgs.length;
        }}
      >
        <NavigateBefore />
      </IconButton>
      <IconButton onClick={() => setIndex((index + 1) % imgs.length)}>
        <NavigateNext />
      </IconButton>
    </CarouselProvider>
  );
};

export default CampsitePictureCarousel;
