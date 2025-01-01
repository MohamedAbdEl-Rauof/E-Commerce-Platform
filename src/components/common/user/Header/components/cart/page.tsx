"use client";
import React from "react";
import { Box, List, ListItem } from "@mui/material";
import { useSession } from "next-auth/react";
import CartHeader from './components/CartHeader';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';
import { useRouter } from "next/navigation";
import { useProduct } from "@/context/ProductContext";
import { useCart } from "@/context/AddToCartContext";

interface CartItem {
    productId: string;
    quantity: number;
    isFavourite: boolean;
    name: string;
    price: number;
    image: string;
}

const Page = () => {
    const { data: session } = useSession();
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
    const { products } = useProduct();

    const router = useRouter();

    const handleCheckout = () => {
        router.push("/pages/ViewCart");
    };

    const cartItems: CartItem[] = cart
        .filter((item) => item.quantity >= 0 || item.isFavourite)
        .map((item) => {
            const product = products.find((p) => p._id === item.productId);
            if (!product) return null;
            return {
                productId: product._id,
                quantity: item.quantity,
                isFavourite: item.isFavourite,
                name: product.name,
                price: product.price,
                image: product.image,
            };
        })
        .filter((item): item is CartItem => item !== null);

    return (
        <Box
            sx={{
                width: {
                    xs: "100%",
                    sm: "350px",
                },
                maxWidth: "100%",
            }}
            role="presentation"
            className="flex flex-col h-full p-4 sm:p-0"
        >
            <List className="flex-grow">
                <ListItem disablePadding className="block">
                    <CartHeader closeCart={closeCart} />
                    {cartItems.map((item) => (
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
            <CartSummary handleCheckout={handleCheckout} cartItems={cartItems} />
        </Box>
    );
};

export default Page;