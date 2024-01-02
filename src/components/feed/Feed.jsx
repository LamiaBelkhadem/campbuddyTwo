// components/feed/Feed.jsx
import React, { useState, useEffect } from 'react';
import Diversity2TwoToneIcon from "@mui/icons-material/Diversity2TwoTone";
import { useAllLobbies } from "../../hooks/api/lobbies/useAllLobbies";
import Lobby from "../Lobbies/Lobby";
import "./feed.css";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import Box from '@mui/material/Box';
import { useRecommendedLobbies } from '../../hooks/api/lobbies/useRecommendedLobbies';

export default function Feed() {
  const [value, setValue] = useState(0);
  const { data: allLobbies } = useAllLobbies();
  const { data: recommendedLobbies } = useRecommendedLobbies();

  const [displayedLobbies, setDisplayedLobbies] = useState([]);

  useEffect(() => {
    switch (value) {
      case 0:
        // Extract the lobby objects from recommendedLobbies.lobbies
        const recommendedLobbyData = recommendedLobbies?.lobbies?.map(item => item.lobby) || [];
        setDisplayedLobbies(recommendedLobbyData);
        break;
      case 1:
        setDisplayedLobbies(allLobbies || []);
        break;
      case 2:
        // Sort all lobbies by creation date in descending order for "New"
        const sortedLobbies = allLobbies?.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setDisplayedLobbies(sortedLobbies || []);
        break;
      default:
        setDisplayedLobbies([]);
    }
  }, [value, allLobbies, recommendedLobbies]);
  useEffect(() => {
    console.log("Recommended Lobbies:", recommendedLobbies);
    console.log("All Lobbies:", allLobbies);
  
    // existing switch statement
  }, [value, allLobbies, recommendedLobbies]);
  
  return (
    <div className="feed-container">
      <div className="feed-heading">
        <h1>
          <Diversity2TwoToneIcon /> Available Camping Lobbies
        </h1>
        <Box sx={{ backgroundColor: "lightGrey", border: "1px black solid", borderRadius: "5px", width: "25vw" }}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction 
              label="Recommended" 
              icon={<FeaturedPlayListIcon />} 
              sx={{ backgroundColor: value === 0 ? "white" : "lightGrey" }} 
            />
            <BottomNavigationAction 
              label="All" 
              icon={<FormatAlignJustifyIcon />} 
              sx={{ backgroundColor: value === 1 ? "white" : "lightGrey" }} 
            />
            <BottomNavigationAction 
              label="New" 
              icon={<FiberNewIcon />} 
              sx={{ backgroundColor: value === 2 ? "white" : "lightGrey" }} 
            />
          </BottomNavigation>
        </Box>
      </div>

      {displayedLobbies?.map((l) => (
        <Lobby key={l._id} lobby={l} />
      ))}
    </div>
  );
}
