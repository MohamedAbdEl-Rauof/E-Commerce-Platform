"use client";

import React from 'react';
import {useProduct} from '@/context/ProductContext';
import ProductDetails from './components/ProductDetails';
import {Box, Container, Typography} from '@mui/material';

const ProductDetailsPage = ({params}: { params: { categoryName: string, productName: string } }) => {
    const {categoryName, productName} = params;
    const {products, loading, error} = useProduct();

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">Error: {error}</Typography>;

    const product = products.find(p => p.name === decodeURIComponent(productName));
    if (!product) return <Typography>Product not found</Typography>;

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" gutterBottom>
                    {product.name}
                </Typography>
                <ProductDetails product={product}/>
            </Box>
        </Container>
    );
};

export default ProductDetailsPage;