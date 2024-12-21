import React, {createContext, useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useSession} from 'next-auth/react';

interface CartItem {
    productId: string;
    quantity: number;
    isFavourite: boolean;
    rating: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (userId: string, productId: string) => Promise<void>;
    updateRating: (userId: string, productId: string, rating: number) => Promise<void>;
    toggleFavorite: (userId: string, productId: string) => Promise<void>;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [cartLoaded, setCartLoaded] = useState(false);
    const {data: session} = useSession();
    const userId = session?.user?.id;

    const getCart = async (userId: string) => {
        try {
            const response = await fetch(`/api/addtocart?userId=${userId}`);
            if (response.ok) {
                const data = await response.json();
                setCart(data.info);
                setCartLoaded(true);
            } else {
                console.error("Failed to fetch cart data");
            }
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };

    const addToCart = async (userId: string, productId: string) => {
        try {
            const response = await fetch("/api/addtocart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({userId, productId, quantity: 1}),
            });

            if (!response.ok) {
                throw new Error("Failed to add item to cart");
            }

            const data = await response.json();
            toast.success(data.message);

            setCart((prevCart) => {
                const existingItemIndex = prevCart.findIndex(
                    (cartItem) => cartItem.productId === productId
                );

                if (existingItemIndex !== -1) {
                    const updatedCart = [...prevCart];
                    updatedCart[existingItemIndex].quantity += 1;
                    return updatedCart;
                } else {
                    return [...prevCart, {productId, quantity: 1, isFavourite: false, rating: 0}];
                }
            });
        } catch (error) {
            toast.error("An error occurred while adding to cart");
            console.error("Error adding to cart:", error);
        }
    };

    const updateRating = async (userId: string, productId: string, rating: number) => {
        try {
            const response = await fetch("/api/addtocart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({userId, productId, rating}),
            });

            if (!response.ok) {
                throw new Error("Failed to update rating");
            }

            const data = await response.json();
            toast.success(data.message);

            setCart((prevCart) => {
                const existingItemIndex = prevCart.findIndex(
                    (cartItem) => cartItem.productId === productId
                );

                if (existingItemIndex !== -1) {
                    const updatedCart = [...prevCart];
                    updatedCart[existingItemIndex].rating = rating;
                    return updatedCart;
                } else {
                    return [...prevCart, {productId, quantity: 1, isFavourite: false, rating}];
                }
            });
        } catch (error) {
            toast.error("An error occurred while updating rating");
            console.error("Error updating rating:", error);
        }
    };

    const toggleFavorite = async (userId: string, productId: string) => {
        try {
            const existingItemIndex = cart.findIndex(
                (cartItem) => cartItem.productId === productId
            );

            if (existingItemIndex !== -1) {
                const updatedCart = [...cart];
                const newFavouriteStatus = !updatedCart[existingItemIndex].isFavourite;

                const response = await fetch("/api/addtocart", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({userId, productId, isFavourite: newFavouriteStatus}),
                });

                if (!response.ok) {
                    throw new Error("Failed to toggle favorite");
                }

                const data = await response.json();
                toast.success(data.message);

                updatedCart[existingItemIndex].isFavourite = newFavouriteStatus;
                setCart(updatedCart);
            }
        } catch (error) {
            toast.error("An error occurred while toggling favorite");
            console.error("Error toggling favorite:", error);
        }
    };

    useEffect(() => {
        if (userId && !cartLoaded) {
            getCart(userId);
        }
    }, [userId, cartLoaded]);

    return (
        <CartContext.Provider value={{cart, addToCart, toggleFavorite, updateRating, cartCount: cart.length}}>
            {children}
        </CartContext.Provider>
    );
};