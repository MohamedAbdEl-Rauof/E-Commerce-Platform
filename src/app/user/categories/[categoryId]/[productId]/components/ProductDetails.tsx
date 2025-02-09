import React from 'react';
import { Typography, Box } from '@mui/material';

const ProductDetails = ({ name, description, price }: { name: string; description: string; price: number }) => (
    <Box>
        <Typography variant="h6" gutterBottom>
            Price: ${price.toFixed(2)}
        </Typography>
        <Typography variant="body1" paragraph>
            {description}
        </Typography>
    </Box>
);

export default ProductDetails;