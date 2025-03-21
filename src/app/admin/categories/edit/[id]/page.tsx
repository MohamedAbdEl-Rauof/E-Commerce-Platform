'use client'
import React from 'react';
import {useParams} from 'next/navigation';
import {Box} from '@mui/material';
import CategoriesContent from '../../components/CategoriesContent';

const EditCategoryPage = () => {
    const params = useParams();
    // Check if params exists and has an id property
    const productId = params ? params.id as string : '';

    return (
        <Box sx={{p: 3}}>
            <CategoriesContent productId={productId} editOrView="edit"/>
        </Box>
    );
};

export default EditCategoryPage;