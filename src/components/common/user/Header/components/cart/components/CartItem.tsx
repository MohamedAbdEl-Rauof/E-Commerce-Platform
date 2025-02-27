"use client";
import React from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Image from "next/image";

interface Item {
    productId: string;
    quantity: number;
    isFavourite: boolean;
    name: string;
    price: number;
    image: string;
}

interface CartItemProps {
    item: Item;
    userId: string;
    deleteItem: (id: string) => void;
    toggleFavorite: (userId: string, productId: string) => void;
    decrementFromCart: (userId: string, productId: string) => void;
    addToCart: (userId: string, productId: string) => void;
    checkUserSignin: () => boolean;
}

const CartItem: React.FC<CartItemProps> = ({
                                               item,
                                               userId,
                                               deleteItem,
                                               toggleFavorite,
                                               decrementFromCart,
                                               addToCart,
                                               checkUserSignin,
                                           }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: 2,
                p: 2,
                bgcolor: 'var(--background)',
                borderRadius: 1,
                boxShadow: 1,
                mx: 1,
                mb: 2,
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                <Image
                    width={64}
                    height={64}
                    priority
                    src={item.image}
                    alt={item.name || "Product image"}
                    style={{ objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border)' }}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'var(--foreground)' }}>
                        {item.name || "Product"}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'var(--foreground)' }}>
                            ${item.price?.toFixed(2) || "0.00"}
                        </Typography>
                        <IconButton onClick={() => deleteItem(item.productId)} size="small">
                            <IoMdClose />
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 1, bgcolor: 'var(--light)' }}>
                        <Button
                            onClick={() => userId ? decrementFromCart(userId, item.productId) : checkUserSignin()}
                            sx={{ minWidth: '40px', color: 'var(--foreground)' }}
                        >
                            -
                        </Button>
                        <Typography sx={{ mx: 2, color: 'var(--foreground)' }}>{item.quantity}</Typography>
                        <Button
                            onClick={() => userId ? addToCart(userId, item.productId) : checkUserSignin()}
                            sx={{ minWidth: '40px', color: 'var(--foreground)' }}
                        >
                            +
                        </Button>
                    </Box>
                    <IconButton onClick={() => toggleFavorite(userId, item.productId)} size="small">
                        {item.isFavourite ? (
                            <FaHeart style={{ color: 'var(--danger)' }} />
                        ) : (
                            item.quantity > 0 && <FaRegHeart style={{ color: 'var(--muted)' }} />
                        )}
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default CartItem;