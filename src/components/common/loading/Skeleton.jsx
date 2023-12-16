import React, {useState, useEffect} from 'react';
import {Button, Typography, Skeleton} from '@mui/material';

const MySkeleton = () => {
    const [loading, setLoading] = useState(true);

    // Simulate an API call or some asynchronous operation
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                {loading ? <Skeleton animation="wave" width={200}/> : 'Your Content Title'}
            </Typography>

            <Typography variant="body1">
                {loading ? (
                    <>
                        <Skeleton animation="wave" width={150}/>
                        <Skeleton animation="wave" width={250}/>
                    </>
                ) : (
                    'Your actual content goes here.'
                )}
            </Typography>

            <Button variant="contained" color="primary" disabled={loading}>
                {loading ? <Skeleton animation="wave" width={100}/> : 'Submit'}
            </Button>
        </div>
    );
};

export default MySkeleton;

