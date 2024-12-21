import React, {createContext, useContext, useState} from "react";
import {toast} from "react-toastify";

interface CartItem {
    productId: string;
    quantity: number;
    isFavourite: boolean;
    rating: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (productId: string) => Promise<void>;
    toggleFavorite: (productId: string) => Promise<void>;
    updateRating: (productId: string, rating: number) => Promise<void>;
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
    const [cartCount, setCartCount] = useState(0);

    const addToCart = async (productId: string) => {
        try {
            const response = await fetch("/api/addtocart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({productId, quantity: 1}),
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

            setCartCount((prevCount) => prevCount + 1);
        } catch (error) {
            toast.error("An error occurred while adding to cart");
            console.error("Error adding to cart:", error);
        }
    };

    const toggleFavorite = async (productId: string) => {
        try {
            const response = await fetch("/api/addtocart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({productId, isFavourite: true}),
            });

            if (!response.ok) {
                throw new Error("Failed to toggle favorite");
            }

            const data = await response.json();
            toast.success(data.message);

            setCart((prevCart) => {
                const existingItemIndex = prevCart.findIndex(
                    (cartItem) => cartItem.productId === productId
                );

                if (existingItemIndex !== -1) {
                    const updatedCart = [...prevCart];
                    updatedCart[existingItemIndex].isFavourite = !updatedCart[existingItemIndex].isFavourite;
                    return updatedCart;
                } else {
                    return [...prevCart, {productId, quantity: 1, isFavourite: true, rating: 0}];
                }
            });
        } catch (error) {
            toast.error("An error occurred while toggling favorite");
            console.error("Error toggling favorite:", error);
        }
    };

    const updateRating = async (productId: string, rating: number) => {
        try {
            const response = await fetch("/api/addtocart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({productId, rating}),
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

    return (
        <CartContext.Provider value={{cart, addToCart, toggleFavorite, updateRating, cartCount}}>
            {children}
        </CartContext.Provider>
    );
};