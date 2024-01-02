import Navbar from "../../components/navbar/Navbar.jsx";
import Footer from "../../components/common/footer/index.jsx";
import Lobby from "../../components/Lobbies/Lobby";
import { useGetLobbiesByOwner } from "../../hooks/api/lobbies/useGetLobbiesByOwner.jsx";
import { useAuth } from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import LoadingPage from "../../components/common/loading/LoadingPage.jsx";
export default function createdLobbies() {

  
  const { id } = useParams();

	const { data: createdLobbies, isLoading,isFetching } = useGetLobbiesByOwner(id);


	if (isLoading||isFetching) return <LoadingPage />;


	// If there are no created lobbies
	if (createdLobbies?.length === 0) {
		return (
			<div className="profile">
			<Navbar />
			<div style={{height:"25vw"}}>
			<div className="alternative" style={{textAlign:"center", marginTop:"20vw" }}>
				You haven't created any lobbies yet.
			</div>
			</div>
			<Footer />
		</div>
			
		);
	}


	// If there are created lobbies
	return (
		<div className="profile">
			<Navbar />
			{createdLobbies?.map((l) => (
				<Lobby key={l._id} lobby={l} />
			))}
			<Footer />
		</div>
	);
}