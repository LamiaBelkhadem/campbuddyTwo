import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InfoIcon from '@mui/icons-material/Info';
import WcIcon from '@mui/icons-material/Wc';
import InterestsIcon from '@mui/icons-material/Interests';
import StarIcon from '@mui/icons-material/Star';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import FavoriteIcon from '@mui/icons-material/Favorite';
  import { useGetAllCampsites } from '/src/hooks/api/campsites/useGetAllCampsites.jsx';
import { useState, useEffect } from 'react';
function createData(caption, value) {
    return { caption, value };
}
export default function ProfileDetails({ gender,
    experience,
    aboutme,
    interests,
    equipment,
    favourites, }) {
        
        const { data: campsites, isLoading, error } = useGetAllCampsites();
        const [favouriteCampsites, setFavouriteCampsites] = useState([]);
        
        useEffect(() => {
            if (campsites) {
                const matchedCampsites = campsites.filter(campsite => favourites.includes(campsite._id));
                setFavouriteCampsites(matchedCampsites.map(campsite => campsite.name));
            }
            console.log(favouriteCampsites)
            console.log("all campsites",campsites)
        }, [campsites, favourites]);
    
            const rows = [
        createData('Gender', gender),
        createData('About me', aboutme),
        createData('Interests/Hobbies', interests),
        createData('Experience Level', experience),
        createData('Equipment/Gear', equipment,),
        createData('Favourites', favourites),
    ];
    const interestsTags = interests.split(",").map((tag) => tag.trim());
    const equipmentTags = equipment.split(",").map((tag) => tag.trim());

    console.log("favourites",favourites)

    return (
        <div className="camper-details">
            <TableContainer sx={{ mt: 4, border: '2px solid #AD5D5D', borderRadius: '5px' }} component={Paper}>
                <Table sx={{ minWidth: 800, }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{
                                 fontSize: 20, color: 'white', backgroundColor: '#AD5D5D' }}>Camper Information</TableCell>
                            < TableCell sx={{  fontSize: 20, color: 'white', backgroundColor: ' #AD5D5D', }}></TableCell>

                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {rows.map((row,index) => (
                            <TableRow
                                key={row.caption}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index === 0 && < WcIcon sx={{ mb: -1, mr: 2 }} />}
                                    {index === 1 && <InfoIcon sx={{ mb: -1, mr: 2 }} />}  
                                    {index === 2 && <InterestsIcon sx={{ mb: -1, mr: 2 }} />}  
                                    {index === 3 && <StarIcon sx={{ mb: -1, mr: 2 }} />}  
                                    {index === 4 && <HomeRepairServiceIcon sx={{ mb: -1, mr: 2 }} />}  
                                    {index === 5 && <FavoriteIcon sx={{ mb: -1, mr: 2 }} />}  
                                    {row.caption}
                                </TableCell>
                                                                <TableCell align="right">
                                {}
                                {index === 2 && (
                                    <div className="campsite-detail-row">
                                    <div className="campsite-detail">
                                        {interestsTags.map((tag, index) => (
                                        <span key={index} className="amenities-tag">
                                            {tag}
                                        </span>
                                        ))}
                                    </div>
                                    </div>
                                )}

                                {}
                                {index === 4 && (
                                    <div className="campsite-detail-row">
                                    <div className="campsite-detail">
                                        {equipmentTags.map((tag, index) => (
                                        <span key={index} className="amenities-tag">
                                            {tag}
                                        </span>
                                        ))}
                                    </div>
                                    </div>
                                )}
                                {index === 5 && ( 
                                    <div className="campsite-detail-row">
                                    <div className="campsite-detail">
                                        {isLoading ? (
                                            <span>Loading...</span>
                                        ) : error ? (
                                            <span>Error: {error.message}</span>
                                        ) : (
                                            favouriteCampsites?.map((campsite, index) => (
                                                <span key={index} className="campsite-tag" style={{backgroundColor:'#9E6C39', color:'white', display: 'inline-block',
                                                borderRadius: '15px',
                                                padding: '5px 10px',
                                                margin: '0 5px 5px 0',
                                                fontSize: '0.85em',
                                                marginTop: '-10px',}}>
                                                    {campsite}
                                                </span>
                                            ))
                                        )}
                                    </div>
                                </div>
                                )}
                                {(index !== 2 && index !== 4 && index !== 5) && row.value}
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}