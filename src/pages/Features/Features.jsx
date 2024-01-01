import React from 'react';
import Navbar from "../../components/landing/navbar/index.jsx";
import Footer from "../../components/common/footer/index.jsx";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Lobby System:', 'Join lobbies with like-minded campers and plan your trips together.'),
  createData('Profile Customization:', 'Create and personalize your profile to share your camping interests and experiences.'),
  createData('Interactive Map:', 'Discover new camping sites with our easy-to-use map feature.'),
  createData('Community Engagement:', 'Connect with a community of campers, share tips, and make new friends.'),
  createData('Secure Messaging:', 'Chat securely with other campers within the platform.'),
  createData('Reviews and Ratings:', 'Read and write reviews for campsites and fellow campers.'),
];

export default function DenseTable() {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "70px" }}>Features</h1>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <TableContainer sx={{ mt: 4, mb: 30, border: '2px solid #AD5D5D', borderRadius: '5px', maxWidth: 800 }} component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name} style={{ padding: "30px" }}>
                  <TableCell component="th" scope="row" style={{ padding: "30px" }}>
                    <b>{row.name}</b>
                  </TableCell>
                  <TableCell align="right" style={{ padding: "30px" }}>{row.calories}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Footer />
    </div>
  );
}
