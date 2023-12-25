import Navbar from "../../components/navbar/Navbar.jsx";
import Footer from "../../components/common/footer/index.jsx";
import Lobby from "../../components/Lobbies/Lobby";
import { useGetLobbiesByParticipants } from "../../hooks/api/lobbies/useGetLobbiesByParticipants.jsx";
import { useParams } from "react-router-dom";
import LoadingPage from "../../components/common/loading/LoadingPage.jsx";

export default function JoinedLobbies() {
	const {id}=useParams();

	const { data: joinedLobbies, isLoading } = useGetLobbiesByParticipants(id);

	if(isLoading) return <LoadingPage/>

	return (
		<div className="profile">
			<Navbar />
			{joinedLobbies?.map((l) => (
				<Lobby key={l._id} lobby={l} />
			))}

			<Footer />
		</div>
	);
}