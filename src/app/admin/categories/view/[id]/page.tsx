import React from 'react';
import CategoriesContent from '../../components/CategoriesContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const metadata = {
    title: 'View Category',
    description: 'View product category details',
};

export default function ViewCategoryPage({params}: { params: { id: string } }) {
    return (
        <Box sx={{p: 3}}>
            <Typography variant="h4" gutterBottom>
                View Category
            </Typography>
            <CategoriesContent mode="view" categoryId={params.id}/>
        </Box>
    );
}