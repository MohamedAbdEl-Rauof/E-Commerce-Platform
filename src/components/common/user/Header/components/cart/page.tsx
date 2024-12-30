"use client";
import React from "react";
import {Box, List, ListItem} from "@mui/material";
import {useSession} from "next-auth/react";
import CartHeader from './components/CartHeader';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';
import {useRouter} from "next/navigation";
import {useProduct} from "@/context/ProductContext";
import {useCart} from "@/context/AddToCartContext";

const Page = () => {
    const {data: session} = useSession();
    const userId = session?.user?.id || "";
    const {
        cart,
        closeCart,
        addToCart,
        decrementFromCart,
        deleteItem,
        toggleFavorite,
        checkUserSignin,
    } = useCart();
    const {products} = useProduct();

    const router = useRouter();

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
                        .map((item) => {
                            const product = products.find((p) => p._id === item.productId);
                            return (
                                <CartItem
                                    key={item.productId}
                                    item={item}
                                    userId={userId}
                                    deleteItem={deleteItem}
                                    toggleFavorite={toggleFavorite}
                                    decrementFromCart={decrementFromCart}
                                    addToCart={addToCart}
                                    checkUserSignin={checkUserSignin}
                                    products={products}
                                />
                            );
                        })}
                </ListItem>
            </List>
            <CartSummary handleCheckout={handleCheckout}/>
        </Box>
    );
};

export default Page;