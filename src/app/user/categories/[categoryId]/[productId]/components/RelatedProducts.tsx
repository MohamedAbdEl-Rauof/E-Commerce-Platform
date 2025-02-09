import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import { useProduct } from '@/context/ProductContext';
import ProductCard from '../../components/ProductCard';
const RelatedProducts = ({ categoryId, currentProductId }: { categoryId: string; currentProductId: string }) => {
    const { products } = useProduct();

    const relatedProducts = products
        .filter(p => p.categoryId === categoryId && p._id !== currentProductId)
        .slice(0, 4); // Show up to 4 related products

    return (
        <Box mt={6}>
            <Typography variant="h5" gutterBottom>
                Related Products
            </Typography>
            <Grid container spacing={3}>
                {relatedProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={3} key={product._id}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default RelatedProducts;