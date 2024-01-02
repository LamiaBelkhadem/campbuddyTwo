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
import ChildCareIcon from '@mui/icons-material/ChildCare';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PetsIcon from '@mui/icons-material/Pets';
function createData(caption, value) {
    return { caption, value };
}


export default function LobbyPreferences({ gender,experience,age, ambiance, kid, pet }) {

    const rows = [
        createData('Gender', gender),
        createData('Age Group', age),
        createData('Experience', experience),
        createData('Ambiance', ambiance),
        createData('Kid-Friendly', kid),
        createData('Pet-Friendly', pet),

    ];


    return (
        <div className="camper-details">
            <TableContainer sx={{  border: '2px solid #AD5D5D', borderRadius: '5px' }} component={Paper}>
                <Table sx={{ minWidth: 800, }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            
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
                                    {index === 2 && <StarIcon sx={{ mb: -1, mr: 2 }} />} 
                                    {index === 3 && <EmojiEmotionsIcon sx={{ mb: -1, mr: 2 }} />}  
                                    {index === 4 && <ChildCareIcon  sx={{ mb: -1, mr: 2 }} />}  
                                    {index === 5 && <PetsIcon sx={{ mb: -1, mr: 2 }} />}  
                                    {row.caption}
                                </TableCell>
                                <TableCell align="right">{row.value}</TableCell>
                                

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}