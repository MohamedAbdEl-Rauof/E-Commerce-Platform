import React from 'react';
import CategoriesContent from './components/CategoriesContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {CategoriesProvider} from '@/context/CategoriesContext';

export const metadata = {
    title: 'Categories Management',
    description: 'Manage product categories',
};

export default function CategoriesPage() {
    return (
        <CategoriesProvider>
            <Box sx={{p: 3}}>
                <Typography variant="h4" gutterBottom>
                    Categories Management
                </Typography>
                <CategoriesContent mode="list"/>
            </Box>
        </CategoriesProvider>

    );
}