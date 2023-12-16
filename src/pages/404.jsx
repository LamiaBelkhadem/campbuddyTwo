import React from 'react';
import {Link} from 'react-router-dom';
import {Typography, Button, Container} from '@mui/material';

const NotFoundPage = () => {
    return (
        <Container component="main" maxWidth="xs">
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5%'}}>
                <Typography component="h1" variant="h2">
                    404
                </Typography>
                <Typography component="h1" variant="h5">
                    Page not found
                </Typography>
                <Typography component="p" variant="body1" style={{textAlign: 'center', margin: '20px 0'}}>
                    The page you are looking for might be in another castle.
                </Typography>
                <Button component={Link} to="/app" variant="contained" color="primary">
                    Go to Home
                </Button>
            </div>
        </Container>
    );
};

export default NotFoundPage;
