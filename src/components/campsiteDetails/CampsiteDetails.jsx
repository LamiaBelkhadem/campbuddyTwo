import "./campsiteDetails.css";
import { useEffect, useState } from "react";
import { getImageURL } from "../../../utils/getImageURL.js";
import { useAuth } from "../../hooks/useAuth";
import CampsiteRating from "../campsiteRating/CampsiteRating";
import { useAddCampsiteToFavourite } from "../../hooks/api/campsites/useAddCampsiteToFavourite.jsx";
import { useRemoveCampsiteFromFavorites } from "../../hooks/api/campsites/useRemoveCampsiteFromFavorites.jsx";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function CampsiteDetails({ campsite }) {
  const { user, refetchUser } = useAuth();
  const [isFavourite, setIsFavourite] = useState(false);
  const { mutateAsync: addCampsiteToFavorite } = useAddCampsiteToFavourite(
    campsite._id
  );

  const { mutateAsync: removeCampsiteFromFavorite } =
    useRemoveCampsiteFromFavorites(campsite._id);

  useEffect(() => {
    setIsFavourite(user.profile.favorites.includes(campsite._id));
  }, [campsite._id, user.profile.favorites]);

  const images = campsite.images
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
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((acc, review) => acc + (review.rate || 0), 0);

    return total / reviews.length;
  };
  const averageRating = calculateAverageRating(campsite.reviews);

  const categoryTags = campsite.category.split(",").map((tag) => tag.trim());
  const amenitiesTags = campsite?.amenities
    ? campsite.amenities.map((tag) => tag.trim())
    : [];

  const RatingStars = ({ rating }) => {
    // If rating is not available, return "N/A"
    if (rating === 0) {
      return <span>N/A</span>;
    }

    // Convert the rating to a number and round it to the nearest whole number if necessary
    const ratingNumber = Number(rating);
    console.log("ratingNumber:", ratingNumber);
    let stars = [];

    // Loop from 1 to 5 and push either a filled star for ratings or an empty star
    for (let i = 1; i <= 5; i++) {
      if (i <= ratingNumber) {
        stars.push(
          <i key={i} className="fa fa-star star-filled" aria-hidden="true"></i>
        ); // Filled star
      } else {
        stars.push(
          <i key={i} className="fa fa-star-o star-empty" aria-hidden="true"></i>
        ); // Empty star
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
            <div className="campsite-detail">{campsite.location}</div>
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
              <RatingStars rating={averageRating} />
            </div>
          </div>
          {campsite.amenities ?? (
            <div className="campsite-detail-row">
              <div className="campsite-detail-type">Amenities:</div>
              <div className="campsite-detail">
                {amenitiesTags.map((tag, index) => (
                  <span key={index} className="category-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="campsite-detail-row">
            <div className="campsite-detail-type">Safety:</div>
            <div className="campsite-detail">
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
