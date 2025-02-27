"use client";
import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { IoMdClose } from "react-icons/io";

interface CartHeaderProps {
    closeCart: () => void;
}

const CartHeader: React.FC<CartHeaderProps> = ({ closeCart }) => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: '16px',
            paddingTop: '12px',
            paddingRight: '16px',
            backgroundColor: 'var(--background)',
            color: 'var(--foreground)',
        }}
    >
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            Cart
        </Typography>
        <IconButton
            onClick={closeCart}
            sx={{
                color: 'var(--muted)',
                '&:hover': {
                    backgroundColor: 'var(--hover)',
                },
            }}
        >
            <IoMdClose fontSize="large" />
        </IconButton>
    </Box>
);

export default CartHeader;