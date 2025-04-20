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
            boxShadow: 3,
            bgcolor: 'var(--background)',
            color: 'var(--foreground)'
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" component="h1"
                    sx={{
                        p: 3,
                        bgcolor: 'var(--background)',
                        borderBottom: 1,
                        borderColor: 'var(--border)',
                        color: 'var(--foreground)'
                    }}>
                    Category List
                </Typography>
                <Box sx={{ p: 2, bgcolor: 'var(--background)' }}>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search by category name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'var(--border)',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'var(--primary)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'var(--focus)',
                                },
                                backgroundColor: 'var(--search-bar-bg)',
                            },
                            '& .MuiInputBase-input': {
                                color: 'var(--search-bar-text)',
                            },
                            '& .MuiInputAdornment-root': {
                                color: 'var(--muted)',
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <TbSearch />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </Box>
            <TableContainer
                component={Paper}
                sx={{
                    maxHeight: 700, 
                    bgcolor: 'var(--light)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px var(--shadow)',
                    overflow: 'hidden',
                    border: '1px solid var(--border)',
                    '& .MuiPaper-root': {
                        bgcolor: 'var(--light)',
                    },
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'var(--light)',
                        borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'var(--muted)',
                        borderRadius: '10px',
                        border: '2px solid var(--light)',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: 'var(--dark)',
                    }
                }}
                className="scroll-container"
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
                                        bgcolor: 'var(--background)',
                                        fontSize: '0.95rem',
                                        padding: '16px',
                                        borderBottom: '2px solid var(--border)',
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
                                            bgcolor: 'var(--hover)',
                                            transform: 'translateY(-1px)',
                                            boxShadow: '0 2px 5px var(--shadow)'
                                        },
                                        color: 'var(--foreground)',
                                        borderBottom: '1px solid var(--border)'
                                    }}
                                >
                                    <TableCell
                                        sx={{
                                            fontWeight: 'medium',
                                            color: 'var(--foreground)',
                                            padding: '12px 16px'
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
                                                border: '1px solid var(--border)',
                                                boxShadow: '0 2px 4px var(--shadow)'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ color: 'var(--foreground)', padding: '12px 16px' }}>
                                        {formatDate(category.createdAt)}
                                    </TableCell>
                                    <TableCell sx={{ color: 'var(--foreground)', padding: '12px 16px' }}>
                                        {formatDate(category.updatedAt)}
                                    </TableCell>
                                    <TableCell align="center" sx={{ padding: '12px 16px' }}>
                                        <Chip
                                            label={category.productCount || 0}
                                            size="small"
                                            sx={{
                                                borderColor: 'var(--primary)',
                                                color: 'var(--primary)',
                                                backgroundColor: 'transparent',
                                                fontWeight: 'bold',
                                                padding: '4px',
                                                minWidth: '40px'
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
                                                        bgcolor: 'var(--info)',
                                                        color: 'var(--light)',
                                                        width: '32px',
                                                        height: '32px',
                                                        transition: 'all 0.2s ease',
                                                        '&:hover': {
                                                            bgcolor: 'var(--info)',
                                                            opacity: 0.9,
                                                            transform: 'scale(1.1)'
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
                                                        bgcolor: 'var(--warning)',
                                                        color: 'var(--dark)',
                                                        width: '32px',
                                                        height: '32px',
                                                        transition: 'all 0.2s ease',
                                                        '&:hover': {
                                                            bgcolor: 'var(--warning)',
                                                            opacity: 0.9,
                                                            transform: 'scale(1.1)'
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
                                                        bgcolor: 'var(--danger)',
                                                        color: 'var(--light)',
                                                        width: '32px', 
                                                        height: '32px',
                                                        transition: 'all 0.2s ease',
                                                        '&:hover': {
                                                            bgcolor: 'var(--danger)',
                                                            opacity: 0.9,
                                                            transform: 'scale(1.1)'
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
                                <TableCell colSpan={6} align="center" sx={{ py: 3, color: 'var(--muted)' }}>
                                    No categories found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
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