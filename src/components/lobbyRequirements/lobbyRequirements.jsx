import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
function createData(caption, value) {
    return { caption, value };
}


export default function LobbyRequirements({ food,equipmentNeeded,equipmentProvided,transport}) {

    const rows = [
        createData('Food and Drinks', food),
        createData('Equipment Provided', equipmentProvided),
        createData('Equipment Needed', equipmentNeeded),
        createData('Transportation', transport),
     

    ];
    const equipmentNeededTags = equipmentNeeded.map((tag) => tag.trim());
    const equipmentProvidedTags = equipmentProvided.map((tag) => tag.trim());


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
                                    {index === 0 && < RestaurantIcon sx={{ mb: -1, mr: 2 }} />}
                                    {index === 1 && <HomeRepairServiceIcon sx={{ mb: -1, mr: 2 }} />} 
                                    {index === 2 && <HomeRepairServiceIcon sx={{ mb: -1, mr: 2 }} />} 
                                    {index === 3 && <DirectionsBusIcon sx={{ mb: -1, mr: 2 }} />} 
                                 
                                    {row.caption}
                                </TableCell>

                                <TableCell align="right">
                                    
                                {index === 2 && (
                                    <div className="campsite-detail-row">
                                    <div className="campsite-detail">
                                        {equipmentNeededTags.map((tag, index) => (
                                        <span key={index} className="equipment-tag" style={{backgroundColor:'#AD5D5D', color:'white', display: 'inline-block',
                                        borderRadius: '15px',
                                        padding: '5px 10px',
                                        margin: '0 5px 5px 0',
                                        fontSize: '0.85em',
                                        marginTop: '-10px',}}>
                                            {tag}
                                        </span>
                                        ))}
                                    </div>
                                    </div>
                                )}
                                {index === 1 && (
                                    <div className="campsite-detail-row">
                                    <div className="campsite-detail">
                                        {equipmentProvidedTags.map((tag, index) => (
                                        <span key={index} className="amenities-tag" style={{ color:'white'}}>
                                            {tag}
                                        </span>
                                        ))}
                                    </div>
                                    </div>
                                )}
                                
                                {(index !== 2 && index !== 1 ) && row.value}                                
                                </TableCell>
                                

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}