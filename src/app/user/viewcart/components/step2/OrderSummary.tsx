import React from 'react';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { CartItem } from '../../types/type';
import { useSession } from "next-auth/react";
import Image from 'next/image';

interface OrderSummaryProps {
    cartItems: CartItem[];
    selectedShipping: number;
    total: number;
    decrementFromCart: (userId: string, productId: string) => Promise<void>;
    addToCart: (userId: string, productId: string) => Promise<void>;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
    cartItems,
    selectedShipping,
    total,
    decrementFromCart,
    addToCart
}) => {
    const { data: session } = useSession();
    const userId = session?.user?.id || "";
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <Box
            sx={{
                padding: { xs: 2, sm: 3 },
                border: `1px solid var(--border)`,
                borderRadius: 2,
                boxShadow: '0 4px 6px var(--shadow)',
                backgroundColor: 'var(--light)',
                color: 'var(--foreground)',
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'var(--primary)' }}>
                Order Summary
            </Typography>
            {cartItems.map((item) => (
                <Box key={item.id} sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    mb: 2,
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    borderBottom: '1px solid var(--border)',
                    paddingBottom: 2
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, sm: 0 } }}>
                        <Image
                            src={item.image || '/placeholder.png'}
                            alt={item.name}
                            width={50}
                            height={50}
                            style={{ marginRight: '10px', borderRadius: '4px', objectFit: 'cover', width: 50, height: 50 }}
                        />
                        <Box>
                            <Typography sx={{ fontWeight: 'medium', color: 'var(--foreground)' }}>{item.name}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <Button
                                    onClick={() => decrementFromCart(userId, item.id)}
                                    sx={{ minWidth: '30px', color: 'var(--primary)' }}
                                >
                                    -
                                </Button>
                                <Typography component="span" sx={{ mx: 1 }}>{item.quantity}</Typography>
                                <Button
                                    onClick={() => addToCart(userId, item.id)}
                                    sx={{ minWidth: '30px', color: 'var(--primary)' }}
                                >
                                    +
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                    <Typography sx={{ fontWeight: 'bold', color: 'var(--accent)' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                </Box>
            ))}
            <Box sx={{ borderTop: `1px solid var(--border)`, pt: 2, mt: 2 }}>
                {[
                    { label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
                    {
                        label: 'Shipping',
                        value: selectedShipping === 1 ? 'Free' :
                            selectedShipping === 2 ? '$15.00' :
                                `-$${(subtotal * 0.21).toFixed(2)}`
                    },
                    { label: 'Taxes', value: 'Calculated at checkout' },
                ].map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography sx={{ color: 'var(--muted)' }}>{item.label}</Typography>
                        <Typography sx={{ color: 'var(--foreground)' }}>{item.value}</Typography>
                    </Box>
                ))}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 2,
                    borderTop: `1px solid var(--border)`,
                    pt: 2
                }}>
                    <Typography variant="h6" sx={{ color: 'var(--primary)' }}>Total</Typography>
                    <Typography variant="h6" sx={{ color: 'var(--accent)' }}>${total.toFixed(2)}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default OrderSummary;