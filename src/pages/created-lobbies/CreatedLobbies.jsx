import Navbar from "../../components/navbar/Navbar.jsx";
import Footer from "../../components/common/footer/index.jsx";
import Lobby from "../../components/Lobbies/Lobby";
import { useGetLobbiesByOwner } from "../../hooks/api/lobbies/useGetLobbiesByOwner.jsx";
import { useAuth } from "../../hooks/useAuth";

export default function createdLobbies() {

  const { user } = useAuth();

  const { data: getCreatedLobbies, isPending } = useGetLobbiesByOwner(user?._id);

  

  // If there are no created lobbies
  if (getCreatedLobbies?.length === 0) {
    return (
      <div className="alternative">
        You haven't created any lobbies yet.
      </div>
    );
  }

  // If there are created lobbies
  return (
    <div className="profile">
      <Navbar />
      {getCreatedLobbies?.map((l) => (
        <Lobby key={l._id} lobby={l} />
      ))}
      <Footer />
    </div>
  );
}