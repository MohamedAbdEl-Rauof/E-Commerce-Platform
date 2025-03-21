'use client'
import React from 'react';
import {useParams} from 'next/navigation';
import {Box} from '@mui/material';
import CategoriesContent from '../../components/CategoriesContent';

const ViewCategoryPage = () => {
    const params = useParams();
    const productId = params ? params.id as string : '';

    return (
        <Box sx={{p: 3}}>
            <CategoriesContent productId={productId} editOrView="view"/>
        </Box>
    );
};

export default ViewCategoryPage;