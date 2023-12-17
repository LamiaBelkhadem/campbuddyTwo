import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io(process.env.VITE_WS_URL); // Adjust the URL to match your server

/**
 *
 * @dev Join lobby conversation => emit("JoinLobby",lobby_id)
 * => emit(lobby_id, newText);
 */

const RealTimeReviewComponent = () => {
  const [reviews, setReviews] = useState([]);
  const [newReviewText, setNewReviewText] = useState("");
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
    // Listen for new reviews from the server
    socket.on("newReview", (newReview) => {
      setReviews((prevReviews) => [...prevReviews, newReview]);
    });

    // Listen for userConnected events
    socket.on("userConnected", (data) => {
      setConnectedUsers((prevUsers) => [...prevUsers, data.userId]);
    });

    // Listen for userDisconnected events
    socket.on("userDisconnected", (data) => {
      setConnectedUsers((prevUsers) =>
        prevUsers.filter((userId) => userId !== data.userId),
      );
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleNewReviewSubmit = () => {
    // Emit a new review to the server
    socket.emit("newReview", { text: newReviewText });

    // Clear the input field
    setNewReviewText("");
  };

  return (
    <div>
      <div>
        <TextField
          label="New Review"
          variant="outlined"
          value={newReviewText}
          onChange={(e) => setNewReviewText(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleNewReviewSubmit}
        >
          Submit Review
        </Button>
      </div>
      <div>
        <h2>Reviews</h2>
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>{review.text}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Connected Users</h2>
        <ul>
          {connectedUsers.map((userId) => (
            <li key={userId}>{`User ${userId} connected`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RealTimeReviewComponent;
