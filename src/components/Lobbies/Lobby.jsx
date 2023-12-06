import React, {useEffect, useState} from 'react';
import './lobby.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import axios from "axios";
import {login} from "../../apis";
import {useNavigate} from 'react-router-dom';

export default function Lobby({id, title, participants, maxParticipants, location, date, time}) {

    const eventDate = new Date(date);
    const year = eventDate.getFullYear();
    const month = eventDate.getMonth() + 1;  // Because months are 0-indexed
    const day = eventDate.getDate();
    const hours = eventDate.getHours();
    const minutes = eventDate.getMinutes();
    const navigate = useNavigate();

    const today = new Date();

    const daysFromNow = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
    const numberOfParticipants = participants.length;

    const isNearlyFull = numberOfParticipants / maxParticipants > 0.8;
    const PF = process.env.REACT_APP_COMMON_FOLDER;

    const viewHandler = (e) => {
        navigate(`/lobby/${id}`);
    }
    return (
        <div className="lobby-card">
            <div className="lobby-card-container">

                <div className="campsite-lobby-image">
                    <img src={`${PF}bniMtir.jpg`} alt=""/>
                </div>

                <div className="lobby-card-container-right">
                    <div className="header-section">
                        <h3>{title}</h3>
                        <div className="capacity">
                            <GroupIcon/>
                            <p>{numberOfParticipants}/{maxParticipants}</p>
                        </div>
                    </div>
                    <div className="lobby-info">
                        <PersonIcon/>
                        <p>Hosted by:</p>
                        <img src={`${PF}me.png`} alt="" className="lobby-owner-img"/>
                        <p>Lamia</p>
                    </div>
                    <div className="lobby-info">
                        <LocationOnIcon/>
                        <p>{location}</p>
                    </div>
                    <div className="lobby-info">
                        <EventIcon/>
                        <p>Date : {day}/{month}/{year}</p>
                    </div>
                    <div className="lobby-info">
                        <EventIcon/>
                        <p>Time : {time}</p>
                    </div>


                    <div className="action-buttons">
                        <p className="days-from-now">{daysFromNow ? `${daysFromNow} days from now` : 'Invalid Date'}</p>
                        <div>
                            <button className="join-btn">Join</button>
                            <button className="view-btn" onClick={viewHandler}>View</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
