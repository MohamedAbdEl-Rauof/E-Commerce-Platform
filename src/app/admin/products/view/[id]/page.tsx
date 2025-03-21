'use client'
import React from 'react';
import {useParams} from 'next/navigation';
import {Box} from '@mui/material';
import ProductContent from "../../components/ProductContent";

const ViewProductPage = () => {
    const params = useParams();
    const productId = params ? params.id as string : '';


    return (
        <Box sx={{p: 3}}>
            <ProductContent productId={productId} editOrView="view"/>
        </Box>
    );
};

export default ViewProductPage;