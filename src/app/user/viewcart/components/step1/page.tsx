"use client";

import React, {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {useSession} from "next-auth/react";
import Swal from "sweetalert2";
import CartTable from './components/CartTable';
import CartSummary from './components/CartSummary';
import {CartItem} from '../types';

interface StepProps {
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
    handleCheckout: () => void;
    selectedShipping: number;
    setSelectedShipping: React.Dispatch<React.SetStateAction<number>>;
}

const Step1: React.FC<StepProps> = ({
                                        cartItems,
                                        setCartItems,
                                        handleCheckout,
                                        selectedShipping,
                                        setSelectedShipping,
                                    }) => {
    const [total, setTotal] = useState<number>(0);
    const [changes, setChanges] = useState<Map<string, CartItem>>(new Map());
    const {data: session} = useSession();
    const userId = session?.user?.id;

    // Calculate Subtotal
    const calculateSubtotal = (cartItems: CartItem[]) => {
        return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    };

    const handleSelectShipping = (optionId: number) => {
        setSelectedShipping(optionId);
    };

    // Update total on cartItems or selectedShipping change
    useEffect(() => {
        const subtotal = calculateSubtotal(cartItems);
        let shippingCost = 0;

        if (selectedShipping === 2) {
            shippingCost = 15.0; // Express Shipping
        } else if (selectedShipping === 3) {
            shippingCost = -(subtotal * 0.21); // Pickup discount
        }

        setTotal(subtotal + shippingCost);
    }, [cartItems, selectedShipping]);

    const handleIncreaseQuantity = (id: string) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? {...item, quantity: item.quantity + 1} : item,
            ),
        );

        setChanges((prevChanges) => {
            const newChanges = new Map(prevChanges);
            const item = cartItems.find((item) => item.id === id);
            if (item) {
                newChanges.set(id, {...item, quantity: item.quantity + 1});
            }
            return newChanges;
        });
    };

    const handleDecreaseQuantity = (id: string) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.quantity > 1
                    ? {...item, quantity: item.quantity - 1}
                    : item,
            ),
        );

        setChanges((prevChanges) => {
            const newChanges = new Map(prevChanges);
            const item = cartItems.find((item) => item.id === id);
            if (item && item.quantity > 1) {
                newChanges.set(id, {...item, quantity: item.quantity - 1});
            }
            return newChanges;
        });
    };

    // Save changes to the database
    const saveChanges = async () => {
        if (changes.size === 0) return;
        try {
            for (const [productId, item] of changes.entries()) {
                await fetch("/api/addtocart", {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        userId,
                        productId,
                        quantity: item.quantity,
                    }),
                });
            }
            setChanges(new Map());
        } catch (error) {
            console.error("Error saving changes:", error);
        }
    };

    // Auto-save every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            saveChanges();
        }, 5000);

        return () => clearInterval(interval);
    }, [changes]);

    // Save on unmount
    useEffect(() => {
        return () => {
            saveChanges();
        };
    }, []);

    // Delete item from DB
    const deleteProduct = async (productId: string) => {
        try {
            // Remove the product from the cart state
            setCartItems((prevItems) =>
                prevItems.filter((item) => item.id !== productId),
            );

            // Send DELETE request to remove the item from the database
            await fetch("/api/addtocart", {
                method: "DELETE",
                body: JSON.stringify({userId, productId}),
                headers: {"Content-Type": "application/json"},
            });

            // Show a success notification
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Deleted Done",
                showConfirmButton: false,
                timer: 1000,
            });
            console.log(
                "Item deleted from database and removed from cart successfully",
            );
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="mt-10 mb-14 flex justify-between w-auto mx-auto">
            <Box sx={{flex: 1, marginRight: 4}}>
                <CartTable
                    cartItems={cartItems}
                    handleIncreaseQuantity={handleIncreaseQuantity}
                    handleDecreaseQuantity={handleDecreaseQuantity}
                    deleteProduct={deleteProduct}
                />
            </Box>
            <CartSummary
                selectedShipping={selectedShipping}
                handleSelectShipping={handleSelectShipping}
                subtotal={calculateSubtotal(cartItems)}
                total={total}
                handleCheckout={handleCheckout}
            />
        </div>
    );
};

export default Step1;