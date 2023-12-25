import Navbar from "../../components/navbar/Navbar.jsx";
import Footer from "../../components/common/footer/index.jsx";
import Lobby from "../../components/Lobbies/Lobby";
import { useGetLobbiesByParticipants } from "../../hooks/api/lobbies/useGetLobbiesByParticipants.jsx";
import { useAuth } from "../../hooks/useAuth";

export default function joinedLobbies() {
  const { user } = useAuth();

  const { data: getJoinedLobbies, isPending } = useGetLobbiesByParticipants(user?._id);

    return (
        <div className="profile">
          <Navbar />
          
    
          {getJoinedLobbies?.map((l) => (
        <Lobby key={l._id} lobby={l} />
      ))}
    
          <Footer />
        </div>
      );
    }