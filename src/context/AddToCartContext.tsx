import React, {createContext, useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useSession} from 'next-auth/react';
import Swal from "sweetalert2";
import {useRouter} from "next/navigation";


interface CartItem {
    productId: string;
    quantity: number;
    isFavourite: boolean;
    rating: number;

}

interface CartContextType {
    cart: CartItem[];
    addToCart: (userId: string, productId: string) => Promise<void>;
    decrementFromCart: (userId: string, productId: string) => Promise<void>;
    deleteItem: (productId: string) => Promise<void>;
    updateRating: (userId: string, productId: string, rating: number) => Promise<void>;
    toggleFavorite: (userId: string, productId: string) => Promise<void>;
    cartCount: number;
    checkUserSignin: () => boolean;
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
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
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);


    const checkUserSignin = () => {
        if (!userId) {
            Swal.fire({
                title: "Please Log In",
                text: "You need to be logged in to perform this action.",
                icon: "warning",
                confirmButtonText: "Go to Login",
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push("/signin");
                }
            });
            return false;
        }
        return true;
    };

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
        if (!checkUserSignin()) return;

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

    const decrementFromCart = async (userId: string, productId: string) => {
        if (!checkUserSignin()) return;

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
                    updatedCart[existingItemIndex].quantity -= 1;
                    return updatedCart;
                } else {
                    return [...prevCart, {productId, quantity: 1, isFavourite: false, rating: 0}];
                }
            });
        } catch (error) {
            toast.error("An error occurred while adding to cart");
            console.error("Error adding to cart:", error);
        }
    }

    const updateRating = async (userId: string, productId: string, rating: number) => {
        if (!checkUserSignin()) return;

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
        if (!checkUserSignin()) return;

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

    const deleteItem = async (productId: string) => {
        try {
            setCart((prevItems) =>
                prevItems.filter((item) => item.productId !== productId)
            );

            if (userId) {
                await fetch('/api/addtocart', {
                    method: 'DELETE',
                    body: JSON.stringify({userId, productId}),
                    headers: {'Content-Type': 'application/json'},
                });

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Deleted Done',
                    showConfirmButton: false,
                    timer: 1000,
                });
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };


    useEffect(() => {
        if (userId && !cartLoaded) {
            getCart(userId);
        }
    }, [userId, cartLoaded]);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                decrementFromCart,
                deleteItem,
                toggleFavorite,
                updateRating,
                isOpen,
                openCart,
                closeCart,
                checkUserSignin,
                cartCount: cart.length
            }}>
            {children}
        </CartContext.Provider>
    );
};