import "./campsiteDetails.css";

import axios from "axios";
import { useEffect, useState } from "react";
import CampsiteRating from "../campsiteRating/CampsiteRating";
import { useAuth } from "../../hooks/useAuth";

export default function CampsiteDetails({ details }) {
  const { user } = useAuth();
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    setIsFavourite(user.favorites.includes(details._id));
  }, [details._id, user.favorites]);

  const images = details.images
    ? details.images.map((image) => image)
    : ["default.jpg"];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };
  console.log("User favorites", user.username);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const categoryTags = details.category.split(",").map((tag) => tag.trim());
  const amenitiesTags = details.amenities.split(",").map((tag) => tag.trim());

  const renderStars = (rating) => {
    // If rating is not available, return "N/A"
    if (rating === "N/A" || rating === "0") {
      return <span>N/A</span>;
    }

    // Convert the rating to a number and round it to the nearest whole number if necessary
    const ratingNumber = Number(rating);
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

  const toggleFavourite = async () => {
    try {
      const isAlreadyFavourite = user.favorites.includes(String(details._id));

      console.log("the campsite is?", isAlreadyFavourite);
      let response;

      if (isAlreadyFavourite) {
        // If it's already a favorite, we remove it

        response = await axios.put(
          `http://localhost:8080/api/users/removeFavourites/${user._id}`,
          {
            favorites: details._id,
          }
        );
        setIsFavourite(!isFavourite);
      } else {
        // If it's not a favorite, we add it
        response = await axios.put(
          `http://localhost:8080/api/users/addFavourites/${user._id}`,
          {
            favorites: details._id,
          }
        );
        setIsFavourite(isFavourite);
      }

      // Update local state based on the response
      if (response.status === 200) {
        console.log(response);
        console.log("User favorite updated", user.favorites);
      }
    } catch (error) {
      console.error("Failed to update favorites:", error);
    }
  };

  return (
    <div className="campsite-details">
      <div className="campsite-details-container">
        <img src={CF + details.mainImg} alt="" className="campsite-img" />
        <div className="campsite-details-text">
          <div className="campsite-header">
            <div className="campsite-name"> {details.name}</div>
            <button
              className={`favourite-btn ${isFavourite ? "active" : ""}`}
              onClick={toggleFavourite}
            >
              <i
                className={`fa ${isFavourite ? "fa-heart" : "fa-plus"}`}
                aria-hidden="true"
              ></i>
              {isFavourite ? " Remove from Favourites" : " Add to Favourites"}
            </button>
          </div>

          <div className="campsite-desc">{details.desc}</div>
          <div className="campsite-detail-row">
            <div className="campsite-detail-type">Location:</div>
            <div className="campsite-detail">{details.location}</div>
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
            <div className="campsite-detail-type">Users Rating:</div>
            <div className="campsite-detail">{renderStars(details.rating)}</div>
          </div>
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
          <div className="campsite-detail-row">
            <div className="campsite-detail-type">Safety:</div>
            <div className="campsite-detail">
              {details.security === true ? "Yes" : "No"}
            </div>
          </div>
        </div>
      </div>
      <div className="camper-details-center">
        <CampsiteRating
          reviewIds={details.reviews}
          userId={user._id}
          campsiteId={details._id}
        />
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
                <img src={image} alt={`${details.name} view ${index + 1}`} />
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
    </div>
  );
}
