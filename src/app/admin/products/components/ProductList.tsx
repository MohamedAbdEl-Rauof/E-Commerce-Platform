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
            boxShadow: 3,
            bgcolor: 'var(--background)',
            color: 'var(--foreground)',
            overflow: 'hidden'
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 3,
                borderBottom: 1,
                borderColor: 'var(--border)'
            }}>
                <Typography variant="h5" component="h1" sx={{fontWeight: 'bold', color: 'var(--foreground)'}}>
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
                            '&.Mui-focused fieldset': {borderColor: 'var(--focus)'},
                            backgroundColor: 'var(--search-bar-bg)',
                        },
                        '& .MuiInputBase-input': {color: 'var(--search-bar-text)'},
                        '& .MuiInputAdornment-root': {color: 'var(--muted)'}
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
            <TableContainer component={Paper} sx={{maxHeight: 650, bgcolor: 'var(--light)'}}>
                <Table stickyHeader sx={{minWidth: 650}} aria-label="product table">
                    <TableHead sx={{bgcolor: 'var(--background)'}}>
                        <TableRow>
                            <TableCell sx={{
                                fontWeight: 'bold',
                                color: 'var(--foreground)',
                                bgcolor: 'var(--table-header)'
                            }}>Name</TableCell>
                            <TableCell sx={{
                                fontWeight: 'bold',
                                color: 'var(--foreground)',
                                bgcolor: 'var(--table-header)'
                            }}>Image</TableCell>
                            <TableCell sx={{
                                fontWeight: 'bold',
                                color: 'var(--foreground)',
                                bgcolor: 'var(--table-header)'
                            }}>Price</TableCell>
                            <TableCell sx={{
                                fontWeight: 'bold',
                                color: 'var(--foreground)',
                                bgcolor: 'var(--table-header)'
                            }}>Category</TableCell>
                            <TableCell
                                sx={{fontWeight: 'bold', color: 'var(--foreground)', bgcolor: 'var(--table-header)'}}>Created
                                At</TableCell>
                            <TableCell align="center" sx={{
                                fontWeight: 'bold',
                                color: 'var(--foreground)',
                                bgcolor: 'var(--table-header)'
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
                                    transition: 'background-color 0.2s',
                                    '&:hover': {bgcolor: 'var(--hover)'},
                                    color: 'var(--foreground)'
                                }}
                            >
                                <TableCell
                                    sx={{fontWeight: 'medium', color: 'var(--foreground)'}}>{product.name}</TableCell>
                                <TableCell>
                                    <Avatar
                                        src={product.image}
                                        alt={product.name}
                                        variant="rounded"
                                        sx={{width: 50, height: 50, borderRadius: 1}}
                                    />
                                </TableCell>
                                <TableCell sx={{color: 'var(--foreground)'}}>${product?.price.toFixed(2)}</TableCell>
                                <TableCell
                                    sx={{color: 'var(--foreground)'}}>{getCategoryName(product.categoryId)}</TableCell>
                                <TableCell sx={{color: 'var(--foreground)'}}>
                                    {product.createdAt ? formatDate(product.createdAt) : 'N/A'}
                                </TableCell>
                                <TableCell align="center">
                                    <Stack direction="row" spacing={1} justifyContent="center">
                                        <Tooltip title="View details">
                                            <IconButton
                                                onClick={() => onView(product._id)}
                                                size="small"
                                                sx={{
                                                    color: 'var(--info)',
                                                    '&:hover': {bgcolor: 'var(--info-light)'}
                                                }}
                                            >
                                                <TbEye/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Edit product">
                                            <IconButton
                                                onClick={() => onEdit(product._id)}
                                                size="small"
                                                sx={{
                                                    color: 'var(--warning)',
                                                    '&:hover': {bgcolor: 'var(--warning-light)'}
                                                }}
                                            >
                                                <TbEdit/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete product">
                                            <IconButton
                                                onClick={() => handleDeleteClick(product)}
                                                size="small"
                                                sx={{
                                                    color: 'var(--danger)',
                                                    '&:hover': {bgcolor: 'var(--danger-light)'}
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