import React from 'react';
import { Typography } from '@mui/material';

const ProductHeader = ({ name }: { name: string }) => (
    <Typography variant="h4" gutterBottom>
        {name}
    </Typography>
);

export default ProductHeader;