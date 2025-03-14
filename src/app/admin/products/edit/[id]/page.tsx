'use client'
import React from 'react';
import {useParams, useRouter} from 'next/navigation';
import {Box} from '@mui/material';
import ProductContent from "../../components/ProductContent"

const EditProductPage = () => {
    const params = useParams();
    const router = useRouter();
    const productId = params.id as string;

    // const handleBack = () => {
    //     router.push('/admin/products');
    // };

    return (
        <Box sx={{p: 3}}>
            <ProductContent productId={productId} editOrView="edit"/>
        </Box>
    );
};

export default EditProductPage;