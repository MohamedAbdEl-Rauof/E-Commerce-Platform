"use client";

import React from 'react';
import { useProduct } from '@/context/ProductContext';
import ProductList from './components/ProductList';
import { Card, CircularProgress, styled, Typography } from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: "var(--background)",
    color: "var(--foreground)"
}));

const CategoryProductsPage = ({ params }: { params: { categoryId: string } }) => {
    const { categoryId } = params;
    const { products, loading: productsLoading, error: productsError } = useProduct();

    if (productsLoading) return (<StyledCard sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh'
    }}>
        <CircularProgress size={60} sx={{ color: 'var(--primary)' }} />
        <Typography sx={{ mt: 3, color: 'var(--muted)' }}>
            Loading Products ...
        </Typography>
    </StyledCard>
    );
    if (productsError) return <div>Error: {productsError}</div>;

    const categoryProducts = products.filter(product => product.categoryId === categoryId);


    return <ProductList products={categoryProducts} categoryId={categoryId} />;
};

export default CategoryProductsPage;