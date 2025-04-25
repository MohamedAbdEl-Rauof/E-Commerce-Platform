'use client'
import React, { useState } from 'react';
import {
    Avatar,
    Box,
    Chip,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import { TbEdit, TbEye, TbSearch, TbTrash } from "react-icons/tb";
import { Category } from '@/context/CategoriesContext';
import DeleteConfirmationDialog from '@/components/Dialog/DeleteConfirmationDialog';

interface ProductListProps {
    categories: Category[];
    onEdit: (id: string) => void;
    onView: (id: string) => void;
    onDelete?: (id: string) => void;
}

const CategorytList: React.FC<ProductListProps> = ({ categories, onEdit, onView, onDelete }) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [categoryToDeleteId, setCategoryToDeleteId] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const handleDeleteClick = (category: Category) => {
        setCategoryToDeleteId(category._id);
        setSelectedCategory(category);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (categoryToDeleteId && onDelete) {
            onDelete(categoryToDeleteId);
        }
        setDeleteDialogOpen(false);
        setCategoryToDeleteId(null);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setCategoryToDeleteId(null);
    };

    const filteredCategories = categories.filter(category => category.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Box sx={{
            width: '100%',
            borderRadius: 2,
            boxShadow: '0 4px 20px var(--shadow)',
            bgcolor: 'var(--background)',
            color: 'var(--foreground)',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            transition: 'box-shadow 0.3s ease',
            '&:hover': {
                boxShadow: '0 6px 24px var(--shadow)'
            }
        }}>
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid var(--border)',
                background: 'linear-gradient(to right, var(--background), color-mix(in srgb, var(--primary) 5%, var(--background)))'
            }}>
                <Typography 
                    variant="h5" 
                    component="h1"
                    sx={{
                        p: 3,
                        fontWeight: 'bold', 
                        color: 'var(--foreground)',
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 15,
                            left: 24,
                            width: '40%',
                            height: 3,
                            borderRadius: 1,
                            bgcolor: 'var(--primary)'
                        }
                    }}
                >
                    Category List
                </Typography>
                <Box sx={{ p: 2 }}>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search by category name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            width: 250,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '& fieldset': {borderColor: 'var(--border)'},
                                '&:hover fieldset': {borderColor: 'var(--primary)'},
                                '&.Mui-focused fieldset': {
                                    borderColor: 'var(--primary)',
                                    borderWidth: 2
                                },
                                backgroundColor: 'color-mix(in srgb, var(--background) 95%, var(--primary))',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 2px 8px var(--shadow)'
                            },
                            '& .MuiInputBase-input': {
                                color: 'var(--foreground)',
                                '&::placeholder': {
                                    color: 'var(--muted)',
                                    opacity: 0.8
                                }
                            },
                            '& .MuiInputAdornment-root': {color: 'var(--primary)'}
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <TbSearch size={18} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </Box>
            <TableContainer
                component={Paper}
                sx={{
                    maxHeight: 650, 
                    bgcolor: 'var(--light)',
                    overflow: 'hidden',
                    border: 'none',
                    boxShadow: 'none',
                    '& .MuiPaper-root': {
                        bgcolor: 'var(--light)',
                        boxShadow: 'none'
                    },
                    '&::-webkit-scrollbar': {
                        width: '8px',
                        height: '8px'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'var(--border)',
                        borderRadius: '4px',
                        '&:hover': {
                            backgroundColor: 'var(--primary)'
                        }
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: 'var(--background)'
                    }
                }}
            >
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="category table">
                    <TableHead>
                        <TableRow>
                            {['Name', 'Image', 'Created At', 'Updated At', 'Product Count', 'Actions'].map((header, index) => (
                                <TableCell
                                    key={header}
                                    align={index > 3 ? "center" : "left"}
                                    sx={{
                                        fontWeight: 'bold',
                                        color: 'var(--foreground)',
                                        bgcolor: 'color-mix(in srgb, var(--primary) 10%, var(--background))',
                                        fontSize: '0.95rem',
                                        padding: '16px',
                                        borderBottom: '2px solid var(--primary)',
                                        position: 'sticky',
                                        top: 0,
                                        zIndex: 10
                                    }}
                                >
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map((category) => (
                                <TableRow
                                    key={category._id}
                                    hover
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            bgcolor: 'color-mix(in srgb, var(--primary) 5%, var(--hover))',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 8px var(--shadow)'
                                        },
                                        color: 'var(--foreground)',
                                        borderBottom: '1px solid var(--border)'
                                    }}
                                >
                                    <TableCell
                                        sx={{
                                            fontWeight: 'medium',
                                            color: 'var(--foreground)',
                                            padding: '12px 16px',
                                            fontSize: '0.95rem'
                                        }}
                                    >
                                        {category.name}
                                    </TableCell>
                                    <TableCell sx={{ padding: '12px 16px' }}>
                                        <Avatar
                                            src={category.image}
                                            alt={category.name}
                                            variant="rounded"
                                            sx={{
                                                width: 60, 
                                                height: 60,
                                                borderRadius: 1,
                                                border: '2px solid var(--border)',
                                                transition: 'transform 0.2s ease, border 0.2s ease',
                                                '&:hover': {
                                                    transform: 'scale(1.05)',
                                                    border: '2px solid var(--primary)'
                                                },
                                                boxShadow: '0 2px 8px var(--shadow)'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ 
                                        color: 'var(--muted)', 
                                        padding: '12px 16px',
                                        fontSize: '0.9rem'
                                    }}>
                                        {formatDate(category.createdAt)}
                                    </TableCell>
                                    <TableCell sx={{ 
                                        color: 'var(--muted)', 
                                        padding: '12px 16px',
                                        fontSize: '0.9rem'
                                    }}>
                                        {formatDate(category.updatedAt)}
                                    </TableCell>
                                    <TableCell align="center" sx={{ padding: '12px 16px' }}>
                                        <Chip
                                            label={category.productCount || 0}
                                            size="small"
                                            sx={{
                                                bgcolor: 'color-mix(in srgb, var(--primary) 15%, transparent)',
                                                color: 'var(--primary)',
                                                fontWeight: 'bold',
                                                padding: '4px',
                                                minWidth: '40px',
                                                border: '1px solid var(--primary)',
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                    bgcolor: 'color-mix(in srgb, var(--primary) 25%, transparent)',
                                                    transform: 'scale(1.05)'
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="center" sx={{ padding: '12px 16px' }}>
                                        <Stack direction="row" spacing={1.5} justifyContent="center">
                                            <Tooltip title="View details" arrow>
                                                <IconButton
                                                    onClick={() => onView(category._id)}
                                                    aria-label="view category"
                                                    size="small"
                                                    sx={{
                                                        color: 'var(--info)',
                                                        bgcolor: 'color-mix(in srgb, var(--info) 10%, transparent)',
                                                        width: '32px',
                                                        height: '32px',
                                                        transition: 'all 0.2s ease',
                                                        boxShadow: '0 2px 5px var(--shadow)',
                                                        '&:hover': {
                                                            bgcolor: 'var(--info-light)',
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 4px 8px var(--shadow)'
                                                        }
                                                    }}
                                                >
                                                    <TbEye size={18} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Edit category" arrow>
                                                <IconButton
                                                    onClick={() => onEdit(category._id)}
                                                    aria-label="edit category"
                                                    size="small"
                                                    sx={{
                                                        color: 'var(--warning)',
                                                        bgcolor: 'color-mix(in srgb, var(--warning) 10%, transparent)',
                                                        width: '32px',
                                                        height: '32px',
                                                        transition: 'all 0.2s ease',
                                                        boxShadow: '0 2px 5px var(--shadow)',
                                                        '&:hover': {
                                                            bgcolor: 'var(--warning-light)',
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 4px 8px var(--shadow)'
                                                        }
                                                    }}
                                                >
                                                    <TbEdit size={18} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete category" arrow>
                                                <IconButton
                                                    onClick={() => handleDeleteClick(category)}
                                                    aria-label="delete category"
                                                    size="small"
                                                    sx={{
                                                        color: 'var(--danger)',
                                                        bgcolor: 'color-mix(in srgb, var(--danger) 10%, transparent)',
                                                        width: '32px',
                                                        height: '32px',
                                                        transition: 'all 0.2s ease',
                                                        boxShadow: '0 2px 5px var(--shadow)',
                                                        '&:hover': {
                                                            bgcolor: 'var(--danger-light)',
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 4px 8px var(--shadow)'
                                                        }
                                                    }}
                                                >
                                                    <TbTrash size={18} />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell 
                                    colSpan={6} 
                                    align="center" 
                                    sx={{ 
                                        py: 5, 
                                        color: 'var(--muted)',
                                        fontStyle: 'italic',
                                        bgcolor: 'color-mix(in srgb, var(--background) 98%, var(--primary))'
                                    }}
                                >
                                    {searchTerm ? 
                                        `No categories found matching "${searchTerm}"` : 
                                        "No categories available yet"}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            
            {/* Footer with category count */}
            <Box 
                sx={{ 
                    p: 2, 
                    borderTop: '1px solid var(--border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    bgcolor: 'color-mix(in srgb, var(--background) 98%, var(--primary))'
                }}
            >
                <Typography 
                    variant="body2" 
                    sx={{ 
                        color: 'var(--muted)',
                        fontStyle: 'italic'
                    }}
                >
                    {filteredCategories.length} {filteredCategories.length === 1 ? 'category' : 'categories'} found
                    {searchTerm && ` for "${searchTerm}"`}
                </Typography>
                
                <Typography 
                    variant="body2" 
                    sx={{ 
                        color: 'var(--muted)',
                        fontStyle: 'italic'
                    }}
                >
                    Total categories: {categories.length}
                </Typography>
            </Box>
            
            {/* Delete confirmation dialog */}
            <DeleteConfirmationDialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                isCategory={true}
                productCount={selectedCategory?.productCount || 0}
                categoryName={selectedCategory?.name || ''}
            />
        </Box>
    );
};


export default CategorytList;