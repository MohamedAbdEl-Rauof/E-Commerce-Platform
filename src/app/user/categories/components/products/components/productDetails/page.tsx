"use client";

import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {useProduct} from '@/context/ProductContext';
import {Box, Button, Card, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import {Product} from '@/types/product'; // Adjust the import path as needed

const ProductDetails = () => {
    const searchParams = useSearchParams();
    const {products} = useProduct();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const id = searchParams.get('id');
        const name = searchParams.get('name');
        if (id && name) {
            const foundProduct = products.find(p => p._id === id && p.name === decodeURIComponent(name));
            setProduct(foundProduct || null);
        }
    }, [searchParams, products]);

    if (!product) {
        return <Typography variant="h6">Product not found</Typography>;
    }

    return (
        <Box sx={{maxWidth: 1200, margin: '0 auto', padding: 3}}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="400"
                            image={product.image}
                            alt={product.name}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>{product.name}</Typography>
                        <Typography variant="h6" color="primary" gutterBottom>
                            ${product.price.toFixed(2)}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {product.description}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Category: {product.categoryId}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            In Stock: {product.countInStock}
                        </Typography>
                        <Button variant="contained" color="primary" sx={{mt: 2}}>
                            Add to Cart
                        </Button>
                    </CardContent>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductDetails;