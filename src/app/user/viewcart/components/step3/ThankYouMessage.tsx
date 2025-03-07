import React from 'react';
import {Box, Typography} from '@mui/material';

const ThankYouMessage: React.FC = () => (
    <Box sx={{mb: 4, textAlign: 'center'}}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
            Thank You! 🎉
        </Typography>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
            Your order has been received
        </Typography>
    </Box>
);

export default ThankYouMessage;