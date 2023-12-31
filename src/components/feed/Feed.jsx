import Diversity2TwoToneIcon from "@mui/icons-material/Diversity2TwoTone";
import { useAllLobbies } from "../../hooks/api/lobbies/useAllLobbies";
import Lobby from "../Lobbies/Lobby";
import "./feed.css";

export default function Feed() {
  const { data: lobbies } = useAllLobbies();

  return (
    <div className="feed-container">
      <div className="heading">
        <h1>
          <Diversity2TwoToneIcon /> Available Camping Lobbies
        </h1>
      </div>

      {lobbies?.map((l) => (
        <Lobby key={l._id} lobby={l} />
      ))}
    </div>
  );
}
