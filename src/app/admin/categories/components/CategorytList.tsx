'use client'
import React from 'react';
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
import {TbEdit, TbEye, TbSearch, TbTrash} from "react-icons/tb";
import {Category} from '@/context/CategoriesContext';

interface ProductListProps {
    categories: Category[];
    onEdit: (id: string) => void;
    onView: (id: string) => void;
    onDelete?: (id: string) => void;
}

const CategorytList: React.FC<ProductListProps> = ({categories, onEdit, onView, onDelete}) => {
    const [searchTerm, setSearchTerm] = React.useState('');

    const filteredCategories = categories.filter(category => category.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <Box sx={{
            width: '100%',
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: 'var(--background)',
            color: 'var(--foreground)'
        }}>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
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
                <Box sx={{p: 2, bgcolor: 'var(--background)'}}>
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
                                    <TbSearch/>
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
                    '& .MuiPaper-root': {
                        bgcolor: 'var(--light)',
                    }
                }}
            >
                <Table stickyHeader sx={{minWidth: 650}} aria-label="category table">
                    <TableHead sx={{bgcolor: 'var(--background)'}}>
                        <TableRow sx={{bgcolor: 'var(--background)'}}>
                            <TableCell sx={{fontWeight: 'bold', color: 'var(--foreground)'}}>Name</TableCell>
                            <TableCell sx={{fontWeight: 'bold', color: 'var(--foreground)'}}>Image</TableCell>
                            <TableCell sx={{fontWeight: 'bold', color: 'var(--foreground)'}}>Created At</TableCell>
                            <TableCell sx={{fontWeight: 'bold', color: 'var(--foreground)'}}>Updated At</TableCell>
                            <TableCell align="center" sx={{fontWeight: 'bold', color: 'var(--foreground)'}}>Product
                                Count</TableCell>
                            <TableCell align="center"
                                       sx={{fontWeight: 'bold', color: 'var(--foreground)'}}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCategories.map((category) => (
                            <TableRow
                                key={category._id}
                                hover
                                sx={{
                                    '&:last-child td, &:last-child th': {border: 0},
                                    transition: 'background-color 0.2s',
                                    '&:hover': {
                                        bgcolor: 'var(--hover)'
                                    },
                                    color: 'var(--foreground)'
                                }}
                            >
                                <TableCell
                                    sx={{fontWeight: 'medium', color: 'var(--foreground)'}}>{category.name}</TableCell>
                                <TableCell>
                                    <Avatar
                                        src={category.image}
                                        alt={category.name}
                                        variant="rounded"
                                        sx={{width: 50, height: 50}}
                                    />
                                </TableCell>
                                <TableCell
                                    sx={{color: 'var(--foreground)'}}>{new Date().toLocaleDateString()}</TableCell>
                                <TableCell
                                    sx={{color: 'var(--foreground)'}}>{new Date().toLocaleDateString()}</TableCell>
                                <TableCell align="center">
                                    <Chip
                                        label={category.productCount || 0}
                                        color="primary"
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                            borderColor: 'var(--primary)',
                                            color: 'var(--primary)'
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Stack direction="row" spacing={1} justifyContent="center">
                                        <Tooltip title="View details">
                                            <IconButton
                                                onClick={() => onView(category._id)}
                                                aria-label="view category"
                                                size="small"
                                                sx={{
                                                    bgcolor: 'var(--info)',
                                                    color: 'var(--light)',
                                                    '&:hover': {
                                                        bgcolor: 'var(--info)',
                                                        opacity: 0.9
                                                    }
                                                }}
                                            >
                                                <TbEye/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Edit category">
                                            <IconButton
                                                onClick={() => onEdit(category._id)}
                                                aria-label="edit category"
                                                size="small"
                                                sx={{
                                                    bgcolor: 'var(--warning)',
                                                    color: 'var(--dark)',
                                                    '&:hover': {
                                                        bgcolor: 'var(--warning)',
                                                        opacity: 0.9
                                                    }
                                                }}
                                            >
                                                <TbEdit/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete category">
                                            <IconButton
                                                onClick={() => onDelete && onDelete(category._id)}
                                                aria-label="delete category"
                                                size="small"
                                                sx={{
                                                    bgcolor: 'var(--danger)',
                                                    color: 'var(--light)',
                                                    '&:hover': {
                                                        bgcolor: 'var(--danger)',
                                                        opacity: 0.9
                                                    }
                                                }}
                                            >
                                                <TbTrash/>
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default CategorytList;