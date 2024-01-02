import "./lobbyParticipants.css";
import { Link } from "react-router-dom";
import { getImageURL } from "../../../utils/getImageURL";
import { Stack } from "@mui/material";
import { useGetLobbiesByParticipants } from "../../hooks/api/lobbies/useGetLobbiesByParticipants.jsx";
import RateReviewIcon from '@mui/icons-material/RateReview';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Chip from '@mui/material/Chip';
export default function LobbyParticipants({ participants, host, isOpen, joined}) {
  const { data: getJoinedLobbies } = useGetLobbiesByParticipants(host._id);
  const memberSince = new Date(host?.profile.createdAt).toLocaleDateString();
  console.log(joined, "joined")

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for consistent date comparison
  const completedLobbiesCount = getJoinedLobbies
    ? getJoinedLobbies.filter((lobby) => {
        const endDate = new Date(lobby.end);
        return endDate < today; // Check if the end date is before today
      }).length
    : 0;

  console.log("Number of completed lobbies:", completedLobbiesCount);
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
    return total / reviews.length;
  };
  
  const averageRating = calculateAverageRating(host.profile.reviews);
  
console.log("average",averageRating)
 

  const renderStars = ({ rating }) => {
    console.log("rating",rating)
    // If rating is not available, return 5 stars
    if (rating === 0) {
    rating=5
    }

    const ratingNumber = Number(rating);
    console.log("ratingNumber:", ratingNumber);
    let stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= ratingNumber) {
        stars.push(
          <StarIcon sx={{color:'#ffc107 !important'}}/>
        ); // Filled star
      } else {
        stars.push(<StarBorderIcon sx={{color:'#ffc107 !important'}}/>        ); // Empty star
      }
    }
    return <div>{stars}</div>;
  };
  return (
    <>
      <div className="participants-container">
        <div className="host-header">
          <h1>Host</h1>
        </div>
        <div className="host-details-card">
          <Link to={`/app/profile/view/${host.profile._id}`}>
            <img
              src={
                host?.profile?.profilePic
                  ? getImageURL(host.profile.profilePic)
                  : `defaultpp.jpg`
              }
              alt=""
              className="host-img"
            />
          </Link>
          <Stack justifyContent="center" alignItems="center">
            <Link
              to={`/app/profile/${host.profile._id}`}
              style={{
                textAlign: "center",
                width: "fit-content",
              }}
              className="host-name"
            >{host.username}</Link>
          </Stack>
          <div className="host-details">
            <div className="detail-header">Rating:</div>
            <div className="detail-text">               
             {renderStars({ rating: averageRating })}
            </div>
          </div>
          <div className="host-details">
            <div className="detail-header">Member since: </div>
            <div className="detail-text">{memberSince}</div>
          </div>
          <div className="host-details">
            <div className="detail-header">Experience:</div>
            <div className="detail-text">{host.profile.experience}</div>
          </div>
          <div className="host-details">
            <div className="detail-header">Trips Completed:</div>
            <div className="detail-text">{completedLobbiesCount}</div>
          </div>

          <Link to={`/app/profile/view/${host.profile._id}`} className="more-details">
            <div >More Details</div>
          </Link>
        </div>
      </div>
      {(joined && !isOpen)&& (
      <div className="completion-note" style={{ width: '60%', margin: '10px', marginTop: '20px' }}>
  <Stack direction="row" spacing={1}>
    <Chip 
      sx={{
        width: '450px',
        whiteSpace: 'normal', // Allow text to wrap
        overflow: 'hidden', // Hide overflow
        textOverflow: 'ellipsis', // Add ellipsis to text that overflows
      }}
      label=" Review your Fellow Campers!"
    />
  </Stack>

      </div>)}
      <div className="participants-container">
        <div className="participants-header">
          <h1>
            Participants (
            {participants.length > 0 ? participants.length - 1 : 0})
          </h1>
        </div>
        <div
          className="joined-participants"
          style={{ overflow: "hidden", paddingLeft: 7 }}
        >
          <ul className="participants-list">
            {participants
              .filter((c) => c._id !== host._id)
              .map((camper) => (
                <li className="rightbar-Camper" key={camper._id}>
        <Link to={`/app/profile/view/${camper.profile._id}`}>                
            <div className="participants-img-Container">
                    <img
                      className="participants-img"
                      src={getImageURL(camper.profile.profilePic)}
                      alt=""
                    />
                  </div>
                  </Link>
                  <span className="participants-name">{`${camper.profile.fname} ${camper.profile.lname}`}</span>
                  {!isOpen ? (
                    <Link to={`/app/profile/view/${camper._id}`} >
                      <RateReviewIcon sx={{ml:16,color:'green !important'}}/>
                    </Link>
                  ) : (
                    <RateReviewIcon sx={{ml:16, }}/>
                  )}
                 
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
