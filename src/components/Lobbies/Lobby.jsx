import React, {useEffect, useState} from 'react';
import './lobby.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import axios from "axios";

export default function Lobby({ title, participants, maxParticipants, location, date, time }) {

    const eventDate = new Date(date);

    const year = eventDate.getFullYear();
    const month = eventDate.getMonth() + 1;  // Because months are 0-indexed
    const day = eventDate.getDate();
    const hours = eventDate.getHours();
    const minutes = eventDate.getMinutes();
    console.log(year, month, day, hours, minutes);

    const today=new Date();

    const daysFromNow = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
    const numberOfParticipants = participants.length;

    const isNearlyFull = numberOfParticipants / maxParticipants > 0.8;

    return (
        <div className="lobby-card">
            <div className="header-section">
                <h3>{title}</h3>
                <div className="capacity">
                    <GroupIcon />
                    <p>{numberOfParticipants}/{maxParticipants}</p>
                </div>
            </div>
            <div className="lobby-info">
                <PersonIcon />
                <p>Hosted by: "Lamia"</p>
            </div>
            <div className="lobby-info">
                <LocationOnIcon />
                <p>{location}</p>
            </div>
            <div className="lobby-info">
                <EventIcon />
                <p>Date : {day}/{month}/{year}</p>
            </div>
            <div className="lobby-info">
                <EventIcon />
                <p>Time : {time}</p>
            </div>
            <div className="action-buttons">
                <p className="days-from-now">{daysFromNow ? `${daysFromNow} days from now` : 'Invalid Date'}</p>
                <div>
                    <button className="join-btn">Join</button>
                    <button className="view-btn">View</button>
                </div>
            </div>
        </div>
    );
}
