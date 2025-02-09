import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { UserData } from '../../types/type';

// Define the CartItem interface
interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface OrderSummaryProps {
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
    selectedShipping: number;
    total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
                                                       cartItems,
                                                       setCartItems,
                                                       selectedShipping,
                                                       total,
                                                   }) => {
    const handleIncreaseQuantity = (id: string) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecreaseQuantity = (id: string) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingCost = selectedShipping === 2 ? 15 : selectedShipping === 3 ? -(subtotal * 0.21) : 0;

    return (
        <Box
            sx={{
                padding: 3,
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: '#fff',
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Order Summary
            </Typography>
            {cartItems.map((item) => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box>
                        <Typography>{item.name}</Typography>
                        <Box>
                            <Button onClick={() => handleDecreaseQuantity(item.id)}>-</Button>
                            <Typography component="span">{item.quantity}</Typography>
                            <Button onClick={() => handleIncreaseQuantity(item.id)}>+</Button>
                        </Box>
                    </Box>
                    <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
                </Box>
            ))}
            <Box sx={{ borderTop: '1px solid #e0e0e0', pt: 2, mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Subtotal</Typography>
                    <Typography>${subtotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Shipping</Typography>
                    <Typography>
                        {selectedShipping === 1 && 'Free'}
                        {selectedShipping === 2 && '$15.00'}
                        {selectedShipping === 3 && `-$${(subtotal * 0.21).toFixed(2)}`}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Taxes</Typography>
                    <Typography>Calculated at checkout</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, borderTop: '1px solid #e0e0e0', pt: 2 }}>
                    <Typography variant="h6">Total</Typography>
                    <Typography variant="h6">${total.toFixed(2)}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default OrderSummary;