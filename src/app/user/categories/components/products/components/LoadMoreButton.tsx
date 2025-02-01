import React from 'react';
import {Box, Button} from '@mui/material';

interface LoadMoreButtonProps {
    onClick: () => void;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({onClick}) => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
            <Button variant="contained" onClick={onClick}>
                Show More
            </Button>
        </Box>
    );
};

export default LoadMoreButton;