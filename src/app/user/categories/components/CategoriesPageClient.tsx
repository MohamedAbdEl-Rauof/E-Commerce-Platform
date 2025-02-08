"use client";
import React, {useEffect, useState} from 'react';
import {Container, Typography} from '@mui/material';
import {useCategories} from '@/context/CategoriesContext';
import CategoryBanner from './CategoryBanner';
import CategoryGrid from './CategoryGrid';

const CategoriesPageClient = () => {
    const {categories, loading} = useCategories();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // or a loading spinner
    }

    return (
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
    );
};

export default CategoriesPageClient;