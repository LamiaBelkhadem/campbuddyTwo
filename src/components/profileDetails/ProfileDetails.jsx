import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContactPageIcon from '@mui/icons-material/ContactPage';
function createData(caption, value) {
    return { caption, value };
}


export default function ProfileDetails({ fname, lname, area, age }) {
    const rows = [
        createData('First Name', fname),
        createData('Lastname', lname),
        createData('Area', area),
        createData('Age', age),
   
    ];


    return (
        <div className="camper-details">
            <TableContainer sx={{ mt: 4, border: '2px solid #AD5D5D', borderRadius: '5px' }} component={Paper}>
                <Table sx={{ minWidth:800, }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                            <TableCell sx={{  fontSize: 20, color: 'white', backgroundColor: '#AD5D5D', }}>Camper Details</TableCell>
                            <TableCell sx={{  fontSize: 20, color: 'white', backgroundColor: '#AD5D5D', }}></TableCell>

                    </TableRow>

                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={row.caption}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" >
                                {index === 0 && <DriveFileRenameOutlineIcon sx={{ mb: -1, mr: 2 }} />}
                                {index === 1 && <DriveFileRenameOutlineIcon sx={{ mb: -1, mr: 2 }} />} {/* Replace with actual icons */}
                                {index === 2 && <LocationOnIcon sx={{ mb: -1, mr: 2 }} />} {/* Replace with actual icons */}
                                {index === 3 && <ContactPageIcon sx={{ mb: -1, mr: 2 }} />} {/* Replace with actual icons */}
                                {row.caption}
                            </TableCell>
                            <TableCell align="right" >{row.value}</TableCell>
                          
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
    </div>
    );
}