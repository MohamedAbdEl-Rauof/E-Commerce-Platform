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
    <Paper 
        elevation={3} 
        sx={{
            p: 3, 
            borderRadius: 2, 
            height: '100%',
            backgroundColor: 'var(--light)',
            border: '1px solid var(--border)',
            boxShadow: '0 4px 6px var(--shadow)'
        }}
    >
        <Typography 
            variant="h6" 
            sx={{
                mb: 2, 
                fontWeight: 'bold',
                color: 'var(--foreground)',
                pb: 1,
                borderBottom: '1px solid var(--border)'
            }}
        >
            Top Selling Products
        </Typography>
        <Box>
            {products.map((product, index) => (
                <Box key={index} sx={{mb: 2.5, pb: 1.5, borderBottom: index < products.length - 1 ? '1px solid var(--border)' : 'none'}}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mb: 1}}>
                        <Typography variant="body1" fontWeight="medium" sx={{ color: 'var(--foreground)' }}>
                            {product.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'var(--muted)' }}>
                            {product.sales} sales
                        </Typography>
                    </Stack>
                    <LinearProgress
                        variant="determinate"
                        value={product.progress}
                        sx={{
                            height: 8,
                            borderRadius: 5,
                            backgroundColor: 'var(--hover)',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: index % 2 === 0 ? 'var(--primary)' : 'var(--info)'
                            }
                        }}
                    />
                    <Typography variant="caption" sx={{mt: 0.5, display: 'block', color: 'var(--muted)'}}>
                        {product.stock} items in stock
                    </Typography>
                </Box>
            ))}
        </Box>
    </Paper>
);

export default TopSellingProducts;