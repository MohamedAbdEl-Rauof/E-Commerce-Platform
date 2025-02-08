"use client";
import React from 'react';
import {Container, Typography} from '@mui/material';
import {useCategories} from '@/context/CategoriesContext';
import CategoryBanner from './components/CategoryBanner';
import CategoryGrid from './components/CategoryGrid';

const CategoriesPage = () => {
    const {categories, loading} = useCategories();

    return (
        <>
            <div className="min-h-screen">
                <Container maxWidth={false} sx={{maxWidth: '2000px'}}>
                    <CategoryBanner loading={loading}/>
                    <Typography variant="h4" component="h5" align="center" gutterBottom
                                sx={{marginTop: '2.5rem', marginBottom: '4rem'}}>
                        Explore Our Categories
                    </Typography>
                    <CategoryGrid categories={categories} loading={loading}/>
                </Container>
            </div>
        </>
    );
};

export default CategoriesPage;