import "./feed.css"
import Lobby from "../Lobbies/Lobby"
import {containerClasses} from "@mui/material";
import Diversity2TwoToneIcon from '@mui/icons-material/Diversity2TwoTone';

export default function Feed(){
    const lobbies = [
        {
            title: "Mountain Hiking",
            hostName: "John Doe",
            participants: 6,
            maxParticipants: 10,
            location: "Mountain Peak",
            dateTime: "2023-10-20T14:00:00"
        },
        {
            title: "Beach Camping",
            hostName: "Alice Smith",
            participants: 3,
            maxParticipants: 8,
            location: "Sunny Beach",
            dateTime: "2023-10-22T11:00:00"
        },
        {
            title: "Beach Camping",
            hostName: "Alice Smith",
            participants: 3,
            maxParticipants: 8,
            location: "Sunny Beach",
            dateTime: "2023-10-22T11:00:00"
        },
        {
            title: "Beach Camping",
            hostName: "Alice Smith",
            participants: 3,
            maxParticipants: 8,
            location: "Sunny Beach",
            dateTime: "2023-10-22T11:00:00"
        },
        {
            title: "Beach Camping",
            hostName: "Alice Smith",
            participants: 3,
            maxParticipants: 8,
            location: "Sunny Beach",
            dateTime: "2023-10-22T11:00:00"
        },
        // ... add more lobbies as needed
    ];

    return(
        <div className="feed-container">
            <div className="heading">
                <h2><Diversity2TwoToneIcon/> Available Camping Lobbies</h2>
            </div>

            {lobbies.map((lobby, index) => (
                <Lobby
                    key={index}
                    title={lobby.title}
                    hostName={lobby.hostName}
                    participants={lobby.participants}
                    maxParticipants={lobby.maxParticipants}
                    location={lobby.location}
                    dateTime={lobby.dateTime}
                />
            ))}
        </div>

    )












}