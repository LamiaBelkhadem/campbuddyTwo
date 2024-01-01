import StarIcon from "@mui/icons-material/Star";
import { getImageURL } from "../../../utils/getImageURL.js";
import { useGetLobbiesByOwner } from "../../hooks/api/lobbies/useGetLobbiesByOwner.jsx";
import { useGetLobbiesByParticipants } from "../../hooks/api/lobbies/useGetLobbiesByParticipants.jsx";
import "./sidebarProfil.css";
import { useAuth } from "../../hooks/useAuth";
import StarBorderIcon from '@mui/icons-material/StarBorder';

const SidebarProfil = ({ profile , rate, reviews}) => {
      const { user } = useAuth();

    const { data: getCreatedLobbies, isPending } = useGetLobbiesByOwner(
    user._id
  );
  const { data: getJoinedLobbies, isLoading } = useGetLobbiesByParticipants(
      user._id
  );
console.log(reviews, "reviews")
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for consistent date comparison

  const completedLobbiesCount = getJoinedLobbies
    ? getJoinedLobbies.filter((lobby) => {
        const endDate = new Date(lobby.end);
        return endDate < today; // Check if the end date is before today
      }).length
    : 0;
  const upcomingLobbiesCount = getJoinedLobbies
    ? getJoinedLobbies.filter((lobby) => {
        const startDate = new Date(lobby.start);
        return startDate > today; // Check if the end date is before today
      }).length
    : 0;

  console.log("Number of completed lobbies:", completedLobbiesCount);
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews?.length === 0) return 0;
    const total = reviews?.reduce((acc, review) => acc + (review?.rating || 0), 0);
    return total / reviews?.length;
};
const averageRating = calculateAverageRating(reviews);
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
    <div className="profile-sidebar">
      <div className="sidebar-container">
        <div className="sidebar-wrapper">
          <div className="profilepic">
            <img
              src={
                       user?.profile?.profilePic
                       ? getImageURL(user.profile.profilePic)
                       : `defaultpp.jpg`
              }
              alt=""
              className="pic"
            />
          </div>
          <div className="title">
            <h3>{user.username}</h3>
          </div>
          <div className="profilepic-container">
            <div className="info">
              <div className="info-container">
                <div className="info-caption"> Rating:</div>
                <div className="stars-container">
                {renderStars({ rating: averageRating })}

                </div>
              </div>
            </div>

            <div className="info-container">
              <div className="info-caption">Upcoming Events:</div>
              <div className="info-var"> {upcomingLobbiesCount}</div>
            </div>

            <div className="info-container">
              <div className="info-caption">Lobbies Created</div>
              <div className="info-var">{getCreatedLobbies?.length}</div>
            </div>

            <div className="info-container">
              <div className="info-caption">Lobbies Joined</div>
              <div className="info-var"> {getJoinedLobbies?.length}</div>
            </div>

            <div className="info-container">
              <div className="info-caption">Adventures Completed</div>
              <div className="info-var">{completedLobbiesCount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarProfil;
