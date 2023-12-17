import { Link } from "react-router-dom";

import CampsitePictureCarousel from "./CampsitePictureCarousel.jsx";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

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

  return (
    <Card>
      <CardMedia component={"img"} height={200} image={mainImg} alt={name} />
      <CampsitePictureCarousel imgs={images} />
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Security: {security ? "Yes" : "No"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Amenities: {amenities}
        </Typography>
        <Button
          component={Link}
          to={`/campsite/${_id}`}
          variant="contained"
          color="primary"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default CampsiteCard;
