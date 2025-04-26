'use client'
import React, {useState} from 'react';
import {
    Avatar,
    Box,
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
import {Product} from "@/context/ProductContext";
import {Category} from '@/context/CategoriesContext';
import {format} from 'date-fns';
import DeleteConfirmationDialog from "@/components/Dialog/DeleteConfirmationDialog";

interface ProductListProps {
    products: Product[];
    onEdit: (id: string) => void;
    onView: (id: string) => void;
    onDelete: (id: string) => void;
    categories: Category[];
}

const ProductList: React.FC<ProductListProps> = ({products, onEdit, onView, onDelete, categories}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [productToDeleteId, setProductToDeleteId] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleDeleteClick = (product: Product) => {
        setProductToDeleteId(product._id);
        setSelectedProduct(product);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (productToDeleteId) {
            onDelete(productToDeleteId);
            setSelectedProduct(null);
        }
        setDeleteDialogOpen(false);
        setProductToDeleteId(null);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setProductToDeleteId(null);
        setSelectedProduct(null);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getCategoryName = (categoryId: string) => {
        const category = categories.find(cat => cat._id === categoryId);
        return category ? category.name : 'Unknown';
    }

    const formatDate = (date: Date | string) => {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        return format(date, 'MMM dd, yyyy');
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
                p: 3,
                borderBottom: '1px solid var(--border)',
                background: 'linear-gradient(to right, var(--background), color-mix(in srgb, var(--primary) 5%, var(--background)))'
            }}>
                <Typography 
                    variant="h5" 
                    component="h1" 
                    sx={{
                        fontWeight: 'bold', 
                        color: 'var(--foreground)',
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: -5,
                            left: 0,
                            width: '40%',
                            height: 3,
                            borderRadius: 1,
                            bgcolor: 'var(--primary)'
                        }
                    }}
                >
                    Product List
                </Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search products..."
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
                                <TbSearch size={18}/>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <TableContainer 
                component={Paper} 
                sx={{
                    maxHeight: 650, 
                    bgcolor: 'var(--light)',
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
                <Table stickyHeader sx={{minWidth: 650}} aria-label="product table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{
                                fontWeight: 'bold',
                                color: 'var(--foreground)',
                                bgcolor: 'color-mix(in srgb, var(--primary) 10%, var(--background))',
                                borderBottom: '2px solid var(--primary)'
                            }}>Name</TableCell>
                            <TableCell sx={{
                                fontWeight: 'bold',
                                color: 'var(--foreground)',
                                bgcolor: 'color-mix(in srgb, var(--primary) 10%, var(--background))',
                                borderBottom: '2px solid var(--primary)'
                            }}>Image</TableCell>
                            <TableCell sx={{
                                fontWeight: 'bold',
                                color: 'var(--foreground)',
                                bgcolor: 'color-mix(in srgb, var(--primary) 10%, var(--background))',
                                borderBottom: '2px solid var(--primary)'
                            }}>Price</TableCell>
                            <TableCell sx={{
                                fontWeight: 'bold',
                                color: 'var(--foreground)',
                                bgcolor: 'color-mix(in srgb, var(--primary) 10%, var(--background))',
                                borderBottom: '2px solid var(--primary)'
                            }}>Category</TableCell>
                            <TableCell sx={{
                                fontWeight: 'bold', 
                                color: 'var(--foreground)', 
                                bgcolor: 'color-mix(in srgb, var(--primary) 10%, var(--background))',
                                borderBottom: '2px solid var(--primary)'
                            }}>
                                Created At
                            </TableCell>
                            <TableCell align="center" sx={{
                                fontWeight: 'bold',
                                color: 'var(--foreground)',
                                bgcolor: 'color-mix(in srgb, var(--primary) 10%, var(--background))',
                                borderBottom: '2px solid var(--primary)'
                            }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.map((product) => (
                            <TableRow
                                key={product._id}
                                hover
                                sx={{
                                    '&:last-child td, &:last-child th': {border: 0},
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
                                        fontSize: '0.95rem'
                                    }}
                                >
                                    {product.name}
                                </TableCell>
                                <TableCell>
                                    <Avatar
                                        src={product.image}
                                        alt={product.name}
                                        variant="rounded"
                                        sx={{
                                            width: 50, 
                                            height: 50, 
                                            borderRadius: 1,
                                            border: '2px solid var(--border)',
                                            transition: 'transform 0.2s ease',
                                            '&:hover': {
                                                transform: 'scale(1.1)',
                                                border: '2px solid var(--primary)'
                                            },
                                            boxShadow: '0 2px 8px var(--shadow)'
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{
                                    color: 'var(--primary)', 
                                    fontWeight: 'bold',
                                    fontSize: '0.95rem'
                                }}>
                                    ${product?.price.toFixed(2)}
                                </TableCell>
                                <TableCell sx={{
                                    color: 'var(--foreground)',
                                    '& span': {
                                        display: 'inline-block',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        backgroundColor: 'color-mix(in srgb, var(--secondary) 15%, transparent)',
                                        color: 'var(--secondary)',
                                        fontWeight: 'medium',
                                        fontSize: '0.85rem'
                                    }
                                }}>
                                    <span>{getCategoryName(product.categoryId)}</span>
                                </TableCell>
                                <TableCell sx={{
                                    color: 'var(--muted)',
                                    fontSize: '0.9rem'
                                }}>
                                    {product.createdAt ? formatDate(product.createdAt) : 'N/A'}
                                </TableCell>
                                <TableCell align="center">
                                    <Stack direction="row" spacing={1} justifyContent="center">
                                        <Tooltip title="View details" arrow>
                                            <IconButton
                                                onClick={() => onView(product._id)}
                                                size="small"
                                                sx={{
                                                    color: 'var(--info)',
                                                    bgcolor: 'color-mix(in srgb, var(--info) 10%, transparent)',
                                                    '&:hover': {
                                                        bgcolor: 'var(--info-light)',
                                                        transform: 'translateY(-2px)'
                                                    },
                                                    transition: 'all 0.2s ease',
                                                    boxShadow: '0 2px 5px var(--shadow)'
                                                }}
                                            >
                                                <TbEye size={18}/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Edit product" arrow>
                                            <IconButton
                                                onClick={() => onEdit(product._id)}
                                                size="small"
                                                sx={{
                                                    color: 'var(--warning)',
                                                    bgcolor: 'color-mix(in srgb, var(--warning) 10%, transparent)',
                                                    '&:hover': {
                                                        bgcolor: 'var(--warning-light)',
                                                        transform: 'translateY(-2px)'
                                                    },
                                                    transition: 'all 0.2s ease',
                                                    boxShadow: '0 2px 5px var(--shadow)'
                                                }}
                                            >
                                                <TbEdit size={18}/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete product" arrow>
                                            <IconButton
                                                onClick={() => handleDeleteClick(product)}
                                                size="small"
                                                sx={{
                                                    color: 'var(--danger)',
                                                    bgcolor: 'color-mix(in srgb, var(--danger) 10%, transparent)',
                                                    '&:hover': {
                                                        bgcolor: 'var(--danger-light)',
                                                        transform: 'translateY(-2px)'
                                                    },
                                                    transition: 'all 0.2s ease',
                                                    boxShadow: '0 2px 5px var(--shadow)'
                                                }}
                                            >
                                                <TbTrash size={18}/>
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredProducts.length === 0 && (
                            <TableRow>
                                <TableCell 
                                    colSpan={6} 
                                    align="center" 
                                    sx={{ 
                                        py: 4,
                                        color: 'var(--muted)',
                                        fontStyle: 'italic',
                                        bgcolor: 'color-mix(in srgb, var(--background) 98%, var(--primary))'
                                    }}
                                >
                                    No products found matching your search criteria
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
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
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                </Typography>
            </Box>
            <DeleteConfirmationDialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                isCategory={false}
                productCount={0}
                categoryName={selectedProduct?.name}
            />
        </Box>
    );
};

export default ProductList;