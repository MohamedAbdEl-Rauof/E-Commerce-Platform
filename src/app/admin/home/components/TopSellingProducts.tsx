import React from 'react';
import {Box, LinearProgress, Paper, Stack, Typography} from '@mui/material';

interface Product {
    name: string;
    sales: number;
    stock: number;
    progress: number;
}

interface TopSellingProductsProps {
    products: Product[];
}

const TopSellingProducts: React.FC<TopSellingProductsProps> = ({products}) => (
    <Paper elevation={2} sx={{p: 3, borderRadius: 2, height: '100%'}}>
        <Typography variant="h6" sx={{mb: 2, fontWeight: 'bold'}}>
            Top Selling Products
        </Typography>
        <Box>
            {products.map((product, index) => (
                <Box key={index} sx={{mb: 2}}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mb: 1}}>
                        <Typography variant="body1" fontWeight="medium">
                            {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product.sales} sales
                        </Typography>
                    </Stack>
                    <LinearProgress
                        variant="determinate"
                        value={product.progress}
                        sx={{
                            height: 8,
                            borderRadius: 5,
                            backgroundColor: '#e9ecef',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: index % 2 === 0 ? '#4361ee' : '#4cc9f0'
                            }
                        }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{mt: 0.5, display: 'block'}}>
                        {product.stock} items in stock
                    </Typography>
                </Box>
            ))}
        </Box>
    </Paper>
);

export default TopSellingProducts;