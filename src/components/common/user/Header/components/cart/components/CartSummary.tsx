"use client";
import React from "react";
import {Box, Button, Typography, useMediaQuery} from "@mui/material";
import Link from "next/link";

interface CartItem {
    productId: string;
    quantity: number;
    price: number;
    isFavourite: boolean;
    name: string;
    image: string;
}

interface CartSummaryProps {
    handleCheckout: () => void;
    cartItems: CartItem[];
}

const calculateSubtotal = (cartItems: CartItem[]) => {
    return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
};

const CartSummary: React.FC<CartSummaryProps> = ({handleCheckout, cartItems}) => {
    const subtotal = calculateSubtotal(cartItems);
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <Box sx={{mt: 'auto', p: {xs: 2, sm: 3}}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', p: {xs: 1, sm: 2}}}>
                <Typography variant="body2" sx={{fontSize: {xs: '0.875rem', sm: '1rem'}, color: 'var(--foreground)'}}>
                    Subtotal
                </Typography>
                <Typography variant="body2" sx={{fontSize: {xs: '0.875rem', sm: '1rem'}, color: 'var(--foreground)'}}>
                    $ {subtotal.toFixed(2)}
                </Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', p: {xs: 1, sm: 2}}}>
                <Typography variant="body2" sx={{
                    fontWeight: 'bold',
                    fontSize: {xs: '0.875rem', sm: '1rem'},
                    color: 'var(--foreground)'
                }}>
                    Total
                </Typography>
                <Typography variant="body2" sx={{fontSize: {xs: '0.875rem', sm: '1rem'}, color: 'var(--foreground)'}}>
                    $ {subtotal.toFixed(2)}
                </Typography>
            </Box>
            <Button
                variant="contained"
                onClick={handleCheckout}
                sx={{
                    width: isSmallScreen ? '100%' : '90%',
                    mx: isSmallScreen ? '0%' : '5%',
                    fontSize: {xs: '0.875rem', sm: '1rem'},
                    bgcolor: 'var(--focus)',
                    color: 'var(--foreground)',
                    '&:hover': {
                        bgcolor: 'var(--primary)',
                    },
                }}
            >
                Checkout
            </Button>
            <Box sx={{textAlign: 'center', mt: 2}}>
                <Link href="/user/viewcart" passHref>
                    <Typography
                        component="a"
                        variant="body2"
                        sx={{
                            color: 'var(--foreground)',
                            fontSize: {xs: '0.75rem', sm: '0.875rem'},
                            fontWeight: 'bold',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                        }}
                    >
                        View Cart
                    </Typography>
                </Link>
            </Box>
        </Box>
    );
};

export default CartSummary;