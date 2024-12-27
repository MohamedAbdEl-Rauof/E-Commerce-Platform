"use client";
import React from "react";
import {Box, List, ListItem} from "@mui/material";
import {useRouter} from "next/navigation";
import {useCart} from "@/context/AddToCartContext";
import {useSession} from "next-auth/react";
import CartHeader from './components/CartHeader';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';
import CartActions from './components/CartActions';

const Page = () => {
    const router = useRouter();
    const {data: session} = useSession();
    const userId = session?.user?.id;
    const {
        cart,
        closeCart,
        addToCart,
        decrementFromCart,
        deleteItem,
        toggleFavorite,
        // calculateSubtotal,
        checkUserSignin,
    } = useCart();

    const handleCheckout = () => {
        router.push("/pages/ViewCart");
    };

    return (
        <Box
            sx={{
                width: {
                    xs: "100%",
                    sm: "350px",
                },
                maxWidth: "350px",
            }}
            role="presentation"
            className="flex flex-col h-full"
        >
            <List className="flex-grow">
                <ListItem disablePadding className="block">
                    <CartHeader closeCart={closeCart}/>
                    {cart
                        .filter((item) => item.quantity > 0 || item.isFavourite)
                        .map((item) => (
                            <CartItem
                                key={item.productId}
                                item={item}
                                userId={userId}
                                deleteItem={deleteItem}
                                toggleFavorite={toggleFavorite}
                                decrementFromCart={decrementFromCart}
                                addToCart={addToCart}
                                checkUserSignin={checkUserSignin}
                            />
                        ))}
                </ListItem>
            </List>
            <div className="mt-auto p-3 sm:p-4">
                <CartSummary /*calculateSubtotal={calculateSubtotal}*/ />
                <CartActions handleCheckout={handleCheckout}/>
            </div>
        </Box>
    );
};

export default Page;