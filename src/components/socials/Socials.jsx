import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
function createData(caption, value) {
    return { caption, value };
}


export default function ProfileDetails({ instagram, facebook, twitter }) {
    const rows = [
        createData('Facebook',facebook),
        createData('Instagram', instagram),
        createData('twitter', twitter),

    ];


    return (
        <div className="camper-details">
            <TableContainer sx={{ mt: 4, ml: 4, border: '2px solid #AD5D5D', borderRadius: '5px' }} component={Paper}>
                <Table sx={{ minWidth: 250, }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{  fontSize: 20,color:'white', backgroundColor: '#AD5D5D',maxWidth:50 }}>Camper Details</TableCell>
                            <TableCell sx={{fontSize: 20, color: 'white', backgroundColor: '#AD5D5D',maxWidth:50 }}></TableCell>

                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {rows.map((row,index) => (
                            <TableRow
                                key={row.caption}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index === 0 && < FacebookIcon sx={{ mb: -1, mr: 2, color:'#3b5998 !Important' }} />}
                                    {index === 1 && <InstagramIcon sx={{ mb: -1, mr: 2, color:'#E4405F !Important' }}/>}  
                                    {index === 2 && <TwitterIcon sx={{ mb: -1, mr: 2,color:' #1DA1F2 !Important' }} />}  
                              
                                    
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