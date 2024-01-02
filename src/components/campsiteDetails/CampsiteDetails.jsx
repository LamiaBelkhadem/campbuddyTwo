import "./campsiteDetails.css";
import { useEffect, useState } from "react";
import { getImageURL } from "../../../utils/getImageURL.js";
import { useAuth } from "../../hooks/useAuth";
import CampsiteRating from "../campsiteRating/CampsiteRating";
import { useAddCampsiteToFavourite } from "../../hooks/api/campsites/useAddCampsiteToFavourite.jsx";
import { useRemoveCampsiteFromFavorites } from "../../hooks/api/campsites/useRemoveCampsiteFromFavorites.jsx";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { StarBorderTwoTone } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
export default function CampsiteDetails({ campsite }) {
  const { user, refetchUser } = useAuth();
  const [isFavourite, setIsFavourite] = useState(false);
  const { mutateAsync: addCampsiteToFavorite } = useAddCampsiteToFavourite(
    campsite._id
  );

  const { mutateAsync: removeCampsiteFromFavorite } =
    useRemoveCampsiteFromFavorites(campsite._id);

  useEffect(() => {
    if (user && user.profile && user.profile.favorites) {
      setIsFavourite(user.profile.favorites.includes(campsite._id));
    }
  }, [campsite._id, user]);

  const images = campsite?.images
    ? campsite.images.map((image) => image)
    : ["default.jpg"];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews?.length === 0) return 0;
    const total = reviews?.reduce(
      (acc, review) => acc + (review?.rate || 0),
      0
    );
    return total / reviews?.length;
  };
  const averageRating = calculateAverageRating(campsite?.reviews);
  console.log("average", averageRating);
  const categoryTags = campsite.category.split(",").map((tag) => tag.trim());
  const amenitiesTags =
    campsite.amenities?.length !== undefined
      ? campsite.amenities
      : campsite?.amenities?.split(",").map((tag) => tag.trim());


  const renderStars = ({ rating }) => {
    console.log("rating", rating);
    // If rating is not available, return "N/A"
    if (rating === 0) {
      return <span>N/A</span>;
    }

    const ratingNumber = Number(rating);
    console.log("ratingNumber:", ratingNumber);
    let stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= ratingNumber) {
        stars.push(<StarIcon sx={{ color: "#ffc107 !important" }} />); // Filled star
      } else {
        stars.push(<StarBorderIcon sx={{ color: "#ffc107 !important" }} />); // Empty star
      }
    }
    return <div>{stars}</div>;
  };

  const toggleFavorite = async () => {
    if (isFavourite) {
      await removeCampsiteFromFavorite();
    } else {
      await addCampsiteToFavorite();
    }

    await refetchUser();
  };

  return (
    <div className="campsite-details">
      <div className="campsite-details-container">
        <img
          src={getImageURL(campsite.mainImg)}
          alt=""
          className="campsite-img"
        />
        <div className="campsite-details-text">
          <div className="campsite-header">
            <div className="campsite-name"> {campsite.name}</div>
            <button
              className={`favourite-btn ${isFavourite ? "active" : ""}`}
              onClick={toggleFavorite}
            >
              <i aria-hidden="true" className="heart-icon">
                {isFavourite ? (
                  <HeartBrokenIcon className="heart-icon" />
                ) : (
                  <FavoriteIcon className="heart-icon" />
                )}
              </i>
              {isFavourite ? "Remove from Favourites" : " Add to Favourites"}
            </button>
          </div>

          <div className="campsite-desc">{campsite.desc}</div>
          <div className="campsite-detail-row">
            <div className="campsite-detail-type">Location:</div>
            <div className="campsite-detail" style={{ marginTop: "2px" }}>
              {campsite.location}
            </div>
          </div>
          <div className="campsite-detail-row">
            <div className="campsite-detail-type">Category:</div>
            <div className="campsite-detail">
              {categoryTags.map((tag, index) => (
                <span key={index} className="category-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="campsite-detail-row">
            <div className="campsite-detail-type">Rating:</div>
            <div className="campsite-detail">
              {renderStars({ rating: averageRating })}
            </div>
          </div>
          {campsite.amenities&&
            <div className="campsite-detail-row">
              <div className="campsite-detail-type">Amenities:</div>
              <div className="campsite-detail">
                {amenitiesTags.map((tag, index) => (
                  <span key={index} className="amenities-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          }

          <div className="campsite-detail-row">
            <div className="campsite-detail-type">Safety:</div>
            <div className="campsite-detail" style={{ marginTop: "2px" }}>
              {campsite.security === true ? "Yes" : "No"}
            </div>
          </div>
        </div>
      </div>
      <div className="section-header"> Gallery:</div>
      <div className="camper-details-bottom">
        <div className="carousel">
          <div className="carousel-slides">
            {images.map((image, index) => (
              <div
                className={index === currentSlide ? "slide active" : "slide"}
                key={index}
              >
                <img
                  src={getImageURL(image)}
                  alt={`${campsite.name} view ${index + 1}`}
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
        </div>
      </div>
      <div className="camper-details-center">
        <CampsiteRating campsiteId={campsite._id} />
      </div>
    </div>
  );
}
