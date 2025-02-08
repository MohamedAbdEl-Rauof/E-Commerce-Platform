import React from "react";
import {Box, Button, Typography} from "@mui/material";
import {CartItem} from "../../types";

interface OrderSummaryProps {
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
    total: number;
    selectedShipping: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
                                                       cartItems,
                                                       setCartItems,
                                                       total,
                                                       selectedShipping,
                                                   }) => {
    const handleIncreaseQuantity = (id: string) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? {...item, quantity: item.quantity + 1} : item
            )
        );
    };

    const handleDecreaseQuantity = (id: string) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.quantity > 1
                    ? {...item, quantity: item.quantity - 1}
                    : item
            )
        );
    };

    const calculateSubtotal = (cartItems: CartItem[]) => {
        return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    };

    const subtotal = calculateSubtotal(cartItems);
    const shippingCost = selectedShipping === 2 ? 15.0 : selectedShipping === 3 ? -(subtotal * 0.21) : 0;

    return (
        <Box
            sx={{
                padding: 3,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: "#fff",
                width: {xs: "100%", md: "40%"},
            }}
        >
            <Typography variant="h6" sx={{fontWeight: "bold", mb: 2}}>
                Order Summary
            </Typography>
            {cartItems.map((item) => (
                <Box key={item.id} sx={{display: "flex", justifyContent: "space-between", mb: 2}}>
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <img src={item.image} alt={item.name} style={{width: 50, height: 50, marginRight: 10}}/>
                        <Typography>{item.name}</Typography>
                    </Box>
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <Button onClick={() => handleDecreaseQuantity(item.id)}>-</Button>
                        <Typography>{item.quantity}</Typography>
                        <Button onClick={() => handleIncreaseQuantity(item.id)}>+</Button>
                        <Typography sx={{ml: 2}}>${(item.price * item.quantity).toFixed(2)}</Typography>
                    </Box>
                </Box>
            ))}
            <Box sx={{borderTop: "1px solid #e0e0e0", pt: 2, mt: 2}}>
                <Box sx={{display: "flex", justifyContent: "space-between", mb: 1}}>
                    <Typography>Subtotal</Typography>
                    <Typography>${subtotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{display: "flex", justifyContent: "space-between", mb: 1}}>
                    <Typography>Shipping</Typography>
                    <Typography>${shippingCost.toFixed(2)}</Typography>
                </Box>
                <Box sx={{display: "flex", justifyContent: "space-between", fontWeight: "bold"}}>
                    <Typography>Total</Typography>
                    <Typography>${total.toFixed(2)}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default OrderSummary;