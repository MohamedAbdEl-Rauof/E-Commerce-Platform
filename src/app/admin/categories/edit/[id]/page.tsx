import React from 'react';
import CategoriesContent from '../../components/CategoriesContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const metadata = {
    title: 'Edit Category',
    description: 'Edit product category',
};

export default function EditCategoryPage({params}: { params: { id: string } }) {
    return (
        <Box sx={{p: 3}}>
            <Typography variant="h4" gutterBottom>
                Edit Category
            </Typography>
            <CategoriesContent mode="edit" categoryId={params.id}/>
        </Box>
    );
}