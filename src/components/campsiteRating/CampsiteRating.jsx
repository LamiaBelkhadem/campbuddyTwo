import React, {useEffect, useRef, useState} from 'react';
import './campsiteRating.css';
import axios from 'axios';
import {Modal} from 'bootstrap';


export default function CampsiteRating({reviewIds, userId, campsiteId}) {
    const [reviewsData, setReviewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    let overallRating = 0;

    console.log(reviewIds);
    const modalRef = useRef(null);

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current = new Modal(document.getElementById('reviewModal'));
        }
    }, []);

    const reviewHandler = () => {
    };


    useEffect(() => {
        fetchReviewsAndUsers();
    }, [reviewIds]); // Dependency array ensures useEffect is run when reviewIds changes
    const [review, setReview] = useState({
        rating: '', text: '', userId: userId,

    });


    const handleReviewChange = (event) => {
        const { name, value } = event.target;
        setReview((prevReview) => ({
            ...prevReview,
            [name]: value
        }));
    };


    const submitReview = async () => {
            if (!review.rating || !review.text.trim()) {
                alert('Please enter a rating and a review.');
                return;
            }

            try {
                // Send the review data to your server
                const response = await axios.post('http://localhost:8080/api/reviews', review);
                console.log(response);
                // Optionally, check for any response details you expect back
                // For example, the updated list of reviews
                if (response.status === 200) {

                    try {
                        const updatedCampsite = await axios.put(`http://localhost:8080/api/campsites/addReview/${campsiteId}`, {
                            reviews: response.data._id,
                        });

                        console.log("updatedCampsite", updatedCampsite);
                    } catch (err) {
                        console.log("error adding review to campsite")
                    }


                    // Clear the review form
                    setReview({rating: '', text: ''});

                    // Optionally, update the reviews displayed without needing to fetch again
                    setReviewsData([...reviewsData, response.data]);

                    // Close the modal using the reference to the Bootstrap Modal instance
                    if (modalRef.current) {
                        modalRef.current.hide();
                    }

                }


            } catch (error) {
                // Handle any errors, such as displaying a message to the user
                console.error('Error submitting review:', error);
                alert('There was an error submitting your review. Please try again later.');
            }



        console.log(review);

    };

    const fetchReviewsAndUsers = async () => {
        setLoading(true);

        try {
            const reviewsPromises = reviewIds.map(id =>
                axios.get(`http://localhost:8080/api/reviews/${id}`)
            );

            const reviewsResponses = await Promise.all(reviewsPromises);
            // Filter out any null responses and map to data
            const reviews = reviewsResponses
                .filter(response => response.status === 200 && response.data != null)
                .map(res => res.data);
            console.log(reviews);

            if (reviews.length > 0) {
                const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
                overallRating = totalRating / reviews.length;
                console.log("overall rating:", overallRating)
            }
            // Fetch each user individually and handle possible null values
            const usersPromises = reviews.map(review => axios.get(`http://localhost:8080/api/users?userId=${review.userId}`));
            console.log(usersPromises);
            const usersResponses = await Promise.all(usersPromises);
            console.log(usersResponses);
            // Filter out any null responses and map to data
            const users = usersResponses
                .filter(response => response.status === 200 && response.data != null)
                .map(res => res.data);

            // Create a map for userId to user
            const userMap = {};
            users.forEach(user => {
                if (user) { // Check if the user is not null
                    userMap[user._id] = user;
                }
            });

            // Add reviewer names to reviews, handle missing users
            const reviewsWithUserNames = reviews.map(review => {
                const user = userMap[review.userId];
                return {
                    ...review, reviewerName: user ? user.username : 'Anonymous'
                };
            });

            setReviewsData(reviewsWithUserNames);
        } catch (error) {
            console.error('Error fetching reviews or users:', error);
        }
        setLoading(false);

        try{
            const response = await axios.put(`http://localhost:8080/api/campsites/${campsiteId}`, {
                rating: overallRating.toString(),
            });
        }catch(error){
            console.log(error);
        }
    };


    if (loading) {
        return (<div className="reviews-container">
            <div className="section-header"> Reviews:</div>
            <div className="loading">Loading reviews...</div>
        </div>);
    }


    return (<div className="reviews-container">
            <div className="section-header-container">
                <div className="section-header"> Reviews:</div>
                <button className="review-btn" data-bs-toggle="modal" data-bs-target="#reviewModal"
                        onClick={reviewHandler}>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                    Leave a Review
                </button>

                <div className="modal fade" id="reviewModal" tabIndex="-1" aria-labelledby="reviewModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="reviewModalLabel">Leave a Review</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="mb-3">
                                        <label htmlFor="review-rating" className="col-form-label">Rating:</label>
                                        <select
                                            className="form-select"
                                            id="review-rating"
                                            name="rating"
                                            value={review.rating || ''}
                                            onChange={handleReviewChange}
                                        >
                                            <option value="">Choose a rating</option>
                                            <option value="1">1 Star</option>
                                            <option value="2">2 Stars</option>
                                            <option value="3">3 Stars</option>
                                            <option value="4">4 Stars</option>
                                            <option value="5">5 Stars</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="review-text" className="col-form-label">Review:</label>
                                        <textarea
                                            className="form-control"
                                            id="review-text"
                                            name="text"
                                            value={review.text}
                                            onChange={handleReviewChange}
                                            placeholder="Share your experience with us..."
                                        ></textarea>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                data-bs-dismiss="modal">Close
                                        </button>
                                        <button type="button" className="btn btn-primary" onClick={submitReview}>Submit
                                            Review
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            {reviewsData.length > 0 ? (reviewsData.map((review, index) => (<div className="review-card" key={index}>
                        <div className="review-header">
                            <span className="reviewer-name">{review.reviewerName}</span>
                            <div className="review-rating">
                                {[...Array(5)].map((star, i) => (<i
                                        key={i}
                                        className={i < review.rating ? "fa fa-star star-filled" : "fa fa-star-o star-empty"}
                                        aria-hidden="true"
                                    ></i>))}
                            </div>
                        </div>
                        <div className="review-text">{review.text}</div>
                    </div>))) : (<p>No reviews yet. Be the first to review!</p>)}
        </div>);
};