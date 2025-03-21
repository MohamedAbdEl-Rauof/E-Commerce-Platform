'use client'
import React from 'react';
import {
    Box,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import {TbEdit, TbEye} from "react-icons/tb";

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    stock: number;
    image: string;
}

interface ProductListProps {
    products: Product[];
    onEdit: (id: string) => void;
    onView: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({products, onEdit, onView}) => {
    return (
        <Box>
            <Typography variant="h5" component="h1" gutterBottom>
                Product List
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="product table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>${product.price.toFixed(2)}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell align="center">
                                    <Stack direction="row" spacing={1} justifyContent="center">
                                        <IconButton
                                            color="primary"
                                            onClick={() => onView(product.id)}
                                            aria-label="view product"
                                        >
                                            <TbEye/>
                                        </IconButton>
                                        <IconButton
                                            color="secondary"
                                            onClick={() => onEdit(product.id)}
                                            aria-label="edit product"
                                        >
                                            <TbEdit/>
                                        </IconButton>
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

export default ProductList;