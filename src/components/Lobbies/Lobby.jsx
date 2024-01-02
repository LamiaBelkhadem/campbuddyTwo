import EventIcon from "@mui/icons-material/Event";
import { toast } from "react-toastify";
import LoadingPage from "../common/loading/LoadingPage";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getImageURL } from "../../../utils/getImageURL";
import { useJoinLobby } from "../../hooks/api/lobbies/useJoinLobby";
import { useLeaveLobby } from "../../hooks/api/lobbies/useLeaveLobby";
import useAuth from "../../hooks/useAuth";
import "./lobby.css";
import { Button } from "@mui/material";
import LoadingPage from "../common/loading/LoadingPage.jsx";

export default function Lobby({ lobby }) {
  const { user } = useAuth();
	const { mutate: leaveLobby, isPending: isLeaving } = useLeaveLobby(lobby._id);
	const { mutate: joinLobby, isPending: isJoining } = useJoinLobby(lobby._id);
	const queryClient = useQueryClient();

	const eventDate = new Date(lobby.start);
	const year = eventDate.getFullYear();
	const month = eventDate.getMonth() + 1; // Because months are 0-indexed
	const day = eventDate.getDate();
	const navigate = useNavigate();

	const today = new Date();

  const daysFromNow = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
  const numberOfParticipants = lobby.joined?.length;
  const isOpen=daysFromNow>0;
  const isNearlyFull = numberOfParticipants / lobby.maximumParticipants > 0.8;

  const viewHandler = (e) => {
    navigate(`/app/lobby/view/${lobby._id}`);
  };
	if (isLeaving || isJoining) return <LoadingPage />;

  return (
		<div className="lobby-card">
			<div className="lobby-card-container">
				<div className="campsite-lobby-image">
					<img src={getImageURL(lobby.campsite?.mainImg)} alt="" />
				</div>

				<div className="lobby-card-container-right">
					<div className="header-section">
						<h3>{lobby.name}</h3>
						<div className="capacity">
							<GroupIcon />
							<p>
								{numberOfParticipants}/{lobby.maximumParticipants}
							</p>
						</div>
					</div>
					<div className="lobby-info">
						<PersonIcon />
						<p>Hosted by:</p>
						<img
							src={getImageURL(lobby.owner?.profile?.profilePic)}
							alt=""
							className="lobby-owner-img"
						/>
						<p>{lobby.owner?.username}</p>
					</div>
					<div className="lobby-info">
						<LocationOnIcon />
						<p>{lobby.campsite?.location}</p>
					</div>
					<div className="lobby-info">
						<EventIcon />
						<p>
							Date : {day}/{month}/{year}
						</p>
					</div>
					<div className="lobby-info">
						<EventIcon />
						<p>Time : {lobby.time}</p>
					</div>

					<div className="action-buttons">
						<p className="days-from-now">
							{daysFromNow ? `${daysFromNow} days from now` : "Invalid Date"}
						</p>
						<div>
							{lobby.joined?.find((e) => e._id ? e._id === user._id : e === user._id) ? (
								<Button
									disabled={isJoining || isLeaving||!isOpen}
									className="leave-btn"
									onClick={() =>
										leaveLobby(undefined, {
											onSuccess: () => {
												toast.success("Left lobby " + lobby.name);
												queryClient.invalidateQueries(["lobbies"]);
											},
										})
									}
								>
									Leave
								</Button>
							) : (
								<Button
									className="join-btn"
									disabled={isJoining || isLeaving || isNearlyFull||!isOpen}
									onClick={() =>
										joinLobby(undefined, {
											onSuccess: () => {
												toast.success("Joined lobby " + lobby.name);
												queryClient.invalidateQueries(["lobbies"]);
											},
										})
									}
								>
									Join
								</Button>
							)}
							<button className="view-btn" onClick={viewHandler}>
								View
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
