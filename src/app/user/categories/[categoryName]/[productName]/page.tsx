"use client";

import React, {use} from 'react';
import {useProduct} from '@/context/ProductContext';
import ProductDetails from './components/ProductDetails';
import {Box, CircularProgress, Container, Typography} from '@mui/material';

interface Product {
    _id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    PriceBeforeDiscount?: number;
    rating?: number;
    categoryName: string;
    isNew?: boolean;
    discount?: number;
}

const ProductDetailsPage = ({params}: { params: Promise<{ categoryName: string; productName: string }> }) => {
    const {categoryName, productName} = use(params);
    const {products, loading, error} = useProduct();

    if (loading) return <CircularProgress/>;
    if (error) return <Typography color="error">Error: {error}</Typography>;

    const product = products.find(p => p.name === decodeURIComponent(productName)) as Product | undefined;

    if (!product) return <Typography>Product not found</Typography>;

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" gutterBottom>
                    {product.name}
                </Typography>
                <ProductDetails product={product} categoryName={categoryName}/>
            </Box>
        </Container>
    );
};

export default ProductDetailsPage;