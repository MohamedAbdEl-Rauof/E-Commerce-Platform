'use client';

import React from 'react';
import { Box, Container } from '@mui/material';
import { useProduct } from '@/context/ProductContext';
import ProductDetails from './components/ProductDetails';
import RelatedProducts from './components/RelatedProducts';
import Comments from "./components/comments/page";
import CircularProgress from '@mui/material/CircularProgress';

const ProductPage = ({ params }: { params: { categoryId: string; productId: string } }) => {
    const { categoryId, productId } = params;
    const { products } = useProduct();

    const product = products.find(p => p._id === productId);

    if (!product) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <ProductDetails product={product} categoryId={categoryId} />
                <Box mt={6}>
                    <RelatedProducts categoryId={categoryId} currentProductId={productId} />
                </Box>
                <Box mt={6}>
                    <Comments />
                </Box>
            </Box>
        </Container>
    );
}

export default ProductPage;