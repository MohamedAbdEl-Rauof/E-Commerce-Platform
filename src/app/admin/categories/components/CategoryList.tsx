'use client'
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import {CategoryListProps} from '../types';
import {useCategories} from "@/context/CategoriesContext";

const CategoryList: React.FC<CategoryListProps> = ({onView, onEdit, onDelete}) => {

    const {categories, loading, error} = useCategories();

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                const response = await fetch(`/api/categories?id=${id}`, {method: 'DELETE'});
                if (!response.ok) {
                    throw new Error('Failed to delete category');
                }

                // Call the parent component's onDelete
                onDelete(id);
            } catch (err) {
                console.error(err);
            }
        }
    };

    if (loading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', p: 3}}>
                <CircularProgress/>
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box sx={{bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden'}}>
            <Typography variant="h6" sx={{p: 2, bgcolor: 'primary.main', color: 'primary.contrastText'}}>
                Category List
            </Typography>
            <TableContainer component={Paper} sx={{boxShadow: 'none'}}>
                <Table sx={{minWidth: 650}} aria-label="categories table">
                    <TableHead sx={{bgcolor: 'background.default'}}>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Products</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <TableRow key={category._id} hover>
                                    <TableCell>
                                        <Box sx={{
                                            width: 60,
                                            height: 60,
                                            position: 'relative',
                                            borderRadius: 1,
                                            overflow: 'hidden'
                                        }}>
                                            <img
                                                src={category.image}
                                                alt={category.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </Box>
                                    </TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>{new Date(category.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Box sx={{
                                            display: 'inline-flex',
                                            bgcolor: 'primary.light',
                                            color: 'primary.contrastText',
                                            borderRadius: '16px',
                                            px: 1.5,
                                            py: 0.5
                                        }}>
                                            {category.productCount} products
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box sx={{display: 'flex', justifyContent: 'center', gap: 1}}>
                                            <button
                                                onClick={() => onView(category._id)}
                                                style={{
                                                    background: '#4CAF50',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    padding: '6px 12px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() => onEdit(category._id)}
                                                style={{
                                                    background: '#2196F3',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    padding: '6px 12px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category._id)}
                                                style={{
                                                    background: '#F44336',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    padding: '6px 12px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No categories found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default CategoryList;