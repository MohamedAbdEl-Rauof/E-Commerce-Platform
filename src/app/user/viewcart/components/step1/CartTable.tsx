import React from 'react';
import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem } from '@/context/AddToCartContext';
import { useSession } from "next-auth/react";

interface CartTableProps {
    cartItems: CartItem[];
    addToCart: (userId: string, productId: string) => void;
    decrementFromCart: (userId: string, productId: string) => void;
    deleteItem: (productId: string) => void;
    loading: boolean
}

const StyledTableCell = styled(TableCell)({
    fontWeight: 'bold',
    padding: '16px',
    color: 'var(--foreground)',
});

const StyledTableRow = styled(TableRow)({
    '&:hover': {
        backgroundColor: 'var(--hover)',
    },
});

const QuantityButton = styled(IconButton)({
    color: 'var(--foreground)',
    '&:hover': {
        backgroundColor: 'var(--hover)',
    },
    padding: '4px',
});

const QuantityControlBox = styled(Box)({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    padding: '2px',
    maxWidth: 'fit-content',
});

const CartTable: React.FC<CartTableProps> = React.memo(({
    cartItems,
    addToCart,
    decrementFromCart,
    deleteItem,
    loading
}) => {
    const { data: session } = useSession();
    const userId = session?.user?.id || "";

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                <CircularProgress />
            </Box>
        );
    }

    if (cartItems.length === 0) {
        return (
            <Paper
                elevation={0}
                sx={{
                    p: 6,
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: 2,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <ShoppingBagOutlinedIcon sx={{ fontSize: 64, color: 'var(--muted)' }} />
                <Typography variant="h6" sx={{ color: 'var(--foreground)', fontWeight: 600 }}>
                    Your cart is empty
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--muted)' }}>
                    Looks like you haven&apos;t added anything yet.
                </Typography>
                <Button
                    component={Link}
                    href="/user/shop"
                    variant="contained"
                    sx={{
                        mt: 1,
                        bgcolor: 'var(--foreground)',
                        color: 'var(--background)',
                        textTransform: 'none',
                        '&:hover': { bgcolor: 'var(--muted)' },
                    }}
                >
                    Continue Shopping
                </Button>
            </Paper>
        );
    }

    return (
        <TableContainer component={Paper} elevation={3} sx={{ backgroundColor: 'var(--background)' }}>
            <Table aria-label="cart table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Product</StyledTableCell>
                        <StyledTableCell align="center">Quantity</StyledTableCell>
                        <StyledTableCell align="right">Price</StyledTableCell>
                        <StyledTableCell align="right">Subtotal</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cartItems.map((cartItem) => (
                        <StyledTableRow key={cartItem.productId}>
                            <TableCell component="th" scope="row" sx={{ padding: 2 }}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Image
                                        src={cartItem.image}
                                        alt={cartItem.name}
                                        width={50}
                                        height={50}
                                        style={{
                                            marginRight: 16,
                                            borderRadius: "5px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <Box>
                                        <Typography variant="subtitle1"
                                            sx={{ fontWeight: 'bold', color: 'var(--foreground)' }}>
                                            {cartItem.name}
                                        </Typography>
                                        <Button
                                            startIcon={<CloseIcon />}
                                            onClick={() => deleteItem(cartItem.productId)}
                                            sx={{ color: 'var(--danger)', mt: 1 }}
                                        >
                                            Remove
                                        </Button>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell align="center" sx={{ padding: '8px' }}>  
                                <QuantityControlBox>
                                    <QuantityButton
                                        onClick={() => (decrementFromCart(userId, cartItem.productId))}
                                        size="small"
                                    >
                                        <RemoveIcon fontSize="small" />
                                    </QuantityButton>
                                    <Typography
                                        sx={{
                                            mx: 1,
                                            color: 'var(--foreground)',
                                            minWidth: '20px',
                                            textAlign: 'center'
                                        }}
                                    >
                                        {cartItem.quantity}
                                    </Typography>
                                    <QuantityButton
                                        onClick={() => (addToCart(userId, cartItem.productId))}
                                        size="small"
                                    >
                                        <AddIcon fontSize="small" />
                                    </QuantityButton>
                                </QuantityControlBox>
                            </TableCell>
                            <TableCell align="right" sx={{ color: 'var(--foreground)' }}>
                                ${cartItem.price.toFixed(2)}
                            </TableCell>
                            <TableCell align="right" sx={{ color: 'var(--foreground)' }}>
                                ${(cartItem.price * cartItem.quantity).toFixed(2)}
                            </TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});

CartTable.displayName = 'CartTable';

export default CartTable;