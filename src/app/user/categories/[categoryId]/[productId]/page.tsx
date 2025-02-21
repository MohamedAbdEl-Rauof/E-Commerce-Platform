'use client';

import React from 'react';
import { Container, Box, Grid } from '@mui/material';
import { useProduct } from '@/context/ProductContext';
import ProductHeader from './components/ProductHeader';
import ProductImage from './components/ProductImage';
import ProductDetails from './components/ProductDetails';
import ProductActions from './components/ProductActions';
import RelatedProducts from './components/RelatedProducts';
import Comments from "./components/comments/page";

const ProductPage = ({ params }: { params: { categoryId: string; productId: string } }) => {
    const { categoryId, productId } = params;
    const { products } = useProduct();

    const product = products.find(p => p._id === productId);

    if (!product) return <div>Product not found</div>;

    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <ProductHeader name={product.name} />
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <ProductImage src={product.image} alt={product.name} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ProductDetails
                            name={product.name}
                            description={product.description}
                            price={product.price}
                        />
                        <ProductActions productId={product._id} />
                    </Grid>
                </Grid>
                <RelatedProducts categoryId={categoryId} currentProductId={productId} />
                <Comments />
            </Box>
        </Container>
    );
}

export default ProductPage;