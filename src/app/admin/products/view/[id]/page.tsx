'use client'
import React from 'react';
import {useParams, useRouter} from 'next/navigation';
import {Box} from '@mui/material';
import ProductContent from "@/app/admin/products/components/ProductContent";

const ViewProductPage = () => {
    const params = useParams();
    const router = useRouter();
    const productId = params.id as string;

    const handleBack = () => {
        router.push('/admin/products');
    };

    return (
        <Box sx={{p: 3}}>
            <ProductContent productId={productId} editOrView="view"/>
        </Box>
    );
};

export default ViewProductPage;