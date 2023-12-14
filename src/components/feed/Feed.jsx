import "./feed.css";
import Lobby from "../Lobbies/Lobby";
import { containerClasses } from "@mui/material";
import Diversity2TwoToneIcon from "@mui/icons-material/Diversity2TwoTone";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Feed() {
  const [lobbies, setLobbies] = useState([]);

  useEffect(() => {
    const fetchLobbies = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/lobbies");
        setLobbies(res.data);
        console.log(res);
      } catch (error) {
        console.error("Error fetching lobbies:", error);
      }
    };
    fetchLobbies();
  }, []);
  return (
    <div className="feed-container">
      <div className="heading">
        <h2>
          <Diversity2TwoToneIcon /> Available Camping Lobbies
        </h2>
      </div>

      {lobbies.map((l) => (
        <Lobby
          key={l._id}
          id={l._id}
          title={l.name}
          participants={l.participants}
          maxParticipants={l.maximumParticipants}
          location={l.address}
          date={l.date}
          time={l.time}
        />
      ))}
    </div>
  );
}
