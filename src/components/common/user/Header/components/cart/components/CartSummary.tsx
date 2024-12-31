"use client";
import React from "react";
import { Button, Typography } from "@mui/material";
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

const CartSummary: React.FC<CartSummaryProps> = ({ handleCheckout, cartItems }) => {
    const subtotal = calculateSubtotal(cartItems);

    return (
        <div className="mt-auto p-3 sm:p-4">
            <div className="p-2 sm:p-3 flex justify-between">
                <Typography component="div" className="text-sm sm:text-base">
                    Subtotal
                </Typography>
                <Typography component="div" className="text-sm sm:text-base">
                    $ {subtotal.toFixed(2)}
                </Typography>
            </div>
            <div className="p-2 sm:p-3 flex justify-between">
                <Typography component="div" className="font-bold text-sm sm:text-base">
                    Total
                </Typography>
                <Typography component="div" className="text-sm sm:text-base">
                    $ {subtotal.toFixed(2)}
                </Typography>
            </div>
            <Button
                sx={{
                    width: "90%",
                    mx: "5%",
                    fontSize: {
                        xs: "0.875rem",
                        sm: "1rem",
                    },
                }}
                variant="contained"
                className="bg-black hover:bg-gray-800"
                onClick={handleCheckout}
            >
                Checkout
            </Button>
            <div className="text-center mt-3">
                <Link href="/pages/ViewCart">
                    <button className="text-black text-xs sm:text-sm font-semibold">
                        <u className="text-black text-xs sm:text-sm font-semibold text-center">
                            View Cart
                        </u>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CartSummary;