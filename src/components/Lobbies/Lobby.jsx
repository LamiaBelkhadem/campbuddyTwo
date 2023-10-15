import React from 'react';
import './lobby.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';

function Lobby({ title, hostName, participants, maxParticipants, location, dateTime }) {
    const today = new Date();
    const eventDate = new Date(dateTime);
    const daysFromNow = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
    const isNearlyFull = participants / maxParticipants > 0.8;

    return (
        <div className="lobby-card">
            <div className="header-section">
                <h3>{title}</h3>
                <div className="capacity">
                    <GroupIcon />
                    <p>{participants}/{maxParticipants}</p>
                </div>
            </div>
            <div className="lobby-info">
                <PersonIcon />
                <p>Hosted by: {hostName}</p>
            </div>
            <div className="lobby-info">
                <LocationOnIcon />
                <p>{location}</p>
            </div>
            <div className="lobby-info">
                <EventIcon />
                <p>Date & Time: {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(eventDate)}</p>
            </div>
            <div className="action-buttons">
                <p className="days-from-now">{daysFromNow} day(s) from now</p>
                <div>
                    <button className="join-btn">Join</button>
                    <button className="view-btn">View</button>
                </div>
            </div>
        </div>


    );
}

export default Lobby;
