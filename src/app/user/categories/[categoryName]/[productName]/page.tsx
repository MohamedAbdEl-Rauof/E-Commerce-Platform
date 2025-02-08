"use client";

import React from 'react';
import {useProduct} from '@/context/ProductContext';
import ProductDetails from './components/ProductDetails';
import {Box, CircularProgress, Container, Typography} from '@mui/material';
import {usePathname} from "next/navigation";

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

const ProductDetailsPage = () => {
    const pathname = usePathname();
    const {products, loading, error} = useProduct(); // Call useProduct unconditionally

    // Handle loading and error states
    if (loading) return <CircularProgress/>;
    if (error) return <Typography color="error">Error: {error}</Typography>;

    // Check if pathname is null
    if (!pathname) {
        return <Typography>Path not found</Typography>; // Handle the case when pathname is null
    }

    const pathParts = pathname.split('/');
    const categoryName = decodeURIComponent(pathParts[pathParts.length - 2]);
    const productName = decodeURIComponent(pathParts[pathParts.length - 1]);

    console.log("Category Name:", categoryName);
    console.log("Product Name:", productName);

    const product = products.find(p => p.name === productName) as Product | undefined;

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
